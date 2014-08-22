//DECLARE VARIABLES
var game = {
	paused:true,
	screen:null,
	objects:{
		
	}
}
var controls = {
	mouseDown:false,
	up:false,
	down:false,
	left:false,
	right:false,
	space:false,
	enter:false
}

//CONSTRUCTORS

function Level(seed){
	seed ? randomSeed(seed) : randomSeed(Math.random());
	this.grid = [];
}

//INITIALISE
function setup(){
	frameRate(60);
	createCanvas(windowWidth,windowHeight);
	var canvas = document.getElementsByTagName("canvas")[0];
	canvas.id = "canvas";
	BindUIEvents();
	title();
}

function reset(){
	game.paused = false;
}

//FUNCTIONS
function title(){
	game.screen = "title";
	background(0);
	stroke(255);
	fill(255);
	textAlign(CENTER);
	textSize(48);
	textFont("Georgia");
	text("SPELLCASTING",windowWidth/2,windowHeight/2-50);
	textSize(24);
	text("by David Stark",windowWidth/2,windowHeight/2);
	text("click or touch to begin", windowWidth/2,windowHeight/2+50);
}

function drawBackground(){
	background(0);
}

//MAIN LOOP
function draw(){
	processInput();
	if (!game.paused){
		drawBackground();
	} else {
		//put pause screen here
	}
}

/* UI FUNCTIONS */
function mouseDown(x,y){
	if (game.screen == "title") reset();
}
function mouseUp(x,y){
}
function processInput(){
}

/* BIND UI EVENTS */
function BindUIEvents(){
	document.getElementById("canvas").onmousedown = function(evt){
		controls.mouseDown = true;
		mouseDown(evt.layerX,evt.layerY);
	};
	document.getElementById("canvas").onmousemove = function(evt){
	};
	document.getElementById("canvas").onmouseup = function(evt){
		controls.mouseDown = false;
		mouseUp(evt.layerX,evt.layerY);
	};
	document.getElementById("canvas").onmouseout = function(evt){
		if (controls.mouseDown) controls.mouseDown = false;
	};
	document.onkeydown = function(e){
		e.preventDefault();
		if (e.keyCode == 13){ //enter/return
			controls.enter = true;
		}
		if (e.keyCode == 32){ //space
			controls.space = true;
		}
		if (e.keyCode == 37){ //left
			controls.left = true;
		}
		if (e.keyCode == 38){ //up
			controls.up = true;
		}
		if (e.keyCode == 39){ //right
			controls.right = true;
		}
		if (e.keyCode == 40){ //down
			controls.down = true;
		}
	}
	document.onkeyup = function(e){
		if (e.keyCode == 13){ //enter/return
			controls.enter = false;
		}
		if (e.keyCode == 32){ //space
			controls.space = false;
		}
		if (e.keyCode == 37){ //left
			controls.left = false;
		}
		if (e.keyCode == 38){ //up
			controls.up = false;
		}
		if (e.keyCode == 39){ //right
			controls.right = false;
		}
		if (e.keyCode == 40){ //down
			controls.down = false;
		}
	}
}