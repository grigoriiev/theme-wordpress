"use strict";
window.countDown = function countDown(dateStart, dateEnd, currentTime, countertimer, removeParent) {
    var countDownDate = new Date(dateEnd).getTime(), countStartDate = new Date(dateStart).getTime(),
        now = new Date(currentTime).getTime();
    now += 1;
    var timer = "string" == typeof countertimer ? document.getElementById(countertimer) : countertimer;
    if (now > countStartDate && now < countDownDate) var x = setInterval((function () {
        var word_day, distance = countDownDate - (now += 1e3), days = Math.floor(distance / 864e5),
            hours = Math.floor(distance % 864e5 / 36e5), minutes = Math.floor(distance % 36e5 / 6e4),
            seconds = Math.floor(distance % 6e4 / 1e3);
        hours = hours < 10 ? "0" + hours : hours, minutes = minutes < 10 ? "0" + minutes : minutes, seconds = seconds < 10 ? "0" + seconds : seconds;
        var lastFigure = parseInt(days.toString().substr(days.toString().length - 1, 1));
        1 == lastFigure && (word_day = _oneDay), lastFigure > 1 && lastFigure < 5 && (word_day = _day), (0 == lastFigure || lastFigure >= 5) && (word_day = _days), timer.innerHTML = "<div>" + days + " " + word_day + "</div> " + hours + ":" + minutes + ":" + seconds, distance < 0 && (clearInterval(x), timer.innerHTML = "")
    }), 1e3); else removeParent ? timer.parentNode.remove() : timer.remove()
};