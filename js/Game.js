class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.window();
    }

   /* car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }*/
  car1 = createSprite(3*width/12,height-100);
  car1.addImage("car1",car1_img);
  car2 = createSprite(5*width/12,height-100);
  car2.addImage("car2",car2_img);
  car3 = createSprite(7*width/12,hight-100);
  car3.addImage("car3",car3_img);
  car4 = createSprite(9*width/12,height-100);
  car4.addImage("car4",car4_img);
  cars = [car1, car2, car3, car4];
}


  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    player.getCarsAtEnd();
  //  console.log(player.rank);
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
     // image(track, 0,-windowHeight*4,windowWidth, windowHeight*5);
     image(track, 0,-windowHeight*4,windowWidth,windowHeight*5);
      //var window_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to window the cars in y direction
        y = windowHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = windowWidth/2;
          camera.position.y = cars[index-1].y;
        }
        textAlign(CENTER);
         textSize(20); 
         text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,window_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      carSound.play();
    }

    if(player.distance > 4120){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended for "+player.name+"!! Rank is "+player.rank);
    var message = createElement('h2');
    message.html("Congratulations "+player.name+"!! Your Rank is "+player.rank);
    message.position(windowWidth/2-70,windowHeight/4+40);
  }
}
