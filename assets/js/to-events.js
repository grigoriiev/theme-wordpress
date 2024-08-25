
let searchParams = new URLSearchParams(window.location.search);

function sendPostMessage(e) {
    e.preventDefault(), window.parent.postMessage(searchParams.get("button_action"), "*")
}

function linkRedirect(e) {
    e.preventDefault(), window.location.href = searchParams.get("button_url")
}

(searchParams.get("button_action") || searchParams.get("is_android") || searchParams.get("button_url")) && function watchGameLinks() {
    const links = document.querySelectorAll('a[data-link-iframe="iframe-message-link"]');
    return searchParams.get("is_android") ? links.forEach((link => {
        link.style.display = "none"
    })) : searchParams.get("button_url") ? links.forEach((link => {
        link.addEventListener("click", linkRedirect)
    })) : void links.forEach((link => {
        link.addEventListener("click", sendPostMessage)
    }))
}();