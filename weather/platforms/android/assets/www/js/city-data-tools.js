var CITY_KEY = "mostUserCity";

//获取最常访问城市数组
function getMostUseCity() {

    var cityArr = [
        {
            name: "北京",
            count: 0
        },
        {
            name: "上海",
            count: 0
        },

        {
            name: "广州",
            count: 0
        },
        {
            name: "深圳",
            count: 0
        },
        {
            name: "杭州",
            count: 0
        },
        {
            name: "武汉",
            count: 0
        },
        {
            name: "成都",
            count: 0
        }
    ];

    var cityData = getCityData();

    if (!cityData) {
        saveCityData(cityArr);
    } else {
        cityArr = cityData;
    }


    cityArr.sort(function(a, b) {
        return b.count - a.count;
    });
    return cityArr.splice(0, 7);

}


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





//增加城市访问计数
function addCityCount(cityName) {

    var cityData = getCityData();
    var isHaveCity = false;


    for (var i = 0; i < cityData.length; i++) {
        if (cityData[i].name == cityName) {
            cityData[i].count++;
            isHaveCity = true;
        }
    }

    if (!isHaveCity) {
        cityData.push({
            name: cityName,
            count: 1
        })
    }

    saveCityData(cityData);

}


//请求数据
function getWeatherApi(city) {
    $.post("https://free-api.heweather.com/v5/weather?", {
            city: city + "市",
            key: '529bd5eca4814a4dbf7aaf00cf2d136f'
        },
        function(data) {
            localStorage.setItem("currentData", JSON.stringify(data.HeWeather5[0]));

            if(city.split('')[city.length-1]=='区'){
                city=city.substring(0,city.length-1);
            }
            $.ajax({
                type: 'get',
                async: false,
                url: 'http://api.k780.com/?app=weather.future&weaid=' + city + '&appkey=26019&sign=b90eb519ff16ddbc533dfcee16ed41f0&format=json&jsoncallback=data',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'data',
                success: function(data) {
                    localStorage.setItem("forecastData", JSON.stringify(data.result));
                    location.assign("index.html");
                },
                error: function() {
                    alert('请重试');
                }
            });
        });
}

function nowApiCity() {
    $.ajax({
        type          : 'get',
        async         : false,
        url           : 'http://api.k780.com/?app=weather.city&appkey=26019&sign=b90eb519ff16ddbc533dfcee16ed41f0&format=json&jsoncallback=data',
        dataType      : 'jsonp',
        jsonp         : 'callback',
        jsonpCallback : 'data',
        success       : function(data) {
            console.log(data);
        },
        error:function(){
            alert('fail');
        }
    });
}

