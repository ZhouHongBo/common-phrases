$(function () {
    // 鼠标悬停在常用短语时出现“删除”和“排序”
    $("li").hover(function () {
        $(this).find(".destroy").css("display", "inline");
        $(this).find(".sort").css("display", "block");
    }, function () {
        $(this).find(".destroy").css("display", "none");
        $(this).find(".sort").css("display", "none");
    });
    // textarea高度自适应
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    // 修改常用短语后按回车不换行，光标消失
    $("textarea").keydown(function(e){
        if (e.keyCode === 13) {
            $(this).blur();
        }
    });
});

chrome.storage.sync.get(["list"], function (result) {
    let data = result.list ? result.list : []; // 常用短语列表
    var app = new Vue({
        el: ".app",
        data: {
            list: data, // 所有常用短语
            inputValue: "", // 输入框中的常用短语
        },
        methods: {
            add: function () {
                if (this.inputValue) {
                    this.list.push(this.inputValue);
                    this.inputValue = "";
                }
            },
            del: function (idx) {
                this.list.splice(idx, 1);
            },
            clear: function () {
                this.list = [];
            },
            up: function (idx) {
                if (idx !== 0) {
                    let pre = this.list[idx-1];
                    let current = this.list[idx];
                    this.list.splice(idx-1, 2, current, pre);
                }
            },
            down: function (idx) {
                if (idx !== this.list.length-1) {
                    let post = this.list[idx+1];
                    let current = this.list[idx];
                    this.list.splice(idx, 2, post, current);
                }
            }
        },
        watch: {
            list() {
                // list一修改，就把它保存起来
                chrome.storage.sync.set({ "list": this.list });
                // 把开头的一段代码复制下来
                $("li").hover(function () {
                    $(this).find(".destroy").css("display", "inline");
                    $(this).find(".sort").css("display", "block");
                }, function () {
                    $(this).find(".destroy").css("display", "none");
                    $(this).find(".sort").css("display", "none");
                });
                $('textarea').each(function () {
                    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
                }).on('input', function () {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
                $("textarea").keydown(function(e){
                    if (e.keyCode === 13) {
                        $(this).blur();
                    }
                });
            }
        }
    });
});

