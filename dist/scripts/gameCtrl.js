//get the canvas and context objects to be used throughout the project
var canvas = document.getElementById("table");
var context = canvas.getContext("2d");

//store global hit and score variables
var p1Score = 0;
var p2Score = 0;
var hits = 0;

//initialize sound objects
var intro = new buzz.sound("/assets/sounds/home", {
                            formats: ["mp3", "aac", "wav", "midi"],
                            preload: true,
                            autoplay: true,
                            loop: true
                           
                           });

var bgm = new buzz.sound("/assets/sounds/bgm", {
                            formats: ["mp3", "aac", "wav", "midi"],
                            preload: true,
                            autoplay: false,
                            loop: true
                           
                           });

var select = new buzz.sound("/assets/sounds/select",{
    formats: ["m4a", "mp3"],
    preload: true,
    autoplay: false,
    loop: false
});

var start = new buzz.sound("/assets/sounds/start",{
    formats: ["wav", "midi", "mp3"],
    preload: true,
    autoplay: false,
    loop: false
});

var boop1 = new buzz.sound("/assets/sounds/boop1",{
    formats: ["m4a", "mp3"],
    preload: true,
    autoplay: false,
    loop: false
});

var boop2 = new buzz.sound("/assets/sounds/boop2",{
    formats: ["m4a", "mp3"],
    preload: true,
    autoplay: false,
    loop: false
});

var boop3 = new buzz.sound("/assets/sounds/boop3",{
    formats: ["m4a", "mp3"],
    preload: true,
    autoplay: false,
    loop: false
});

var winner = new buzz.sound("/assets/sounds/winner",{
    formats: ["wav", "mp3"],
    preload: true,
    autoplay: false,
    loop: false
});

var wall = new buzz.sound("/assets/sounds/wall",{
    formats: ["m4a", "mp3"],
    preload: true,
    autoplay: false,
    loop: false
});

wall.setVolume(30);

var hitSounds = [boop1, boop2, boop3];

//get the retro font
WebFont.load({
   google: {
       families: ['VT323']
   } 
});

/*@constructor function Table
*@desc sets up the width and height of the table
*has a function to draw the table
*/
function Table(){

    this.draw = function(){
        //get the canvas
        

        this.width = canvas.width;
        this.height = canvas.height;

        //draw the black background
        context.fillStyle = "#000000";
        context.fillRect(0,0,canvas.width,canvas.height);

        //draw the corners
        context.beginPath();
        context.strokeStyle = "#ffffff";

        //top left
        context.moveTo(10,10);
        context.lineTo(10,40);
        context.moveTo(10,10);
        context.lineTo(20,10);

        //top right
        context.moveTo(canvas.width - 10,10);
        context.lineTo(canvas.width - 20,10);
        context.moveTo(canvas.width - 10,10);
        context.lineTo(canvas.width - 10,40);

        //bottom left
        context.moveTo(10,canvas.height - 10);
        context.lineTo(10,canvas.height - 40);
        context.moveTo(10,canvas.height - 10);
        context.lineTo(20,canvas.height - 10);

        //bottom right
        context.moveTo(canvas.width - 10,canvas.height - 10);
        context.lineTo(canvas.width - 20,canvas.height - 10);
        context.moveTo(canvas.width - 10,canvas.height - 10);
        context.lineTo(canvas.width - 10,canvas.height - 40);

        //draw the dotted line down the center
        context.moveTo(canvas.width/2, 10);
        for(var i = 0; i < canvas.height; i+=80 ){
            if(i+80>canvas.height-10){
                context.lineTo(canvas.width/2, canvas.height-10);
            }else{
                context.lineTo(canvas.width/2, i+50);
            }
            context.moveTo(canvas.width/2, i+80);

        }
        context.closePath();
        context.stroke();
    };
    this.canBegin = false;

}

var table = new Table();

/* constructor function Player
*@desc creates methods for the two players
*/
function Player(x,y, speed){
    
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isHuman = true;


    this.width = 5;
    this.height = 100;

    /*function move
    *@desc takes a keycode int. code is provided by the input given to 
    *window.eventListener.  changes the position of the paddle if it is within bounds of the table
    */
    this.move = function(code){
        
            if(code == 119 || code == 87 || code == 38 ){
                if(this.y > 10 + this.speed){
                    this.y -= this.speed;    
                }
            }else if(code == 115 || code == 83 || code == 40 ){
                if(this.y + this.height< canvas.height - 10 - this.speed){  
                    this.y += this.speed;  
                }
            }
        
        
        
    };
    
    
    /* function slide
    *@desc allows the paddle to move based on mouse movement
    */
    this.slide = function(event){
        
        while(this.y + this.height/2 > event.clientY && this.y > 10){
            this.y -= this.speed;
        }
        
        while(this.y + this.height/2 < event.clientY && this.y+100 < canvas.height - 10){
            this.y += this.speed;
        }
    };
    
    /* function render
    *@desc draws the paddle based on the color selected in the menu
    */
    this.render = function(){
        //get the canvas element and context

        var context = canvas.getContext("2d");

        context.beginPath();

        //change this depending if I ever implement different color paddles
        context.strokeStyle = this.color;


        context.moveTo(this.x, this.y);
        context.lineWidth = this.width;
        context.lineTo(this.x, this.y + this.height);

        context.closePath();
        context.stroke();

    };
    
    /* function defend
    *@desc this function is called when player 2 is set as a computer
    *the different difficulties allow for movement only when the location of the ball is 
    *a certain way
    */
    this.defend = function(){
        
        switch(this.difficulty){
            //easy mode will only look if the ball is within 300px of the right paddle.
            //will move if the ball is 55 pixels away from the center
            case "easy":
                var scopeX = 300;
                var scopeY = 55;
                this.speed = 10;
            break;
            case "medium":
                var scopeX = 400;
                var scopeY = 25;
                this.speed = 15;
            break;
                
            //impossible mod always moves
            default:
                var scopeX = canvas.width;
                var scopeY = 0;
        }
        
        if(this.x - ball.x < scopeX){
            if ((ball.y - scopeY> this.y + this.height/2) && (this.y + this.height< canvas.height - 10 - this.speed)){
                this.y += this.speed;
            }

            if(( ball.y + scopeY < this.y + this.height/2) && (this.y > 10 + this.speed)){
                this.y -= this.speed;    
            }
        }
    };

 }

//instantiate the players with x location, initial y location, and speed
var player1 = new Player(25, 300, 20);
var player2 = new Player(canvas.width - 25, 300, 20);


/* constructor function Ball
*@desc creates all the ball properties and methods
*/
function Ball(x_pos, y_pos){


    this.x = x_pos;
    this.y = y_pos;
    this.radius = 5;
    this.startSpeed = 10;
    this.speed = this.startSpeed;
    this.canMove = false;
    
    var pi = Math.PI;
    //gives a direction to be travelled in radians. 0 rads is east, pi/2 rads is north. 
    //Initialize to go to the left on serve, within 30 degrees of horizontal
    this.direction = Math.random()*(7*pi/6-5*pi/6) + 5*pi/6; 

   
    /*function move
    *@desc tells the ball object how to move
    */
    this.move = function(code){
        
        //vectorLength gives the magnitude of the distance to be travelled
        var vectorLength = this.speed;
        
        /*checking for overshot of the paddle
        *as the speed of the ball gets faster, it's possible that the ball will leap right over
        *the 5 pixel width of the paddle. In order to combat this, if the magnitude of movement
        *in the x direction could cause the ball to jump past the paddle, then slow it down
        8such that the magnitude of x movement can't be greater than 10 pixels this step
        */
        if(this.x < 60 && Math.cos(this.direction)*vectorLength < -10 ){
            vectorLength = 10;
            
            
        }else if(this.x > canvas.width - 60 && Math.cos(this.direction)*vectorLength > 10 ){
            vectorLength = 10;
        }
      //if the ball is nowhwere near the paddles, then move normally
        
    
       //using these geometric functions, we establish a vector on which to move the center of the ball 
       this.x += Math.cos(this.direction) * vectorLength;
       this.y -= Math.sin(this.direction) * vectorLength;
        
        
        
        this.detectCollision();
        
        //if the ball gets past the paddles, award a score and reset the table
        if(this.x < 2){
            p2Score++;
            bgm.stop();
            bgm.setPercent(0);
            this.reset(2);
        }
        
        if(this.x > canvas.width -2){
            p1Score++;
            bgm.stop();
            bgm.setPercent(0);
            this.reset(1);
        }
        
        
    };
    
    /*function reset
    *@params Integer - the player that scored
    @desc stops ball movement, resets game speed, puts the ball back in the center of the table WITHOUT rendering it
    *establishes which direction the ball should be served, checks if the game is over
    */
    this.reset = function(scoringPlayer){
        this.speed = 0;
        hits = 0;
        this.canMove = false;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        
        if(scoringPlayer == 1){
            this.direction = Math.random()*(7*pi/6-5*pi/6) + 5*pi/6;
        }else{
            var angle = Math.random();
            var upOrDown = 1;
            if(angle < 0.5)
                upOrDown *= -1;
            this.direction = Math.random()*(pi/6)*upOrDown;
        }
        
        
        context.font = 'bold 50pt VT323';
        context.fillText(String(p1Score), canvas.width/4, 100);
        context.fillText(String(p2Score), canvas.width*3/4, 100);
        context.fillText("Click to continue", canvas.width/3 - 40, canvas.height - 400);
        
        if(p1Score > 10 || p2Score > 10){
            this.endGame(scoringPlayer);
        }
    };
    
    /*function endGame
    *@params integer - the player who won
    *if 11 points are scored, prints message to the screen and offers to reset the game
    */
    this.endGame = function(player){
        winner.play();
        var congrats;
        var spacer = 10;
        if(player == 1){
            congrats = "Player 1 Wins!";
        }else if(player2.isHuman){
            congrats = "Player 2 Wins!";
        }else{
            congrats = "The computer won!! :O :(";
            spacer = -120; 
        }
        
        context.fillText(congrats, canvas.width/3 + spacer, canvas.height/2);
        context.font = 'normal 30pt VT323';
        context.fillText("Click to go ahead and run the game back again.", canvas.width/10, canvas.height/2 + 100);
        context.fillText("Reload this page to select new game options!", canvas.width/5, canvas.height/2+175);
        
        p1Score = 0;
        p2Score = 0;
    };
    
    
    /*function detect collision
    *@desc checks if the ball hit a paddle, and if it did, change its direction
    *(the move function which is running on the next frame will then make the ball go the other way)
    */
    this.detectCollision = function(){
        
        var leftEdge = this.x - this.radius;
        var rightEdge = this.x + this.radius;
        var top = this.y - this.radius;
        var bottom = this.y + this.radius;
        
        //detect collision with player 1 paddle
        if(leftEdge < 35 && leftEdge >= 25 ){
            //if the ball is blocked from exiting by the paddle
            if (player1.y <= bottom && player1.y+player1.height >= top && Math.cos(this.direction) < 0){
                //give the ball a new direction in radians, anywhere from pi/3 to -(pi/3) based on where on the paddle the ball was struck
                //increment the hits variable and speed up the ball
                this.direction = ((player1.y+50 - this.y)/50.0)*pi/3;
                hits++;
                if(this.startSpeed + Math.sqrt(hits) > 15){
                    this.speed = this.startSpeed + 1.5*Math.sqrt(hits);
                }else{
                    this.speed = this.startSpeed + Math.sqrt(hits);
                }
                
                console.log("hits" + hits);
                console.log("speed " +this.speed);
                hitSounds[Math.floor(Math.random()*3)].play();
            }
        }
        
        
        //detect collision with second player paddle
        if(rightEdge > canvas.width - 30 && rightEdge <= canvas.width - 20 &&  Math.cos(this.direction) > 0){
            if (player2.y - 10 <= bottom  && player2.y+player2.height + 3 >= top){ 
                this.direction = (2+(this.y - player2.y)/50.0)*pi/3;
                hits++;
                hitSounds[Math.floor(Math.random()*3)].play();
            }
        }
        
        //detect collision with top of table
        if(top < 15){
            this.direction *= -1;
            wall.play();
        }
        
        //detect collision with bottom of table
        if(bottom > canvas.height - 15){
            this.direction *= -1;
            wall.play();
        }
    };
   
    //draws the  ball on the canvas
    this.render = function(){
        var canvas = document.getElementById("table");
        var context = canvas.getContext("2d");

        context.beginPath();
        context.strokeStyle = "#fff";
        context.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
        context.closePath();
        context.fillStyle = "#fff";
        context.fill();
        context.stroke();
    };
    
}

var ball = new Ball(canvas.width/2, canvas.height/2);


//draw the table, both players, and the ball
var render = function(){
    
    table.draw();
    player1.render();
    player2.render();
    ball.render();
    
    
};

var animate = window.requestAnimationFrame;


/*function step
*@ desc - calls render 60 times per second if the ball can move. move the ball
*if the player is a computer, ask it to move
*(player directed movement is handled in event listeners below)
*/

var step = function(timestamp){
    
    render();
    if(ball.canMove)
        ball.move();
    if(!player2.isHuman){
        player2.defend();
    }
    if(ball.canMove)
        animate(step);
    
};



//check for up and down movement of the paddles
window.addEventListener("keydown", function(event){
    if(event.keyCode == 87  || event.keyCode == 119 || event.keyCode == 115 || event.keyCode == 83)
       if(player1.control == "keys"){
           player1.move(event.keyCode);
       }
});

window.addEventListener("keydown", function(event){
    
    if(event.keyCode == 38 || event.keyCode == 40)    
        player2.move(event.keyCode);
});

 
/*pressing spacebar serves the ball IN CHROME. Had to nix this feature due to unreliable keycode recognition in firefox
window.addEventListener("keypress", function(event){
    console.log(event.charCode);
    if(event.keyCode == 13 && !ball.canMove && table.canBegin ){
        console.log("Space bar pressed");
        ball.canMove = true;
        bgm.play();
        step();
        ball.speed = ball.startSpeed;
        
    }
});
*/
//clicking serves the ball
window.addEventListener("click", function(event){
    if(table.canBegin && !ball.canMove){
        ball.canMove = true;
        bgm.play();
        step();
        ball.speed = ball.startSpeed;
    }
});

//move the paddle with mouse input
canvas.addEventListener("mousemove", function(event){
    if(player1.control == "mouse"){
        player1.slide(event);
    }
    
});


var color1Selected = false;
var color2Selected = false;

//these functions progress through menu items and set properties of the game
var revealControls = function(){
    select.play();
    player2.difficulty = $(this.id)["selector"];
    $(".difficulty").css("display", "none");
    $(".controls").css("display", "block");
};

var revealControls2 = function(){
    select.play();
    $(".players").css("display", "none");
    $(".controls").css("display", "block");
    $(".small").css("display", "inline");
    $("#p2-color").css("display", "block");
    player2.isHuman = true;
};

var revealDifficulty = function(){
    select.play();
    $(".players").css("display", "none");
    $(".difficulty").css("display", "block");
    $("#comp-color").css("display", "block");
    player2.isHuman = false;
};


var revealColors = function(){
    select.play();
    console.log($(this.id)["selector"]);
    $(".controls").css("display", "none");
    $(".colors").css("display", "block");
    if( $(this.id)["selector"] == "mouse"){
        player1.control = "mouse";
    }else{
        player1.control = "keys";
        player1.speed = 40;
    }
};

var p1RevealStart = function(){
    select.play();
    console.log($(this));
    console.log($(this.id)["selector"]);
    color1Selected = true;
    player1.color = $(this.id)["selector"];
    $(".color1").css("border", "none");
    $(this).css("border", "2px dashed black");
    if(color1Selected && color2Selected){
        $(".begin").css("display", "block");
        render();
    }
};

var p2RevealStart = function(){
    select.play();
    color2Selected = true;
    player2.color = $(this.id)["selector"].substr(0, $(this.id)["selector"].length -1);
    $(".color2").css("border", "none");
    $(this).css("border", "2px dashed black");
    if(color1Selected && color2Selected){ 
        $(".begin").css("display", "block");
        render();
    }
};
  

var showTable = function(){
    intro.stop();
    start.play();
    $(".begin").css("display", "none");
    $("#table").css("display", "block");
    $("h1").css("display", "none");
    $(".colors").css("display", "none");
    context.font = 'bold 50pt VT323';
    context.fillText("Click to continue", canvas.width/3 - 40, canvas.height - 400);
    setTimeout(function(){table.canBegin = true}, 500);
};


$("#1player").click(revealDifficulty);
$("#2player").click(revealControls2);
//$(".hardness").click(revealControls);

$.each($(".hardness"), function(){
    $(this).click(revealControls);
});

$.each($(".control"), function(){
    $(this).click(revealColors);
});

$.each($(".color1"), function(){
    $(this).click(p1RevealStart);
});

$.each($(".color2"), function(){
    $(this).click(p2RevealStart);
});


$(".begin").click(showTable);




   