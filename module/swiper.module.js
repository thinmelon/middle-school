/**
 * ----------------------------------------------------------------------------------------------
 * ----------------------------------------- 滑块视图容器 ---------------------------------------
 * ----------------------------------------------------------------------------------------------
 */

function SwiperModule() {
    this.swiperTop = 0;                 //  上边距
    this.swiperLeft = 0;                //  左边距
    this.swiperWidth = 0;               //  宽度
    this.swiperHeight = 0;              //  高度
    this.album = [];                    //  图集
    this.focusPos = 0;                  //  当前图片在图集内的位置
    this.interval = 3000;               //  图片滚动的时间间隔
    this.timerId = 0;                   //  timer ID
    this.showSwiperIndexGroup = true;   //  是否显示图片下标索引
    this.resourceId = 0;                //  资源 ID
    this.maxCount = 5;                  //  海报上限
    //this.remoteImage = false;         //  图片是否存在CMS上

    /**
     *  初始化
     */
    this.init = function () {
        var that = this,
            flag;

        if (cmsConfig.environment === 'DEBUG') {
            this.album = [
                {
                    img: 'url(../images/index/1.jpg)',
                    resourceId: 222,
                    flag: 0
                },
                {
                    img: 'url(../images/index/2.jpg)',
                    assertId: 111,
                    flag: 1
                },
                {
                    img: 'url(../images/index/3.jpg)',
                    resourceId: cmsConfig.indexResourceIdArray[0].resourceId,
                    flag: 0
                },
                {
                    img: 'url(../images/index/1.jpg)',
                    assertId: 111,
                    flag: 1
                }
            ];
            this.render();
        } else {
            document.getElementById('debug-message').innerHTML += '<br/>' + 'SwiperModule ==> init() ==>  resourceId = ' + this.resourceId;
            if (this.resourceId !== 0) {
                cmsApi.getListItems(this.resourceId, this.maxCount, 1, function (response) {
                    if (response.hasOwnProperty('code') && ('1' === response.code || 1 === response.code)) {
                        //  清空数组并移除结点
                        that.removeAllSwiperItem();
                        //that.remoteImage = true;        //  显示服务器上的图片
                        for (var j = 0, length = response.dataArray.length; (j < length) && (j < that.maxCount); j++) {
                            flag = parseInt(response.dataArray[j].flag);
                            if (flag === 1) {           //  视频资源
                                that.album.push({
                                    img: response.dataArray[j].img,
                                    assertId: response.dataArray[j].assetid,
                                    flag: flag
                                });
                            } else {
                                that.album.push({       //  图文资源
                                    img: response.dataArray[j].img,
                                    resourceId: response.dataArray[j].id,
                                    flag: flag
                                });
                            }
                        }
                        that.render();
                    }
                });
            } else {
                this.render();
            }
        }
    };

    /**
     * 移除所有子项
     */
    this.removeAllSwiperItem = function () {
        var swiperElement = document.getElementById('swiper');

        while (this.album.length > 0) {
            this.album.pop();
        }

        while (swiperElement.hasChildNodes()) {
            swiperElement.removeChild(swiperElement.firstChild);
        }

        this.focusPos = 0;
    };

    /**
     *  重绘
     */
    this.render = function () {
        var i, length, swiperIndexItem,
            swiper = document.getElementById('swiper'),
            swiperIndexGroup = document.createElement('div'),
            children = swiper.childNodes;

        // 初始化滑块视图容器
        swiper.style.top = this.swiperTop + 'px';
        swiper.style.left = this.swiperLeft + 'px';
        swiper.style.width = this.swiperWidth + 'px';
        swiper.style.height = this.swiperHeight + 'px';

        //  清空数组并移除结点
        // for (i = children.length - 1; i >= 0; i--) {
        //     swiper.removeChild(children[i]);
        // }

        if (this.showSwiperIndexGroup) {
            // 创建滑块图片下标组
            swiperIndexGroup.className = 'swiper-index-group';

            // 生成滑块图片下标
            for (i = 0, length = this.album.length; i < length; i++) {
                swiperIndexItem = document.createElement('div');
                swiperIndexItem.innerHTML = i + 1;
                swiperIndexItem.id = 'swiper-index-' + i;
                swiperIndexItem.className = 'swiper-index';
                swiperIndexGroup.appendChild(swiperIndexItem);
            }
            swiper.appendChild(swiperIndexGroup);
        } else {
            swiperIndexItem = document.createElement('div');
            swiperIndexItem.innerHTML = this.focusPos + 1;
            swiperIndexItem.id = 'swiper-index-item';
            swiper.appendChild(swiperIndexItem);
        }

        // 启动图片循环播放
        this.triggerTimer();
    };

    /**
     *  聚焦
     */
    this.focusOn = function () {
        clearInterval(this.timerId);
        this.setBackgroundImage();
        document.getElementById('swiper-index-' + this.focusPos).style.borderColor = '#FFFF00';
    };

    /**
     *  失焦
     */
    this.focusOut = function () {
        document.getElementById('swiper-index-' + this.focusPos).style.backgroundColor = '';
        document.getElementById('swiper-index-' + this.focusPos).style.borderColor = '#FFFFFF';
    };

    /**
     *  横向移动光标
     * @param direction
     */
    this.moveX = function (direction) {
        this.focusPos += direction;
        if (this.focusPos >= 0 && this.focusPos < this.album.length) {
            return 0;
        } else if (this.focusPos < 0) {
            this.focusPos = 0;
            return -1;
        } else {
            this.focusPos = this.album.length - 1;
            return -1;
        }
    };

    /**
     *  纵向移动光标
     * @returns {number}
     */
    this.moveY = function (direction) {
        this.focusPos += direction;
        if (this.focusPos >= 0 && this.focusPos < this.album.length) {
            return 0;
        } else if (this.focusPos < 0) {
            this.focusPos = 0;
            return -1;
        } else {
            this.focusPos = this.album.length - 1;
            return -1;
        }
    };

    /**
     * 选择
     * @param transferComponent
     * @param focusArea
     * @param focusPos
     * @param backURL
     * @param resourceId
     */
    this.doSelect = function (transferComponent, focusArea, focusPos, backURL, resourceId) {
        var
            postfix = '',
            params;

        params = {
            'PG-ONE': {
                focusArea: focusArea,
                focusPos: focusPos
            }
        };
        if (this.album[this.focusPos].flag === 0) {
            params.PG_TEXT = {
                resourceId: this.album[this.focusPos].resourceId,
                backURL: backURL
            };
            postfix = transferComponent.package(params);
            window.location.href = 'detail.html' + postfix;
        }
        else if (this.album[this.focusPos].flag === 1) {
            params.VIDEO = {
                backURL: transferComponent.backUrl(),
                fileName: transferComponent.cursor.fileName,
                focusArea: focusArea,
                focusPos: focusPos,
                assertId: this.album[this.focusPos].assertId
            };
            postfix = transferComponent.package(params);
            window.location.href = 'video.html' + postfix;
        } else {
            params.PG_MORE = {
                resourceId: resourceId,
                backURL: backURL,
                pageIndex: 1
            };
            postfix = transferComponent.package(params);
            window.location.href = 'more.html' + postfix;
        }
    };

    /**
     * 设置背景图片
     */
    this.setBackgroundImage = function () {
        var bgImage;

        if (cmsConfig.environment === 'DEBUG') {
            bgImage = this.album[this.focusPos].img;
        } else {
            bgImage = 'url(' + cmsConfig.imgUrl + this.album[this.focusPos].img + ')';
        }

        // document.getElementById('debug-message').innerHTML += '<br/>' + 'setBackgroundImage ==>  background image ====> ' + bgImage;
        document.getElementById('swiper').style.backgroundImage = bgImage;
        if (this.showSwiperIndexGroup) {
            document.getElementById('swiper-index-' + this.focusPos).style.backgroundColor = '#CA6167';
        } else {
            document.getElementById('swiper-index-item').innerHTML = (this.focusPos + 1).toString();
        }
    };

    /**
     *  依次显示图集内的图片
     */
    this.triggerTimer = function () {
        var that = this;

        clearInterval(this.timerId);
        this.setBackgroundImage();

        this.timerId = setInterval(function () {
            if (that.showSwiperIndexGroup) {
                document.getElementById('swiper-index-' + that.focusPos).style.backgroundColor = '';
            }
            that.focusPos = (that.focusPos + 1) % that.album.length;
            // document.getElementById('debug-message').innerHTML += '<br/>' + 'triggerTimer ==>  focusPos ====> ' + that.focusPos;
            that.setBackgroundImage();
        }, that.interval);
    };
}