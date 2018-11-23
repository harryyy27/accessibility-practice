var nav = document.getElementById("nav-wrapper");
var navBar = document.getElementById("nav-bar");
var menuBtn = document.getElementById("button-menu");
var menuLinks = document.querySelectorAll(".navbar_item");
var signBtn  = document.getElementById('button-signin');
var modal = document.getElementById('modal');
var closeMod = document.getElementById('modal-close');
var inputWrapper = document.getElementById('input-wrapper');
var focusable = Array.from(document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(element=> element.tabIndex ===0);

//html canvas
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(HTMLCanvasElement);
var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 200, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(400, 200, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 400, 100, 100);

// //line
// c.beginPath()
// c.moveTo(50, 400);
// c.lineTo(300, 200);
// c.lineTo(400, 400);
// c.strokeStyle = '#fa34a3'
// c.stroke();

//arc
// c.beginPath();
// c.arc(300, 400, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for(i=0; i<200; i++) {
//     var x = Math.random()* window.innerWidth;
//     var y = Math.random() *window.innerHeight;
//     var color1 = Math.floor(Math.random()*255).toString(16);
//     var color2 = Math.floor(Math.random()*255).toString(16);
//     var color3 = Math.floor(Math.random()*255).toString(16);
//     var color = '#'+color1+color2+color3;
//     console.log(color);
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI*2, false);
//     c.strokeStyle = color;
//     c.stroke();
// }

//animating circle
function Circle(x,y,dx,dy,radius,color) {
    this.x = x;
    this.y= y;
    this.dx= dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.draw= function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.strokeStyle= color;
    c.stroke();
    }
    this.update = function() {
        if(this.x>(innerWidth-this.radius) || this.x<(0+this.radius)){
            this.dx =-this.dx;
            }
            if(this.y>(innerHeight-this.radius) || this.y<(0+this.radius)){
                this.dy=-this.dy;
                }
            this.x+=this.dx;
            this.y+=this.dy;
            this.draw();
    }
}


var circleArray = [];
for(i=0; i<200; i++){
    var x = Math.random()*(innerWidth-radius*2)+radius;
var y = Math.random()*(innerHeight-radius*2)+radius;
var dx = (Math.random()-0.5)*5;
var dy = (Math.random()-0.5)*5;
var radius = 30;
var color1 = Math.floor(Math.random()*255).toString(16);
var color2 = Math.floor(Math.random()*255).toString(16);
var color3 = Math.floor(Math.random()*255).toString(16);
var color = '#'+color1+color2+color3;

circleArray.push(new Circle(x,y,dx,dy,radius,color))
}
var circle = new Circle(x,y,dx,dy,radius,color);
function animate() {
  
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight);
    for(i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
    
    // circle.draw();
    // circle.update();
}
animate();
//accessibility 

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
