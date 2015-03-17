/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/


//-------------------------------------------------------
//CREATING THE CANVAS and inserting it in the DOM
var canvas = document.getElementById('canvas');

if(canvas.getContext) {
    ctx = canvas.getContext('2d');
} else document.write('Browser version unsupported');

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

//-------------------------------------------------------

//INCLUDING IMAGES
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
    heroImage = true;
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

//GAME OBJECTS

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

//PLAYER INPUT

var keysDown = {};

addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
});

addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
});
