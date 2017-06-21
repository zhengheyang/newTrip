/**
 * Created by zhyang on 17-6-9.
 */

$("#location").html(localStorage.getItem("last"));
if (!localStorage.getItem("last")) {
    $.post('http://restapi.amap.com/v3/ip?&key=dc94d3008ab59159aa4f0b36cc67e89f', function (data) {
        var currentCity = data.city.split("");
        currentCity.pop();
        var positionCity = currentCity.join("");
        $("#location").html(positionCity);
        getWeatherApi($("#location").html());
    });
}
getWeatherApi($("#location").html());


function showCurrent(data) {
    $("#currentState").html(data.now.cond.txt);
    $("#currentTmpRange").html(data.daily_forecast[0].tmp.min + "~" + data.daily_forecast[0].tmp.max + "&#8451;");
    $("#currentTmp").html("当前气温：" + data.now.tmp + "&#8451;");
    $("#wind").html(data.now.wind.dir + data.now.wind.sc + data.now.wind.spd + "级");
    $("#aqi").html("空气质量指数：" + data.aqi.city.aqi + data.aqi.city.qlty);
    $("#title").html("7日天气预报");

    $('#localPic').prop('src', function () {
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


    var suggestionText = '';
    var suggestionTitle = '';
    for (var key in data.suggestion) {
        if (key == 'comf') {
            suggestionTitle = '舒适度:' + data.suggestion[key].brf;
        } else if (key == 'cw') {
            suggestionTitle = '洗车:' + data.suggestion[key].brf;
        } else if (key == 'drsg') {
            suggestionTitle = '穿衣:' + data.suggestion[key].brf;
        } else if (key == 'flu') {
            suggestionTitle = '疾病:' + data.suggestion[key].brf;
        } else if (key == 'sport') {
            suggestionTitle = '运动:' + data.suggestion[key].brf;
        } else if (key == 'trav') {
            suggestionTitle = '旅行:' + data.suggestion[key].brf;
        } else if (key == 'uv') {
            suggestionTitle = '紫外线:' + data.suggestion[key].brf;
        }
        suggestionText = data.suggestion[key].txt;
        $('#suggestion').append('<div class="row"><div class="col-xs-12 info-text wow slideInLeft">' + '<h4>' + suggestionTitle + '</h4>' + suggestionText + '</div>');
    }
    $('.info-text').css({
        'padding': '10px',
        'margin': '5px 0',
        'background-color': '#1e96f2',
        'color': '#fff',
        'border-radius': '5px',
    });

}


function showForecast(data) {
    for (var i = 0; i < data.length; i++) {
        $('#forecast-content').append('<div class="row weather-section wow zoomIn" id="section' + i + '"' + '></div>');
        $('#section' + i).append('<div class="col-xs-4"><h5>' + data[i].days.split("-").splice(1).join("/") + data[i].week + '</h5></div>');
        if (data[i].week == '星期六' || data[i].week == '星期日') {
            $('#section' + i + ' ' + '.col-xs-4 h5').css('color', '#e92121');
        }
        var imgSrc = data[i].weather_icon;
        imgSrc = imgSrc.replace(/\/d\/(?=\d)/, '/c/');
        $('#section' + i).append('<div class="col-xs-5"><h5><img height="20" src=' + imgSrc + ' alt="">' + data[i].weather + '</h5></div>');
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
    location.reload();
}


var week = ['日', '一', '二', '三', '四', '五', '六']
$.ready(setInterval(function () {
    var date = new Date();

    if (date.getHours() >= 10) {
        document.getElementById("hours").innerHTML = date.getHours() + " :";
    } else {
        document.getElementById("hours").innerHTML = "0" + date.getHours() + " :";
    }
    if (date.getMinutes() >= 10) {
        document.getElementById("minutes").innerHTML = date.getMinutes()+ " :";
    } else {
        document.getElementById("minutes").innerHTML = "0" + date.getMinutes()+ " :";
    }
    if (date.getSeconds() >= 10) {
        document.getElementById("seconds").innerHTML = date.getSeconds();
    } else {
        document.getElementById("seconds").innerHTML = "0" + date.getSeconds();
    }

    document.getElementById("week").innerHTML = "星期" + week[date.getDay()];

    var monthNum = date.getMonth() + 1;
    document.getElementById("nowdate").innerHTML = date.getFullYear() + '年' + monthNum + '月' + date.getDate() + '日';
}, 100));