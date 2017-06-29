/**
 * Created by zhyang on 17-6-29.
 */
angular.module('weatherApp.services', [])
    .factory('apiData', function ($http, $sce, $q) {
        return {
            getNowApi: function (currentcity) {
                var deferred = $q.defer();
                var forecastsUrl = $sce.trustAsResourceUrl('http://api.k780.com/?app=weather.future&weaid=' + currentcity + '&appkey=26019&sign=b90eb519ff16ddbc533dfcee16ed41f0&format=json')
                $http.jsonp(forecastsUrl, {jsonpCallbackParam: 'jsoncallback'})
                    .then(function (response) {
                        deferred.resolve(response.data.result);
                    }, function (response) {
                        deferred.reject(alert('未请求到！请重试！'));
                    });
                return deferred.promise;
            },
            getHeweather: function (currentcity) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'https://free-api.heweather.com/v5/weather?city=' + 'CN' + currentcity + '&key=529bd5eca4814a4dbf7aaf00cf2d136f'
                }).then(function successCallback(response) {
                    deferred.resolve(response.data.HeWeather5[0]);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            },
            getPosition:function () {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://restapi.amap.com/v3/ip?&key=dc94d3008ab59159aa4f0b36cc67e89f'
                }).then(function successCallback(response) {
                    console.log(response);
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(alert('未请求到！请重试！'));
                });
                return deferred.promise;
            }
        }
    })
    .factory('check', function () {
        return {
            firstOpen: function () {
                if (!localStorage.getItem('selectCity')) {
                    return {
                        name: "北京",
                        adcode: "101010100",
                        count: 0
                    }
                } else {
                    return JSON.parse(localStorage.getItem('selectCity'));
                }
            }
        }
    })
    .factory('storageMethod', function () {
        var CITY_KEY = "mostUserCity";

        function saveCityData(cityData) {
            localStorage.setItem(CITY_KEY, JSON.stringify(cityData));
        }

        function getCityData() {
            var data = localStorage.getItem(CITY_KEY);
            if (!data) {
                return null;
            } else {
                return JSON.parse(data);
            }
        }


        return {
            getMostUseCity: function () {
                var cityArr = [
                    {
                        name: "北京",
                        adcode: "101010100",
                        count: 0
                    },
                    {
                        name: "上海",
                        adcode: "101020100",
                        count: 0
                    },

                    {
                        name: "广州",
                        adcode: "101280101",
                        count: 0
                    },
                    {
                        name: "深圳",
                        adcode: "101280601",
                        count: 0
                    },
                    {
                        name: "杭州",
                        adcode: "101210101",
                        count: 0
                    },
                    {
                        name: "武汉",
                        adcode: "101200101",
                        count: 0
                    },
                    {
                        name: "成都",
                        adcode: "101270101",
                        count: 0
                    },
                    {
                        name: "西安",
                        adcode: "101110101",
                        count: 0
                    }
                ];

                var cityData = getCityData();

                if (!cityData) {
                    saveCityData(cityArr);
                } else {
                    cityArr = cityData;
                }

                cityArr.sort(function (a, b) {
                    return b.count - a.count;
                });
                return cityArr.splice(0, 8);
            },
            //增加城市访问计数
            addCityCount: function (cityObj) {
                var cityData = getCityData();
                var isHaveCity = false;

                for (var i = 0; i < cityData.length; i++) {
                    if (cityData[i].name == cityObj.name) {
                        cityData[i].count++;
                        isHaveCity = true;
                    }
                }

                if (!isHaveCity) {
                    cityData.push({
                        name: cityObj.name,
                        adcode: cityObj.adcode,
                        count: 1
                    })
                }
                saveCityData(cityData);
            },
            saveSelectCity: function (data) {
                localStorage.setItem('selectCity', JSON.stringify(data));
            }

        }
    })


