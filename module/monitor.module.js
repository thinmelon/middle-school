/* -------------------------------------------------------------------------------------------- */
/* -----------------------------------------   视频监控模块   ----------------------------------- */
/* -------------------------------------------------------------------------------------------- */

function MonitorModule() {
    // 属性
    this.assetid = "";


    // 方法
    this.init = function () {
        document.getElementById("debug-message").innerHTML += "<br/> " + "init ==> assetid: " + this.assetid;
        VOD.changeServer('isma_v2', 'ip_ts');
        //media.video.setPosition(x,y,width,height);
        media.video.fullScreen();
        /*
         x：整型，表示视频左上角的横坐标，即离屏幕左上角x方向的距离；
         y：整型，表示视频左上角的纵坐标，即离屏幕左上角y方向的距离；
         width：整型，表示视频的宽度；
         height：整型，表示视频的高度。
         */
        media.AV.open(this.assetid, "VOD");//rtsp组播视频
    };

    this.initializeMonitor = function () {
        VOD.changeServer('isma_v2', 'ip_ts');
        media.video.fullScreen();
        /**
         *   x：整型，表示视频左上角的横坐标，即离屏幕左上角x方向的距离；
         *   y：整型，表示视频左上角的纵坐标，即离屏幕左上角y方向的距离；
         *   width：整型，表示视频的宽度；
         *   height：整型，表示视频的高度。
         */
        //media.video.setPosition(x,y,width,height);
    };

    this.playMonitor = function () {
        /**
         * rtsp组播视频
         */
        media.AV.open(this.assetid, "VOD");
    };

    this.doSelect = function () {

    };

    this.close = function () {
        // media.AV.stop();
        // media.AV.close();
        // VOD.changeServer("cisco_dmx", "dvb");
    }
}