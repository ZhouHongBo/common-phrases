$(function(){
    // 鼠标悬停在常用短语时出现“删除”
    $("li").hover(function(){
        $(this).find(".destroy").css("display", "inline");
    }, function(){
        $(this).find(".destroy").css("display", "none");
    });
});

chrome.storage.sync.get(["list"], function(result){
    let data = result.list ? result.list : []; // 常用短语列表
    var app = new Vue({
        el: ".app",
        data: {
            list: data, // 所有常用短语
            inputValue: "", // 输入框中的常用短语
        },
        methods: {
            add: function () {
                if (this.list.includes(this.inputValue)) {
                    this.inputValue = "请勿输入重复值！";
                } else if (this.inputValue) {
                    this.list.push(this.inputValue);
                    this.inputValue = "";
                    chrome.storage.sync.set({"list": this.list});
                }
            },
            del: function (idx) {
                this.list.splice(idx, 1);
                chrome.storage.sync.set({"list": this.list});
            },
            clear: function () {
                this.list = [];
                chrome.storage.sync.set({"list": this.list});
            }
        },
        watch: {
            list() {
                // 为新增加的常用短语添加鼠标悬停事件
                $("li").hover(function(){
                    $(this).find(".destroy").css("display", "inline");
                }, function(){
                    $(this).find(".destroy").css("display", "none");
                });
            }
        }
    });
});

