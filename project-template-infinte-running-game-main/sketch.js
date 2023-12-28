var PLAY = 1;
var END = 0;
var gameState = PLAY;

var menino, menino_running, menino_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg, restartImg;
var jumpSound, checkPointSound, dieSound;

function preload(){

menino_running=loadAnimation("meninocorrend2-removebg-preview.png")
menino_collided=loadAnimation("meninoparado2-removebg-preview.png")

groundImage = loadImage("ground2.png");

obstacle1 = loadImage("lixeira-removebg-preview.png");
obstacle2 = loadImage("banco-removebg-preview.png");
obstacle3 = loadImage("cachorro22-removebg-preview.png");
obstacle4 = loadImage("cat2-removebg-preview.png");
obstacle5 = loadImage("pedra-removebg-preview.png");
obstacle6 = loadImage("idosa-removebg-preview.png");

restartImg = loadImage("botão-removebg-preview.png");
gameOverImg = loadImage("gameover-removebg-preview.png")

jumpSound = loadSound("jump.mp3")
dieSound = loadSound("die.mp3")
checkPointSound = loadSound("checkPoint.mp3")

}

function setup() {
 createCanvas(600, 200);

 var message = "This is a message";
console.log(message)

menino = createSprite(50, 160,20,50);
menino.addAnimation("running",menino_running);
menino.addAnimation("collided",menino_collided);

menino.scale = 0.5;

ground = createSprite(200,160,20,50);
ground.addImage("ground",groundImage);
ground.x = ground.width/2;

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.3;
restart.scale = 0.3;



invisibleGround = createSprite(200,190,400,10)
invisibleGround.visible = false

obstaclesGroup = createGroup();

menino.setCollider("rectangle",0,0,100,100);
menino.debug = false;

score = 0;

}

function draw() {
 
  background(180);
  text("Pontuação: " + score, 500,50);

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    ground.velocityX = -(4 + 3* score/100)

    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){

        checkPointSound.play()
    }

    if(ground.x<0){
        ground.x = ground.width/2;
    }
    if(keyDown("space")&&menino.y >=100){
        menino.velocityY = -12;
        jumpSound.play();
    }

     menino.velocityY = menino.velocityY + 0.8

       spawnObstacles();




    if(obstaclesGroup.isTouching(menino)){
        jumpSound.play();
        gameState = END;
        dieSound.play();

    }
  }
     else if(gameState === END){
      gameOver.visible = true;
     restart.visible = true;

        gameOver.scale = 0.3;
        restart.scale = 0.2;


     menino.changeAnimation("collided", menino_collided);
     menino.scale = 0.5;
        ground.velocityX = 0;
        menino.velocityY = 0;

        obstaclesGroup.setLifetimeEach(-1);

        obstaclesGroup.setVelocityXEach(0);
    }
    menino.collide(invisibleGround);

    if(mousePressedOver(restart)){
        reset();
    }
    drawSprites();
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();

    menino.changeAnimation('running');
    score = 0;


}

function spawnObstacles(){
if(frameCount % 60 ===0){
var obstacle = createSprite(600,165,10,40);
obstacle.velocityX = -(6 + score/100);

var rand = Math.round(random(1,6));
switch(rand){
case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
case 3: obstacle.addImage(obstacle3);
    break;
case 4: obstacle.addImage(obstacle4);
    break;
case 5: obstacle.addImage(obstacle5);
    break;
case 6: obstacle.addImage(obstacle6);
    break;
default: break;

}

obstacle.scale = 0.5;
obstacle.lifetime = 300;

obstaclesGroup.add(obstacle);

}
}
