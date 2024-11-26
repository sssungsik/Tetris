const canvas = document.getElementById('canvas');


const ctx = canvas.getContext('2d'); // 렌더링 컨텍스트




ctx.scale(20,20); // 확대



// --------------화면 크기 경계----------------
const canvasWidth = canvas.width / 20;
const canvasHeight = canvas.height / 20;

// ---------------점수판-----------------
ctx.lineWidth = 0.1;
ctx.strokeStyle = "black";
ctx.strokeRect(9,0.5,3.5,1.5);
    // 점수 텍스트 (임시)
    ctx.font = "0.55px NotoSansKr";
    ctx.fillText("Score : 1000", 9.2, 1.5);


// ----------------다음 블록 표시판-------------
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



// ---------------테트리스 조각 데이터---------------
let fragment = [
    [0,0,0],
    [0,1,0],
    [1,1,1]
];


const fragment1 = [
    [0,0,0],
    [0,1,0],
    [1,1,1]
]
const fragment2 = [
    [0,0,0],
    [0,0,1],
    [1,1,1]
];

const fragment3 = [
    [1,1],
    [1,1]
];
const fragment4 = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1]
];
const fragment5 = [
    [0,0,1],
    [0,1,1],
    [0,1,0]
];


// -------------플레이어 객체---------------
const player = {
    xy: {x: Math.floor(Math.random() * 11), y:4}, // 처음위치
    fragment, // 처음모양
}



// -----------------조각 그리기--------------------
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

// ----------------화면 clearRect 및 조각 생성 -------------
const landedFragments = [];  // 착지블록 저장배열


function create() {
    ctx.clearRect(0,3.5,canvas.width, canvas.height);

    // 착지블록 그리기
    landedFragments.forEach(fragment => {
        createFragment(fragment.shape, fragment.xy);
    });

    createFragment(player.fragment, player.xy);
}

// --------------------블록 착지 후 처리----------------
function landBlock() {
    // 현재 블록을 착지된 블록 배열에 추가
    landedFragments.push({
        shape: player.fragment,  // 블록 모양
        xy: {...player.xy},      // 블록 좌표
    });

    // 새 블록 생성
    player.xy = { x: Math.floor(Math.random() * 11), y: 4 }; // 블록의 초기 위치

    const fragments = [fragment1, fragment2, fragment3, fragment4, fragment5];
    const randomFragment = fragments[Math.floor(Math.random() * fragments.length)];
    player.fragment = randomFragment;
}

// --------------------시작 및 1초씩 하강----------------
function start(timestamp) {

    if(timestamp % 1000 < 16) {
        if(player.xy.y <= 16) {
            player.xy.y++;
        } else  {
            landBlock();
        }
    }
    create();
    requestAnimationFrame(start);

}


// --------------------좌측이동----------------
function moveL(){
    if(player.xy.x >= 1) {
        if (player.xy.y >= 17) {
            console.log('착지하여 이동 불가');
        } else {
            player.xy.x--;
        }
    } else {
        console.log('왼쪽 벽에 막힘');
    }
}

// --------------------우측이동----------------
function moveR(){
    if(player.xy.x <= 9) {
        if (player.xy.y >= 17) {
            console.log('착지하여 이동 불가');
        } else {
            player.xy.x++;
        }

    } else {
        console.log('오른쪽 벽에 막힘');
    }
}

// --------------------하강----------------
function moveB(){
    console.log(player.xy.y);
    if (player.xy.y <= 16) {
        player.xy.y++;
    }  else {
        console.log('아래 벽에 막힘');
    }
}



// --------------------회전 기능----------------
function rotate() {
    if (player.xy.y <= 16) {
        const rows = player.fragment.length; // 행 개수
        const cols = player.fragment[0].length; // 열 개수


        const rotated = [];

        // 회전 작업 (90도)
        for (let i = 0; i < cols; i++) {
            rotated[i] = []; // 새로운 행

            for (let j = 0; j < rows; j++) {
                rotated[i][rows - 1 - j] = player.fragment[j][i];
            }
        }
        player.fragment = rotated;

    } else {
        console.log('착지하여 회전 불가');
    }
}



// canvas 지원여부 검사하여 실행
if (canvas.getContext) {
    start();
} else {
    alert('지원하지 않는 기기');
}

