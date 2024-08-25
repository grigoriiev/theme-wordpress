"use strict";
const yaInitScriptContent = '\n  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n  m[i].l=1*new Date();\n  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n  ym(10288858, "init", {\n      clickmap:false,\n      trackLinks:true,\n      accurateTrackBounce:true\n  });\n',
    gaInitScriptContent = "\n  window.dataLayer = window.dataLayer || [];\n  function gtag() {\n      dataLayer.push(arguments);\n  }\n  gtag('js', new Date());\n  gtag('config', 'AW-698646111');\n",
    fbInitScriptContent = "\n  ! function(f, b, e, v, n, t, s) {\n        if (f.fbq) return;\n        n = f.fbq = function() {\n            n.callMethod ?\n                n.callMethod.apply(n, arguments) : n.queue.push(arguments)\n        };\n        if (!f._fbq) f._fbq = n;\n        n.push = n;\n        n.loaded = !0;\n        n.version = '2.0';\n        n.queue = [];\n        t = b.createElement(e);\n        t.async = !0;\n        t.src = v;\n        s = b.getElementsByTagName(e)[0];\n        s.parentNode.insertBefore(t, s)\n  }(window, document, 'script',\n      'https://connect.facebook.net/en_US/fbevents.js');\n  fbq('init', '2121683231484566');\n  fbq('track', 'PageView');\n",
    navButtons = document.querySelectorAll(".cookies-int .heading .option"),
    pages = document.querySelectorAll(".cookies-int .text"),
    settingButton = document.querySelector(".cookies-int .buttons-block .settings"),
    moreInfoButton = document.querySelector(".more-info"),
    agreeButton = document.querySelector(".cookies-int .buttons-block .agree"),
    disagreeButton = document.querySelector(".cookies-int .buttons-block .disagree"),
    saveSettingsButton = document.querySelector(".cookies-int .save-settings"),
    toggleButtons = document.querySelectorAll(".toggle-button"),
    showDetailsButton = document.querySelectorAll(".cookies-int .details-settings"),
    messageElement = document.querySelector(".cookies-int");

function initAllCounters() {
    isCookieAccepted("metrika_enabled") && publishScript(yaInitScriptContent), isCookieAccepted("_fbp") && publishScript(fbInitScriptContent), isCookieAccepted("_ga") && (!function publishScriptGTM() {
        const scriptGTM = document.createElement("script");
        scriptGTM.src = "https://www.googletagmanager.com/gtag/js?id=AW-698646111", scriptGTM.className = "googleAnalytic", document.body.appendChild(scriptGTM)
    }(), publishScript(gaInitScriptContent))
}

function isCookieAccepted(cookieName) {
    const acceptedCookies = function getAcceptedCookies() {
        return JSON.parse(localStorage.getItem("acceptedCookies"))
    }();
    return acceptedCookies && acceptedCookies.includes(cookieName)
}

function saveAnswer() {
    messageElement.classList.add("cookie-notification_hidden_yes"), Cookies.set("agreement", "1", {expires: 7})
}

function declineCookies() {
    Cookies.set("agreement", "1", {expires: 7}), messageElement && messageElement.classList.add("cookie-notification_hidden_yes")
}

function saveAcceptedCookies(acceptedCookies) {
    localStorage.setItem("acceptedCookies", JSON.stringify(acceptedCookies))
}

function handleSettingsAndMoreInfoClick() {
    changeVisibility(navButtons), changeVisibility(pages), addVisibility(navButtons[1])
}

function changeVisibility(array) {
    array.forEach((el => {
        el.classList.remove("chosen")
    }))
}

function addVisibility(el) {
    el.classList.add("chosen");
    document.querySelector(`.cookies-int .text.${el.id}`).classList.add("chosen")
}

function publishScript(scriptContent) {
    const script = document.createElement("script");
    script.textContent = scriptContent, document.body.appendChild(script)
}

initAllCounters(), Cookies.get("agreement") || messageElement.classList.remove("cookie-notification_hidden_yes"), agreeButton.addEventListener("click", (function handleAgreeButtonClick() {
    saveAcceptedCookies(function getCookiesNames() {
        const subToggles = document.querySelectorAll(".sub-toggle");
        return Array.from(subToggles).map((el => el.id))
    }()), initAllCounters(), saveAnswer()
})), disagreeButton.addEventListener("click", declineCookies), saveSettingsButton.addEventListener("click", (function handleSaveSettingsButtonClick() {
    const subToggles = document.querySelectorAll(".toggle-button.sub-toggle"), acceptedCookies = [],
        notAcceptedCookies = [];
    subToggles.forEach((el => {
        Array.from(el.classList).includes("on") ? acceptedCookies.push(el.id) : notAcceptedCookies.push(el.id)
    })), acceptedCookies.length > 0 ? (saveAcceptedCookies(acceptedCookies), initAllCounters(), saveAnswer()) : declineCookies();
    0 === acceptedCookies.length && localStorage.setItem("acceptedCookies", "[]");
    notAcceptedCookies.forEach((el => {
        Cookies.get(`${el}`) || Cookies.remove(`${el}`)
    }))
})), settingButton.addEventListener("click", handleSettingsAndMoreInfoClick), moreInfoButton.addEventListener("click", handleSettingsAndMoreInfoClick), navButtons.forEach((cookiesOption => {
    cookiesOption.addEventListener("click", (() => {
        changeVisibility(navButtons), changeVisibility(pages), addVisibility(cookiesOption)
    }))
})), toggleButtons.forEach((toggleButton => {
    toggleButton.addEventListener("click", (function () {
        if (toggleButton.classList.toggle("on"), toggleButton.classList.contains("main-toggle-button")) {
            toggleButton.closest(".details-option").querySelector(".info-table").querySelectorAll(".toggle-button").forEach((subToggle => {
                subToggle.classList.toggle("on")
            }))
        } else {
            const subToggles = toggleButton.closest("tbody").querySelectorAll(".toggle-button");
            let allChoisesIsTrue = !0;
            subToggles.forEach((subToggle => {
                Array.from(subToggle.classList).includes("on") || (allChoisesIsTrue = !1)
            }));
            const parentToggle = toggleButton.closest(".details-option").querySelector(".main-toggle-button");
            allChoisesIsTrue ? parentToggle.classList.add("on") : parentToggle.classList.remove("on")
        }
    }))
})), showDetailsButton.forEach((detailEl => {
    detailEl.addEventListener("click", (() => {
        const table = detailEl.closest(".details-option").querySelector(".info-table");
        Array.from(table.classList).includes("visible") ? (detailEl.classList.remove("active"), table.classList.remove("visible")) : (detailEl.classList.add("active"), table.classList.add("visible"))
    }))
}));