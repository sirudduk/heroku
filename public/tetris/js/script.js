const doc = document;
const canvas = doc.getElementById('tetris');
const context = canvas.getContext('2d');
let handler = true;
const leftBtn = doc.getElementById('left_btn');
const rightBtn = doc.getElementById('right_btn');
const startBtn = doc.getElementById('start_btn');
const score = doc.getElementById('score_text');
const wrap = doc.getElementById('wrap');
leftBtn.addEventListener('click',()=> {
    handler = false;
})
rightBtn.addEventListener('click', ()=> {
    handler = true;
})
context.scale(20,20);

startBtn.addEventListener('click', ()=> {
    wrap.style.display = 'block';
    score.innerText = "SCORE :";
    playerReset();
    updateScore();
    update();

})


// 쌓였을때 없애기
function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x <arena[y].length; ++x) {
            if (arena[y][x] == 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y){
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y +o.y] && 
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}


    // frame array setting
function createMatrix(w,h) {
    const matrix = [];
    while( h-- ) {
        matrix.push(new Array(w).fill(0));
    }
    // console.log(matrix);
    return matrix;
}

function createPiece(type) {
    if (type == 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type == 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type == 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ];
    } else if (type == 'J') {
          return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],  
          ];
    } else if (type == 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type == 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ];
    } else if (type == 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ]
    }
}

function draw() {
    // draw the canvas frame
    context.fillStyle = '#EDE7D0';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    drawMatrix(arena,{x: 0, y: 0});
    drawMatrix(player.matrix,player.pos);   

}

function drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value != 0) {
                context.fillStyle = colors[value];
                // x,y 값
                // (0,0)(1,0)(2,0) / (0,1)(1,1)(2,1) / (0,2)(1,2)(2,2)
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1,1);
            }
        });
    });
}



function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
            // console.log(player.matrix);
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();

    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if(collide(arena,player)) {
        player.pos.x -= dir;
    }
}

function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset+ (offset > 0 ? 1 : -1))
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for(let y=0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir >0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

let dropCounter = 0;
let dropInterval = 700;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    // console.log(deltaTime);

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = player.score;
}

const colors = [
    null,
    '#F0949A',
    '#FFA931',
    '#8AC591',
    '#ABA7F7',
    '#82A3D8',
    '#D0E090',
    '#89DACC'
]

const arena = createMatrix(12,24);
// console.log(arena); console.table(arena);

const player = {
    matrix: createPiece('T'),
    pos: {x: 0, y: 0},
    score: 0,
}
// console.log(player.matrix);
    
    // keyCode값으로 방향키 setting 
document.addEventListener('keydown',event => {
    // 왼쪽 이동
    if(event.keyCode == 37) {
        playerMove(-1);
    
        // 오른쪽 이동
    } else if (event.keyCode == 39) {
        playerMove(+1);
    } else if (event.keyCode == 40) {

        // down키 누르고 다시 1초 시작
        playerDrop();        
    // 돌리기
    } else if (event.keyCode == 38) {
        if ( handler == true) {
            playerRotate(+1);
        } else {
            playerRotate(0);
        }
    }
})

