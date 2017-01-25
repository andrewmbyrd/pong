(function(){
    function Table(){
        
        var table = {};
        
        table.draw = function(){
            //get the canvas
            var canvas = document.getElementById("table");
            var context = canvas.getContext("2d");
            
            table.width = canvas.width;
            table.height = canvas.height;

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
        
        
        
        return table;
        
    }
    
    angular.module('bloc-pong')
           .factory("Table", Table);

})();