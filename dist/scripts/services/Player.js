(function(){
    function Player(){
        
        var player = {};
        
        player.x = null;
        player.y = null;
        player.isHuman = true;
        
        
        player.width = 5;
        player.height = 100;
        
        player.setY = function(num){
            player.y = num;
        };
        
        player.render = function(){
            //get the canvas element and context
            var canvas = document.getElementById("table");
            var context = canvas.getContext("2d");
            
            context.beginPath();
            
            //change this depending if I ever implement different color paddles
            context.strokeStyle = "#fff";
            
            
            context.moveTo(player.x,player.y);
            context.lineWidth = player.width;
            context.lineTo(player.x, player.y+player.height);
            
            context.closePath();
            context.stroke();
            
        };
        
        return player;
        
    }
    
    angular.module('bloc-pong')
           .factory("Player", Player);

})();