var nav = document.getElementById("nav-wrapper");
var navBar = document.getElementById("nav-bar");
var menuBtn = document.getElementById("button-menu");
var menuLinks = document.querySelectorAll(".navbar_item");
var signBtn  = document.getElementById('button-signin');
var modal = document.getElementById('modal');
var closeMod = document.getElementById('modal-close');
var inputWrapper = document.getElementById('input-wrapper');
var focusable = Array.from(document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(element=> element.tabIndex ===0);
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(HTMLCanvasElement);
var c = canvas.getContext('2d');
c.fillRect(100, 100, 100, 100);
window.addEventListener("load", ()=> {
    console.log('loaded');
    focusable[0].focus();
})
menuBtn.addEventListener("click", function() {
    if(nav.className === "menu-closed menu-invisible" || nav.className === "menu-closed") {
        menuBtn.setAttribute("aria-expanded", "true");
        nav.setAttribute("aria-hidden", "false");
        nav.setAttribute("class", "menu-closed");
        menuLinks.forEach(function(element){
            element.firstElementChild.tabIndex=0;
        })
        setTimeout(function(){
            nav.setAttribute("class", "menu-open");
        }, 1)
        
    }
    else if(nav.className ==="menu-open"){
        menuBtn.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-hidden", "true");
        nav.setAttribute("class", "menu-closed");
        menuLinks.forEach(function(element){
            element.firstElementChild.tabIndex=-1;
        })
        setTimeout(function(){
            nav.setAttribute("class", "menu-closed menu-invisible");
        }, 500)
    }
})

signBtn.addEventListener("click", function(){
  
    modal.setAttribute("class", "modal-open");
    modal.setAttribute("aria-modal", "true");
    inputWrapper.querySelectorAll('input').forEach(function(element){
        console.log(element);
        element.tabIndex=0;
    })
    closeMod.tabIndex=0;
    modal.firstElementChild.focus();
    
});

closeMod.addEventListener("click", function () {
    modal.setAttribute("class", "modal-hidden");
    modal.setAttribute("aria-modal", "false");
    inputWrapper.querySelectorAll('input').forEach(function(element){
        console.log(element);
        element.tabIndex=-1;
    })
    closeMod.tabIndex=-1;
    signBtn.focus();
    
});

document.addEventListener("keydown", function(event) {
    console.log(document.activeElement);
    switch(event.key) {
        case 'Tab':
        if(document.activeElement===focusable[focusable.length-1]&&!event.shiftKey){
            event.preventDefault();
            focusable[0].focus();
        }
        else if(document.activeElement===navBar.lastElementChild.firstElementChild&!event.shiftKey){
            event.preventDefault();
            menuBtn.focus();
        }
        else if(document.activeElement===inputWrapper.lastElementChild && !event.shiftKey){
            event.preventDefault();
            modal.firstElementChild.focus();
        }
        else if(event.shiftKey&&document.activeElement===menuBtn&&nav.className==="menu-open") {
            event.preventDefault();
            navBar.lastElementChild.firstElementChild.focus();

        }
        else if(event.shiftKey && document.activeElement===focusable[0]){
            event.preventDefault();
            focusable[focusable.length-1].focus();
        }
        else if(event.shiftKey && document.activeElement===closeMod) {
            event.preventDefault();
            inputWrapper.lastElementChild.focus();
        }
        break;
        case 'Escape':
        if(modal.className==='modal-open') {
            modal.setAttribute("class", "modal-hidden");
            modal.setAttribute("aria-modal", "false");
            signBtn.focus();
        }
        default:
        break;
    }
    
})
