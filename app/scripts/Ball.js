
function Ball(x_pos, y_pos){


    this.x = x_pos;
    this.y = y_pos;
    this.radius = 5;

    this.move = function(){
        //to be implemented
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
    
