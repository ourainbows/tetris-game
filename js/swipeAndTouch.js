let startX
let startY
let endX
let endY

//Function to handle swipes
function handleTouch(start, end, cbL, cbR) {
    //calculate the distance on x-axis and o y-axis. Check wheter had the great moving ratio.
    let xDist = endX - startX;
    let yDist = endY - startY;
    //console.log(xDist);
    //console.log(yDist);
    if (xDist == 0 && yDist == 0) {
        touch()
    } else {
        if (Math.abs(xDist) > Math.abs(yDist)) {
            if (endX - startX < 0) {
                left();
            } else {
                right();
            }
        } else {
            if (endY - startY < 0) {
                up();
            } else {
                down();
            }
        }
    }
}


//writing the callback fn()
let left = () => {
    pieceMove(-1)
}
let right = () => {
    pieceMove(+1)
}
let up = () => {
}
let down = () => {
    pieceDrop();
}
let touch = () => {
    pieceRotate(-1)
}

//configs the elements on load
window.onload = function () {
    canvas.addEventListener('touchstart', function (event) {
        //console.log(event);
        audio.loop = true
        audio.volume = 0.1
        audio.play()
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        //console.log(`the start is at X: ${startX}px and the Y is at ${startY}px`)

    })

    canvas.addEventListener('touchend', function (event) {
        //console.log(event);
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
        //console.log(`the start is at X: ${endX}px and the Y is at ${endY}px`)

        handleTouch(startX, endX, left, right)

    })
}
