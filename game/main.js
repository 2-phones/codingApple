var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100 ;
canvas.height = window.innerHeight - 100;


// // 하드코딩 하지않고 미리 게임 캐릭터 속성값 (object)을 설정해두고 
// 간편히  dino.draw();만 치면 나오게끔 한다.
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width,this.height);
    }
}

dino.draw();

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;

    }
    draw(){
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width,this.height);
    }
}

// 타이머, 장애물 여러개, 점프타이머 , 애니메이션

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;


// 장애물이동
function move(){
    animation = requestAnimationFrame(move);
    timer++;

// 장애물 리스폰,이동
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if (timer % 200 === 0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
       
        
    }
    // 장애물 없어짐
    cactus여러개.forEach((a,i,o)=>{
        // x좌표가 0미만이면 제거
       if (a.x < 0){
           o.splice(i, 1)
       }
        a.x--;

       충돌하냐(dino, a);

        a.draw();
    })

    
// 점프기능

   if(점프중 == true){
    dino.y--;
    점프timer++;
   }
//    200px 위로 점프시 내려옴
   if (점프중 == false){
       if (dino.y < 200){
       dino.y++;
    }
   }
   if (점프timer > 100){
       점프중 = false;
       점프timer = 0
   }
    dino.draw()
}

move();

// 충돌확인
function 충돌하냐(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    } 
}

var 점프중 = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space') {
        점프중 = true;
    }
})

