(function(){
    function gameCtrl(Table, Player, Ball){
        
        this.table = Table;
        this.table.draw();
        
        this.player1 = Player;
        this.player1.x = 25;
        this.player1.y = 300;
        this.player1.isHuman = true;
        this.player1.render();
        
        this.player2 = Player;
        this.player2.x = this.table.width - 25;
        this.player2.y = 500;
        this.player2.isHuman = false;
        this.player2.render()
        
        this.ball = Ball;
        this.ball.x = this.table.width/2;
        this.ball.y = this.table.height/2;
        this.ball.render();
        
    }
    
    angular.module('bloc-pong')
           .controller("gameCtrl", ["Table","Player","Ball", gameCtrl]);

})();