'use strict';

// Declare app level module which depends on views, and components
angular.module('dashboard', [
  'ngRoute',
  'dashboard.pipelineview',
  'dashboard.view2',
  'patternfly',
  'dashboard.settings'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: 'settings'});
}]);
