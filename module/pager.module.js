/**
 * ----------------------------------------- 分页器 ---------------------------------------
 */

function PagerModule() {
    var that = this;

    this.offset_height = 0;
    this.scroll_height = 0;
    this.cur_page = 0;
    this.total_pages = 0;
    this.top = 0;

    this.setParameters = function () {
        this.offset_height = document.getElementById("textures-trapper").offsetHeight;
        this.scroll_height = document.getElementById("textures-text").scrollHeight;
        // document.getElementById("debug-message").innerHTML += "<br/>" + "offsetHeight: " + this.offset_height + " scrollHeight: " + this.scroll_height;
        this.total_pages = Math.ceil(this.scroll_height / this.offset_height);
        this.cur_page = 1;
        document.getElementById("textures-pager").innerHTML = this.cur_page + "/" + this.total_pages;
    };

    this.turn = function (element, show, direction) {
        // console.info("turn ==>  " + direction);
        // console.info("Current: " + that.cur_page + " Total: " + that.total_pages);
        // console.info("Before: Top - " + that.top);
        // console.info("offsetHeight: " + that.offset_height + " Total: " + that.scroll_height);
        if (direction > 0 && that.cur_page < that.total_pages) {
            that.top -= that.offset_height;
            element.style.top = that.top + "px";
            that.cur_page++;
            // console.info("After: Top - " + that.top);
            // console.info("Go to: " + that.cur_page);
            show.innerHTML = that.cur_page + "/" + that.total_pages;
        }
        else if (direction < 0 && that.cur_page > 1) {
            that.top += that.offset_height;
            element.style.top = that.top + "px";
            that.cur_page--;
            // console.info("After: Top - " + that.top);
            // console.info("Go to: " + that.cur_page);
            show.innerHTML = that.cur_page + "/" + that.total_pages;
        }
    };
}