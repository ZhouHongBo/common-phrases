// 上下文菜单的id和title设为一样的值，需注意title不能重复
let menuItem = {
    "id": "common_phrases",
    "title": "常用短语",
    "contexts": ["editable"]
};

chrome.storage.onChanged.addListener(function (changes, areaName){
    let list = changes.list.newValue;
    let items = [];
    for (let val of list) {
        let m = {
            "parentId": "common_phrases",
            "contexts": ["editable"]
        };
        m["id"] = val;
        m["title"] = val;
        items.push(m);
    }

    chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create(menuItem);
        for (let val of items) {
            chrome.contextMenus.create(val);
        }
    });
})

chrome.contextMenus.onClicked.addListener(function (info) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {selected: info.menuItemId});
    })
});