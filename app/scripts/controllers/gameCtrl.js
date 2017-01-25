(function(){
    function gameCtrl(Table){
        
        this.table = Table;
        
    }
    
    angular.module('bloc-pong')
           .controller("gameCtrl", ["Table",gameCtrl]);

})();