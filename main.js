const canvas = document.getElementById('canvas');


const ctx = canvas.getContext('2d'); // 렌더링 컨텍스트




ctx.scale(20,20); // 확대



// --------------화면 크기 경계----------------
const canvasWidth = canvas.width / 20;
const canvasHeight = canvas.height / 20;


// 충돌 감지를 하는 방법..
// 본인의 생각 : 게임 화면 테두리(border) 를  1 의 배열로 감싼다.

const board = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 천장
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 바닥
];


// --------------- 충돌 감지 ------------
function checkCollision(fragment, offset) {
    for (let y = 0; y < fragment.length; y++) {
        for (let x = 0; x < fragment[y].length; x++) {
            if (fragment[y][x] !== 0) { // 블록의 1인 부분만 확인
                const boardY = y + offset.y;
                const boardX = x + offset.x;
                if (board[boardY][boardX] === 1) { // 벽 또는 착지 블록과 충돌
                    return true;
                }
            }
        }
    }
    return false;
}


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



const fragment1 = [
    [0,1,0],
    [1,1,1]
]
const fragment2 = [
    [0,0,1],
    [1,1,1]
];

const fragment3 = [
    [1,1],
    [1,1]
];
const fragment4 = [
    [1,1,1,1]
];
const fragment5 = [
    [1,1,0],
    [0,1,1]
];


const fragments1 = [fragment1, fragment2, fragment3, fragment4, fragment5];
const randomFragment1 = fragments1[Math.floor(Math.random() * fragments1.length)];
let fragment = randomFragment1;



// -------------플레이어 객체---------------
const player = {
    xy: {x: 6, y:4}, // 처음위치
    fragment, // 처음모양
}



// -----------------조각 그리기--------------------
function createFragment(fragment, offset) {

    fragment.forEach((row, y) => {
        row.forEach((value, x) => {
            // 배열에서 1인 곳을 빨간색으로
            if (value !== 0) {
                let fragmentColor;

                if(fragment == fragment1) {
                    fragmentColor = "purple"
                } else if (fragment == fragment2) {
                    fragmentColor = "blue"
                } else if (fragment == fragment3) {
                    fragmentColor = "yellow"
                } else if (fragment == fragment4) {
                    fragmentColor = "Aqua"
                } else if (fragment == fragment5) {
                    fragmentColor = "red"
                }
                ctx.fillStyle = fragmentColor;



                ctx.strokeStyle = "black";
                ctx.lineWidth = 0.05;
                ctx.fillRect(x + offset.x -1, y + offset.y, 1, 1);
                ctx.strokeRect(x + offset.x -1, y + offset.y, 1, 1);


            }
        });
    });
}

// ----------------화면 clearRect 및 조각 생성 -------------
const landedFragments = [];  // 착지블록 저장배열


function create() {
    ctx.clearRect(0,3.5,canvas.width, canvas.height);

    // `board`를 그리기
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {

               ctx.fillStyle = "gray";

                ctx.fillRect(x -1, y, 1, 1);
                ctx.strokeRect(x -1, y, 1, 1);
            }
        });
    });

    createFragment(player.fragment, player.xy);
}

// --------------------블록 착지 후 처리----------------
function landBlock() {
    player.fragment.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + player.xy.y][x + player.xy.x] = 1; // 블록 착지
            }
        });
    });

    // 새 블록 생성
    player.xy = { x: 6, y: 4 }; // 블록의 초기 위치

    const fragments2 = [fragment1, fragment2, fragment3, fragment4, fragment5];
    const randomFragment2 = fragments2[Math.floor(Math.random() * fragments2.length)];
    player.fragment = randomFragment2;
}

// --------------------시작 및 1초씩 하강----------------
function start() {
    if (!checkCollision(player.fragment, { x: player.xy.x, y: player.xy.y + 1 })) {
        player.xy.y++;
    } else {
        landBlock();
    }

    create();
    setTimeout(start, 500); // 0.5초마다 호출
}

// --------------------좌측이동----------------
function moveL(){
    /*
    if(player.xy.x >= 1) {
        if (player.xy.y >= 17) {
            console.log('착지하여 이동 불가');
        } else {
            player.xy.x--;
        }
    } else {
        console.log('왼쪽 벽에 막힘');
    }

     */
    const newOffset = { x: player.xy.x - 1, y: player.xy.y };
    if (!checkCollision(player.fragment, newOffset)) {
        player.xy.x--;
    } else {
        console.log("좌측 충돌!");
    }
}

// --------------------우측이동----------------
function moveR(){
    /*
    if(player.xy.x <= 9) {
        if (player.xy.y >= 17) {
            console.log('착지하여 이동 불가');
        } else {
            player.xy.x++;
        }

    } else {
        console.log('오른쪽 벽에 막힘');
    }
     */
    const newOffset = { x: player.xy.x + 1, y: player.xy.y };
    if (!checkCollision(player.fragment, newOffset)) {
        player.xy.x++;
    } else {
        console.log("우측 충돌!");
    }
}

// --------------------하강----------------
function moveB(){
    /*
    console.log(player.xy.y);
    if (player.xy.y <= 16) {
        player.xy.y++;
    }  else {
        console.log('아래 벽에 막힘');
    }

     */


    const newOffset = { x: player.xy.x, y: player.xy.y + 1 };
    if (!checkCollision(player.fragment, newOffset)) {
        player.xy.y++;
    } else {
        console.log("하단 충돌! 블록 착지");
        landBlock();
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

