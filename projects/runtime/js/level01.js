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
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 800, "y": groundY },

                { "type": "enemy", "x": 500, "y": groundY },
                { "type": "enemy", "x": 700, "y": groundY },
                { "type": "enemy", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

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
        createSawBlade(400,345);
        createSawBlade(600,345);
        createSawBlade(800,345);
        
        function createEnemy(x,y){
        var enemy = game.createGameItem('enemy',25);//creating the game item and storing it in the variable enemy 
        var redSquare = draw.rect(50,50,'red');// creates rectangle and stores as redSquare
        redSquare.x = -25;//
        redSquare.y = -25;//
        enemy.addChild(redSquare);// adds the redSquare to the enemy game item
       
        enemy.x = x;
        enemy.y = y;
        
        enemy.velocityX = -1;// this causes the enemy to move towards us 
        game.addGameItem(enemy);// adds enemy to the game

        enemy.rotationalVelocity = 1;
        enemy.onPlayerCollision = function() {
        console.log('The enemy has hit Halle');
        game.changeIntegrity(-20);// takes away 20 health when the enemy hits Hallebot 
        };
        enemy.onProjectileCollision = function() {
        console.log('The Projectile has hit Halle');
        game.changeIntegrity(10);
        game.increaseScore(100);
        enemy.fadeOut();

        };

        function createReward(x,y){
        var reward = game.createGameItem('reward',25);//creating the game item and storing it in the variable reward 
        var redSquare = draw.rect(50,50,'blue');// creates rectangle and stores as redSquare
        blueSquare.x = -25;//
        blueSquare.y = -25;//
        reward.addChild(blueSquare);// adds the blueSquare to the reward game item
       
        reward.x = x;
        reward.y = y;
        
        reward.velocityX = -1;// this causes the reward to move towards us 
        game.addGameItem(reward);// adds reward to the game

        reward.rotationalVelocity = 1;
        reward.onPlayerCollision = function() {
        console.log('The reward has hit Halle');
        game.changeIntegrity(+20);// takes away 20 health when the reward hits Hallebot 
        };
        reward.onProjectileCollision = function() {
        console.log('The Projectile has hit Halle');
        game.changeIntegrity(10);
        game.increaseScore(100);
        reward.fadeOut();

        };
        for(var i =0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];
            if(gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            }
            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            }
        }


        }
        createEnemy(400, groundY-50);
        createEnemy(450, groundY-50);
        createEnemy(350, groundY-50);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;}
}
