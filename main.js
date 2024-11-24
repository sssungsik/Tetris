const canvas = document.getElementById('canvas');


const ctx = canvas.getContext('2d'); // 렌더링 컨텍스트
ctx.scale(20,20); // 규모확대

const fragment = [
    [0,0,0],
    [0,1,0],
    [1,1,1],
];


function draw() {
    createFragment(fragment, {x:1,y:1});
}
// 조각 생성
function createFragment(fragment, offset) {
    fragment.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = "red";
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}


// canvas 지원여부 검사하여 실행
if (canvas.getContext) {
    draw();
} else {
    alert('지원하지 않는 기기');
}


