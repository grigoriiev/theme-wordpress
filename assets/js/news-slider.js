"use strict";const scrollElement=document.querySelector(".news-wrapper"),prevButton=scrollElement&&scrollElement.parentElement.querySelector(".button-prev"),nextButton=scrollElement&&scrollElement.parentElement.querySelector(".button-next");nextButton&&nextButton.addEventListener("click",(()=>nextSlide(1))),prevButton&&prevButton.addEventListener("click",(()=>nextSlide(-1)));const params={down:!1,start:0,offset:0,velocity:0,raf:null};var scrollElement2;function inertia(){cancelInertia(),params.raf=requestAnimationFrame(inertiaLoop)}function cancelInertia(){cancelAnimationFrame(params.raf)}function inertiaLoop(){scrollElement.scrollLeft+=params.velocity,params.velocity*=.98,Math.abs(params.velocity)>.5&&(params.raf=requestAnimationFrame(inertiaLoop))}function nextSlide(dir){const slide=scrollElement.querySelector(".news-card"),margin=parseInt(window.getComputedStyle(slide,null).getPropertyValue("margin-right")),width=slide.getBoundingClientRect().width;scrollElement.scrollTo({left:scrollElement.scrollLeft+(margin+width)*dir,behavior:"smooth"})}scrollElement&&((scrollElement2=scrollElement).addEventListener("touchstart",(e=>{params.down=!0,params.start=e.touches[0].pageX-scrollElement2.offsetLeft,params.offset=scrollElement2.scrollLeft,cancelInertia()})),scrollElement2.addEventListener("touchmove",(e=>{if(!params.down)return;scrollElement2.classList.add("scroll");const x=e.touches[0].pageX-scrollElement2.offsetLeft,prevScroll=scrollElement2.scrollLeft;scrollElement2.scrollLeft=params.offset-(x-params.start),params.velocity=scrollElement2.scrollLeft-prevScroll})),scrollElement2.addEventListener("touchend",(e=>{params.down=!1,scrollElement2.classList.remove("scroll"),inertia()})),scrollElement2.addEventListener("mousedown",(e=>{params.down=!0,params.start=e.pageX-scrollElement2.offsetLeft,params.offset=scrollElement2.scrollLeft,cancelInertia()})),scrollElement2.addEventListener("mouseup",(e=>{scrollElement2.classList.remove("scroll"),params.down=!1,inertia()})),scrollElement2.addEventListener("mouseleave",(e=>{scrollElement2.classList.remove("scroll"),params.down=!1})),scrollElement2.addEventListener("mousemove",(e=>{if(!params.down)return;scrollElement2.classList.add("scroll");const x=e.pageX-scrollElement2.offsetLeft,prevScroll=scrollElement2.scrollLeft;scrollElement2.scrollLeft=params.offset-(x-params.start),params.velocity=scrollElement2.scrollLeft-prevScroll})),scrollElement2.addEventListener("scroll",(()=>{if(0!=scrollElement2.scrollLeft?prevButton.classList.remove("disabled"):prevButton.classList.add("disabled"),scrollElement2.scrollLeft>=scrollElement2.scrollWidth/3)return nextButton.classList.add("disabled");nextButton.classList.remove("disabled")})));