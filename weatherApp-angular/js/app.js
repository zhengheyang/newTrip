/**
 * Created by zhyang on 17-6-27.
 */
angular.module('weatherApp', ['ui.router', 'weatherApp.controller', 'weatherApp.filter', 'weatherApp.services'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'homeController'
            })
            .state('province', {
                url: '/province',
                templateUrl: 'templates/province.html',
                controller: 'provinceController',
            })
            .state('city', {
                url: '/city',
                templateUrl: 'templates/city.html',
                controller: 'cityController',
                params: {
                    data: {}
                }
            });
        $urlRouterProvider.otherwise('/home');
    })
