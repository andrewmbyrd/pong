function Player(x,y,isHuman){

    
    var canvas = document.getElementById("table");

    this.x = x;
    this.y = y;
    this.speed = 3;
    this.isHuman = isHuman;


    this.width = 5;
    this.height = 100;

    /*function move
    *@desc takes a keycode int. code is provided by the input given to 
    *window.eventListener.  changes the position of the paddle if it is within bounds of the table
    */
    this.move = function(code){
        if(code){
            if(this.y > this.speed +10){
                this.y -= this.speed;
            }
        }else{
            if(this.y + this.height< canvas.height - 10 - this.speed){
                this.y += this.speed;
            }
        }
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


