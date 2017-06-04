var myData = weatherData.HeWeather[0].daily_forecast;


function writeIn() {
    document.getElementById("location").innerHTML = mostVisitedCity[mostVisitedCity.length - 1];


    document.getElementById("currentState").innerHTML = myData[0].cond.txt_d;
    document.getElementById("currentTmpRange").innerHTML = myData[0].tmp.min + "~" + myData[0].tmp.max + "&#8451;";
    document.getElementById("currentTmp").innerHTML = "当期气温：" + weatherData.HeWeather[0].now.tmp + "&#8451;";
    document.getElementById("wind").innerHTML = weatherData.HeWeather[0].now.wind.dir + weatherData.HeWeather[0].now.wind.sc + "级";
    document.getElementById("aqi").innerHTML = "空气质量指数：" + weatherData.HeWeather[0].aqi.city.aqi + weatherData.HeWeather[0].aqi.city.qlty;
    document.getElementById("title").innerHTML = "7日天气预报";

    // for (var i = 0; i < myData.length; i++) {
    //     document.getElementById("forecast-content").innerHTML += '<div class="row weather-section">' +
    //         '<div class="col-xs-4">' +
    //         '<h4 id="date' + i + '">' + myData[i].date + '</h4>' +
    //         '</div>' +
    //         '<div class="col-xs-4" style="padding:0;">' +
    //         '<h4 id="state' + i + '">' + myData[i].cond.txt_d + "转" + myData[i].cond.txt_n + '</h4>' +
    //         '</div>' +
    //         '<div class="col-xs-4 tmp-box">' +
    //         '<h4 id="minTmp' + i + '">' + myData[i].tmp.min + '</h4>' +
    //         '<h4>' + '~' + '</h4>' +
    //         '<h4 id="maxTmp' + i + '">' + myData[i].tmp.max + '&#8451;' + '</h4>' +
    //         '</div>' +
    //         '</div>'
    // }
    for (var i = 0; i < myData.length; i++) {
        var section = document.createElement("div");
        section.className = "row weather-section";

        var dateDiv = document.createElement("div");
        dateDiv.className = "col-xs-4";
        var dateH4 = document.createElement("H4");
        dateH4.id = "date" + i;
        dateH4.innerHTML = myData[i].date;
        dateDiv.appendChild(dateH4);
        section.appendChild(dateDiv);

        var stateDiv = document.createElement("div");
        stateDiv.className = "col-xs-4";
        stateDiv.style = "padding:0";
        var stateH4 = document.createElement("H4");
        stateH4.id = "state" + i;
        stateH4.innerHTML = myData[i].cond.txt_d + "转" + myData[i].cond.txt_n;
        stateDiv.appendChild(stateH4);
        section.appendChild(stateDiv);

        var tmpDiv = document.createElement("div");
        tmpDiv.className = "col-xs-4 tmp-box";
        var minH4 = document.createElement("H4");
        minH4.id = "minTmp" + i;
        minH4.innerHTML = myData[i].tmp.min;
        tmpDiv.appendChild(minH4);
        var blankH4 = document.createElement("H4");
        blankH4.innerHTML = "~";
        tmpDiv.appendChild(blankH4);

        var maxH4 = document.createElement("H4");
        maxH4.id = "maxTmp" + i;
        maxH4.innerHTML = myData[i].tmp.max + '&#8451;';
        tmpDiv.appendChild(maxH4);
        section.appendChild(tmpDiv);

        document.getElementById("forecast-content").appendChild(section);
    }


    var picBox1 = document.getElementById("localPic");
    picBox1.setAttribute("src", "images/32.png");
    picBox1.setAttribute("width", "50%");
}

function showMostVisited() {
    for (var i = 0; i < 8; i++) {
        var mostCity = document.createElement("div");
        mostCity.className = "col-xs-3";
        var button = document.createElement("button");
        button.innerHTML = mostVisitedCity[i];
        button.onclick = (function(a) {
            return function() {
                location.assign("weather.html");
                var storageCity = localStorage.getItem("selectedCityName");
                localStorage.setItem("selectedCityName", storageCity + ',' + a);
            }
        })(mostVisitedCity[i]);
        mostCity.appendChild(button);
        document.getElementById("mostVisited").appendChild(mostCity);
    }
}

function showProvince() {
    for (var i = 0; i < citylist.citylist.length; i++) {
        var province = document.createElement("div");
        province.className = "col-xs-3";
        var button = document.createElement("button");
        button.innerHTML = citylist.citylist[i].p;
        button.onclick = (function(a) {
            return function() {
                location.assign("city.html");
                localStorage.setItem("cityName", JSON.stringify(a));
            }
        })(citylist.citylist[i].c);
        province.appendChild(button);
        document.getElementById("provinceVisited").appendChild(province);
    }
}


function showCity() {
    var cityStorage = localStorage.getItem("cityName");
    var cityName = JSON.parse(cityStorage);

    for (var i = 0; i < cityName.length; i++) {
        var city = document.createElement("div");
        city.className = "col-xs-3";
        var button = document.createElement("button");
        button.innerHTML = cityName[i].n;
        button.onclick = (function(a) {
            return function() {
                location.assign("weather.html");
                var storageCity = localStorage.getItem("selectedCityName");
                localStorage.setItem("selectedCityName", storageCity + ',' + a);
            }
        })(cityName[i].n);
        city.appendChild(button);
        document.getElementById("cityVisited").appendChild(city);
    }

}



var mostVisitedCity = localStorage.getItem("selectedCityName").split(',');
console.log(mostVisitedCity);

