var canvas = document.getElementById("table");
var context = canvas.getContext("2d");


WebFont.load({
   google: {
       families: ['VT323']
   } 
});
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

}

var table = new Table();

var p1Score = 0;
var p2Score = 0;

var hits = 0;

 



function Player(x,y, speed, isHuman){

    
    var canvas = document.getElementById("table");

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isHuman = isHuman;


    this.width = 5;
    this.height = 100;

    /*function move
    *@desc takes a keycode int. code is provided by the input given to 
    *window.eventListener.  changes the position of the paddle if it is within bounds of the table
    */
    this.move = function(code){
        
            if(code == 119 || code == 87 || code == 38){
                if(this.y > 10 + this.speed){
                    this.y -= this.speed;    
                }
            }else if(code == 115 || code == 83 || code == 40){
                if(this.y + this.height< canvas.height - 10 - this.speed){  
                    this.y += this.speed;  
                }
            }
        
        
        this.render();
    };
    
    this.slide = function(event){
        console.log(event.clientY);
        while(this.y + this.height/2 > event.clientY && this.y > 10){
            this.y -= this.speed;
        }
        
        while(this.y + this.height/2 < event.clientY && this.y < canvas.height - 10){
            this.y += this.speed;
        }
    }

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
    
    this.defend = function(){
        
        switch(this.difficulty){
            case "easy":
                var scopeX = 200;
                var scopeY = 50;
            break;
            case "medium":
                var scopeX = 400;
                var scopeY = 25;
            break;
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
        }/*else{
            if ((ball.y - delay > this.y) && (this.y + this.height< canvas.height - 10 - this.speed)){
                this.y += this.speed;
            }

            if(( ball.y + delay*3/4 < this.y + this.height/2) && (this.y > 10 + this.speed)){
                this.y -= this.speed;    
            }
        }*/
    };

 }

var player1 = new Player(25, 300, 20, true);
var player2 = new Player(canvas.width - 25, 300, 4, true);

function Ball(x_pos, y_pos){


    this.x = x_pos;
    this.y = y_pos;
    this.radius = 5;
    this.startSpeed = 4;
    this.speed = this.startSpeed;
    this.canMove = false;
    
    var pi = Math.PI;
    //gives a direction in radians. 0 degrees is east, 90 degrees is north
    this.direction = Math.random()*(7*pi/6-5*pi/6) + 5*pi/6; 

   
    
    this.move = function(code){
        
        
        
        var canvas = document.getElementById("table");
        var context = canvas.getContext("2d");
        
        //if the ball is nowhwere near the paddles, then move normally
       // if(this.x + Math.cos(this.direction) * this.speed > 36 && this.x + Math.cos(this.direction) * this.speed //< canvas.width - 36 ){
            this.x += Math.cos(this.direction) * this.speed;
       /* }else{
            
            //if moving the ball would put it to the left of the left paddle,
            //AND the left paddle is covering it from going out of bounds
            //put it directly on the left paddle instead
            if((this.x + Math.cos(this.direction) * this.speed < this.x) && this.y> player1.y && this.y < player1.y+player1.height){
                this.x = 35;
            
            //if moving it would put it to the right of the right paddle,
            //put it right on the right paddle instead
            }else if((this.x + Math.cos(this.direction) * this.speed > this.x) && this.y> player2.y && this.y < player2.y + player2.height){
                this.x = canvas.width - 35;
            }else{
                this.x += Math.cos(this.direction) * this.speed;
            }
            
        }
        */
        this.y -= Math.sin(this.direction) * this.speed;
        
        this.detectCollision();
        
        if(this.x < 2){
            p2Score++;
            this.reset(2);
        }
        
        if(this.x > canvas.width -2){
            p1Score++;
            this.reset(1);
        }
        
        
    };
    
    
    this.reset = function(scoringPlayer){
        this.speed = 0;
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
        
        
        context.font = 'bold 50pt VT323'
        context.fillText(String(p1Score), canvas.width/4, 100);
        context.fillText(String(p2Score), canvas.width*3/4, 100);
        
        if(p1Score > 10 || p2Score > 10){
            this.endGame(scoringPlayer);
        }
    };
    
    this.endGame = function(player){
        var congrats;
        var spacer = 100;
        if(player == 1){
            congrats = "Player 1 Wins!";
        }else if(player2.isHuman){
            congrats = "Player 2 Wins!";
        }else{
            congrats = "The computer won!! :O :(";
            spacer = 0;
        }
        
        context.fillText(congrats, canvas.width/3 + spacer, canvas.height/2);
        context.font = 'normal 30pt VT323';
        context.fillText("Press space to go ahead and run the game back again.", canvas.width/4, canvas.height/2 + 100);
        context.fillText("Reload this page to select new game options!", canvas.width/4 + 80, canvas.height/2+175);
        
        p1Score = 0;
        p2Score = 0;
    };
    
    
    this.detectCollision = function(){
        
        var leftEdge = this.x - this.radius;
        var rightEdge = this.x + this.radius;
        var top = this.y - this.radius;
        var bottom = this.y + this.radius;
        //detect collision with player 1 paddle
        if(leftEdge < 35 && leftEdge > 0 ){
            if (player1.y <= this.y + this.radius && player1.y+player1.height >= this.y - this.radius){
                this.direction = pi - this.direction;
                hits++;
                console.log("left score: " +p1Score);
                console.log("right score: " +p2Score);
                console.log("hits: " +hits);
                console.log("speed " + this.speed);
            }
        }
        
        //detect collision with second player paddle
        if(rightEdge > canvas.width - 35  && rightEdge < canvas.width){
            if (player2.y <= this.y + this.radius && player2.y+player2.height >= this.y - this.radius){
                this.direction = pi - this.direction;
                hits++;
            }
        }
        
        //detect collision with top of table
        if(top < 15){
            this.direction *= -1;
        }
        
        //detect collision with bottom of table
        if(bottom > canvas.height - 15){
            this.direction *= -1;
        }
    };
   
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


var render = function(){
    
    table.draw();
    player1.render();
    player2.render();
    ball.render();
    
    
};

var animate = window.requestAnimationFrame;

//this variable just for development tracking
var animationID;

var step = function(timestamp){
    
    render();
    if(ball.canMove)
        ball.move();
    if(!player2.isHuman && Math.cos(ball.direction) >0 && ball.x > canvas.width/2){
        player2.defend();
    }
    if(ball.canMove)
        animationID = animate(step);
   // console.log("animate: " +animationID);
    
};




window.addEventListener("keydown", function(event){
    if(event.keyCode == 87  || event.keyCode == 119 || event.keyCode == 115 || event.keyCode == 83)
        player1.move(event.keyCode);
});

window.addEventListener("keydown", function(event){
    
    if(event.keyCode == 38 || event.keyCode == 40)    
        player2.move(event.keyCode);
});


window.addEventListener("keypress", function(event){
    if(event.keyCode == 32){
        ball.canMove = true;
        step();
        ball.speed = ball.startSpeed;
    }
});

canvas.addEventListener("mousemove", function(event){
    if(player1.control == "mouse"){
        player1.slide(event);
    }
    
});


var color1Selected = false;
var color2Selected = false;

//is there a way to optimize these two functions to be just one?
var revealControls = function(){
    player2.difficulty = $(this.id)["selector"];
    $(".difficulty").css("display", "none");
    $(".controls").css("display", "block");
};

var revealControls2 = function(){
    $(".players").css("display", "none");
    $(".controls").css("display", "block");
    $(".small").css("display", "inline");
    $("#p2-color").css("display", "block");
    player2.isHuman = true;
}

var revealDifficulty = function(){
    $(".players").css("display", "none");
    $(".difficulty").css("display", "block");
    $("#comp-color").css("display", "block");
    player2.isHuman = false;
};


var revealColors = function(){
    console.log($(this.id)["selector"]);
    $(".controls").css("display", "none");
    $(".colors").css("display", "block");
    if( $(this.id)["selector"] == "mouse"){
        player1.control = "mouse";
    }else{
        player1.control = "keys";
    }
};

var p1RevealStart = function(){
    console.log($(this));
    console.log($(this.id)["selector"]);
    color1Selected = true;
    player1.color = $(this.id)["selector"];
    $(".color1").css("border", "none");
    $(this).css("border", "2px dashed orange");
    if(color1Selected && color2Selected){
        $(".begin").css("display", "block");
        render();
    }
};

var p2RevealStart = function(){
    color2Selected = true;
    player2.color = $(this.id)["selector"].substr(0, $(this.id)["selector"].length -1);
    console.log(player2.color);
    console.log($(this));
    console.log($(this.id)["selector"]);
    $(".color2").css("border", "none");
    $(this).css("border", "2px dashed orange");
    if(color1Selected && color2Selected){ 
        $(".begin").css("display", "block");
        render();
    }
};
  

var showTable = function(){
    $(".begin").css("display", "none");
    $("#table").css("display", "block");
    $("h1").css("display", "none");
    $(".colors").css("display", "none");
};


$("#1player").click(revealDifficulty);
$("#2player").click(revealControls2);
//$(".hardness").click(revealControls);

$.each($(".hardness"), function(){
    $(this).click(revealControls);
})

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




   