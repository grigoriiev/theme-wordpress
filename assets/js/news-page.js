"use strict";
const loadButton = document.querySelector(".load-more");
loadButton && loadButton.addEventListener("click", (function loadMorePosts() {
    const formdata = new FormData;
    loadButton.setAttribute("disabled", !0), formdata.append("action", "loadmore"), formdata.append("query", true_posts), formdata.append("page", current_page), fetch(ajaxurl, {
        method: "POST",
        body: formdata
    }).then((response => response.text())).then((html => {
        newsList.insertAdjacentHTML("beforeEnd", html), current_page++, loadButton.removeAttribute("disabled"), current_page == max_pages && loadButton.remove(), function addVideoListeners() {
            document.querySelectorAll(".open-video").forEach((button => {
                button.hasAttribute("listener") || (button.addEventListener("click", (e => window.showVideo(e, button.dataset.video))), button.setAttribute("listener", "true"))
            }))
        }(), function addLoadListeners() {
            document.querySelectorAll(".image-loader").forEach(window.imageLoader)
        }()
    })).catch((error => {
        console.error(error), loadButton.removeAttribute("disabled")
    }))
}));
const newsList = document.querySelector(".news-list-wrapper");
let validateForm = !0;
validateForm && (document.getElementById("searchsubmit").disabled = !0), document.querySelector(".search-input-modal").addEventListener("input", (function () {
    this.value.length < 3 ? document.getElementById("searchsubmit").disabled = !0 : (validateForm = !1, document.getElementById("searchsubmit").disabled = !1)
})), document.querySelector(".date-filter-result-now").addEventListener("click", (function () {
    document.querySelector(".date-filter-wrap").classList.toggle("active-date-filter")
})), document.querySelectorAll(".date-filter-wrap span").forEach((function (spanElement) {
    spanElement.addEventListener("click", (function () {
        let newResult = this.textContent;
        document.querySelector(".date-filter-result-now").textContent = newResult, document.querySelector(".date-filter-wrap").classList.toggle("active-date-filter")
    }))
})), document.querySelectorAll(".search-modal-filter span").forEach((function (spanElement) {
    spanElement.addEventListener("click", (function () {
        document.querySelectorAll(".search-modal-filter span").forEach((function (span) {
            span.classList.remove("active-filter")
        })), this.classList.toggle("active-filter")
    }))
})), document.addEventListener("DOMContentLoaded", (function () {
    let searchTerm = "", filterPostType = "all", filterDateType = "DESC";

    function performAjaxRequest(data) {
        document.querySelector(".result-search .result-search-list").style.display = "none", document.querySelector(".result-search .result-search-list").innerHTML = "", document.querySelector(".result-search .preloader").style.display = "flex", fetch(ajaxurl+"?action=main_post_action", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams(data)
        }).then((response => response.text())).then((result => {

            document.querySelector(".result-search .preloader").style.display = "none", document.querySelector(".result-search").style.display = "block", document.querySelector(".result-search .result-search-list").style.display = "block", document.querySelector(".result-search .result-search-list").innerHTML = result
        })).catch((error => {
            console.error("Error:", error), document.querySelector(".result-search .preloader").style.display = "none", document.querySelector(".result-search").style.display = "none"
        }))
    }

    document.querySelector(".search-input-modal").addEventListener("keydown", (function () {
        searchTerm = this.value.trim()
    })), document.querySelectorAll(".date-filter-wrap span").forEach((function (span) {
        span.addEventListener("click", (function () {
            filterDateType = this.getAttribute("data-filter-date"), performAjaxRequest({
                action: "ba_ajax_search",
                term: searchTerm,
                type_post: filterPostType,
                type_post_date: filterDateType
            })
        }))
    })), document.querySelectorAll(".type-anonce-filter span").forEach((function (span) {
        span.addEventListener("click", (function () {
            filterPostType = this.getAttribute("data-filter"), performAjaxRequest({
                action: "ba_ajax_search",
                term: searchTerm,
                type_post: filterPostType,
                type_post_date: filterDateType
            })
        }))
    })), document.querySelector(".search-input-modal").addEventListener("keyup", (function () {
        this.value.trim() !== searchTerm && (searchTerm = this.value.trim(), searchTerm.length > 2 && performAjaxRequest({
            action: "ba_ajax_search",
            term: searchTerm,
            type_post: filterPostType
        }))
    })), document.querySelector(".search-input-modal").addEventListener("focusin", (function () {
        document.querySelector(".result-search").style.display = "block"
    }))
}));