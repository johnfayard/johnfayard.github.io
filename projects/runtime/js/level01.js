var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY-110 },//puts the sawblades on the map
                { "type": "sawblade", "x": 600, "y": groundY+20},//puts the sawblades on the map
                { "type": "sawblade", "x": 800, "y": groundY+20 },//puts the sawblades on the map
                { "type": "sawblade", "x": 2500, "y": groundY-110 },//puts the sawblades on the map
                { "type": "sawblade", "x": 2800, "y": groundY-110 },//puts the sawblades on the map
                { "type": "sawblade", "x": 2800, "y": groundY+20 },//puts the sawblades on the map
                
                { "type": "enemy", "x": 900, "y": groundY-50 },// puts the enemy on the map
                { "type": "enemy", "x": 1500, "y": groundY-50 },// puts the enemy on the map
                { "type": "enemy", "x": 2000, "y": groundY-50 },// puts the enemy on the map
                { "type": "enemy", "x": 2700, "y": groundY-50 },// puts the enemy on the map
                { "type": "enemy", "x": 3200, "y": groundY-50 },// puts the enemy on the map



                { "type": "reward", "x": 1100, "y": groundY-50 },//puts the reward on the map
                { "type": "reward", "x": 1700, "y": groundY-50 },//puts the reward on the map
                { "type": "reward", "x": 2500, "y": groundY-50 },//puts the reward on the map
                { "type": "reward", "x": 3000, "y": groundY-50 },//puts the reward on the map
                { "type": "reward", "x": 3600, "y": groundY-50 },//puts the reward on the map
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y){
            var hitZoneSize = 25;// sets the size of the hitzone 
            var damageFromObstacle = 10;// sets the damage of the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);// creates the hitzone and stores it in a variable
            sawBladeHitZone.x = x;// the x position of the hitzone
            sawBladeHitZone.y = y;// the y position of the hitzone
            game.addGameItem(sawBladeHitZone); // add the hitzone to the game
            
            var obstacleImage = draw.bitmap('img/sawblade.png');// drawing the image
            sawBladeHitZone.addChild(obstacleImage);//adds the image to the hitzone
            obstacleImage.x = -25;// tweaks the image 25 pixels to the left
            obstacleImage.y = -25;// tweaks the image 25 pixels up 
        }
        
        function createEnemy(x,y){
            var enemy = game.createGameItem('enemy',25);//creating the game item and storing it in the variable enemy 
            var redSquare = draw.bitmap('img/newyoungboy.png');// creates rectangle and stores as redSquare
            redSquare.x = -25;//
            redSquare.y = -25;//
            enemy.addChild(redSquare);// adds the redSquare to the enemy game item
        
            enemy.x = x;//puts the enemy x placement where the x variable is set
            enemy.y = y;// puts the enemy y placement where the y varibale is set
            
            enemy.scaleX = .5;//scales the enemy down
            enemy.scaleY =.5;//scales the enemy down

            enemy.velocityX = -1;// this causes the enemy to move towards us 
            game.addGameItem(enemy);// adds enemy to the game

           // enemy.rotationalVelocity = 1;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-20);// takes away 20 health when the enemy hits Hallebot 
            };
            enemy.onProjectileCollision = function() {
                console.log('The Projectile has hit Halle');// if the enemy hits halle then the health goes down
                game.changeIntegrity(10);
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }

        function createReward(x,y){
            var reward = game.createGameItem('reward',25);//creating the game item and storing it in the variable reward 
            var blueSquare = draw.bitmap('img/newchain.png');// creates rectangle and stores as redSquare
            blueSquare.x = -25;//places the reward x at -25
            blueSquare.y = -25;//places the reward y at -25
            reward.addChild(blueSquare);// adds the blueSquare to the reward game item
        
            reward.x = x;//places the reward x coordinate at the value of x
            reward.y = y;//places the reward y coordinate at the value of y
            
            reward.scaleX = 0.5;//scales the reward x down
            reward.scaleY = 0.5;//scales the reward y down
            reward.velocityX = -1;// this causes the reward to move towards us 
            game.addGameItem(reward);// adds reward to the game

            //reward.rotationalVelocity = 1;
            reward.onPlayerCollision = function() {
                console.log('The reward has hit Halle');
                game.changeIntegrity(+20);// takes away 20 health when the reward hits Hallebot 
            };
            reward.onProjectileCollision = function() {
                console.log('The Projectile has hit Halle');
                game.changeIntegrity(10);//if the reward is hit by halle bullet then the score will go up
                game.increaseScore(100);
                reward.fadeOut();// causes the reward to fade out of the screen once used
            };
         }
        for(var i =0; i < levelData.gameItems.length; i++){// this loop goes through the array above that runs through each of the enemy, rewards, and sawblades to call them into the function
            var gameItem = levelData.gameItems[i];
            if(gameItem.type === "sawblade"){//if the sawblade is called then run the sawblade function
                createSawBlade(gameItem.x, gameItem.y);
            }
            if(gameItem.type === "enemy"){// if the enemy is called then run the enemy function
                createEnemy(gameItem.x, gameItem.y);
            }
            if(gameItem.type === "reward"){//if the reward is called then run the reward function
                createReward(gameItem.x, gameItem.y);
            }
        }


        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
