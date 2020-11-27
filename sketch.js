var towerImage,tower;
var ghostImageS,ghostImageJ,ghost;
var climberImage,climber;
var doorImage,door;
var invisible;
var doorGroup,climberGroup,invisibleGroup;
var gameState="play";
var spookySound;

function preload(){
  towerImage=loadImage("tower.png");
  ghostImageS=loadImage("ghost-standing.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  ghostImageJ=loadImage("ghost-jumping.png");
  spookySound=loadSound("spooky.wav");
  
  
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(300,300,10,10);
  ghost.addImage(ghostImageS);
  ghost.scale=0.5;
  
spookySound.loop();
  
  doorGroup=new Group;
  climberGroup=new Group;
  invisibleGroup=new Group;
  
//ghost.debug=true;
ghost.setCollider("rectangle",10,10,250,270);
}

function draw(){
  if(gameState==="play"){
  if(tower.y>600){
    tower.y=tower.width/2;
   }
  
  if(keyDown("space")){
    
    ghost.velocityY=-10;
    ghost.addImage(ghostImageJ);
    
  }
    
    if(keyWentDown("space")){
    
    
    ghost.addImage(ghostImageJ);
    
  }
    if(keyWentUp("space")){
    
    
    ghost.addImage(ghostImageS);
    
  }
   // ghost.addImage(ghostImageS);
  ghost.velocityY=ghost.velocityY+0.5;
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x=ghost.x-3;
    
  }
  
  if(keyDown("right_arrow")){
    
    ghost.x=ghost.x+3;
    
  }
  
  
  spawnDoor();
  
    if(invisibleGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
      
    }
  
  
  
  
  drawSprites();
    
  }
  
  if(gameState==="end"){
    background(0);
    textSize(30);
    fill("yellow");
    text("Game Over",250,250);
    
  }
}

function spawnDoor(){   

  if(frameCount%250===0){
    door=createSprite(Math.round(random(100,400)),-50);
    door.addImage(doorImage);
    door.velocityY=1;
    door.lifetime=650;
    doorGroup.add(door);
    ghost.depth=door.depth+1;
    
    climber=createSprite(door.x,door.y+50);
    climber.addImage(climberImage);
    climber.velocityY=1;
    climber.lifetime=650;
    climberGroup.add(climber);
    
    
invisible=createSprite(door.x,door.y+60,65,5);
    invisible.velocityY=1;
    invisible.visible=false;
    invisible.lifetime=650;
    invisibleGroup.add(invisible);  
    
  }

}

