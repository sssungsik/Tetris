const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // 렌더링 컨텍스트

ctx.scale(20,20); // 20배 확대

// --------------canvas 크기 설정----------------
const canvasWidth = canvas.width / 20;
const canvasHeight = canvas.height / 20;



// 나만의 로직 ....
// 게임 화면 테두리(border) 를  1 의 배열로 감싼다.
// 게임 판을 0 의 배열로 채운다.

// 충돌감지 : 테두리 1 에 닿았을떄 충돌 처리.
// 블록삭제 : 배열이 행이 전부 1 일 경우 삭제 하여 처리.


// 게임판
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 게임판
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
    // x : 15 칸  y :  21 칸
];

// ---------------점수판-------------------
ctx.lineWidth = 0.09;
ctx.strokeStyle = "black";
ctx.strokeRect(9,0.5,3.5,1.5);
    // 점수 텍스트
    ctx.font = "0.55px Arial";
    let score = 0;
    ctx.fillText("Score : " + score, 9.2, 1.5);

// ----------------다음 블록 표시판-------------
ctx.strokeRect(0.5,0.5,5,3);

// ---------------테트리스 조각 배열---------------
const fragment1 = [
    [0,1,0], // ㅗ
    [1,1,1]
]
const fragment2 = [
    [0,0,1], // ㄴ
    [1,1,1]
];

const fragment3 = [
    [1,1], // ㅁ
    [1,1]
];
const fragment4 = [
    [1,1,1,1] // ㅡ
];
const fragment5 = [
    [1,1,0], // N
    [0,1,1]
];
// 조각 모음
const fragments1 = [fragment1, fragment2, fragment3, fragment4, fragment5];
// 조각의 랜덤 값
const randomFragment1 = fragments1[Math.floor(Math.random() * fragments1.length)];
// 조각의 랜덤 값을 fragment에 할당
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
            if (value !== 0) { // 배열 내 1 인 값을 색깔로 칠함
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

// -------------- 다음 블록 표시 함수 ----------------------
let nextFragment = fragments1[Math.floor(Math.random() * fragments1.length)]; // 다음 블록
function drawNextBlock() {
    // 다음 블록 표시 영역 클리어
    ctx.clearRect(0.5, 0.5, 5, 3);


    nextFragment.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                let fragmentColor;
                if (nextFragment === fragment1) fragmentColor = "purple";
                else if (nextFragment === fragment2) fragmentColor = "blue";
                else if (nextFragment === fragment3) fragmentColor = "yellow";
                else if (nextFragment === fragment4) fragmentColor = "Aqua";
                else if (nextFragment === fragment5) fragmentColor = "red";

                ctx.fillStyle = fragmentColor;
                ctx.strokeStyle = "black";
                ctx.lineWidth = 0.05;

                // 다음 블록 표시 위치는 표시판 내부 좌표를 사용
                ctx.fillRect(x + 1.5, y + 1, 1, 1);
                ctx.strokeRect(x + 1.5, y + 1, 1, 1);
            }
        });
    });
}





// ----------------화면 clearRect 및 조각 생성 -------------
const landedFragments = [];  // 착지블록 저장배열


function create() {
    ctx.clearRect(0,3.8,canvas.width, canvas.height);

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

    clearFill();

    // 현재 블록을 다음 블록으로 교체
    player.fragment = nextFragment;

    // 새로운 다음 블록 생성
    nextFragment = fragments1[Math.floor(Math.random() * fragments1.length)];

    // 다음 블록 표시 갱신
    drawNextBlock();

    // 새 블록 생성
    player.xy = { x: 6, y: 4 }; // 블록의 초기 위치

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

// --------------------좌측이동-------------------
function moveL(){
    const newOffset = { x: player.xy.x - 1, y: player.xy.y };
    if (!checkCollision(player.fragment, newOffset)) {
        player.xy.x--;
    } else {
        console.log("좌측 충돌!");
    }
}
// 왼쪽 방향키 입력 이벤트에 할당
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        moveL();
    }
});

// --------------------우측이동----------------
function moveR(){
    const newOffset = { x: player.xy.x + 1, y: player.xy.y };
    if (!checkCollision(player.fragment, newOffset)) {
        player.xy.x++;
    } else {
        console.log("우측 충돌!");
    }
}
// 오른쪽 방향키 입력 이벤트에 할당
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        moveR();
    }
});

// --------------------하강----------------
function moveB(){

    const newOffset = { x: player.xy.x, y: player.xy.y + 1 };
    if (!checkCollision(player.fragment, newOffset)) {
        player.xy.y++;
    } else {
        console.log("하단 충돌! 블록 착지");
        landBlock();
    }
}
// 아래 방향키 입력 이벤트에 할당
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') {
        moveB();
    }
});



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
// 위 방향키 입력 이벤트에 할당
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
        rotate();
    }
});

// --------------- 충돌 감지 ------------
function checkCollision(fragment, offset) { // offset : 블록의 위치
    for (let y = 0; y < fragment.length; y++) { // y 축 순회
        for (let x = 0; x < fragment[y].length; x++) { // x 축 순회
            if (fragment[y][x] !== 0) { // 블록의 1인 부분만 확인
                const boardY = y + offset.y;
                const boardX = x + offset.x;
                if (board[boardY][boardX] === 1) { // 위치가 1인지 확인 후 (충돌)true 반환
                    return true;
                }
            }
        }
    }
    return false;
}


// ------------- 블록 채워짐 감지 ------------
function checkFill(row) {
    for(let i = 0; i < row.length; i++) {
        if (row[i] === 0) {
            return false; // 0이 하나라도 있을경우 false
        }
    }
    return true // 모두 1인 경우 ( 가득 채워진 경우) true
}

// ----------- 채워진 블록 행 제거 --------------
function clearFill() {
    for (let y =0; y < board.length - 1; y ++) { // 바닥은 제외
        if(checkFill(board[y])) { // 채워짐 감지
            console.log(`${y} 행 채워짐!! 지웁니다!`);

            // 채워진 행 삭제
            board.splice(y, 1);
            // 맨 위에 빈 행 추가
            board.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
            // 점수 + 100
            ctx.clearRect(9,0.5,3.5,1.5); // 점수판 초기화
            score += 100; // 점수 + 100
            ctx.fillStyle = "black"; // 검정색
            ctx.fillText("Score : " + score, 9.2, 1.5); // 점수판 그리기
        }
    }
}



// canvas 지원여부 검사하여 실행
if (canvas.getContext) {
    drawNextBlock();
    start();
} else {
    alert('지원하지 않는 기기');
}

