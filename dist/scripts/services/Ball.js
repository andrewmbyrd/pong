(function(){
    function Ball(){
        
        var ball = {};
        
        ball.x = null;
        ball.y = null;
        ball.radius = 5;
        
        ball.move = function(){
            //to be implemented
        };
        
        ball.render = function(){
            var canvas = document.getElementById("table");
            var context = canvas.getContext("2d");
            
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
            context.closePath();
            context.fillStyle = "#fff";
            context.fill();
            context.stroke();
        };
        return ball;
        
    }
    
    angular.module('bloc-pong')
           .factory("Ball", Ball);

})();