/**
 * Created by zhyang on 17-6-27.
 */
angular.module('weatherApp.controller', [])
    .controller('homeController', function ($scope, $state,$http,$sce) {
        $scope.changeCity = function () {
            $state.go("province", {})
        };
        $scope.currentCity = JSON.parse(localStorage.getItem('test'));
        if(!localStorage.getItem('test')){
            $scope.currentCity={
                name: "北京",
                adcode:"101010100",
                count: 0
            }
        }

        $http({
            method: 'GET',
            url: 'https://free-api.heweather.com/v5/weather?city='+'CN'+$scope.currentCity.adcode+'&key=529bd5eca4814a4dbf7aaf00cf2d136f'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.today=response.data.HeWeather5[0];
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        var forecastsUrl = $sce.trustAsResourceUrl('http://api.k780.com/?app=weather.future&weaid='+$scope.currentCity.adcode+'&appkey=26019&sign=b90eb519ff16ddbc533dfcee16ed41f0&format=json')
        $http.jsonp(forecastsUrl, {jsonpCallbackParam: 'jsoncallback'})
            .then(function(response) {
            $scope.forecasts=response.data.result;
        }, function(response) {
            // 请求失败执行代码
        });

        $scope.playWeather=function (message) {
            weather(message);
        }


    })
    .controller('provinceController', function ($scope, $state) {
        $scope.citylist = citylist.list;
        $scope.mostCity=getMostUseCity();
        $scope.selectProvince = function (index) {
            $state.go("city", {
                data: $scope.citylist[index].city
            })
        };
        $scope.goHome=function (index) {
            addCityCount($scope.mostCity[index]);
            localStorage.setItem('test',JSON.stringify($scope.mostCity[index]));
            $state.go("home", {});
        }
    })
    .controller('cityController', function ($scope, $state, $stateParams) {
        $scope.cityData = $stateParams.data;
        $scope.selectCity = function (index) {
            addCityCount($scope.cityData[index]);
            localStorage.setItem('test',JSON.stringify($scope.cityData[index]));
            $state.go("home", {});
        }
    });