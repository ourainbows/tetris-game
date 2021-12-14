// canvas and context
let canvas = document.getElementById("tetris")
let ctx = canvas.getContext("2d")

//Change size to elemtents than will display
ctx.scale(20, 20)

//colors for pieces
let color = ["#FFFF", "#f4a379", "#a2d8d0", "#daadf4", "#f1a4b4", "#7e04f2", "red"]
let topScore = 0
let piecesQuantity = []
let colorPieces = []
//song
document.getElementById("songTetris").loop = true

function arenaSweep() {
    let rowCount = 1;
    for (i = 0; i < arena.length; i++) {
        if (!arena[i].includes(0)) {
            let row = arena.splice(i, 1)[0].fill(0);
            arena.unshift(row);
            piece.score += rowCount * 10;
            rowCount *= 2;
        }
    }
}

let piece = {
    posX: 0,
    posY: 0,
    matrix: null,
    score: 0,
}

const arena = createMatrix(12, 20);


function createMatrix(w, h) {
    const matrix = [];
    while (h != 0) {
        matrix.push(new Array(w).fill(0))
        h--
    }
    return matrix;

}
function newColor() {
    let clr = color[Math.floor(Math.random() * color.length)]
    colorPieces.push(clr)
    return clr
}

//Offset parameters help to change the position of x and y where piece appears
function drawPiece(matrix, offsetX, offsetY) {
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] != 0) {
                for (i = 0; i < piecesQuantity.length; i++) {
                    let piece = piecesQuantity[i]
                    if (matrix[y][x] == piece) {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = colorPieces[i]
                        ctx.fillStyle = colorPieces[i]
                        ctx.fillRect(x + offsetX, y + offsetY, 0.9, 0.9)
                    }
                }
            }
        }
    }
}

/*This function create the 7 pieces of tetris
    PieceName -> A vowel to select one figure
    return -> array than contains the piece */
function createPiece(pieceName) {
    switch (pieceName) {
        case "O":
            return [
                [1, 1],
                [1, 1]
            ]
        case "I":
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        case "T":
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ]
        case "S":
            return [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ]
        case "Z":
            return [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
            ]
        case "L":
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0]
            ]
        case "J":
            return [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0]
            ]
    }
}

//this function detected if we touch the floor 
function collide(arena, piece) {
    const [m, o, a] = [piece.matrix, piece.posY, piece.posX];
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 &&
                (arena[y + o] && arena[y + o][x + a]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

//This fuction returns de posicion of the piece en the arena 
function merge(arena, piece) {
    for (y = 0; y < piece.matrix.length; y++) {
        for (x = 0; x < piece.matrix[y].length; x++) {
            if (piece.matrix[y][x] != 0) {
                arena[y + piece.posY][x + piece.posX] = piece.matrix[y][x];
            }
        }
    }
}


// draw
function draw() {
    // paint canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // make sticky the falling pieces when they collide 
    //with the floor or with another piece
    drawPiece(arena, 0, 0);
    // draw a figure 
    drawPiece(piece.matrix, piece.posX, piece.posY);
    //piece.posY++
}


/*This function makes resetting the time to zero so that when we lower the handpiece 
 it takes a second to lower*/
function pieceDrop() {
    piece.posY++;
    if (collide(arena, piece)) {
        piece.posY--;
        merge(arena, piece)
        pieceReset();
        arenaSweep();
        updateScore();
    }

    dropCounter = 0;

}
//this one move the piece and detected if we collide with the sides
//(if we collide with the sides we go back to the last position)
function pieceMove(dir) {
    piece.posX += dir;
    if (collide(arena, piece))
        piece.posX -= dir;
}


function updateValuePiece() {
    const pieces = 'OITSZLJ';
    let newPiece = createPiece(pieces[pieces.length * Math.random() | 0]);
    for (y = 0; y < newPiece.length; y++) {
        for (x = 0; x < newPiece.length; x++) {
            if (newPiece[x][y] != 0) {
                newPiece[x][y] = piecesQuantity.length + 1

            }
        }
    }
    piecesQuantity.push(piecesQuantity.length + 1)
    return newPiece
}

function pieceReset() {
    newColor()
    piece.matrix = updateValuePiece();
    piece.posY = 0;
    piece.posX = (arena[0].length / 2 | 0) -
        (piece.matrix[0].length / 2 | 0);
    //User Lost
    if (collide(arena, piece)) {
        for (i = 0; i < arena.length; i++) {
            arena[i].fill(0)
            dropInterval = 1000;
            piece.score = 0;
            updateScore();
            piecesQuantity = []
            colorPieces = []
            
        }
        pieceReset();

    }
}

function pieceRotate(dir) {

    const pos = piece.posX;
    let offset = 1;
    rotate(piece.matrix, dir);
    while (collide(arena, piece)) {
        piece.posX += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > piece.matrix[0].length) {
            rotate(piece.matrix, -dir);
            piece.posX = pos;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
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

    if (dir > 0) {
        for (i = 0; i < matrix.length; i++) {
            matrix[i].reverse()
        }
    }
    else {
        matrix.reverse()
    }

}


let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        pieceDrop();
    }


    draw();
    requestAnimationFrame(update);
}


function updateScore() {
    document.getElementById("score").innerText = "Score: " + piece.score;
    if (piece.score > topScore) {
        document.getElementById("top").innerText = "Top: " + piece.score;
    }
    level()
}

function level() {
    let score = piece.score
    if (score > 30 && score < 50) {
        dropInterval = 800
    }
    if (score > 50 && score < 80) {
        dropInterval = 500
    }
    if (score > 80 && score < 100) {
        dropInterval = 300
    }
    if (score > 100) {
        dropInterval = 200
    }
}



document.addEventListener("keydown", function (key) {
    if (key.key == "ArrowUp") {
        //Piece.rotate
        pieceRotate(-1)
    }

    if (key.key == "ArrowLeft") {
        //Piece.left()
        pieceMove(-1)
    }
    if (key.key == "ArrowRight") {
        //Piece.right()
        pieceMove(+1)
    }
    if (key.key == "ArrowDown") {
        //Piece.down
        pieceDrop();
    }


})

pieceReset();
updateScore();
update();
