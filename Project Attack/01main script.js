


var myGamePiece;	//player 비행기 변수
var myMissileList = [];		//미사일 변수
var canvasX=480;
var canvasY=700;

function startGame() {
	// player 비행기 이미지
    myGamePiece = new component(50,50, "img/spaceship.png", 60, 340, "image");
    myGameArea.start();
	startEnemy();
}

//Canvas 비행장소
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasX;
        this.canvas.height = canvasY;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10); // player 이동 속도 조절

		//키보드 작동 function
		window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

// player 비행기 속성
function component(width, height, color, x, y, type) {
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
        ctx = myGameArea.context;
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
}

// 미사일 생성 기능
function createMissile(size, currentX, currentY, speedX, speedY) {
    var myMissile = new missile(size, "yellow", currentX+23, currentY);
    myMissile.speedX = speedX;
    myMissile.speedY = speedY;
    myMissileList.push(myMissile);
}

function missile(size, color, x, y) {
    this.gamearea = myGameArea;
    this.width = size;
    this.height = size;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}


// 게임 작동 function
function updateGameArea() {
    myGameArea.clear();

    myGamePiece.newPos();    
    myGamePiece.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;  
	
//	updateEnemy();

	
	// 방향키 반응(player 비행기 이동)
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }

	// spacebar 미사일 발사
	if (myGameArea.keys && myGameArea.keys[32]) {
        createMissile(5, myGamePiece.x, myGamePiece.y,5,-7);
        createMissile(5, myGamePiece.x, myGamePiece.y,0,-7);
        createMissile(5, myGamePiece.x, myGamePiece.y,-5,-7); 
    }
	
    //적 그리기
    for(var i=0; i<enemyList.length; i++){
        enemyList[i].newPos();
        enemyList[i].update();
    
        if(enemyList[i].x < -10 || enemyList[i].y > canvasY+10 
        || enemyList[i].x > canvasX+10 || enemyList[i].y < -30){
           enemyList.splice(i,1); // 미사일 삭제
        }
    }

	// 미사일 움직임
	for(var i=0; i<myMissileList.length; i++){
		myMissileList[i].newPos();
		myMissileList[i].update();
		if(myMissileList[i].x < -10 || myMissileList[i].y < -10
			|| myMissileList[i].x > canvasX+10 || myMissileList[i].y > canvasY+10){
			myMissileList.splice(i,1); // 미사일 삭제
	    }
    }
}
