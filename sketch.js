var helicopter,bullet,ufo,ground;
var helicopterimg,bulletimg,ufoimg;
var gamestate="play",score=0;
var ufog;

function preload(){
  helicopterimg=loadImage("Helicopter.png");
  bulletimg=loadImage("Bullet.png");
  ufoimg=loadImage("UFO.png");
}

function setup() {
  createCanvas(1200,400);

  ground=createSprite(width/2,height,1300,20);
  ground.shapeColor="brown";

  ufog = new Group();
}

function draw() {
  background(255,255,255);

  if(gamestate==="play"){
    helicopter=createSprite(200,60,70,30);
    helicopter.addImage(helicopterimg);

    ground.velocityX=3;
    if(ground.x>100){
      ground.x=width/2;
    }

    aliens();

    if(keyDown("space")){
      bullet=createSprite(170,75,50,20);
      bullet.addImage(bulletimg);
      bullet.scale=0.2;
      helicopter.depth=bullet.depth+1;
      if(bullet.isTouching(ufo)){
        bullet.destroy();
        ufog.destroyEach();
        score++;
      }
    }

    if(ufog.isTouching(helicopter)){
      gamestate="end";
    }

  } else if(gamestate==="end"){
    ufog.destroyEach();
    ground.destroy();
    helicopter.destroy();    
    text("Game Over",width/2,height/2);
  }

  fill("black");
  textSize(20);
  text("Score: "+score,1100,30);
  drawSprites();
}

function aliens(){
  if(frameCount%300===0){
    ufo=createSprite(1210,80,80,30);
    ufo.addImage(ufoimg);
    ufo.velocityX=-4;
    ufog.add(ufo);
  }
}