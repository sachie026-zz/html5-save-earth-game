//variable declaration
var keysDown = {};

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
// canvas.width = 1600;
// canvas.height = 800;
canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight - 400;
document.body.appendChild(canvas);

let GameScore = 0;
let enemySpeed = 3;
let playerSpeed = 3;

// Background image
var bgReady = false;
var bgImage = new Image();

// Hero image
var heroReady = false;
var heroImage = new Image();

// Monster image
var monsterReady = false;
var monsterImage = new Image();
loadImages();

var player = [];
var enemy = [];
var enemyCount = 4;
var playerCount = 1;
var counter = 2;
var hero = new Entity(0, 0);
var selectedPlayerIndex = 0;

let gameStarted = false;
let gameBeginning = true;
let gameOver = false;

var W = canvas.width;
var H = canvas.height;

var vx = 0;

function init() {
}

function createPlayers() {
	if (player.length < playerCount) {
		let randY = Math.floor(Math.random() * 600) + 100;
		var newPlayer = new Player(canvas.width / 5, randY);
		newPlayer.img = heroImage;
		player.push(newPlayer);
	}
	else {
		for (let i = 0; i < player.length; i++) {
			player[i].update(0, 0);
			player[i].render();
			if (selectedPlayerIndex == i) {
				ctx.strokeRect(player[i].x - 10, player[i].y - 10, 50, 50);
			}

		}
	}
}

function createEnemies() {
	if (enemy.length < enemyCount) {
		let randY = Math.floor(Math.random() * 600) + 100;
		var newPlayer = new Enemy(canvas.width + (enemy.length * 100), randY);
		newPlayer.img = monsterImage;
		newPlayer.isMoving = true;

		enemy.push(newPlayer);
		enemy[0].render();
	}
	else {
		for (let i = 0; i < enemy.length; i++) {
			enemy[i].update();
			enemy[i].render();
		}
		for (let i = 0; i < enemy.length; i++) {
			let collides = checkCollision(i);
			if (collides) {

				GameScore++;
				enemy.splice(i, 1);
				checkAndUpdateLevel(GameScore);

			}
		}
	}

}

function checkCollision(index) {
	for (let j = 0; j < player.length; j++) {
		let playerX = player[j].x;
		let enemyX = enemy[index].x;
		let playerY = player[j].y;
		let enemyY = enemy[index].y;
		if (enemyX >= (playerX - 50) && enemyX <= (playerX + 50)) {
			if (enemyY >= (playerY - 50) && enemyY <= (playerY + 50)) {
				return true;
			}
		}
	}
	return false;
}

function checkAndUpdateLevel(score) {
	if (score % 15 == 0) {
		enemySpeed += 0.2;
		playerSpeed += 0.2;
	}

	if (score % 15 == 0) {
		enemyCount++;
	}


}

var monstersCaught = 0;

// Reset the game when the player catches a monster
var reset = function () {
	// hero.x = canvas.width / 2;
	// hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	//monster.x = 32 + (Math.random() * (canvas.width - 64));
	//monster.y = 32 + (Math.random() * (canvas.height - 64));
};


// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		if (player[selectedPlayerIndex].y > 12) {
			player[selectedPlayerIndex].update(0, -1 * playerSpeed);
		}
	}
	if (40 in keysDown) { // Player holding down
		if (player[selectedPlayerIndex].y < canvas.height - 50) {
			player[selectedPlayerIndex].update(0, 1 * playerSpeed);
		}
	}
	if (37 in keysDown) { // Player holding left
		if (player[selectedPlayerIndex].x > 12) {
			player[selectedPlayerIndex].update(-1 * playerSpeed, 0);
		}
	}
	if (39 in keysDown) { // Player holding right
		if (player[selectedPlayerIndex].x < canvas.width - 40) {
			player[selectedPlayerIndex].update(1 * playerSpeed, 0);
		}
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		//	ctx.drawImage(bgImage, 0, 0);
		ctx.clearRect(0, 0, W, H);

		ctx.fillStyle = '#333';
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.drawImage(bgImage, vx, 50);
		ctx.drawImage(bgImage, bgImage.width - Math.abs(vx), 50);

		if (Math.abs(vx) > bgImage.width) {
			vx = 0;
		}

		vx -= 2;
	}


	if (gameStarted) {
		renderText("Enemies caught: " + GameScore, 22, 22, 20, "normal", "white");
		createPlayers();
		createEnemies();

	}
	if (gameBeginning || gameOver) {
		renderText("Press space bar to start the game ", canvas.width / 3, canvas.height / 2.25, 35, "bold");
	}

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();



window.requestAnimationFrame = function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function (f) {
			window.setTimeout(f, 1e3 / 60);
		}
}();
