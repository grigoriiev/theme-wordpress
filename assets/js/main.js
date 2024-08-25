"use strict";
const burgerMenu = document.querySelector(".burger-menu"), burgerButton = document.querySelector(".burger-menu-icon"),
    burgerClose = document.querySelector(".close-burger");
burgerButton.addEventListener("click", (() => {
    burgerMenu.classList.add("active")
})), burgerClose.addEventListener("click", (() => {
    burgerMenu.classList.remove("active")
}));
document.querySelectorAll(".lang-container").forEach((container => {
    container.querySelector(".current").addEventListener("click", (() => function toggleLocales(el) {
        el.classList.toggle("active")
    }(container)))
}));
document.querySelectorAll(".popup").forEach((popup => {
    popup.querySelectorAll(".close-popup").forEach((button => button.addEventListener("click", (() => function closePopup(popup) {
        popup.classList.remove("active")
    }(popup)))))
}));
const cookieElement = document.querySelector(".cookies");
cookieElement && "true" == Cookies.get("cookie_TO") && cookieElement.remove();
const cookieButton = document.getElementById("cookie-stop");
cookieButton && cookieButton.addEventListener("click", (() => {
    Cookies.set("cookie_TO", !0, {expires: 30, path: "/"}), cookieElement.remove()
}));
const searchButton = document.querySelector(".open-search"),
    searchPopup = document.querySelector(".popup.search-popup");
searchPopup && searchButton.addEventListener("click", (e => {
    e.preventDefault(), searchPopup.classList.add("active")
}));
const videoButtons = document.querySelectorAll(".open-video"), videoPopup = document.querySelector(".popup.video"),
    videoFrame = videoPopup ? videoPopup.querySelector("iframe") : void 0,
    baseVideoUrl = "https://www.youtube-nocookie.com/embed/",
    observer = new MutationObserver(((mutationList, observer2) => {
        for (const mutation of mutationList) "attributes" === mutation.type && "class" === mutation.attributeName && !videoPopup.classList.contains("active") && videoFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
    }));

function showVideo(e, video) {
    e.preventDefault(), videoPopup.classList.add("active"), videoFrame.getAttribute("src") != `${baseVideoUrl}${video}?enablejsapi=1` && videoFrame.setAttribute("src", `${baseVideoUrl}${video}?enablejsapi=1`)
}

videoPopup && observer.observe(videoPopup, {
    attributes: !0,
    childList: !1,
    subtree: !1
}), videoButtons && videoButtons.forEach((button => {
    button.setAttribute("listener", "true"), button.addEventListener("click", (e => showVideo(e, button.dataset.video))), button.addEventListener("mouseover", (() => {
        videoFrame.getAttribute("src") != `${baseVideoUrl}${button.dataset.video}?enablejsapi=1` && videoFrame.setAttribute("src", `${baseVideoUrl}${button.dataset.video}?enablejsapi=1`)
    }))
})), window.showVideo = showVideo;

function imageLoader(el) {
    const loader = el.querySelector(".loader"), img = el.querySelector("img");
    if (!loader.classList.contains("fade-out")) return img.complete ? loader.classList.add("fade-out") : void img.addEventListener("load", (() => {
        loader.classList.add("fade-out")
    }))
}

document.querySelectorAll(".image-loader").forEach(imageLoader), window.imageLoader = imageLoader;
let OSName = !1;
-1 != navigator.appVersion.indexOf("Win") && (OSName = "Win"), -1 != navigator.appVersion.indexOf("Mac") && (OSName = "Mac");
const downloadUrls = {
    Win: "https://tankionline.com/desktop/TankiOnlineSetup.exe",
    Mac: "https://tankionline.com/desktop/TankiOnlineSetup.dmg"
}, downloadButton = document.querySelector(".download-button");
downloadButton && OSName && downloadButton.setAttribute("href", downloadUrls[OSName]);
document.querySelectorAll(".play-button").forEach((button => {
    button.addEventListener("click", (() => {
        "undefined" != typeof ym && ym(10288858, "reachGoal", "playButtonPressed"), "undefined" != typeof gtag && gtag("event", "play_button_click")
    }))
})), downloadButton && downloadButton.addEventListener("click", (e => {
    e.preventDefault(), sendDownloadCallback(downloadButton.getAttribute("href")), "undefined" != typeof ym && ym(10288858, "reachGoal", "downloadButtonPressed")
}));
const gplayMainButton = document.querySelector(".google-play-link");
gplayMainButton && gplayMainButton.addEventListener("click", (() => {
    "undefined" != typeof ym && ym(10288858, "reachGoal", "googlePlayButtonPressed")
}));

async function sendDownloadCallback(redirectURL) {
    const search = new URLSearchParams(window.location.search);
    if ("" == search.toString()) return window.location.href = redirectURL;
    const userIp = await async function getUserIp() {
        return fetch("https://api.ipify.org/?format=json", {method: "GET"}).then((response => response.json())).then((json => json)).catch((error => {
            console.log(error)
        }))
    }(), formdata = new FormData;
    formdata.append("action", "download_callback"), formdata.append("ip", userIp.ip);
    for (let value of search.keys()) formdata.append(`params[${value}]`, search.get(value));
    await fetch(ajaxurl, {method: "POST", body: formdata}), window.location.href = redirectURL
}

document.querySelectorAll('footer a[href="https://tankionline.com/desktop/TankiOnlineSetup.exe"]').forEach((button => {
    button.addEventListener("click", (e => {
        e.preventDefault(), sendDownloadCallback(button.getAttribute("href")), "undefined" != typeof ym && ym(10288858, "reachGoal", "downloadButtonPressed")
    }))
}));

















