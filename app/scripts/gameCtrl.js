function Table(){

    this.draw = function(){
        //get the canvas
        var canvas = document.getElementById("table");
        var context = canvas.getContext("2d");

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

var table = new Table;

table.draw();

function Player(x,y, isHuman){

    
    var canvas = document.getElementById("table");

    this.x = x;
    this.y = y;
    this.speed = 20;
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

    this.render = function(){
        //get the canvas element and context

        var context = canvas.getContext("2d");

        context.beginPath();

        //change this depending if I ever implement different color paddles
        context.strokeStyle = "#fff";


        context.moveTo(this.x, this.y);
        context.lineWidth = this.width;
        context.lineTo(this.x, this.y + this.height);

        context.closePath();
        context.stroke();

    };

   

}

var player1 = new Player(25, 300, true);
var computer = new Player(table.width - 25, 300, false);

function Ball(x_pos, y_pos){


    this.x = x_pos;
    this.y = y_pos;
    this.radius = 5;
    this.speed = 4;
    
    var pi = Math.PI;
    //gives a direction in radians. 0 degrees is east, 90 degrees is north
    this.direction = Math.random()*(7*pi/6-5*pi/6) + 5*pi/6; 

   
    
    this.move = function(code){
        
        console.log(this.direction*180/pi);
        
        var canvas = document.getElementById("table");
        var context = canvas.getContext("2d");
        
        this.x += Math.cos(this.direction) * this.speed;
        this.y -= Math.sin(this.direction) * this.speed;
        
        
        
    };
    
   
    this.render = function(){
        var canvas = document.getElementById("table");
        var context = canvas.getContext("2d");

        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
        context.closePath();
        context.fillStyle = "#fff";
        context.fill();
        context.stroke();
    };
    
}

var ball = new Ball(table.width/2, table.height/2);


var render = function(){
    
    table.draw();
    player1.render();
    computer.render();
    ball.render();
    
}

var animate = window.requestAnimationFrame;

var step = function(timestamp){
    
    render();
    ball.move();
    animate(step);
    
};




window.addEventListener("keydown", function(event){
    player1.move(event.keyCode);
});

window.addEventListener("keypress", function(event){
    if(event.keyCode == 32){
        step();
    }
});



window.onload = render;  
   