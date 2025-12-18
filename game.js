let character;
let platforms = [];
let score = 0;
let gameState = "start"; // Game initial status
let scrollSpeed = 3;

// Setup
function setup() {
  // same size as background
  createCanvas(400, 700);

  // create character
  character = new Character(width / 2, height - 100, color(150, 80, 200));

  // Generate initial platforms
  platforms.push(new BambooPlatform(100, 600));
  platforms.push(new SushiPlatform(250, 500));
  platforms.push(new CloudPlatform(150, 400));
}

function draw() {
  background(255);

  // Draw background from background.js
  if (typeof drawBackground === "function") {
    drawBackground();
  }
  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "playing") {
    runGame();
  } else if (gameState === "gameover") {
    showGameOver();
  }
}

// Game logic
function runGame() {
  // Auto jump on platform function
  checkCollisions();

  // Update and draw character
  character.update();
  character.draw();

  // Update and draw platforms
  for (let plat of platforms) {
    // Sushi platforms move horizontally
    if (plat instanceof SushiPlatform) {
      if (!plat.vx) plat.vx = random([-1, 1]) * 2; // initial direction
      plat.x += plat.vx;
      if (plat.x < 0 || plat.x + plat.w > width) plat.vx *= -1; // bounce
    }

    // Bamboo platforms break if character jumps on it
    for (let plat of platforms) {
      if (plat instanceof BambooPlatform && plat.breakTimer) {
        plat.breakTimer--;
        if (plat.breakTimer <= 0) plat.isBroken = true;
      }
    }
  }
  // Scroll platforms vertically
  plat.y += scrollSpeed;

  // Draw only if not broken
  if (!plat.isBroken) plat.show();
}

// Remove platforms that go offscreen and add new ones
platforms = platforms.filter((p) => !p.offscreen());
while (platforms.length < 12) {
  let lastY = platforms.length ? min(...platforms.map((p) => p.y)) : 0;
  let y = lastY - random(50, 100); // always a bit above the highest platform
  let x = random(50, width - 50);
  let type = random() > 0.33 ? "Bamboo" : random() > 0.5 ? "Sushi" : "Cloud";
  if (type === "Bamboo") platforms.push(new BambooPlatform(x, y));
  else if (type === "Sushi") platforms.push(new SushiPlatform(x, y));
  else platforms.push(new CloudPlatform(x, y));
}

// Score
score++;
fill(255);
textSize(20);
text("Score: " + score, 20, 30);

// Check if character falls and end game
if (character.y > height) {
  gameState = "gameover";
}

// Collision logic
function checkCollisions() {
  for (let plat of platforms) {
    if (plat instanceof BambooPlatform) {
      if (!plat.isBroken && isCharacterOnPlatform(character, plat)) {
        character.y = plat.y - character.h / 2;
        character.vy = character.jumpStrength; // auto jump
        // Break platform AFTER jump - using delayed frames
        plat.breakTimer = 10;
      }
    } else {
      if (isCharacterOnPlatform(character, plat)) {
        character.y = plat.y - character.h / 2;
        character.vy = character.jumpStrength;
      }
    }
  }
}

function isCharacterOnPlatform(char, plat) {
  return (
    char.x + char.w / 2 > plat.x &&
    char.x - char.w / 2 < plat.x + plat.w &&
    char.y + char.h / 2 >= plat.y &&
    char.y + char.h / 2 <= plat.y + plat.h &&
    char.vy >= 0
  );
}

// Game status screens
function showStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Press SPACE to Start", width / 2, height / 2);
}

function showGameOver() {
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(24);
  text("Score: " + score, width / 2, height / 2 + 20);
  text("Press R to Restart", width / 2, height / 2 + 60);
}

function keyPressed() {
  if (
    character.y + character.h === floor ||
    character.isColliding(character, platform)
  ) {
    character.y -= 120;
  }
}

// Keyboard controls to (re)-start
function keyPressed() {
  if (gameState === "start" && key === " ") {
    gameState = "playing";
    score = 0;
    character.y = height - 100;
    character.vy = 0;
  }

  if (gameState === "gameover" && (key === "r" || key === "R")) {
    gameState = "start";
    score = 0;
    character.y = height - 100;
    character.vy = 0;

    // Reset platforms
    platforms = [
      new BambooPlatform(100, 600),
      new SushiPlatform(250, 500),
      new CloudPlatform(150, 400),
    ];
  }
}
