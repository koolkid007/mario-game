var mario, marioImg, ground, groundImg, inxGround, cloudImg, cloudsGroup, obs1, obsGroup, restart, gameOver, restartImg, gameOverImg 
var coinsImg;
var count = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  marioImg = loadAnimation("mario1.jpg", "mario2.jpg", "mario3.jpg", "mario4.jpg");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obs1 = loadImage("fence.png");
  restartImg = loadAnimation("restart.png");
  gameOverImg = loadAnimation("gameOver.png");
  coinsImg = loadImage("coins.png");
} 

function setup() {
  createCanvas(800, 300);
  mario = createSprite(100,211,10,10);
  mario.addAnimation("running", marioImg);
  mario.scale = 1.2;
  //mario.debug = true;
  //animation(marioImg, 200,100,100,100);
  
  ground = createSprite(400,280,800,10);
  ground.x = ground.width/2;
  ground.addImage(groundImg);
  
  inxGround = createSprite(400,280,800,1);
  inxGround.visible = false;
  
  restart = createSprite(mario.x + 100,200,10,10);
  restart.addAnimation("restart",restartImg);
  restart.scale = 0.8;
  restart.visible = false;
  
  gameOver = createSprite(mario.x+ 100,150,10,10);
  gameOver.addAnimation("end", gameOverImg);
  gameOver.visible = false;
  
  cloudsGroup = createGroup();
  obsGroup = createGroup();
}

function draw() {
  background("white");
  gameOver.x = mario.x -40;
  restart.x = mario.x - 40;
  
  if(gameState === PLAY) {
    if(keyDown("space") && mario.y >=210) {
      mario.velocityY = -12;
  } 
   
  mario.velocityY = mario.velocityY + 0.7;
  
    if(ground.x<0) {
      ground.x = ground.width/2;
  } 
   
    if(keyDown(DOWN_ARROW)) {
      mario.x = mario.x + 20;
  }
  ground.x = camera.x;
  inxGround.x = ground.x;
  
  count = count + round(getFrameRate()/50);
  camera.x = mario.x;
  //ground.velocityX = -4;
  spawnClouds();
  spawnObs();

  if(cloudsGroup.isTouching(mario)) {
    count = count + 10;
  }

  if(count >= 1000) {
    mario.debug = true;
    background("black");
    textSize(15);
    fill("white");
    text("DARK MODE ACTIVATED", mario.x - 85, mario.y - 35);
  }
    if(obsGroup.isTouching(mario)) {
      gameState = END;
      mario.debug = false;
  } 
}  
    else if(gameState === END) {
    restart.visible = true;
    gameOver.visible = true;  
      
    ground.velocityX = 0;
    mario.velocityY = 0;
    obsGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1); 
      
    if(mousePressedOver(restart)) {
      gameState = PLAY;
      obsGroup.destroyEach();
      cloudsGroup.destroyEach();
      restart.visible = false;
      gameOver.visible = false;        
      count = 0;
    } 
  }        
  
  textSize(20);
  text("Score: " + count, mario.x + 100,30 );
  
  mario.collide(inxGround);
  console.log(gameState);
  drawSprites();
}

function spawnClouds() {
  if(frameCount%60 === 0) {
    var cloud = createSprite(mario.x + 400,round(random(50,160)),10,10);
    cloud.velocityX = -5;
    cloud.addImage(cloudImg);
    cloud.scale = 0.75;
    cloud.lifetime = 450;
    
    cloud.depth = mario.depth;
    mario.depth++;
    
    cloudsGroup.add(cloud);
  }
} 

function spawnObs() {
  if(frameCount%160 === 0) {
    var obstacle = createSprite(mario.x + 400,260,10,10);
    obstacle.addImage(obs1);
    obstacle.velocityX = -5;
    obstacle.scale = 0.1;
    obstacle.lifetime = 450;
    
    obsGroup.add(obstacle);
    
    
  } 
} 