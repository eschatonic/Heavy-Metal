//DECLARE VARIABLES
var game = {
	paused:false
}
var controls = {
	up:false,
	down:false,
	left:false,
	right:false,
	space:false,
	enter:false
}

//INITIALISE
function setup(){
	frameRate(60);
	createCanvas(windowWidth,windowHeight);
	var canvas = document.getElementsByTagName("canvas")[0];
	canvas.id = "canvas";
	BindUIEvents();
}

//FUNCTIONS
function drawBackground(){
	background(0);
}

//MAIN LOOP
function draw(){
	if (!game.paused){
		drawBackground();
	} else {
		//put pause screen here
	}
}

/* BIND UI EVENTS */
function BindUIEvents(){
	document.getElementById("canvas").onclick = function(evt){
		//do something
		console.log(evt);
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