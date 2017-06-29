/**
 * Created by zhyang on 17-6-27.
 */
angular.module('weatherApp.controller', [])
    .controller('homeController', function ($scope, $state, apiData, check) {
        $scope.changeCity = function () {
            $state.go("province", {})
        };

        $scope.currentCity = check.firstOpen();

        apiData.getHeweather($scope.currentCity.adcode).then(function (data) {
            $scope.today = data;
        }, function () {
        });

        apiData.getNowApi($scope.currentCity.adcode).then(function (data) {
            $scope.forecasts = data;
        }, function () {
        });

        $scope.playWeather = function (message) {
            weather(message);
        }

    })
    .controller('provinceController', function ($scope, $state, storageMethod,apiData) {
        $scope.citylist = citylist.list;
        $scope.mostCity = storageMethod.getMostUseCity();
        $scope.selectProvince = function (index) {
            $state.go("city", {
                data: $scope.citylist[index].city
            })
        };
        $scope.goHome = function (index) {
            storageMethod.addCityCount($scope.mostCity[index]);
            storageMethod.saveSelectCity($scope.mostCity[index]);
            $state.go("home", {});
        }
        // $scope.getPosition=function () {
        //     apiData.getPosition().then(function (data) {
        //         $scope.positionCity=data;
        //     },function () {
        //     });
        // }
    })
    .controller('cityController', function ($scope, $state, $stateParams, storageMethod) {
        $scope.cityData = $stateParams.data;
        $scope.selectCity = function (index) {
            storageMethod.addCityCount($scope.cityData[index]);
            storageMethod.saveSelectCity($scope.cityData[index]);
            $state.go("home", {});
        }
    });