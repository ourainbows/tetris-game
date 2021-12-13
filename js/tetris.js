// canvas and context
let canvas = document.getElementById("tetris")
let ctx = canvas.getContext("2d")

//Change size to elemtents than will display
ctx.scale(20, 20)


let board = createMatrix(12, 20)

let piece = {
    posX: 0,
    posY: 0,
}

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
]
function createMatrix(width, height) {
    let matrix = []
    while (height != 0) {
        matrix.push(new Array(width).fill(0))
        height--
    }
    return matrix
}

//This function copy the piece on the board
function merge(board, piece) {
    
}

//Offset parameters help to change the position of x and y where piece appears
function drawPiece(offsetX,offetY) {
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] != 0) {
                ctx.fillStyle = "red"
                ctx.fillRect(x + offsetX, y + offetY, 1, 1)
            }
        }
    }
}

// draw
function draw() {
    // paint canvas
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // draw a figure 
    drawPiece(piece.posX, piece.posY)
    //piece.posY++
}

/* function update() {
    //draw()
    //requestAnimationFrame(update)
    setInterval(function () {
        draw()
    }, 1000 / 1)
} */

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        pieceDrop()
    }


    draw();
    requestAnimationFrame(update);
}
update() 

//down piece and restar drop counter
function pieceDrop() {
    piece.posY++
    dropCounter = 0
}

document.addEventListener("keydown", function (key) {
    console.log(key.key)
    if (key.key == "ArrowUp") {
        //Piece.rotate
    }
    if (key.key == "ArrowDown") {
       pieceDrop()
    }
    if (key.key == "ArrowLeft") {
        //Piece.left()
        piece.posX--
    }
    if (key.key == "ArrowRight") {
        //Piece.right()
        piece.posX++
    }
})



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

