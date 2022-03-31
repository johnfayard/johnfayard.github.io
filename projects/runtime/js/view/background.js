var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.bitmap(canvasWidth,canvasHeight,'img/https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/lgaqihcfwg0489wu7w1j.jpg');
                    background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            for (var i = 0; i <= 100; i++ ){
                var circle = draw.circle(10, 'white', 'LightGray', 2);// creates a variable called circle that holds each circle
                circle.x = canvasWidth*Math.random();// multiplies canvasWidth * a random decmial between .1 and .99 and assigns it
                circle.y = groundY*Math.random();// multiplies canvasWidth * a random decmial between .1 and .99 and assigns it
                background.addChild(circle);// adds the cicle to the background
            }
            
            
            var moon = draw.bitmap('img/moon.png');
            moon.x =canvasWidth -300;
            moon.y = groundY -450;
            moon.scaleX = 0.5;
            moon.scaleY =0.5;
            background.addChild(moon);

            
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var k = 0;k<5;k++){
                var buildingHeight = 300;// creates a building height that holds it at 300 pixels
                var building = draw.rect(75,buildingHeight, 'LightGray', 'Black', 1);//creates a variable that 
                building.x = 200*k;// positions the x of each building to 200 pixls
                building.y = groundY-buildingHeight;// sets the y of the building to groundY - the building height
                background.addChild(building);// adds building to the background
                buildings.push(building);// pushes the building variable to the end of the buildings array
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');// draws the tree
            tree.x =400;// gives the tree a position on the x
            tree.y =360;// aassigns the y value to the tree
            tree.scaleX = .5// makes the tree smaller in width
            tree.scaleY =.5// makes the tree smaller in height
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1;// taking the value of tree.x and increasing it evrytime the function runs. makes it move right
            if(tree.x < -200){
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for(var k =0;k < buildings.length; k++){
                buildings[k].x = buildings[k].x -0.5;
                if (buildings[k].x < 0){
                    buildings[k].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
