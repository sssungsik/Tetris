const canvas = document.getElementById('canvas');


const ctx = canvas.getContext('2d'); // 렌더링 컨텍스트




ctx.scale(20,20); // 확대



// 화면 크기 경계
const canvasWidth = canvas.width / 20;
const canvasHeight = canvas.height / 20;

// 점수판
ctx.lineWidth = 0.1;
ctx.strokeStyle = "black";
ctx.strokeRect(9,0.5,3.5,1.5);
    // 점수 텍스트 (임시)
    ctx.font = "0.55px NotoSansKr";
    ctx.fillText("Score : 1000", 9.2, 1.5);


// 다음 블록 표시판
ctx.strokeRect(0.5,0.5,4,3);

    // 다음 블록 (임시)
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.05;

    ctx.fillRect(1.5,1,1,1);
    ctx.strokeRect(1.5,1,1,1);
    ctx.fillRect(2.5,1,1,1);
    ctx.strokeRect(2.5,1,1,1);
    ctx.fillRect(1.5,2,1,1);
    ctx.strokeRect(1.5,2,1,1);
    ctx.fillRect(2.5,2,1,1);
    ctx.strokeRect(2.5,2,1,1);



// 테트리스 조각 데이터
const fragment = [
    [0,0,0],
    [0,1,0],
    [1,1,1],
];

// 플레이어 객체
const player = {
    xy: {x: 4, y:3}, // 처음위치
    fragment,
}



// 조각 그리기
function createFragment(fragment, offset) {
    fragment.forEach((row, y) => {
        row.forEach((value, x) => {
            // 배열에서 1인 곳을 빨간색으로
            if (value !== 0) {
                ctx.strokeStyle = "black";
                ctx.lineWidth = 0.05;
                ctx.fillStyle = "red";
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
                ctx.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

// 화면 초기화 후 그리기
function create() {
    ctx.clearRect(0,3.5,canvas.width, canvas.height);
    createFragment(player.fragment, player.xy);
}

let count = 0;
let intval = 1000;

let lastTime = 0;
function start(time = 0) {
    const tTime = time - lastTime;
    lastTime = time;
    count += tTime;

    if(count > intval ) {
        if(player.xy.y <= 16) {


            player.xy.y++;
            count = 0;
        }
    }
    create();
    requestAnimationFrame(start);

}

function moveL(){
    if(player.xy.x >= 1) {
        player.xy.x--;
    } else {
        console.log('왼쪽 벽에 막힘');
    }
}
function moveR(){
    if(player.xy.x <= 9) {
        player.xy.x++;
    } else {
        console.log('오른쪽 벽에 막힘');
    }
}
function moveB(){
    console.log(player.xy.y);
    if (player.xy.y <= 16) {
        player.xy.y++;
        count = 0;
    } else {
        player.xy.y = 17;
    }
}
function rotate() {
    player.fragment = player.fragment[0].map((_, colIndex) =>
        player.fragment.map(row => row[colIndex]).reverse()
    );
}


// canvas 지원여부 검사하여 실행
if (canvas.getContext) {
    start();
} else {
    alert('지원하지 않는 기기');
}


