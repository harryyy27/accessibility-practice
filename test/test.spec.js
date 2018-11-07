const test = require('tape');
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'public', 'index.html');
const http = fs.readFileSync(file)
const DOM = new JSDOM(http);

global.document = DOM.window.document;
global.window = DOM.window;

const js= require('../public/script.js');

test("testin' the testin'", (t) => {
    t.equals(1,1, '1=1');
    t.end();
})

test('menu opens and closes', (t) => {
    const nav = document.getElementById("nav-wrapper");
    
    const menuBtn = document.getElementById("button-menu");
    t.equals(nav.className, "menu-closed menu-invisible", "menu currently closed");
    menuBtn.click();
    t.equals(nav.className, "menu-closed", "slight delay");
    setTimeout(()=> {
        t.equals(nav.className, "menu-open", "menu should open");
        menuBtn.click();
        t.equals(nav.className, "menu-closed", "slight delay");
        setTimeout(()=> {
            t.equals(nav.className, "menu-closed menu-invisible", "menu currently closed");   
            t.end();
        },500)

    },2);
    
    
})

test('modal opens and closes', (t)=> {
    const signBtn  = document.getElementById('button-signin');
    const modal = document.getElementById('modal');
    const closeMod = document.getElementById('modal-close');
    t.equals(modal.className, "modal-hidden", "modal should be hidden");
    signBtn.click();
    t.equals(modal.className, "modal-open", "modal opens after clicking signBtn");
    closeMod.click();
    t.equals(modal.className, "modal-hidden", "modal closes when close button clicked");
    t.end();
})

// test('tab and tab+shift scroll back and forward skipping navbar and modal', (t) => {
//     // const menuBtn = document.getElementById("button-menu");
//     // const signBtn  = document.getElementById('button-signin');
//     var focusable = Array.from(document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(element=> element.tabIndex ===0);
//     console.log(document.activeElement.id);
//     t.equals(document.activeElement.id,focusable[0].id, "Tab starts on first focusable element");
//     t.end();

// })

