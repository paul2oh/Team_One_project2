

var enemyList = [];
var enemyMissileList = [];

var enemy01;

//적의 움직임을 지정하는 메서드
function enemyType(enemy, type){
    switch(type){
        case 1:
            enemy[0].setSpeedY(1);
            setTimeout(function() { enemy[0].setSpeedY(0); },800);
            setTimeout(function() { enemy[0].setSpeedX(0.5); },1200);
            setTimeout(function() { enemy[0].setSpeedX(0); },2700);
            setTimeout(function() { enemy[0].setSpeedY(1); },4200);
            setTimeout(function() { enemy[0].setSpeedY(0); },5700);
            setTimeout(function() { enemy[0].setSpeedY(1); },9900);
            break;
        case 2:
            enemy[0].setSpeedY(1);
            setTimeout(function() { enemy[0].setSpeedY(0); },800);
            setTimeout(function() { enemy[0].setSpeedX(-0.5);},1200);
            setTimeout(function() { enemy[0].setSpeedX(0); },2700);
            setTimeout(function() { enemy[0].setSpeedY(1); },4200);
            setTimeout(function() { enemy[0].setSpeedY(0); },5700);
            setTimeout(function() { enemy[0].setSpeedY(1); },9900);
            break;
        case 3:
            enemy[0].setSpeedY(3);
            enemy[0].setSpeedX(8);
            setTimeout(function() { enemy[0].setSpeedX(0); },800);
            setTimeout(function() { enemy[0].setSpeedX(-3);},1600);
            setTimeout(function() { enemy[0].setSpeedY(5); },2400);
            setTimeout(function() { enemy[0].setSpeedY(0); },2400);
            setTimeout(function() { enemy[0].setSpeedY(-3);},3200);
            setTimeout(function() { enemy[0].setSpeedX(0); },4000);
            setTimeout(function() { enemy[0].setSpeedX(5);},4800);                       
        default:
            enemy[0].setSpeedY(3);
            break;
    }
}




function startEnemy(){

    //createEnemy(가로길이, 세로길이, 그림주소, 등장X좌표, 등장Y좌표, 이동타입), 등장시간
    setTimeout('createEnemy(40, 40, "img/enemy01.png", 330, -20, 1);', 300);
    setTimeout('createEnemy(40, 40, "img/enemy01.png", 120, -20, 2);', 300);
//	enemy01 = new createEnemy(70,70,"img/enemy01.png", 70, 100, "image");
}

// enemy01 속성
function enemy(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx= myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
						  this.x, this.y,
						  this.width, this.height);
        }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }

    this.setSpeedX = function(x) {
        this.speedX = x;
    }  
    this.setSpeedY = function(y) {
        this.speedY = y;
    }

}

//생성 메서드. 주소값 호출 위해 array 사용
function createEnemy(width, height, color, x, y, type) {
    var newEnemy = [];
    newEnemy[0] = new enemy(width, height, color, x, y, "image");

    enemyList.push(newEnemy[0]);
    enemyType(newEnemy, type);
}



function updateEnemy() {
    enemy01.newPos();    
    enemy01.update();
    enemy01.speedX = 0;
    enemy01.speedY = 0;  
}