var starImg, bgImg;
var star, starBody;
var fada, fadaImg;
//criar variável para sprite de fada e imgFada


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
  starImg = loadImage("images/star.png");
  bgImg = loadImage("images/starNight.png");
  vozFada = loadSound("sound/JoyMusic.mp3");
  fadaImg = loadAnimation("images/fairyimage1.png","images/fairyimage2.png")
  //carregar animação de fada 
}

function setup() {
  createCanvas(800, 750);

  //escrever código para tocar o som vozFada
  vozFada.play();

  //criar sprite de fada e adicionar animação para fada
   fada = createSprite(200,500);
   fada.addAnimation("Voo", fadaImg)
   fada.scale = 0.35
  
  star = createSprite(650, 30);
  star.addImage(starImg);
  star.scale = 0.2;

  engine = Engine.create();
  world = engine.world;

  starBody = Bodies.circle(650, 30, 5, {
    restitution: 0.5,
    isStatic: true
  });
  World.add(world, starBody);

  Engine.run(engine);

}

function draw() {
  background(bgImg);
  //fazer com que posição do sprite seja a mesma que a do corpo starBody
  star.x = starBody.position.x
  star.y = starBody.position.y
  
  //se a estrela encostar na fada, o corpo fica estático
  if(star.y > 400 && starBody.position.y > 400 ){
    Matter.Body.setStatic(starBody,true);
  }
  
  //	Ajustar posição de acordo com a posição e o tamanho da sua fada
  Engine.update(engine);
  drawSprites();
}

function keyPressed() {
  //**lembrar que dentro do function keyPressed() usamos keyCode ====

  //se a seta para baixo for apertada, estrela deixa de ser estática
   if(keyCode===DOWN_ARROW){
     Matter.Body.setStatic(starBody, false);
   }
  //se a seta para a direita for apertada, o x da fada aumenta
  if(keyCode===RIGHT_ARROW){
    fada.x = fada.x+25
  }
  //se a seta para a esquerda for apertada, o x da fada diminui
  if(keyCode===LEFT_ARROW){
    fada.x = fada.x-25
  }
}