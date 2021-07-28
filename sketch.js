var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  climbersGroup = new Group();

  spookySound.play();
}

function draw() {
  background(200);
  
  if(gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
  
    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.8;

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    spawnDoors();
    if(ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)) {
      gameState = "end";
      ghost.destroy();
    }
  }
  
    drawSprites();

    if(gameState==="end") {
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over",230,250);

      tower.destroy();
      invisibleBlockGroup.destroyEach();
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
    }
}

function spawnDoors() {
  if(frameCount%250==0){
    door = createSprite(200,-20,50,50);
    climber = createSprite(200,20,50,50);
    invisibleBlock = createSprite(200,25,50,5);
    invisibleBlock.width = climber.width;
    
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    invisibleBlock.visible = false;
    
    invisibleBlock.debug = true;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.x = Math.round(random(100,500));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.scale = 0.7;
    climber.scale = 0.7;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    door.depth = ghost.depth
    ghost.depth = ghost.depth+1;

    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleBlock.lifetime = 600;
  }
}