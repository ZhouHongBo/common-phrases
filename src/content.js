// event page 发送消息后，将消息内容添加到光标所在输入框的内容后面
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.selected) {
        let text = $("input:focus,textarea:focus").val() + message.selected;
        $("input:focus,textarea:focus").val(text);
    }
});