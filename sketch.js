var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, height, balloonPosition;
function preload(){

   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  database = firebase.database();
  console.log(database);

  createCanvas(1500,700);
  textSize(20); 

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale = 0.5;

  balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

// function to display UI
function draw() {
  background(bg);
if(height != undefined){
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    writePosition(-10,0);
  } 
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(10,0);
  } 
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    writePosition(0,-10);
    balloon.scale = balloon.scale -0.01;
  } 
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    writePosition(0,+10);
    balloon.scale = balloon.scale +0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
 }
}

function update(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function writePosition(x,y){
  database.ref('balloon/height').set({
     'x': height.x + x,
     'y': height.y + y
   })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
