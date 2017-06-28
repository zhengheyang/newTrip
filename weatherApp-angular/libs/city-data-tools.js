var CITY_KEY = "mostUserCity";

//获取最常访问城市数组
function getMostUseCity() {

    var cityArr = [
        {
            name: "北京",
            adcode:"101010100",
            count: 0
        },
        {
            name: "上海",
            adcode:"101020100",
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
            adcode:"101210101",
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
function addCityCount(cityObj) {

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
            adcode:cityObj.adcode,
            count: 1
        })
    }

    saveCityData(cityData);

}

