// 构建蛇的对象 棋盘对象
var snake = {
  name: "jake",
  body: [{
    color: "#f00",
    x: 3,
    y: 3
  }, {
    color: "#f00",
    x: 4,
    y: 3
  }, {
    color: "#0f0",
    x: 5,
    y: 3
  }]
};

var checkbord = {
  width: 800,
  height: 800,
  step: 20 //格子大小
};


//画好格子
var c = document.getElementById("myCanvas");
c.width = checkbord.width;
c.height = checkbord.height;
var ctx = c.getContext("2d");
ctx.strokeStyle = "#fff";

function showSnake() {
  ctx.clearRect(0, 0, checkbord.width, checkbord.height);
  //绘制棋盘
  // for (var i = 0; i < checkbord.width / checkbord.step; i++) {
  //   for (var j = 0; j < checkbord.height / checkbord.step; j++) {
  //     ctx.strokeRect(i * checkbord.step, j * checkbord.step, checkbord.step, checkbord.step);
  //   }
  // }
  //把蛇放进格子里
  for (var k = 0; k < snake.body.length; k++) {
    var s = snake.body[k];
    ctx.fillStyle = s.color;
    ctx.fillRect(s.x * checkbord.step + 1, s.y * checkbord.step + 1, checkbord.step - 2, checkbord.step - 2);
    // ctx.arc(s.x*checkbord.step-checkbord.step/2,s.y*checkbord.step-checkbord.step/2,checkbord.step/2,0,Math.PI*2);
  }
  // 放入食物
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x + 1, food.y + 1, checkbord.step - 2, checkbord.step - 2);
}

//让蛇动起来。不按键时，蛇向头方向运动，按下上下左右向相应方向运动

var direction = "d";

function keypress() {
  direction = event.key;
}

//保存蛇头当前位置;
var headX = 5;
var headY = 3;

setInterval(function() {

    //死亡
    if(snake.body[snake.body.length - 1].x<0||snake.body[snake.body.length - 1].x*checkbord.step>checkbord.width-checkbord.step||snake.body[snake.body.length - 1].y<0||snake.body[snake.body.length - 1].y*checkbord.step>checkbord.height-checkbord.step){
      alert('游戏结束,你最终得分为'+score+'分!');
      location.reload();
    }
  showSnake();

  headX = snake.body[snake.body.length - 1].x;
  headY = snake.body[snake.body.length - 1].y;
  //蛇身体每节继承前一节坐标，第二节继承已存储的蛇头坐标
  for (var i = 0; i < snake.body.length - 2; i++) {
    snake.body[i].x = snake.body[i + 1].x;
    snake.body[i].y = snake.body[i + 1].y;
  }
  snake.body[snake.body.length - 2].x = headX;
  snake.body[snake.body.length - 2].y = headY;

  if (direction == "w") {
    snake.body[snake.body.length - 1].y--;
  } else if (direction == "s") {
    snake.body[snake.body.length - 1].y++;
  } else if (direction == "d") {
    snake.body[snake.body.length - 1].x++;
  } else if (direction == "a") {
    snake.body[snake.body.length - 1].x--;
  } else {
    return;
  }
  // 蛇吃到食物，食物消失，蛇长度+1
  if (headX == food.x / checkbord.step && headY == food.y / checkbord.step) {
    snakeEat();
    score+=10;
    showScore();
    changeFood();
  }


}, 60);

//随机给棋盘中投放食物
var food = {
  x: Math.floor(Math.random() * checkbord.width / checkbord.step) * checkbord.step,
  y: Math.floor(Math.random() * checkbord.height / checkbord.step) * checkbord.step,
  color: '#' + Math.floor(Math.random() * 15).toString(16) + Math.floor(Math.random() * 15).toString(16) + Math.floor(Math.random() * 15).toString(16)
};

function changeFood() {
  food.x = Math.floor(Math.random() * checkbord.width / checkbord.step) * checkbord.step;
  food.y = Math.floor(Math.random() * checkbord.height / checkbord.step) * checkbord.step;
  food.color = '#' + Math.floor(Math.random() * 15).toString(16) + Math.floor(Math.random() * 15).toString(16) + Math.floor(Math.random() * 15).toString(16);
}

function snakeEat() {
  var newSnake = {
    color: food.color,
    x: headX,
    y: headY
  };
  snake.body.unshift(newSnake);
}

var score=0;
function showScore () {
  document.getElementById('score').innerHTML='当前得分为：'+score+'分';
}
