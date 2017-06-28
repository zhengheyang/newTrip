/**
 * Created by zhyang on 17-6-28.
 */
angular.module('weatherApp.filter', [])
//cond.code_d:100 晴
//cond.code_d:101 多云
//cond.code_d:104 阴
//cond.code_d:305 小雨
.filter('todayIcon',function () {
    return function (logoId) {
        if (logoId == 100) {
            return 'img/32.png'
        } else if (logoId == 101) {
            return 'img/28.png'
        } else if (logoId == 104) {
            return 'img/26.png'
        }else if (logoId == 305) {
            return 'img/64.png'
        } else{
            return 'img/37.png'
        }
    }
})
    //1 晴
    //2 多云
    //3 阴
    //4 阵雨
    //5 雷阵雨
    //8 小雨
    //9 中雨
.filter('dayIcon',function () {
    return function (logoId) {
        if (logoId == 1) {
            return '0 -672px'
        } else if (logoId == 2) {
            return '0 -560px'
        } else if (logoId == 3) {
            return '0 -504px'
        }else if (logoId == 4) {
            return '0 -896px'
        }else if (logoId == 5) {
            return '0 -840px'
        }else if (logoId == 8) {
            return '0 -56px'
        }else if (logoId == 9) {
            return '0 -112px'
        }
    }
})