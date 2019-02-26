/* -------------------------------------------------------------------------------------------- */
/* -----------------------------------------   视频播放模块   ----------------------------------- */
/* -------------------------------------------------------------------------------------------- */

function VideoModule() {
    var that = this;

    // 属性
    this.smallScreenPlay = false;                  //  对于 video.html 默认为全屏播放
    this.isAutoPlaying = false;                    //  针对小视频，是否正在播放
    this.resourceId = '';
    this.assertId = '';
    this.backURL = '';
    this.smallScreenLeft = 52;
    this.smallScreenTop = 168;
    this.smallScreenWidth = 792;
    this.smallScreenHeight = 446;
    this.mediaPlayer = null;
    this.rtsp = '';
    this.requestVideoAssetId = null;
    this.requestVideoDetails = null;
    this.requestRtspStream = null;

    if (cmsConfig.environment === 'DEBUG') {
        this.ip = '10.215.0.12';
        this.port = '8080';
        this.account = '8350310392603009';
        this.client = '8350310392603009';
    } else {
        this.ip = GlobalVarManager.getItemStr('ip');
        this.port = GlobalVarManager.getItemStr('port');
        this.account = GlobalVarManager.getItemStr('account') || CAManager.cardSerialNumber;
        this.client = CAManager.cardSerialNumber;
    }

    // 方法

    /**
     * 初始化
     */
    this.init = function () {
        document.getElementById('debug-message').innerHTML += '<br/>' + '  Resource ID ==> ' + this.resourceId;
        document.getElementById('debug-message').innerHTML += '<br/>' + '  Assert ID ==> ' + this.assertId;

        //  小屏播放，创建播放器对象
        if (this.smallScreenPlay) {
            this.mediaPlayer = cmsApi.createMediaPlayer(
                this.smallScreenLeft,
                this.smallScreenTop,
                this.smallScreenWidth,
                this.smallScreenHeight
            );
        }
        //  视频地址来源
        if (this.assertId !== '') {
            this.play();
        } else if (this.resourceId !== '') {
            //  获取视频assetId
            this.requestVideoAssetId = cmsApi.fetchVideoAssetId(this.resourceId, function (json) {
                if ('1' === json.code || 1 === json.code) {
                    that.assertId = json.dataArray[0].assetid;
                    that.play();
                }
            });
        }
    };

    /**
     * 销毁 AJAX 对象
     */
    this.destroy = function () {
        //document.getElementById('debug-message').innerHTML += '<br/>' + 'video.module ==> destroy';
        if (this.requestVideoAssetId) {
            this.requestVideoAssetId.abortRequest();
        }
        if (this.requestVideoDetails) {
            this.requestVideoDetails.abortRequest();
        }
        if (this.requestRtspStream) {
            this.requestRtspStream.abortRequest();
        }
    };

    this.focusOn = function (cursor) {
        cursor.style.visibility = 'visible';
        cursor.style.left = this.smallScreenLeft + 'px';
        cursor.style.top = this.smallScreenTop + 'px';
        cursor.style.width = this.smallScreenWidth + 'px';
        cursor.style.height = this.smallScreenHeight + 'px';
    };

    this.focusOut = function (cursor) {
        cursor.style.visibility = 'hidden';
    };

    this.moveX = function (_direction) {
        return -1;
    };

    this.moveY = function (_direction) {
        return -1;
    };

    /**
     * 播放视频
     */
    this.play = function () {
        var that = this;

        //
        // 获取视频播放参数
        //
        this.requestVideoDetails = cmsApi.fetchVideoDetails(that.ip, that.port, that.assertId, that.client, that.account, function (response) {
            var
                _data;

            _data = parseDom(response);
            //document.getElementById('debug-message').innerHTML += '<br/>' + '  0 ==> ' + jsonUtils.stringify(_data.ItemData[0].SelectableItem[0]);
            //document.getElementById('debug-message').innerHTML += '<br/>' + '  0.1 ==> ' + _data.ItemData[0].SelectableItem[0].serviceId;
            //document.getElementById('debug-message').innerHTML += '<br/>' + '  0.2 ==> ' + jsonUtils.stringify(_data.ItemData[0].SelectableItem[0].RentalInfo[0]);
            if (typeof (_data) === 'object' && _data !== null) {
                if ('ItemData' in _data) {
                    //
                    // 获取rtsp流
                    //
                    that.requestRtspStream = cmsApi.fetchRtspStream(
                        that.ip,
                        that.port,
                        that.assertId,
                        that.client,
                        that.account,
                        _data.ItemData[0].SelectableItem[0].serviceId,
                        function (rawData) {
                            var
                                stream = parseDom(rawData);

                            //document.getElementById('debug-message').innerHTML += '<br/>' + '1  ==> ' + jsonUtils.stringify(stream.StartResponse[0]);
                            //document.getElementById('debug-message').innerHTML += '<br/>' + '1.1  ==> ' + stream.StartResponse[0].rtsp;
                            if (typeof (stream) === 'object' && stream !== null) {
                                if (that.smallScreenPlay) {
                                    that.rtsp = stream.StartResponse[0].rtsp;
                                    //
                                    //  小屏播放
                                    //
                                    cmsApi.setSmallScreenVideo(
                                        that.rtsp.split(';'),
                                        that.mediaPlayer
                                    );

                                    setTimeout(function () {
                                        that.checkOnceAgain();
                                    }, 5000);

                                } else {
                                    //
                                    // 跳转至视频播放链接（全屏）
                                    //
                                    cmsApi.playVideo(
                                        stream.StartResponse[0].rtsp.split(';'),
                                        stream.StartResponse[0].previewAssetId,
                                        stream.StartResponse[0].startTime,
                                        stream.StartResponse[0].purchaseToken,
                                        that.assertId,
                                        _data.ItemData[0].SelectableItem[0],
                                        0,
                                        that.backURL
                                    );
                                }
                            }
                        });
                } else {
                    // 错误处理
                    if ('NavServerResponse' in _data) {
                        var _message = _data.NavServerResponse[0].debug,
                            _errorCode = _data.NavServerResponse[0].code;
                        document.getElementById('debug-message').innerHTML += '<br/>' + 'Error - ' + _errorCode + ', message:' + _message;
                    } else {
                        document.getElementById('debug-message').innerHTML += '<br/>' + '获取数据失败';
                    }
                }

            }
        });
    };

    /**
     * 循环轮播
     */
    this.loopSmallVideo = function () {
        //document.getElementById('debug-message').innerHTML += '<br/>' + 'loopSmallVideo ==> rtsp: ' + this.rtsp;
        cmsApi.setSmallScreenVideo(
            this.rtsp.split(';'),
            this.mediaPlayer
        );
    };

    /**
     * 在这里如果加上setTimeout，想要延迟播放
     * 不知道是通过that.mediaPlayer获取到的mediaPlayer对象有问题，
     * 还是说在收到系统发来的 【小视频消息处理】 事件，要立即处理，
     * 导致视频无法播放成功
     *
     * 另外，如果不理会【小视频消息处理】 事件，初始化组件后，直接播放视频是可以的，但是会全屏播放，达不到效果
     */
    this.autoPlaySmallVideo = function () {
        //var that = this;
        //
        //setTimeout(function () {
        //    document.getElementById('debug-message').innerHTML += '<br/>' + 'autoPlaySmallVideo ===> setTimeout';
        //    document.getElementById('debug-message').innerHTML += '<br/>' + that.mediaPlayer;
        //    that.mediaPlayer.play();
        //}, 3000);
        this.isAutoPlaying = true;
        cmsApi.playSmallScreenVideo(this.mediaPlayer);
    };

    /**
     * 销毁小视频
     */
    this.stop = function () {
        cmsApi.stopSmallScreenVideo(this.mediaPlayer);
    };

    /**
     * 再次认证
     */
    this.checkOnceAgain = function () {
        var that = this;

        document.getElementById('debug-message').innerHTML += '<br/>' + '===>   checkOnceAgain | isAutoPlaying  ===> ' + this.isAutoPlaying;
        if (!this.isAutoPlaying) {
            cmsApi.checkAuthentication(this.ip, this.port, this.client, function (rawData) {
                var
                    authentication = parseDom(rawData);

                if ('NavServerResponse' in authentication) {
                    var message = authentication.NavServerResponse[0].message;
                    var code = authentication.NavServerResponse[0].code;

                    //document.getElementById('debug-message').innerHTML += '<br/>' + 'checkOnceAgain ===> message' + message;
                    //document.getElementById('debug-message').innerHTML += '<br/>' + 'checkOnceAgain ===> code' + code;
                }

                if ('NavCheckResult' in authentication) {
                    var account = authentication.NavCheckResult[0].account;
                    //document.getElementById('debug-message').innerHTML += '<br/>' + 'checkOnceAgain ===> account:' + account;

                    GlobalVarManager.setItemStr("account", account);
                    var vodAjaxInfo = that.ip + "&" + that.port + "&" + account;
                    var vodAjaxInfoObj = '{"vodAjaxInfo":"' + vodAjaxInfo + '"}';
                    setDataAccessProperty("info", "vodAjaxInfo", vodAjaxInfoObj, true);

                    var frequency = authentication.NavCheckResult[0].ZoneFreqInfo[0].frequency;
                    document.getElementById('debug-message').innerHTML += '<br/>' + 'checkOnceAgain ===> frequency:' + frequency;
                    if (typeof frequency !== "undefined" && frequency !== "undefined" && frequency !== "") {
                        GlobalVarManager.setItemStr("frequency", frequency);
                        VOD.searchParams("IPQAMPointList=" + frequency + ",0;END");
                    }
                }
            });
        }
    }
}