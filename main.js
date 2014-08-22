//DECLARE VARIABLES
var game = {
	version:0.1,
	framerate:60,
	debug:true,
	paused:true,
	screen:null,
	objects:[],
	controls:{
		mouseDown:false,
		up:false,
		down:false,
		left:false,
		right:false,
		space:false,
		enter:false
	}
}

//CONSTRUCTORS

function Level(seed){
	seed ? randomSeed(seed) : randomSeed(Math.random());
	this.grid = [];
}

//INITIALISE
function setup(){
	frameRate(game.framerate);
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
	noStroke();
	textAlign(RIGHT);
	textSize(18);
	text("version " + game.version,windowWidth-20,windowHeight-20);
}

function drawBackground(){
	background(0);
}
function drawInterface(){
	if (game.debug) drawFPS();
}
function drawFPS(){
	noStroke();
	fill(255);
	textAlign(RIGHT);
	textSize(18);
	text(Math.round(frameRate()) + "fps",windowWidth-20,windowHeight-20);
	
}
function drawSigilOverlay(){
	
}

//MAIN LOOP
function draw(){
	processInput();
	if (!game.paused){
		drawBackground();
		drawInterface();
	} else {
		//put pause screen here
	}
}

/* UI FUNCTIONS */
function mouseDown(x,y){
	if (game.screen == "title") reset();
}
function mouseMove(x,y){
}
function mouseUp(x,y){
}
function processInput(){
}

/* BIND UI EVENTS */
function BindUIEvents(){
	var isTouchSupported = !!('ontouchstart' in window),
        touchStart = isTouchSupported ? "touchstart" : "mousedown",
        touchEnd = isTouchSupported ? "touchend" : "mouseup",
        touchMove = isTouchSupported ? "touchmove" : "mousemove";
		
	$('#canvas').on(touchStart,function(evt){
		game.controls.mouseDown = true;
		mouseDown(evt.layerX,evt.layerY);
	});
	$('#canvas').on(touchMove,function(evt){
		mouseMove(evt.layerX,evt.layerY);
	});
	$('#canvas').on(touchEnd,function(evt){
		game.controls.mouseDown = false;
		mouseUp(evt.layerX,evt.layerY);
	});
	$('.canvas').on("mouseout",function(evt){
		if (game.controls.mouseDown) game.controls.mouseDown = false;
	});
	//keyboard
	document.onkeydown = function(e){
		e.preventDefault();
		if (e.keyCode == 13){ //enter/return
			game.controls.enter = true;
		}
		if (e.keyCode == 32){ //space
			game.controls.space = true;
		}
		if (e.keyCode == 37){ //left
			game.controls.left = true;
		}
		if (e.keyCode == 38){ //up
			game.controls.up = true;
		}
		if (e.keyCode == 39){ //right
			game.controls.right = true;
		}
		if (e.keyCode == 40){ //down
			game.controls.down = true;
		}
	}
	document.onkeyup = function(e){
		if (e.keyCode == 13){ //enter/return
			game.controls.enter = false;
		}
		if (e.keyCode == 32){ //space
			game.controls.space = false;
		}
		if (e.keyCode == 37){ //left
			game.controls.left = false;
		}
		if (e.keyCode == 38){ //up
			game.controls.up = false;
		}
		if (e.keyCode == 39){ //right
			game.controls.right = false;
		}
		if (e.keyCode == 40){ //down
			game.controls.down = false;
		}
	}
}