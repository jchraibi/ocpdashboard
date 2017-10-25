'use strict';

angular.module('dashboard.settings', ['ngRoute'])

    .factory('SettingsFactory', function () {
        var settings = {
            master_url: "https://master.demo.openshift.fr:8443",
            devproject: "",
            qaproject: "",
            prodproject: "",
            accessToken: ""
        };

        settings.master_url = "https://master.demo.openshift.fr:8443"
        settings.devproject = "nodejs";
        settings.qaproject = "nodejs";
        settings.prodproject = "nodejs";
        settings.accessToken = "vY1PO1qbNFoWOd9QB-OVaQ1mR0y_qy1CtdJg5YOPBtE";

        return {
            setConfig: function(dev, qa, prod, accessToken, master_url) {
                settings.devproject = dev;
                settings.qaproject = qa;
                settings.prodproject = prod;
                settings.accessToken = accessToken;
                settings.master_url = master_url;

            },
            getsettings: function() {
                return settings;
            }
        }

    })

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'settings/settingsview.html',
            controller: 'SettingsCtrl'
        });
    }])


    .controller('SettingsCtrl', ['$scope', '$http', 'SettingsFactory', '$location', function ($scope, $http, SettingsFactory, $location) {

        $scope.projects = [
            {"name":"project1"},
            {"name":"project2"},
            {"name":"project3"}
        ];

        $scope.settings = SettingsFactory.getsettings();
        console.log("Setting Factory init");
        console.log($scope.settings);

        $scope.devprojectinput = $scope.settings.devproject;
        $scope.stagingprojectinput = $scope.settings.qaproject;
        $scope.productionprojectinput = $scope.settings.prodproject;
        $scope.master_url = $scope.settings.master_url;

        $scope.accessToken = $scope.settings.accessToken;

        $scope.saveConfig = function(){
            SettingsFactory.setConfig($scope.devprojectinput, $scope.stagingprojectinput, $scope.productionprojectinput, $scope.accessToken);
            $location.path('/pipelineview');
        };


    }]);