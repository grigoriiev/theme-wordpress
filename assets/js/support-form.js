"use strict";
const supportButtons = document.querySelectorAll(".open-support-form"),
    supportPopup = document.querySelector(".support-form"), loginForm = supportPopup.querySelector("form.login-form"),
    inputs = loginForm.querySelectorAll("input[type]"), loginButton = supportPopup.querySelector("form .login-submit"),
    loginErrors = {
        login: supportPopup.querySelector("form.login-form .error.login"),
        empty: supportPopup.querySelector("form.login-form .error.empty-fields"),
        captcha: supportPopup.querySelector("form.login-form .error.captcha"),
        default: supportPopup.querySelector("form.login-form .error.default")
    };

function checkLoginState() {
    if ("" != inputs[0].value && "" != inputs[1].value && grecaptcha.getResponse()) return loginButton.removeAttribute("disabled");
    loginButton.setAttribute("disabled", "")
}

function renderError(message, errors) {
    switch (message) {
        case"login-error":
            errors.login.classList.add("active");
            break;
        case"captcha":
            errors.captcha.classList.add("active");
            break;
        case"empty-fields":
            errors.empty.classList.add("active");
            break;
        default:
            console.log("HEWA"), console.log(errors.default), errors.default.classList.add("active")
    }
}

supportButtons.forEach((button => {
    button.addEventListener("click", (e => {
        e.preventDefault(), supportPopup.classList.add("active")
    }))
})), inputs.forEach((input => {
    input.addEventListener("input", checkLoginState)
})), loginButton.addEventListener("click", (function login(e) {
    e.preventDefault(), loginButton.setAttribute("disabled", "");
    const formData = new FormData(loginForm);
    fetch(`${templateDirectory}/components/support/auth.php`, {
        method: "POST",
        body: formData
    }).then((response => response.json())).then((json => {
        grecaptcha.reset(), 403 == json.status && renderError(json.message, loginErrors), 200 == json.status && (loginForm.remove(), supportForm.classList.add("active"), inputsSupport[0].value = json.login)
    })).catch((error => {
        console.error(error), grecaptcha.reset()
    }))
}));
const supportForm = supportPopup.querySelector("form.support-form"),
    inputsSupport = supportForm.querySelectorAll("input[type], textarea"),
    supportButton = supportPopup.querySelector("form .support-submit"), supportErrors = {
        empty: supportPopup.querySelector("form.support-form .error.empty-fields"),
        captcha: supportPopup.querySelector("form.support-form .error.captcha"),
        default: supportPopup.querySelector("form.support-form .error.default")
    };

function checkSupportState() {
    if ("" != inputsSupport[0].value && "" != inputsSupport[1].value && grecaptcha.getResponse()) return supportButton.removeAttribute("disabled");
    supportButton.setAttribute("disabled", "")
}

inputsSupport.forEach((input => {
    input.addEventListener("input", checkSupportState)
})), supportButton.addEventListener("click", (function sendMessage(e) {
    e.preventDefault();
    const formData = new FormData;
    formData.append("action", "support_task"), formData.append("lang", lang), formData.append("nickname", inputsSupport[0].value), formData.append("comment", inputsSupport[1].value), formData.append("g-recaptcha-response", grecaptcha.getResponse(1)), fetch(`${siteUrl}/wp-admin/admin-ajax.php`, {
        method: "POST",
        body: formData
    }).then((response => response.json())).then((json => {
        403 == json.status && renderError(json.message, supportErrors), 200 == json.status && (supportForm.querySelector(".success").classList.add("active"), supportForm.reset(), setTimeout((() => {
            supportPopup.classList.remove("active")
        }), 2e3))
    })).catch((error => {
        console.log(error)
    }))
})), window.checkLoginState = checkLoginState, window.checkSupportState = checkSupportState;