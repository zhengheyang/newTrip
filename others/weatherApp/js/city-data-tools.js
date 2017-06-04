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


    console.log(cityData);
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
