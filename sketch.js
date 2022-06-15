var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car, car_collided,carImg;
var city,invisibleGround, cityImg;


var trafficLightsGroup, trafficLight1, trafficLight2, trafficlight3,trafficLight,redTrafficLightGroup; 
var score=0;

var gameOver,restart,restartImg;

function preload(){
  cityImg=loadImage('City.png');
  carImg=loadImage('Car.png');
  trafficLight1=loadImage('Traffic Light1.png');
  trafficLight2=loadImage('Traffic Light2.png');
  trafficLight3=loadImage('Traffic Light3.png');
  restartImg=loadImage('restart.png')
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  city=createSprite(width/2, 200, width, height);
  city.addImage(cityImg);
  city.scale=0.7;
  city.velocityX=1;

  car=createSprite(200,height-90,50,50);
  car.addImage(carImg);
  car.scale=0.5;

  trafficLightsGroup=new Group();
  redTrafficLightGroup=new Group();

  //restart = createSprite(300,140);
  //restart.addImage(restartImg);

  score=0;
}

function draw() {
  background(0);
  
if(gameState===PLAY){
  if(city.x>800){
    city.x=width/2
  }
  if(keyDown("RIGHT_ARROW"))  {
    car.velocityX = 5;
  }
 if(trafficLightsGroup.isTouching(car)){
   score=score+5;
 }
if(keyDown("space")){
  redTrafficLightGroup.destroyEach();
}
 if(redTrafficLightGroup.isTouching(car)){
   car.visible=false;
   city.visible=false;
   gameState=END;
 } 
  redTrafficLights();
  trafficLights();
}
else if(gameState===END){
  redTrafficLightGroup.destroyEach();
   trafficLightsGroup.destroyEach();
   background(0);
   textSize(50);
   text("game over",width/2,height/2);
}
  
  drawSprites();
  textSize(50);
  noStroke();
  fill(0);
  text("Score: "+ score, width-300,100);
}


function trafficLights(){
  if(frameCount % 500===0){
    trafficLight=createSprite(width-50,height-80,500,50);
    trafficLight.velocityX=-1;
    trafficLightsGroup.add(trafficLight);
    trafficLight.lifetime=1500;
    trafficLight.scale=0.5;
    var any=Math.round(random(1,2));
  switch(any){
    case 1:trafficLight.addImage(trafficLight2);
    break;

    case 2:trafficLight.addImage(trafficLight3);
    break;
    default:break;
  }
  }
}

function redTrafficLights(){
  if(frameCount % 200===0){
    trafficLight=createSprite(width-50,height-80,500,50);
    trafficLight.velocityX=-1;
        trafficLight.lifetime=1500;
    trafficLight.scale=0.5;
   trafficLight.addImage(trafficLight1);
   redTrafficLightGroup.add(trafficLight);
  }
}