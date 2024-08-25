"use strict";
const news = document.querySelectorAll(".header-news");
let newsCount = 0, interval = null;

function changeInterval() {
    clearInterval(interval), interval = setInterval((() => {
        news.length - 1 > newsCount ? newsCount++ : newsCount = 0, changeFeature(news, newsCount)
    }), 7e3)
}

function changeFeature(banners2, index) {
    banners2.forEach((banner => {
        banner.style.opacity = 0, banner.style.pointerEvents = "none", banner.classList.remove("active")
    })), banners2[index].style.opacity = 1, banners2[index].style.pointerEvents = "auto", banners2[index].classList.add("active")
}

news.length > 0 && (changeFeature(news, 0), document.querySelector(".buttons .prev").addEventListener("click", (() => {
    if (0 === newsCount) return newsCount = news.length - 1, changeFeature(news, newsCount);
    newsCount -= 1, changeFeature(news, newsCount), changeInterval()
})), document.querySelector(".buttons .next").addEventListener("click", (() => {
    if (newsCount === news.length - 1) return newsCount = 0, changeFeature(news, newsCount);
    newsCount += 1, changeFeature(news, newsCount), changeInterval()
})), changeInterval());
const banners = document.querySelectorAll(".header-sale"),
    controlsElems = document.querySelectorAll(".header-sale-controls .header-sale-controls-items div");
banners.forEach((banner => {
    (banner.dataset.timerstart || banner.dataset.timerend) && window.countDown(banner.dataset.timerstart, banner.dataset.timerend, banner.dataset.currenttime, banner.querySelector(".header-sale-content-time"))
}));
let bInterval, bannerCounter = 0;
if (banners.length > 0) {
    let bannerInterval = function () {
        clearInterval(bInterval), bInterval = setInterval((() => {
            banners.length - 1 > bannerCounter ? bannerCounter++ : (bannerCounter = 0, controlsElems.forEach((elem => {
                elem.classList.remove("active")
            }))), changeBanner(banners, bannerCounter)
        }), 7e3)
    }, changeBanner = function (banners2, index) {
        banners2.forEach((banner => {
            banner.style.opacity = 0, banner.style.pointerEvents = "none"
        })), controlsElems.forEach(((elem, i) => {
            if (i < index) return elem.classList.add("filled");
            elem.classList.remove("filled"), elem.classList.remove("active")
        })), banners2[index].style.opacity = 1, banners2[index].style.pointerEvents = "auto", setTimeout((() => controlsElems[index].classList.add("active")), 10)
    };
    document.body.classList.add("header-banner-active"), banners.length > 1 && (changeBanner(banners, 0), document.querySelector(".header-sale-controls-prev").addEventListener("click", (() => {
        if (0 === bannerCounter) return bannerCounter = banners.length - 1, controlsElems[bannerCounter].classList.remove("active"), changeBanner(banners, bannerCounter);
        bannerCounter -= 1, controlsElems[bannerCounter].classList.remove("active"), changeBanner(banners, bannerCounter), bannerInterval()
    })), document.querySelector(".header-sale-controls-next").addEventListener("click", (() => {
        if (bannerCounter === banners.length - 1) return bannerCounter = 0, controlsElems[bannerCounter].classList.remove("active"), changeBanner(banners, bannerCounter);
        bannerCounter += 1, controlsElems[bannerCounter].classList.remove("active"), changeBanner(banners, bannerCounter), bannerInterval()
    })), bannerInterval())
}
document.addEventListener("scroll", (function hideBanners() {
    var _a;
    if (window.scrollY < 100) return;
    document.body.classList.remove("header-banner-active"), null == (_a = document.querySelector(".banners")) || _a.classList.remove("active"), document.removeEventListener("scroll", hideBanners)
}));
document.querySelectorAll(".header-sale-close").forEach((button => {
    button.addEventListener("click", (() => {
        document.querySelector(".banners").classList.remove("active")
    }))
}));