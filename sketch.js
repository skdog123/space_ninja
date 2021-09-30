
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var time=0
var timeS=0
var ninja1
var bg
var p=0

function preload(){
  jump=loadAnimation("ninjaJump1.png","ninjaJump2.png","ninjaJump3.png","ninjaJump4.png")
  run=loadAnimation("ninjaRun1.png","ninjaRun2.png","ninjaRun3.png","ninjaRun4.png","ninjaRun5.png","ninjaRun6.png","ninjaRun7.png","ninjaRun8.png","ninjaRun9.png","ninjaRun10.png")
  ninja_idle=loadAnimation("ninja1.png")
  ninja_red=loadAnimation("ninjaRed1.png","ninjaRed2.png","ninjaRed3.png")
  //ninja_idle=loadImage("ninja1.png")
  bg=loadImage("bg.png")
  spikesImg=loadImage("spikes.png")
  spikeImg=loadImage("spike.png")
  treasureImg=loadImage("treasure.png")
  bk_song = loadSound('sound1.mp3');
}

function setup() {
  createCanvas(windowWidth,windowHeight-4);
  jump.frameDelay = 19;

  engine = Engine.create();
  world = engine.world;
  ground= new Ground(width/8+100,height-5,width/4+200,10)
  ground1= new Ground(width-60,height-5,width/2-30,10)
  ground2= new Ground(width/2-70,height/2-5,width-140,10)
  wall= new Ground(-5,height/2,10,height)
  wall2= new Ground(width+5,height/2,10,height)
  ground3= new Ground(500,height-130,150,10)
  ground4= new Ground(500,height-260,50,10)
  ground5= new Ground(width-75,height-130,150,10)
  ninja=Bodies.rectangle(200,height-80,100,100);
  World.add(world,ninja)

 var optionsN = {
    density: 0.9,
    restitution: 0,
    friction:1
  }
  
  ninja1 = createSprite(ninja.position.x,ninja.position.y,50,100,optionsN);
  ninja1.scale=0.7
  ninja1.addAnimation("idle",ninja_idle)
  ninja1.addAnimation("jump",jump)
  ninja1.addAnimation("run",run)
  ninja1.addAnimation("red",ninja_red)

  spike1Body=Bodies.rectangle(500,height-35,90,100, {isStatic:true});
  World.add(world, spike1Body)

  spike2Body=Bodies.rectangle(500,height-495,95,50, {isStatic:true});
  World.add(world, spike2Body)

  spike3Body=Bodies.rectangle(width-500,height-495,95,50, {isStatic:true});
  World.add(world, spike3Body)

  spikes1=createSprite(500,height-35)
  spikes1.addImage("spikes",spikesImg)
  spikes2=createSprite(500,430)
  spikes2.addImage("spikes",spikesImg)
  spikes3=createSprite(width-500,430)
  spikes3.addImage("spikes",spikesImg)

  spike1=createSprite(500,height-290)
  spike1.addImage("spike",spikeImg)

  treasure=createSprite(100,430)
  treasure.addImage(treasureImg)
  treasure.scale=0.2
 // var render = Matter.Render.create({ element:document.body, engine:engine, options: { width:windowWidth, height:windowHeight, wireframes:false } }); Matter.Render.run(render);
  timeS=0
}


function draw() 
{
  background(bg);
  Engine.update(engine);
  ground.show()
  ground1.show()
  ground2.show()
  ground3.show()
  ground4.show()
  ground5.show()
  drawSprites();

  ninja1.position.x=ninja.position.x
  ninja1.position.y=ninja.position.y

  if (collide(ninja,spikes2, 121)==true) {
    ninja1.changeAnimation("red")
    setTimeout(() => {
      location.reload();
      }, 1500);
  }

  if (collide(ninja,spikes3, 121)==true) {
    ninja1.changeAnimation("red")
    setTimeout(() => {
      location.reload();
      }, 1500);
  }
if(p==0)
  if (collide(ninja,treasure, 50)==true) {
    youWin()
    bk_song.play()
    bk_song.setVolume(0.5);
    p=1
  }

  if(keyDown("RIGHT_ARROW")){
    //Body.applyForce(ninja,ninja.position,{x:0.007,y:0})
    Body.translate(ninja,{x:10,y:0})
    ninja1.changeAnimation("run") 
    ninja1.mirrorX(1)
  }
  if(keyDown("LEFT_ARROW")){
    Body.translate(ninja,{x:-10,y:0})
    ninja1.changeAnimation("run") 
    ninja1.mirrorX(-1)
  }
  if(!timeS==1){
  setTimeout(() => {
time=time+1
  }, 1000);
}
  fill("green")
  textSize(100)
  text("time:"+time,50,100)


  

  if(ninja1.y>height-65||ninja1.y>height-533&&ninja1.y<height-510){
  if(keyDown("SPACE")){
    Body.applyForce(ninja,ninja.position,{x:0,y:-0.4})
    ninja1.changeAnimation("jump")
  }
 }
if(ninja1.y>height+5){
  location.reload();
}
if(ninja1.x>width-100&&ninja1.y>250&&ninja1.y<height-100)
Body.applyForce(ninja,ninja.position,{x:0,y:-0.02})
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW||LEFT_ARROW){
    ninja1.changeAnimation("idle")
  }
  
}  

function collide(body,sprite, distWhenTouching) {
  if(body!=null) {
       var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
       console.log(d);
       if(d<=distWhenTouching) {
             return true; 
        } else {
          return false;
        }
  }
} 

function youWin() {
 timeS=1
}