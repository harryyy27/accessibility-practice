const test = require('tape');
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'public', 'index.html');
const http = fs.readFileSync(file)
const DOM = new JSDOM(http);

global.document = DOM.window.document;

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

test()

