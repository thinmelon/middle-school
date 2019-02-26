function CursorModule() {
    // 属性
    this.fileName = '';
    /**
     *      menu    -   0
     *      post    -   1
     *      list    -   2
     *      button  -   3
     *      more    -   4
     *      bar     -   5
     *      swiper  -   6
     *      video   -   7
     */
    this.focusArea = 0;
    this.bar = null;            //  菜单栏
    this.menu = null;           //  功能入口
    this.swiper = null;         //  滚动图片
    this.post = null;           //  海报
    this.list = null;           //  列表
    this.button = null;         //  按键
    this.more = null;           //  列表页
    this.monitor = null;        //  视频监控
    this.video = null;          //  小窗口视频

    /**
     *  聚焦
     */
    this.focusOn = function () {
        var cursor = document.getElementById("cursor");
        switch (this.focusArea) {
            case 0:
                this.menu.focusOn(cursor);
                break;
            case 1:
                this.post.focusOn(cursor);
                break;
            case 2:
                this.list.focusOn(cursor);
                break;
            case 3:
                this.button.focusOn(cursor);
                break;
            case 4:
                this.more.focusOn(cursor);
                break;
            case 5:
                this.bar.focusOn();
                break;
            case 6:
                this.swiper.focusOn();
                break;
            case 7:
                this.video.focusOn(cursor);
                break;
            default:
                break;
        }
    };

    /**
     *  失焦
     */
    this.focusOut = function () {
        var cursor = document.getElementById("cursor");

        switch (this.focusArea) {
            case 0:
                this.menu.focusOut(cursor);
                break;
            case 1:
                this.post.focusOut(cursor);
                break;
            case 2:
                this.list.focusOut(cursor);
                break;
            case 3:
                this.button.focusOut(cursor);
                break;
            case 4:
                this.more.focusOut(cursor);
                break;
            case 5:
                this.bar.focusOut();
                break;
            case 6:
                this.swiper.focusOut();
                break;
            case 7:
                this.video.focusOut(cursor);
                break;
            default:
                break;
        }
    };
}
