chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.selected) {
        let text = $("input:focus,textarea:focus").val() + message.selected;
        $("input:focus,textarea:focus").val(text);
    }
});