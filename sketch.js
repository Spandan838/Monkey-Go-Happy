var PLAY = 1;
var END = 0;
var gameState= PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,birds,birdsImage;
var foodGroup, obstacleGroup, birdsGroup
var score,score90
var groundImage,ground,ing
var game,gameover

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  groundImage = loadImage("ground2.png");
  birdsImage = loadImage("fly-bird-png-bird-free-transparent-png-download-pngkey-flying-bird-silhouettes-png-820_500.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  foodGroup = new Group();
  obstaclesGroup = new Group();
  birdsGroup = new Group();
  gameover =loadImage("gameover.png"); 
 

 
}



function setup() {
createCanvas(600, 300); 
monkey = createSprite(50,260,20,50);
monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
   ground = createSprite(200,285,400,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -4;
  
  game = createSprite(300,150,400,20);
  game.addImage(gameover);

  //ground.x = ground.width/2;
   ground.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   monkey.depth = game.depth;
    game.depth = game.depth + 1;
 
  ing = createSprite(200,295,400,10);
  ing.visible = false;
  score = 0;
  score90 = 0;
  
  
  
    
}


function draw() {
  background("white")
  text("Score: "+ score, 500,50);
  text("Survival time: "+ score90, 50,50);
  drawSprites();
  if(gameState === PLAY){
    game.visible = false;
    score90 = score90 + Math.round(getFrameRate()/60);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyWentDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score+1;  
  }
  monkey.velocityY = monkey.velocityY +0.8
      
  monkey.collide(ing);
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END 
    ground.velocityX = 0;
     
    
  }
    spownObstracle()
  spownFruits()
    spownBirds()
  } else if (gameState === END) {
  game.visible = true;
     obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     birdsGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
    birdsGroup.setVelocityXEach(0);
     
   } 
}


function spownFruits(){
  if (frameCount % 100 === 0){
   var fruite = createSprite(600,170,10,40);
   fruite.addImage(bananaImage)
    fruite.velocityX = -6
    fruite.scale = 0.1;
    fruite.lifetime = 300;
    foodGroup.add(fruite);
  }
}

function spownObstracle(){
if (frameCount % 150 === 0){
   var obstricle = createSprite(600,265,10,40);
   obstricle.addImage(obstaceImage)
    obstricle.velocityX = -6
    obstricle.scale = 0.1;
    obstricle.lifetime = 300;
    //obstricle.debug = true
  obstricle.setCollider("rectangle",0,0,160,160);
    obstaclesGroup.add(obstricle)
  }  
}
function spownBirds(){
if (frameCount % 160 === 0){
   var birds = createSprite(600,65,10,40);
  birds.y = Math.round(random(80,120));
   birds.addImage(birdsImage)
    birds.velocityX = -6
    birds.scale = 0.5;
    birds.lifetime = 100;
    //obstricle.debug = true
  birds.setCollider("rectangle",0,0,4,6);
  birds.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  birdsGroup.add(birds)
   
  }  
}


