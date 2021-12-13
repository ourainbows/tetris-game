// canvas and context
let canvas = document.getElementById("tetris")
let ctx = canvas.getContext("2d")

//Change size to elemtents than will display
ctx.scale(20, 20)

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
]


let piece = {
    posX: 0,
    posY: 0,
    matrix: matrix,
}



const arena = createMatrix(12, 20);


//this function detected if we touch the floor 
function collide (arena, piece){
    const [m, o, a] = [piece.matrix, piece.posY, piece.posX ];
    for (let y =0; y < m.length; y++){
        for (let x = 0; x < m[y].length; x++){
            if (m[y][x] !== 0 &&
                (arena[y + o] && arena [y + o][x + a]) !==0){
                    return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h != 0) {
        matrix.push(new Array(w).fill(0))
        h--
    }
    return matrix;

}
//Offset parameters help to change the position of x and y where piece appears
function drawPiece(matrix, offsetX, offsetY) {
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] != 0) {
                ctx.fillStyle = "red"
                ctx.fillRect(x + offsetX, y + offsetY, 1, 1)
            }
        }
    }
}

//This fuction returns de posicion of the piece en the arena 
function merge (arena, piece) {
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
    drawPiece(arena, 0 , 0);
    // draw a figure 
    drawPiece(piece.matrix, piece.posX, piece.posY);
    //piece.posY++
}

/* function update() {
    //draw()
    //requestAnimationFrame(update)
    setInterval(function () {
        draw()
    }, 1000 / 1)
} */

/*This function makes resetting the time to zero so that when we lower the handpiece 
 it takes a second to lower*/
function pieceDrop() {
    piece.posY++;
    if (collide(arena, piece)) {
        piece.posY--;
        merge (arena,piece)
        piece.posY = 0
    }

    dropCounter = 0;

}
//this one move the piece and detected if we collide with the sides
//(if we collide with the sides we go back to the last position)
function pieceMove (dir){
    piece.posX += dir;
    if (collide(arena, piece))
    piece.posX -= dir;
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
update()

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


document.addEventListener("keydown", function (key) {
    console.log(key.key)
    if (key.key == "ArrowUp") {
        //Piece.rotate
    }

    if (key.key == "ArrowLeft") {
        //Piece.left()
       pieceMove (-1)
    }
    if (key.key == "ArrowRight") {
        //Piece.right()
        pieceMove (+1)
    }
    if (key.key == "ArrowDown") {
        //Piece.down
        pieceDrop();
    }


})





// touch
canvas.addEventListener("touchstart", function () {
    //rotate piece
})