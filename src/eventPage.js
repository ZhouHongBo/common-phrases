// 上下文菜单的id和title设为一样的值，需注意title不能重复
let menuItem = {
    "id": "常用短语",
    "title": "常用短语",
    "contexts": ["editable"]
};

chrome.storage.onChanged.addListener(function (changes, areaName){
    let list = changes.list.newValue; // 常用短语列表

    // 生成上下文菜单参数
    let items = [];
    for (let val of list) {
        let m = {
            "parentId": "常用短语",
            "contexts": ["editable"]
        };
        m["id"] = val;
        m["title"] = val;
        items.push(m);
    }

    // 创建上下文菜单
    chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create(menuItem);
        for (let val of items) {
            chrome.contextMenus.create(val);
        }
    });
})

// 用户点击上下文菜单中的常用词后，向当前页面发送消息，内容为用户选中的常用词
chrome.contextMenus.onClicked.addListener(function (info) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {selected: info.menuItemId});
    })
});