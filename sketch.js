var path, circlePlayer, circleObject;
var pathImg, circlePlayerImg, circleObjectImg;
var circleCollection = 0;
var circleObjects;

var gameState = "play";
//Game States

function preload(){
  pathImg = loadImage("pathImg.jpeg");
  circlePlayerImg = loadImage("FullSizeRendercopy2.jpeg");
  circleObjectImg = loadImage("FullSizeRender.jpeg");
}

function setup()
{
createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;

//creating circle running
circlePlayer = createSprite(width/2,height-100,20,20);
circlePlayer.addImage("CirclePlayer", circlePlayerImg);
circlePlayer.scale=0.08;
  
circleObjects = new Group();

}

function draw() {
    if(gameState==="play"){
    background(0);
    
    circlePlayer.x = World.mouseX;
  
    edges=createEdgeSprites();
    circlePlayer.collide(edges);
  
    //code to reset the background
    if(path.y > height){
      path.y = height/2;
    }

    if (circleObjects.isTouching(circlePlayer)) {
      circleObjects.destroyEach();
      circleCollection=circleCollection+50;
    }
    createCircles();
  }

  if(circleObjects.y > height){
    gameState="end";
    circlePlayer.destroy();
  }

  if(gameState==="end")
  {
    textSize(20);
    fill(255);
    text("Game Over!", width/2, height/2);

    path.velocityY=0;

    if(touches.length > 0 || keyDown("SPACE")){
      gameState = PLAY;
      circleCollection=0;
      touches = [];
    }
  }

  drawSprites();
  textSize(20);
  fill("pink");
  text("Circles: "+ circleCollection,width/30,30);
  text("Welcome to the Circle Runner. Collect all the purple circles with your pink circle.", width/30, height/9);
}

function reset(){
  gameState = PLAY;
  circleCollection = 0;
}


function createCircles() {
  if (frameCount % 220 == 0) {
  circleObject = createSprite(Math.round(random(50, windowWidth-10),40, 10, 10));
  circleObject.addImage(circleObjectImg);
  circleObject.scale=0.05;
  circleObject.velocityY = 3;
  circleObject.lifetime = windowHeight+10;
  circleObjects.add(circleObject);
  }
}
