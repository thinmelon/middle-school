/* -------------------------------------------------------------------------------------------- */
/* -----------------------------------------   图文列表助手   --------------------------------- */
/* -------------------------------------------------------------------------------------------- */

function ListModule() {
    var that = this;

    // 属性
    this.focusPos = 0;
    this.listItemNum = 0;
    this.listItemTitleArray = [];

    this.boardLeft = 880;
    this.boardTop = 134;
    this.boardWidth = 380;
    this.boardHeight = 300;

    this.itemLeft = 888;
    this.itemTop = 182;
    this.itemWidth = 365;
    this.itemHeight = 42;

    this.itemMoreLeft = 1088;
    this.itemMoreTop = 390;
    this.itemMoreWidth = 158;
    this.itemMoreHeight = 42;

    this.listItemTop = 20;
    this.interval = 39;
    this.marqueeCount = 9;

    this.noticesBoardBarWidth = 380;
    this.noticesBoardBarHeight = 40;
    this.noticesBoardBarBgSrc = 'url(../images/list/list-item-bar.png) no-repeat';
    this.noticesBoardBarText = '';
    this.noticesBoardBarColor = '#FFF';
    this.noticesBoardBarFontSize = '19pt';

    this.noticesBoardContentTop = 24;
    this.noticesBoardContentLeft = 0;

    this.resourceId = '';

    this.init = function (callback) {
        var that = this,
            noticesBoard,
            noticesBoardBar,
            noticesBoardContent;

        noticesBoard = document.getElementById('notices_board');
        noticesBoard.style.left = this.boardLeft + 'px';
        noticesBoard.style.top = this.boardTop + 'px';
        noticesBoard.style.width = this.boardWidth + 'px';
        noticesBoard.style.height = this.boardHeight + 'px';

        noticesBoardBar = document.getElementById('notices_board_bar');
        noticesBoardBar.style.background = this.noticesBoardBarBgSrc;
        noticesBoardBar.style.width = this.noticesBoardBarWidth + 'px';
        noticesBoardBar.style.height = this.noticesBoardBarHeight + 'px';
        noticesBoardBar.style.fontSize = this.noticesBoardBarFontSize;
        noticesBoardBar.style.color = this.noticesBoardBarColor;
        noticesBoardBar.style.textAlign = 'center';
        noticesBoardBar.innerHTML = this.noticesBoardBarText;

        noticesBoardContent = document.getElementById('notices_board_content');
        noticesBoardContent.style.left = this.noticesBoardContentLeft + 'px';
        noticesBoardContent.style.top = this.noticesBoardContentTop + 'px';

        if (cmsConfig.environment === 'DEBUG') {
            var test = [
                {assetid: 611, title: '城厢区是福建省莆田市辖区，亦称...', img: '', flag: 1, id: 111},
                {assetid: 611, title: '仙游县地处福建东南沿海中部，湄...', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '荔城区位于福建东南沿海中部，北...', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '城厢区是福建省莆田市辖区，亦称...', img: '1', flag: 1, id: 111},
                {assetid: 611, title: '涵江区位于福建省莆田市东部沿海...', flag: 0, id: 111},
                {assetid: 611, title: '秀屿区位于福建东南沿海中部，与...', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111},
                {assetid: 611, title: '湄洲湾北岸经济开发区是经国家发... 副本 2', img: '1', flag: 0, id: 111}

            ];
            this.addListItem(test);
            callback();
        } else {
            if (this.resourceId !== '') {
                cmsApi.getListItems(this.resourceId, this.listItemNum + 1, 1, function (response) {
                    if (response.hasOwnProperty('code')) {
                        if ('1' === response.code || 1 === response.code) {
                            that.addListItem(response.dataArray);
                        }
                    }
                    callback();
                });
            }
        }
    };

    this.removeAllListItem = function () {
        var boardElement = document.getElementById('notices_board_content');

        while (this.listItemTitleArray.length > 0) {
            this.listItemTitleArray.pop();
        }

        while (boardElement.hasChildNodes()) {
            boardElement.removeChild(boardElement.firstChild);
        }
    };

    this.addListItem = function (array) {
        var j,
            length,
            newListItem,
            newListItemText,
            boardElement = document.getElementById('notices_board_content');

        this.removeAllListItem();

        for (j = 0, length = array.length; (j < length) && (j < this.listItemNum); j++) {
            // newListItem = document.createElement('div');
            // newListItem.className = 'list_item';
            // newListItem.style.width = (this.itemWidth - 5) + 'px';
            // newListItem.style.top = this.listItemTop + (j * this.interval) + 'px';
            newListItemText = document.createElement('div');
            newListItemText.id = 'list_item_text_' + j;
            newListItemText.className = 'list_item_text';
            newListItemText.innerHTML = array[j].title;
            newListItemText.style.color = '#000000';
            newListItemText.style.width = (this.itemWidth - 1) + 'px';
            newListItemText.style.top = this.listItemTop + (j * this.interval) + 'px';
            // newListItem.appendChild(newListItemText);
            boardElement.appendChild(newListItemText);

            this.listItemTitleArray.push({
                assetID: array[j].assetid,
                title: array[j].title,
                img: array[j].img,
                flag: parseInt(array[j].flag),
                id: array[j].id,
                left: this.itemLeft,
                top: this.itemTop + (j * this.interval),
                width: this.itemWidth,
                height: this.itemHeight
            });
        }

        if (array.length > this.listItemNum) {
            this.listItemTitleArray.push({
                assetID: 0,
                title: '',
                img: '',
                flag: -1,
                id: 0,
                left: this.itemMoreLeft,
                top: this.itemMoreTop,
                width: this.itemMoreWidth,
                height: this.itemMoreHeight
            });
        }
    };

    this.focusOn = function (cursor) {

        if (this.listItemTitleArray.length > 0 &&
            this.focusPos < this.listItemTitleArray.length) {
            cursor.style.visibility = 'visible';
            cursor.style.left = this.listItemTitleArray[this.focusPos].left + 'px';
            cursor.style.top = this.listItemTitleArray[this.focusPos].top + 'px';
            cursor.style.width = this.listItemTitleArray[this.focusPos].width + 'px';
            cursor.style.height = this.listItemTitleArray[this.focusPos].height + 'px';

            var _focusListItem = document.getElementById('list_item_text_' + this.focusPos);
            if ((typeof(_focusListItem) !== 'undefined') && (this.listItemTitleArray[this.focusPos].flag !== -1)) {
                showTitleForMarquee(this.listItemTitleArray[this.focusPos].title, _focusListItem, this.marqueeCount);
            }
        }
    };

    this.focusOut = function (cursor) {
        var _focusListItem = document.getElementById('list_item_text_' + this.focusPos);

        cursor.style.visibility = 'hidden';
        if ((typeof (_focusListItem) !== 'undefined') && (that.listItemTitleArray[that.focusPos].flag !== -1)) {
            _focusListItem.innerHTML = that.listItemTitleArray[that.focusPos].title;
        }
    };

    this.moveX = function (_direction) {
        return -1;
    };

    this.moveY = function (_direction) {
        this.focusPos += _direction;
        if (this.focusPos >= 0 && this.focusPos < this.listItemTitleArray.length) {
            return 0;
        } else if (this.focusPos < 0) {
            this.focusPos = 0;
            return -1;
        } else {
            this.focusPos = this.listItemTitleArray.length - 1;
            return -1;
        }
    };

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
        if (this.listItemTitleArray[this.focusPos].flag === 0) {
            params.PG_TEXT = {
                resourceId: this.listItemTitleArray[this.focusPos].id,
                backURL: backURL
            };
            postfix = transferComponent.package(params);
            window.location.href = 'detail.html' + postfix;
        }
        else if (this.listItemTitleArray[this.focusPos].flag === 1) {
            params.VIDEO = {
                backURL: transferComponent.backUrl(),
                fileName: transferComponent.cursor.fileName,
                focusArea: focusArea,
                focusPos: focusPos,
                assertId: this.listItemTitleArray[this.focusPos].assetID
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
}