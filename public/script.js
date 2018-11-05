var nav = document.getElementById("nav-wrapper");
var menuBtn = document.getElementById("button-menu");
var menuLinks = document.querySelectorAll(".navbar_item");

menuBtn.addEventListener("click", function() {
    if(nav.className === "menu-closed menu-invisible" || nav.className === "menu-closed") {
        menuBtn.setAttribute("aria-expanded", "true");
        nav.setAttribute("aria-hidden", "false");
        nav.setAttribute("class", "menu-closed");
        setTimeout(function(){
            nav.setAttribute("class", "menu-open");
        }, 1)
        
    }
    else if(nav.className ==="menu-open"){
        menuBtn.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-hidden", "true");
        nav.setAttribute("class", "menu-closed");
        setTimeout(function(){
            nav.setAttribute("class", "menu-closed menu-invisible");
        }, 500)
    }
})