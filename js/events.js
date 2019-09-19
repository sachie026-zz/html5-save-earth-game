// // Handle keyboard controls

// addEventListener("keydown", function (e) {
//     //    console.log("keydown");
//     keysDown[e.keyCode] = true;
// }, false);

// addEventListener("keyup", function (e) {
//     //  console.log("keyup");
//     delete keysDown[e.keyCode];
// }, false);

addEventListener("keydown", function (e) {
    if (e.keyCode !== 32) {
        keysDown[e.keyCode] = true;
    }
}, false);

addEventListener("keyup", function (e) {
    if (e.keyCode === 32) {
        if (gameStarted) {
            if (selectedPlayerIndex === playerCount - 1) {
                selectedPlayerIndex = 0;
            }
            else {
                selectedPlayerIndex++;
            }
            selectedPlayerIndex = 0;
        }

        if (gameBeginning || gameOver) {
            gameStarted = true;
            gameBeginning = false;
            gameOver = false;
        }
    }
    else {
        delete keysDown[e.keyCode];

    }
}, false);

function startTheGame() {
    gameStarted = true;
    gameBeginning = false;
    gameOver = false;
}


var maxX = 800;
var maxY = 1000;

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
    if (!gameStarted) {
        startTheGame();
    }
    else {
        launchTheRokcet();
    }

    // alert("touch end");

}, false);


function handleOrientation(event) {
    console.log("orientation : ", event);
    var x = event.beta;  // In degree in the range [-180,180]
    var y = event.gamma; // In degree in the range [-90,90]

    // output.innerHTML = "beta : " + x + "\n";
    // output.innerHTML += "gamma: " + y + "\n";

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x > 90) { x = 90 };
    if (x < -90) { x = -90 };

    // To make computation easier we shift the range of 
    // x and y to [0,180]
    x += 90;
    y += 90;


    // 10 is half the size of the ball
    // It center the positioning point to the center of the ball
    //   ball.style.top  = (maxX*x/180 - 10) + "px";
    //   ball.style.left = (maxY*y/180 - 10) + "px";

    if (player && player.length > 0) {
        player[selectedPlayerIndex].orient((maxY * y / 180 - 16), (maxX * x / 180 - 16));
        // player[selectedPlayerIndex].render();
        document.getElementById("xy").innerHTML = (maxX * x / 180 - 10) + " " + (maxY * y / 180 - 10);
        //  alert((maxX * x / 180 - 10) + " " + (maxY * y / 180 - 10));
    }
}

window.addEventListener('deviceorientation', handleOrientation);


// function startup() {
//     var el = document.getElementsByTagName("canvas")[0];
//     el.addEventListener("touchstart", handleStart, false);
//     // el.addEventListener("touchend", handleEnd, false);
//     // el.addEventListener("touchcancel", handleCancel, false);
//     el.addEventListener("touchmove", handleMove, false);
//     //    console.log("initialized.");
// }



