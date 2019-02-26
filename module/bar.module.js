/**
 *   前置文件：
 *      /cms/cms.config.js
 * @constructor
 */
function BarModule() {
    // 属性
    this.focusPos = 0;
    this.barItemLeft = 0;
    this.barItemPadding = 154;
    this.barItemArray = [];

    // 方法
    this.init = function () {
        var
            i,
            length,
            left,
            barItemWrapper,
            barItem,
            bar = document.getElementById('bar');


        for (i = 0, left = 0, length = this.barItemArray.length; i < length; i++) {
            barItemWrapper = document.createElement('div');
            barItemWrapper.id = 'bar-item-wrapper-' + i;
            barItemWrapper.className = 'bar-item-wrapper';
            barItemWrapper.style.top = this.barItemArray[i].top + 'px';
            barItemWrapper.style.height = this.barItemArray[i].height + 'px';
            // left += this.barItemArray[i].width;

            barItem = document.createElement('div');
            barItem.id = 'bar-item-' + i;
            barItem.className = 'bar-item';
            barItem.innerHTML = this.barItemArray[i].title;

            barItemWrapper.appendChild(barItem);
            bar.appendChild(barItemWrapper);
        }

    };

    this.focusOn = function () {
        document.getElementById('bar-item-wrapper-' + this.focusPos).style.backgroundColor = '#CA6167';
        document.getElementById('bar-item-' + this.focusPos).style.color = '#FFF';
    };

    this.focusOut = function () {
        document.getElementById('bar-item-wrapper-' + this.focusPos).style.backgroundColor = '#DCDCDC';
        document.getElementById('bar-item-' + this.focusPos).style.color = '#000';
    };

    this.moveX = function () {
        return -1;
    };

    this.moveY = function (direction, manual) {
        this.focusPos += direction;
        if (this.focusPos >= 0 && this.focusPos < this.barItemArray.length) {

        } else if (this.focusPos < 0) {
            this.focusPos = this.barItemArray.length - 1;
        } else {
            this.focusPos = 0;
        }
        if (manual) {

        } else {
            window.location.href = this.barItemArray[this.focusPos].url;
        }
    };

    this.doSelect = function (postfix) {
        window.location.href = this.barItemArray[this.focusPos].url;
    };
}