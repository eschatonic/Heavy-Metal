//DECLARE VARIABLES
var game = {
	version:0.1,
	framerate:60,
	debug:true,
	paused:true,
	screen:null,
	level:{},
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
	this.grid = [[]];
	this.gridSize = 20;
	this.defaultProps = {
		fillMat:"earth",
		mana:5
	}
	this.setGridProps = function(useDefault,x,y,material,manaLevel){
		if (useDefault){
			if (!this.grid[x]) this.grid[x] = [];
			this.grid[x][y] = {
				fillMat:this.defaultProps.fillMat,
				mana:this.defaultProps.mana
			}
		} else {
			if (!this.grid[x]) this.grid[x] = [];
			this.grid[x][y] = {
				fillMat:material,
				mana:manaLevel
			}
		}
		return this.grid[x][y];
	}
	this.getGridProps = function(x,y){
		if (this.grid[x]){
			if (this.grid[x][y]){
				return this.grid[x][y];
			} else {
				this.setGridProps(true,x,y);
				return this.grid[x][y];
			}
		} else {
			this.setGridProps(true,x,y);
			return this.grid[x][y];
		}
	}
	this.initialise = function(){
		//set centre square and four surrounding
		this.setGridProps(false,0,0,"air",this.defaultProps.mana);
		this.setGridProps(false,0,1,"air",this.defaultProps.mana);
		this.setGridProps(false,1,0,"air",this.defaultProps.mana);
		this.setGridProps(false,0,-1,"air",this.defaultProps.mana);
		this.setGridProps(false,-1,0,"air",this.defaultProps.mana);
		//setup for generation algorithm
		var tunnels = [
			//initial four tunnels
			//format: current x, current y, facing x, facing y, length
			[0,1,0,1,0],
			[1,0,1,0,0],
			[0,-1,0,-1,0],
			[-1,0,-1,0,0]
		];
		//HIC SUNT DRACONES
		while (tunnels.length > 0){
			var maxLength = 100; //the maximum length of the tunnels (average will be much lower)
			var eventualLength = random() * random() * maxLength;
			for (var i= 0;i<tunnels.length;i++){
				while (tunnels[i][4] < eventualLength){
					//now see what the tunnel does next
					var outcome = random() * 100;
					if (outcome < 60){
						//straight ahead
						tunnels[i][0] += tunnels[i][2];
						tunnels[i][1] += tunnels[i][3];
					} else if (outcome < 75){
						//turn left
						if (tunnels[i][2] == 1){
							tunnels[i][2] = 0;
							tunnels[i][3] = -1;
						} else if (tunnels[i][2] == -1){
							tunnels[i][2] = 0;
							tunnels[i][3] = 1;
						} else if (tunnels[i][3] == 1){
							tunnels[i][2] = 1;
							tunnels[i][3] = 0;
						} else {
							tunnels[i][2] = -1;
							tunnels[i][3] = 0;
						}
						tunnels[i][0] += tunnels[i][2];
						tunnels[i][1] += tunnels[i][3];
					} else if (outcome < 90){
						//turn right
						//turn left
						if (tunnels[i][2] == 1){
							tunnels[i][2] = 0;
							tunnels[i][3] = 1;
						} else if (tunnels[i][2] == -1){
							tunnels[i][2] = 0;
							tunnels[i][3] = -1;
						} else if (tunnels[i][3] == 1){
							tunnels[i][2] = -1;
							tunnels[i][3] = 0;
						} else {
							tunnels[i][2] = 1;
							tunnels[i][3] = 0;
						}
						tunnels[i][0] += tunnels[i][2];
						tunnels[i][1] += tunnels[i][3];
					} else {
						//t-junction
						//turns left, creates new tunnel turning right
						//turn
						if (tunnels[i][2] == 1){
							tunnels[i][2] = 0;
							tunnels[i][3] = -1;
						} else if (tunnels[i][2] == -1){
							tunnels[i][2] = 0;
							tunnels[i][3] = 1;
						} else if (tunnels[i][3] == 1){
							tunnels[i][2] = 1;
							tunnels[i][3] = 0;
						} else {
							tunnels[i][2] = -1;
							tunnels[i][3] = 0;
						}
						tunnels[i][0] += tunnels[i][2];
						tunnels[i][1] += tunnels[i][3];
						//create new tunnel
						var newX = tunnels[i][0] - (tunnels[i][2]);
						var newY = tunnels[i][1] - (tunnels[i][3]);
						var newFaceX = tunnels[i][2] * -1;
						var newFaceY = tunnels[i][3] * -1;
						tunnels.push([newX,newY,newFaceX,newFaceY,tunnels[i][4]]);
					}
					this.setGridProps(false,tunnels[i][0],tunnels[i][1],"air",this.defaultProps.mana);
					tunnels[i][4] += 1;
				}
				//prune tunnel
				tunnels.splice(i,1);
			}
		}
	}
	this.draw = function(){
		for (var x in this.grid){
			for (var y in this.grid[x]){
				if (this.grid[x][y].fillMat != "earth"){
					fill(255);
				} else {
					fill(0);
				}
				rect(x * this.gridSize + windowWidth/2,y * this.gridSize + windowHeight/2,this.gridSize,this.gridSize);
			}
		}
	}
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

function reset(seed){
	game.paused = false;
	game.level = new Level(seed);
	game.level.initialise();
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
	background(0); //clear
	game.level.draw();
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