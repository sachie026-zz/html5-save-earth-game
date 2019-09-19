function loadImages() {
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = "images/background.jpg";

    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "images/hero.png";

    monsterImage.onload = function () {
        monsterReady = true;
    };
    monsterImage.src = "images/monster.png";
}


function renderText(text, x, y, size = 24, weight = "normal", color = "black") {
    ctx.fillStyle = color;
    ctx.font = weight + " " + size + "px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(text, x, y);
}