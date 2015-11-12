var ouija = angular.module('ouija', ['ngRoute', 'ngAnimate',
  'ui.bootstrap', 'angulartics', 'angulartics.piwik', 'infinite-scroll']);

ouija.config(['$routeProvider', '$analyticsProvider', '$compileProvider',
    function($routeProvider, $analyticsProvider, $compileProvider) {

  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'HomeController',
    resolve: {}
  });

  $routeProvider.when('/tables/', {
    templateUrl: 'tables/list.html',
    controller: 'TablesController',
    resolve: {
      tables: function(tablesService) { return tablesService.listTables() },
    }
  });

  $routeProvider.when('/tables/:id', {
    templateUrl: 'tables/view.html',
    controller: 'TableController',
    resolve: {
      table: ['tablesService', '$route', function(tablesService, $route) { return tablesService.getTable($route.current.params.id) }],
      data:  ['tablesService', '$route', function(tablesService, $route) { return tablesService.getTableRows($route.current.params.id) }],
    }
  });

/*
  $routeProvider.when('/queries/', {
    templateUrl: 'queries/list.html',
    controller: 'QueryController',
    reloadOnSearch: false,
    resolve: {
      collection: loadQueryList,
    }
  });

  $routeProvider.when('/queries/:id', {
    templateUrl: 'queries/view.html',
    controller: 'QueryController',
    reloadOnSearch: false,
    resolve: {
      collection: loadQueryBind,
    }
  });
*/

  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $compileProvider.debugInfoEnabled(false);
}]);