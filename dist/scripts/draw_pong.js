(function(){
    function config($stateProvider, $locationProvider){
        
        $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
        
        $stateProvider
             .state('landing', {
                 url: '/',
                 templateUrl: '/templates/pong_board.html'
        });
        
    }
    
    
    angular.module("bloc-pong", ["ui.router"])
           .config(config);
    
})();