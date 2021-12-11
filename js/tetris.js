// canvas and context
let canvas = document.getElementById("tetris")
let ctx = canvas.getContext("2d")

// paint canvas
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)



// Create 7 pieces of tetris
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
        case "J":
            return [
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,1,0]
            ]
        case "L":
            return [
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,1,1,0]
            ]
    }
}