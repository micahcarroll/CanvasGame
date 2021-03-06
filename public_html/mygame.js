/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/


//-------------------------------------------------------

// CREATING THE CANVAS and inserting it in the DOM
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
/*if(canvas.getContext) {
    ctx = canvas.getContext('2d');
} else document.write('Browser version unsupported');*/

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

//-------------------------------------------------------

// INCLUDING IMAGES
//Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "https://raw.github.com/lostdecade/simple_canvas_game/master/images/background.png";

//Hero Image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
};
heroImage.src = "https://raw.github.com/lostdecade/simple_canvas_game/master/images/hero.png";

//Monster Image
var monsterReady = false;
var monsterImage = new Image ();
monsterImage.onload = function() {
    monsterReady = true;
};
monsterImage.src = "https://raw.github.com/lostdecade/simple_canvas_game/master/images/monster.png";


//-------------------------------------------------------

// GAME OBJECTS

var hero = {
    speed: 256,
    x: 0,
    y: 0
};

var monster = {
    x: 0,
    y: 0
};

var monstersCaught = 0;


//-------------------------------------------------------

// PLAYER INPUT

var keysDown = {};

addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
}, false);                                  //the two false at the end 4th parameters can be turned true with no affect. How come?

addEventListener("keyup", function (e) {    //what is the 'e' parameter anyway?
	delete keysDown[e.keyCode];         //keysDown[e.keyCode] = false; won't work, why?
}, false);


//-------------------------------------------------------

// NEW GAME
// Reset the game when the player catches a monster

var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    
    // Place monster randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//-------------------------------------------------------

// UPDATE OBJECTS

var update = function(modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }
    
    // Are they touching?
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
};

//-------------------------------------------------------

// RENDER OBJECTS
// Draw everything

var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
};

//-------------------------------------------------------

// MAIN GAME LOOP

var main = function() {
    var now = Date.now();
    var delta = now - then;
    
    update(delta/1000);
    render();
    
    then = now;
    
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();