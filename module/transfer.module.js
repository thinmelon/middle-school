/**
 * 页面元素
 *      debug-message
 * 前置文件
 *      /utility/assistant.js
 * @constructor
 */
function TransferModule() {
    // 属性
    this.record = [];
    this.cursor = null;
    this.textures = null;
    this.video = null;
    this.monitor = null;
    this.timerId = 0;

    /**
     *      模块初始化
     */
    this.init = function () {
        var key,
            rawData,
            _url,
            backURL,
            backParams;

        //document.getElementById('debug-message').innerHTML += '<br/>' + 'Transfer ==>  Location ====> ' + window.location.href;
        //document.getElementById('debug-message').innerHTML += '<br/>' + 'Transfer ==>  environment ====> ' + cmsConfig.environment;
        //if (cmsConfig.environment === 'PRODUCT') {
        //backURL = GMObj.pathManager.getBackURL(window.location.href);
        //document.getElementById('debug-message').innerHTML += '<br/>' + 'Transfer ==>  BackURL ====> ' + backURL;
        //  获取backParams

        //if ('' !== backURL && null !== backURL && 0 !== backURL) {
        //    backParams = GMObj.pathManager.getBackParam(backURL);
        //} else {
        //    backParams = GMObj.pathManager.getBackParam(window.location.href);
        //}
        //}

        // 如果backParams不为空，跳转至对应地址
        //document.getElementById('debug-message').innerHTML += '<br/>' + 'Transfer ==>  BackParams ====> ' + backParams;
        //if (typeof backParams !== 'undefined' && '' !== backParams && null !== backParams && backParams !== 'undefined') {
        //    window.location.href = backParams;
        //} else {
        _url = window.location.search;
        //document.getElementById('debug-message').innerHTML += '<br/>' + 'search: ' + decodeURIComponent(_url);

        if (_url.indexOf('?') !== -1) {
            var _str = _url.substr(1);              // 对query参数进行分解, 去掉最开始的 ?
            var _subStrs = _str.split('&');         // 以 & 符号作为分隔符
            for (var i = 0; i < _subStrs.length; i++) {
                key = _subStrs[i].split('=')[0];
                rawData = decodeURIComponent(_subStrs[i].split('=')[1]);
                //document.getElementById('debug-message').innerHTML += '<br/> ' + 'key: ' + key + ', rowData: ' + rawData;

                // 记录参数，以备后续跳转时使用
                this.record.push(jsonUtils.parse('{"' + key + '":"' + rawData + '"}'));
                /**
                 *  光标定位
                 */
                this.locatePageCursor(key, rawData);
                /**
                 *   图文列表
                 */
                this.setTextureModule(key, rawData);
                /**
                 *   视频播放
                 */
                this.setVideoModule(key, rawData);
                /**
                 *  视频监控
                 */
                this.setMonitorModule(key, rawData);
                /**
                 *   更多内容
                 */
                this.setMoreModule(key, rawData);
                /**
                 *   侧边栏
                 */
                this.setSidebarModule(key, rawData);
            }
            /** end of for */
        }
        /** end of if */
        //}
    };

    /**
     *  通过记录历史光标位置进行定位
     * @param key
     * @param rawData
     */
    this.locatePageCursor = function (key, rawData) {
        var value;

        // 判断cursor模块不为空 并且 参数等于当前页面的深度
        if (this.cursor && key === this.cursor.fileName) {
            value = jsonUtils.parse(rawData);
            if (value.hasOwnProperty('focusArea')) {
                // 光标所在区域
                this.cursor.focusArea = parseInt(value.focusArea);
                switch (this.cursor.focusArea) {
                    case 0:         // 菜单
                        if (value.hasOwnProperty('focusPosX') && value.hasOwnProperty('focusPosY') && this.cursor.menu) {
                            this.cursor.menu.focusPosX = parseInt(value.focusPosX);
                            this.cursor.menu.focusPosY = parseInt(value.focusPosY);
                        }
                        break;
                    case 1:         // 海报
                        if (value.hasOwnProperty('focusPos') && this.cursor.post) {
                            this.cursor.post.focusPos = parseInt(value.focusPos);
                        }
                        break;
                    case 2:         // 列表
                        if (value.hasOwnProperty('focusPos') && this.cursor.list) {
                            this.cursor.list.focusPos = parseInt(value.focusPos);
                        }
                        break;
                    case 3:         // 图片按键
                        if (value.hasOwnProperty('focusPos') && this.cursor.button) {
                            this.cursor.button.focusPos = parseInt(value.focusPos);
                        }
                        break;
                    case 4:         // 更多内容
                        if (value.hasOwnProperty('focusPosX') && value.hasOwnProperty('focusPosY') && this.cursor.more) {
                            this.cursor.more.focusPosX = parseInt(value.focusPosX);
                            this.cursor.more.focusPosY = parseInt(value.focusPosY);
                        }
                        break;
                    case 5:         // BAR
                        if (value.hasOwnProperty('focusPos') && this.cursor.bar) {
                            this.cursor.bar.focusPos = parseInt(value.focusPos);
                        }
                        break;
                    default:
                        break;
                }
                /* end of switch */
            }
            /* end of if */
        }
    };

    /**
     * 设置图文展示模块
     * @param key
     * @param rawData
     */
    this.setTextureModule = function (key, rawData) {
        var value;

        if (this.cursor.textures && key === this.cursor.fileName) {
            // document.getElementById('debug-message').innerHTML += '<br/>' + 'Transfer ==>  setTextureModule';
            value = jsonUtils.parse(rawData);

            // 是否显示图片
            // if (value.hasOwnProperty('isShowGraphics')) {
            //     this.cursor.textures.isShowGraphics = value.isShowGraphics;
            // }
            // 返回路径
            if (value.hasOwnProperty('backURL')) {
                this.cursor.textures.backURL = value.backURL;
            }
            // 页面标题图片
            // if (value.hasOwnProperty('logoImageSrc')) {
            //     this.cursor.textures.logoImageSrc = value.logoImageSrc;
            // }
            // 图文数据的资源请求id
            if (value.hasOwnProperty('resourceId')) {
                document.getElementById('debug-message').innerHTML += '<br/>' + 'Transfer ==>  setTextureModule ==> resourceId : ' + value.resourceId;
                this.cursor.textures.resourceId = value.resourceId;
            }
            /* end of if */
        }
    };

    /**
     * 设置视频模块参数
     * @param key
     * @param rawData
     */
    this.setVideoModule = function (key, rawData) {
        var backUrl = '',
            value;

        if (this.cursor.video && key === this.cursor.fileName) {
            value = jsonUtils.parse(rawData);
            console.dir(value);
            if (value.hasOwnProperty('resourceId')) {
                this.cursor.video.resourceId = value.resourceId;
                document.getElementById('debug-message').innerHTML += '<br/> ' + 'resourceId: ' + this.cursor.video.resourceId;
            }
            if (value.hasOwnProperty('assertId')) {
                this.cursor.video.assertId = value.assertId;
                document.getElementById('debug-message').innerHTML += '<br/> ' + 'assertId: ' + this.cursor.video.assertId;
            }
            if (value.hasOwnProperty('backURL')) {
                backUrl = decodeURIComponent(value.backURL);
                if (value.hasOwnProperty('fileName')
                    && value.hasOwnProperty('focusArea')
                    && value.hasOwnProperty('focusPos')) {
                    backUrl += '?' + value.fileName + '=' + encodeURIComponent('{focusArea:' + value.focusArea + ',focusPos:' + value.focusPos + '}');
                }
                //  针对 更多内容 页面
                else if (value.hasOwnProperty('fileName')
                    && value.hasOwnProperty('focusArea')
                    && value.hasOwnProperty('focusPosX')
                    && value.hasOwnProperty('focusPosY')
                    && value.hasOwnProperty('resourceId')
                    && value.hasOwnProperty('morePageBackURL')
                    && value.hasOwnProperty('pageIndex')) {
                    backUrl += '?' + value.fileName + '='
                        + encodeURIComponent('{focusArea:' + value.focusArea + ',focusPosX:' + value.focusPosX + ',focusPosY:' + value.focusPosY
                            + ',resourceId:' + value.resourceId + ',backURL:\'' + value.morePageBackURL + '\',pageIndex:' + value.pageIndex + '}');
                }
                else if (value.hasOwnProperty('fileName')
                    && value.hasOwnProperty('focusArea')
                    && value.hasOwnProperty('focusPosX')
                    && value.hasOwnProperty('focusPosY')) {
                    backUrl += '?' + value.fileName + '=' + encodeURIComponent('{focusArea:' + value.focusArea + ',focusPosX:' + value.focusPosX + ',focusPosY:' + value.focusPosY + '}');
                }
                this.cursor.video.backURL = encodeURIComponent(backUrl);
                document.getElementById('debug-message').innerHTML += '<br/> ' + 'backURL: ' + decodeURIComponent(this.cursor.video.backURL);
            }
        }
    };

    /**
     * 设置视频监控模块
     * @param key
     * @param rawData
     */
    this.setMonitorModule = function (key, rawData) {
        var backUrl = '',
            value;

        if (this.monitor) {
            value = jsonUtils.parse(rawData);
            console.dir(value);
            if (value.hasOwnProperty('assetid')) {
                this.monitor.assetid = value.assetid;
                //document.getElementById('debug-message').innerHTML += '<br/> ' + 'assetid: ' + this.monitor.assetid;
            }
            if (value.hasOwnProperty('backURL')) {
                backUrl = decodeURIComponent(value.backURL);
                if (value.hasOwnProperty('fileName')
                    && value.hasOwnProperty('focusArea')
                    && value.hasOwnProperty('focusPos')) {
                    backUrl += '?' + value.fileName + '=' + encodeURIComponent('{focusArea:' + value.focusArea + ',focusPos:' + value.focusPos + '}');
                }
                this.monitor.backURL = encodeURIComponent(backUrl);
                //document.getElementById('debug-message').innerHTML += '<br/> ' + 'backURL: ' + decodeURIComponent(this.monitor.backURL);
            }
        }
    };

    /**
     * 设置更多页面模块
     * @param key
     * @param rawData
     */
    this.setMoreModule = function (key, rawData) {
        var value;

        if (this.cursor.more && key === this.cursor.fileName) {
            value = jsonUtils.parse(rawData);
            console.dir(value);
            // 页面列表项的资源请求id
            if (value.hasOwnProperty('resourceId')) {
                this.cursor.more.resourceId = value.resourceId;
            }
            // 更多页面元素的资源类型： 图文 或者 视频监控
            // if (value.hasOwnProperty('resourceType')) {
            //     this.cursor.more.resourceType = value.resourceType;
            // }
            // 返回地址
            if (value.hasOwnProperty('backURL')) {
                this.cursor.more.backURL = value.backURL;
            }
            // 页面标题元素
            if (value.hasOwnProperty('logoImageSrc')) {
                this.cursor.more.logoImageSrc = value.logoImageSrc;
            }
            // 当前分页索引
            if (value.hasOwnProperty('pageIndex')) {
                this.cursor.more.pageIndex = parseInt(value.pageIndex);
            }
        }
    };

    /**
     * 设置侧边栏模块
     * @param key
     * @param rawData
     */
    this.setSidebarModule = function (key, rawData) {
        var value;

        if (this.cursor.sidebar && key === this.cursor.fileName) {
            value = jsonUtils.parse(rawData);
            console.dir(value);
            // 位置
            if (value.hasOwnProperty('focusPos')) {
                this.cursor.sidebar.focusPos = parseInt(value.focusPos);
            }
            // 侧边栏的文字图片数组
            if (value.hasOwnProperty('sidebarTextImages')) {
                this.cursor.sidebar.sidebarTextImages = value.sidebarTextImages;
            }
            // 侧边栏的文字图片的资源请求id数组
            if (value.hasOwnProperty('sidebarResourceIds')) {
                this.cursor.sidebar.sidebarResourceIds = value.sidebarResourceIds;
            }
        }
    };

    /**
     * 打包URL参数
     * @param data
     * @returns {string}
     */
    this.package = function (data) {
        var
            index,
            key,
            params = '?';

        //document.getElementById('debug-message').innerHTML += '<br/>' + '====>     package ';
        index = 0;
        for (var i = 0, length = this.record.length; i < length; i++) {
            for (key in this.record[i]) {
                //document.getElementById('debug-message').innerHTML += '<br/>' + 'KEY: ' + key + ' VALUE: ' + this.record[i][key];
                if (index++ > 0) {
                    params += '&' + key + '=' + encodeURIComponent(this.record[i][key]);
                } else {
                    params += key + '=' + encodeURIComponent(this.record[i][key]);
                }
            }
        }

        for (key in data) {
            //document.getElementById('debug-message').innerHTML += '<br/>' + 'KEY: ' + key + ' VALUE: ' + jsonUtils.stringify(data[key]);
            if (index++ > 0) {
                params += '&' + key + '=' + encodeURIComponent(jsonUtils.stringify(data[key]));
            } else {
                params += key + '=' + encodeURIComponent(jsonUtils.stringify(data[key]));
            }
        }

        return params;
    };

    /**
     * 返回地址
     * @returns {string}
     */
    this.backUrl = function () {
        return encodeURIComponent(window.location.protocol + '//' + window.location.host + window.location.pathname);
        //return encodeURIComponent(window.location.href);
    };

    /**
     * 清空记录
     */
    this.empty = function () {
        this.record = [];
    };

    /**
     * 移除指定记录
     * @param key
     */
    this.remove = function (key) {
        var i,
            length,
            item;

        for (i = 0, length = this.record.length; i < length; i++) {
            for (item in this.record[i]) {
                if (item === key) {
                    this.record.splice(i, 1);
                }
            }
        }
    };

    /**
     * 显示 DEBUG　面板
     */
    this.toggle = function () {
        if (document.getElementById('debug-message').style.display === 'block') {
            document.getElementById('debug-message').style.display = 'none';
        } else {
            document.getElementById('debug-message').style.display = 'block';
        }
    };

    /**
     * 十秒后自动跳转回首页
     */
    this.autoJumping = function () {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(function () {
            window.location.href = 'http://10.215.0.10:80/ui3/ui3/loading.htm?opk=4';
        }, 10000);
    };
}