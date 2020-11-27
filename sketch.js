var database;
var dog,dogI,dogHappyI;
var foodStock,foodSprite;
var addFood,feedFood;
var lastFed,feedTime;
var foodS;

function preload(){

  dogHappyI = loadImage("images/dogImg1.png")
    
}

function setup() {
  createCanvas(1000, 700);
  
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(800,400)
  dog.addImage(dogHappyI)
  dog.scale = 0.2;

  feedFood = createButton('Feed the dog')
  feedFood.position(800,20)
  feedFood.mousePressed(feedDog);

  addFood = createButton('Add food')
  addFood.position(700,20);
  addFood.mousePressed(addFoods);


  foodSprite = new Food();

  
}

function draw() {  
  background(7, 171, 122)

  drawSprites();

  foodSprite.display();

  console.log(foodS)

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(242, 239, 24)
  textSize(20)
  if(lastFed > 12){
    text("Last Feed : " + lastFed % 12 + " PM",280,25)
  }else if(lastFed === 0){
    text("Last Feed : 12 AM",280,25)
  }else if(lastFed < 12){
    text("Last Feed : " + lastFed + " AM",280,25)
  }else if(lastFed === 12){
    text("Last Feed : 12 PM",280,25)
  }
  
  console.log(lastFed)
  

  if(foodS >= 20){
    foodS = 20;
  }
  if(foodS <= 0){
    foodS = 0;
  }
  
}

function readStock(data) {
  foodS = data.val();
  foodSprite.updateFoodStock(foodS);
}

function feedDog(){
  foodS--
  database.ref('/').update({
    Food : foodS,
    FeedTime : hour()
  })

}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}