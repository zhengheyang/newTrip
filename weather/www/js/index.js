/**
 * Created by zhyang on 17-6-9.
 */

$("#location").html(localStorage.getItem("last"));

var currentData = JSON.parse(localStorage.getItem("currentData"));
var forecastData = JSON.parse(localStorage.getItem("forecastData"));



// console.log(currentData);
// console.log(forecastData);
showCurrent(currentData);
showForecast(forecastData);


function showCurrent(data) {
    $("#currentState").html(data.now.cond.txt);
    $("#currentTmpRange").html(data.daily_forecast[0].tmp.min + "~" + data.daily_forecast[0].tmp.max + "&#8451;");
    $("#currentTmp").html("当前气温：" + data.now.tmp + "&#8451;");
    $("#wind").html(data.now.wind.dir + data.now.wind.sc + "级");
    $("#aqi").html("空气质量指数：" + data.aqi.city.aqi + data.aqi.city.qlty);
    $("#title").html("7日天气预报");

    $('#localPic').prop('src', function() {
        switch (data.now.cond.txt) {
            case "晴":
                return "images/32.png";
            case "阴":
                return "images/26.png";
            case "多云":
                return "images/28.png";
            case "阵雨":
                return "images/64.png";
            default:
                return "images/37.png";
        }
    });
    $('#localPic').addClass('wow zoomIn');
    var aaa = '';
    for (var key in data.suggestion) {
        aaa += data.suggestion[key].txt;
    }
    $('#suggestionInfo').html('<marquee>' + aaa + '</marquee>');
}

function showForecast(data) {
    for (var i = 0; i < forecastData.length; i++) {
        $('#forecast-content').append('<div class="row weather-section wow slideInLeft" id="section' + i + '"' + '></div>');
        $('#section' + i).append('<div class="col-xs-4"><h5>' + data[i].days.split("-").splice(1).join("/") + data[i].week + '</h5></div>');
        if (data[i].week == '星期六' || data[i].week == '星期日') {
            $('#section' + i + ' ' + '.col-xs-4 h5').css('color', '#e92121');
        }
        $('#section' + i).append('<div class="col-xs-5" style="padding: 0px;"><h5><img src=' + data[i].weather_icon + ' alt="">' + data[i].weather + '</h5></div>');
        $('#section' + i).append('<div class="col-xs-3"><h5 style="text-align: center;">' + '<span>' + data[i].temp_low + '</span>' + '<span>~</span>' + '<span>' + data[i].temp_high + '&#8451;' + '</span>' + '</h5></div>');
        $('#section' + i + ' ' + '.col-xs-3 h5 span:first').css('color', '#14b610');
        $('#section' + i + ' ' + '.col-xs-3 h5 span:last').css('color', '#e92121');
    }
}





function playWeather(message) {
    message = $('#location').html() + $('#currentState').html() + $("#currentTmp").html() + $("#wind").html() + $("#aqi").html();
    weather(message);
}

function refresh() {
    getWeatherApi($("#location").html());
}