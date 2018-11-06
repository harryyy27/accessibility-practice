var nav = document.getElementById("nav-wrapper");
var menuBtn = document.getElementById("button-menu");
var menuLinks = document.querySelectorAll(".navbar_item");
var signBtn  = document.getElementById('button-signin');
var modal = document.getElementById('modal');
var closeMod = document.getElementById('modal-close');
var inputWrapper = document.getElementById('input-wrapper');

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

signBtn.addEventListener("click", function(){
    modal.setAttribute("class", "modal-open");
    modal.setAttribute("aria-modal", "true");
    modal.firstElementChild.focus()
});

closeMod.addEventListener("click", function () {
    modal.setAttribute("class", "modal-hidden");
    modal.setAttribute("aria-modal", "false");
    signBtn.focus();
});

document.addEventListener("keydown", function(event) {
    console.log(event.key)
    switch(event.key) {
        case 'Tab':
        if(document.activeElement===inputWrapper.lastElementChild && !event.shiftKey){
            event.preventDefault();
            modal.firstElementChild.focus();
        }
        else if(event.shiftKey && document.activeElement===closeMod) {
            event.preventDefault();
            inputWrapper.lastElementChild.focus();
        }
        break;
        default:
        break;
    }
    
})