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
                 templateUrl: '/templates/home.html'
        })
        
        $stateProvider
             .state('play', {
                 url: '/play',
                 controller: 'gameCtrl as game',
                 templateUrl: '/templates/pong_table.html'
        });
        
    }
    
    
    angular.module("bloc-pong", ["ui.router"])
           .config(config);
    
})();