// canvas and context
let canvas = document.getElementById("tetris")
let ctx = canvas.getContext("2d")

// paint canvas
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)



/*This function create the 7 pieces of tetris
    PieceName -> A vowel to select one figure
    return -> array than contains the piece */ 
function createPiece(pieceName) {
    switch (pieceName) {
        case "O":
            return [
                [1,1],
                [1,1]
            ]
        case "I":
            return [
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0]
            ]
        case "T":
            return [
                [0,0,0],
                [1,1,1],
                [0,1,0]
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
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,1,0]
            ]
        case "J":
            return [
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,1,1,0]
            ]
    }
}
document.addEventListener("keydown", function (key) {
    console.log(key.key)
    if (key.key == "ArrowUp") {
        //Piece.up()
    }
    if (key.key == "ArrowDown") {
        //Piece.down()
    }
    if (key.key == "ArrowLeft") {
        //Piece.left()
    }
    if (key.key == "ArrowRight") {
        //Piece.right()
    }
})

// swiped-left
canvas.addEventListener("touchstart", function () {
    console.log("Hello World")
})