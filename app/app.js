var app = angular.module("myApp", ['ngRoute','ngAnimate']);

    app.config(['$routeProvider', function($routeProvider) {

          $routeProvider
            .when('/home', {

              templateUrl: 'views/home.html',
              controller:'jobs'
            })
            .when('/contact', {

              templateUrl: 'views/contact.html',
              controller:'ContactController'

            })
            .when('/contact-success', {

              templateUrl: 'views/contact-success.html',
              controller: 'ContactContoller'
            })
            .when('/directory', {

                templateUrl: 'views/directory.html',
                controller: 'jobs'
            })
            .otherwise({

              redirectTo: '/home'

            });
    }]);

    app.directive('randomSource', [function() {

        return {

            restrict: 'E',
            scope: {

                jobs:'=',
                title: '='
            },
            templateUrl: 'views/random.html',
            transclude: true,
            replace: true,
            controller: function($scope) {

              $scope.random = Math.floor(Math.random() * 4);

            }

        };

    }]);
    app.controller("jobs",['$scope','$http', function($scope,$http) {

      $scope.rmJob = function(x) {

        var val = $scope.jobs.indexOf(x);
        $scope.jobs.splice(val,1);
      };

      $scope.addJob = function() {

        $scope.jobs.push({

            name: $scope.newJob.name,
            job: $scope.newJob.job,
            experience: $scope.newJob.experience,
            contact: $scope.newJob.contact
        });

         $scope.newJob.name = "";
         $scope.newJob.job = "";
         $scope.newJob.experience = "";
         $scope.newJob.contact = "";
      };

      $scope.removeAll = function() {

          $scope.jobs = [];
      };

      $http.get('data/myData.json').success(function(data) {

          $scope.jobs = data;

      });

}]);

  app.controller("ContactController", ['$scope','$location', function($scope,$location) {

    $scope.sendMessage = function() {
      $location.path('contact-success');
    }

  }]);
