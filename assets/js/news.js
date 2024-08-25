"use strict";
!function tableOfContents() {
    const headings = document.querySelectorAll(".post-single .content h2"),
        tableOfContents2 = document.querySelector(".table-of-contents");
    if (tableOfContents2) {
        if (headings.length < 1) return tableOfContents2.remove();
        headings.forEach((heading => {
            const hiddenLink = document.createElement("a");
            hiddenLink.href = `#${heading.cloneNode(!0).textContent}`, hiddenLink.classList.add("anchor-link"), hiddenLink.setAttribute("name", heading.cloneNode(!0).textContent), heading.appendChild(hiddenLink);
            const menuLink = hiddenLink.cloneNode(!0);
            menuLink.removeAttribute("name"), menuLink.classList.remove("anchor-link"), menuLink.classList.add("menu-anchor-link"), menuLink.textContent = `${heading.cloneNode(!0).textContent}`, menuLink.addEventListener("click", (e => {
                e.preventDefault(), document.querySelector(`a[name="${hiddenLink.getAttribute("name")}"]`).scrollIntoView({behavior: "smooth"})
            })), tableOfContents2.append(menuLink)
        })), function watchAnchorLinks(headings) {
            const menuLinks = document.querySelectorAll(".table-of-contents a"),
                menuParent = document.querySelector(".table-of-contents"),
                parentBoundings = menuParent.getBoundingClientRect(), {innerHeight: innerHeight} = window,
                fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            window.addEventListener("scroll", (e => {
                e.preventDefault(), headings.forEach(((heading, index) => {
                    if (heading.getBoundingClientRect().top <= 11 * fontSize) {
                        menuLinks.forEach((link => {
                            link.classList.remove("active")
                        })), menuLinks[index].classList.add("active");
                        let offset = menuLinks[index].offsetTop;
                        offset = menuLinks[index].offsetTop < innerHeight / 3 ? 0 : menuLinks[index].offsetTop - innerHeight / 3, offset = Math.min(parentBoundings.height - innerHeight + 9 * fontSize, offset);
                        const paddingTop = document.querySelector(".text-page").classList.contains("reduction-page") ? 2 : 9;
                        menuParent.style.top = `calc(${paddingTop}rem - ${offset < 0 ? 0 : offset}px)`
                    }
                }))
            }))
        }(headings)
    }
}();