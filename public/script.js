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

function distance(x1,y1,x2,y2){
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist,2)+Math.pow(yDist,2));
}
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
//animating circle
var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;

window.addEventListener('mousemove', function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})

function Circle(x,y,radius,color) {
    this.x = x;
    this.y= y;
    this.velocity = {
        x:(Math.random()-0.5)*5,
        y:(Math.random()-0.5)*5,
    };
   
    this.ddx=0;
    this.ddy=0;
    this.mass = 1;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
    this.draw= function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
    }
    this.update = function() {
        for(let i = 0; i<circleArray.length; i++){
            if(distance(this.x,this.y,circleArray[i].x,circleArray[i].y)!==0){
                    if(distance(this.x,this.y,circleArray[i].x,circleArray[i].y)<circleArray[i].radius+this.radius){
                       resolveCollision(this, circleArray[i])
                    }
                
                }

        }
        if(this.x>(innerWidth-this.radius) || this.x<(0+this.radius)){
            this.velocity.x =-this.velocity.x;
            }
            if(this.y>(innerHeight-this.radius) || this.y<(0+this.radius)){
                this.velocity.y=-this.velocity.y;
                }
            this.x+=this.velocity.x;
            this.y+=this.velocity.y;
            //gravity mouse??
            
        if(Math.pow(Math.pow(mouse.x-this.x,2)+Math.pow(mouse.y-this.y,2),0.5 )<200){
            if(Math.pow(Math.pow(mouse.x-this.x,2)+Math.pow(mouse.y-this.y,2),0.5 )===0){
                this.ddy=0;
                this.ddx=0;
            }
            else{
            this.ddy=1*(this.y-mouse.y)/Math.pow(Math.pow(mouse.x-this.x,2)+Math.pow(mouse.y-this.y,2),0.5 );
            console.log(this.x);
            console.log(this.y);
            this.ddx=1*(this.x-mouse.x)/Math.pow(Math.pow(mouse.x-this.x,2)+Math.pow(mouse.y-this.y,2),0.5 );
            }
            this.velocity.x-=this.ddx;
            this.velocity.x-=this.ddy;


        }
        else{
            this.ddx=0;
            this.ddy=0;
        }
            //interact with mouse
            if(mouse.x-this.x<50&&mouse.x-this.x>-50&&mouse.y-this.y<50&&mouse.y-this.y>-50){
                color1 = Math.floor(Math.random()*255).toString(16);
                color2 = Math.floor(Math.random()*255).toString(16);
                color3 = Math.floor(Math.random()*255).toString(16);
                color = '#'+color1+color2+color3;
                this.color=color;
                if(this.radius<maxRadius){
                    this.radius+= 1;
                   
                }
            } else if(this.radius>this.minRadius){
                color1 = Math.floor(Math.random()*255).toString(16);
                color2 = Math.floor(Math.random()*255).toString(16);
                color3 = Math.floor(Math.random()*255).toString(16);
                color = '#'+color1+color2+color3;
                this.color=color;
                this.radius-=1;
            }
            this.draw();
    }
}


var circleArray = [];
for(i=0; i<200; i++){
    var x = Math.random()*(innerWidth-radius*2)+radius;
var y = Math.random()*(innerHeight-radius*2)+radius;

var radius = (Math.random()*20+1);
var color1 = Math.floor(Math.random()*255).toString(16);
var color2 = Math.floor(Math.random()*255).toString(16);
var color3 = Math.floor(Math.random()*255).toString(16);

var color = '#'+color1+color2+color3;

circleArray.push(new Circle(x,y,radius,color))
}
var circle = new Circle(x,y,radius,color);
function animate() {
  
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight);
    for(i=0; i<circleArray.length; i++){
        circleArray[i].update(circleArray);
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
