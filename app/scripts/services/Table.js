(function(){
    function Table(){
        
        var table = {};
        
        table.draw = function(){
            //get the canvas
            var canvas = document.getElementById("table");
            console.log(canvas);
            var context = canvas.getContext("2d");

            //draw the black background
            context.fillStyle = "#000000";
            context.fillRect(0,0,1422,800);

            //draw the corners
            context.beginPath();
            context.strokeStyle = "#ffffff";

            //top left
            context.moveTo(10,10);
            context.lineTo(10,40);
            context.moveTo(10,10);
            context.lineTo(20,10);

            //top right
            context.moveTo(1412,10);
            context.lineTo(1402,10);
            context.moveTo(1412,10);
            context.lineTo(1412,40);

            //bottom left
            context.moveTo(10,790);
            context.lineTo(10,760);
            context.moveTo(10,790);
            context.lineTo(20,790);

            //bottom right
            context.moveTo(1412,790);
            context.lineTo(1402,790);
            context.moveTo(1412,790);
            context.lineTo(1412,760);

            context.closePath();
            context.stroke();
        };
        
        table.draw();
        
        return table;
        
    }
    
    angular.module('bloc-pong')
           .factory("Table", Table);

})();