let t = 0;
let character;

class Character {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.whiskerLengths = [25, 30, 25]; // Array for whisker lengths
    this.eyeHighlights = []; // Array for eye highlight positions
    this.tailSegments = [];

    // Initialize eye highlights with positions
    for (let i = 0; i < 2; i++) {
      this.eyeHighlights.push({
        xOffset: i === 0 ? -15 : 13,
        yOffset: -17,
        size: 12,
      });
    }

    // Initialize tail segments
    for (let i = 0; i < 12; i++) {
      this.tailSegments.push({
        index: i,
        baseSize: map(i, 0, 11, 12, 22),
      });
    }
  }

  draw() {
    push();
    translate(this.x, this.y);

    this.drawHead();
    this.drawEars();
    this.drawEyes();
    this.drawNose();
    this.drawMouth();
    this.drawBlush();
    this.drawWhiskers(); // Uses arrays and loops
    this.drawLegs();
    this.drawTail(); // Uses arrays and loops

    pop();
  }

  drawHead() {
    fill(this.color);
    ellipse(0, 0, 200, 150);
  }

  drawEars() {
    // Left ear
    fill(this.color);
    beginShape();
    curveVertex(-55, -31);
    curveVertex(-75, -41);
    curveVertex(-85, -46);
    curveVertex(-70, -121);
    curveVertex(-5, -56);
    endShape(CLOSE);

    // Right ear
    beginShape();
    curveVertex(55, -41);
    curveVertex(75, -21);
    curveVertex(85, -36);
    curveVertex(75, -121);
    curveVertex(15, -71);
    endShape(CLOSE);

    // Inner ears
    fill(255, 220, 80);
    beginShape();
    curveVertex(-50, -51);
    curveVertex(-72, -46);
    curveVertex(-70, -86);
    curveVertex(-35, -61);
    endShape(CLOSE);

    beginShape();
    curveVertex(70, -51);
    curveVertex(73, -51);
    curveVertex(70, -86);
    curveVertex(35, -61);
    endShape(CLOSE);
  }

  drawEyes() {
    // Eye backgrounds
    fill(255, 220, 80);
    ellipse(-50, -11, 60, 60);
    ellipse(30, -11, 60, 60);

    // Pupils
    fill(0);
    ellipse(-50, -11, 54, 54);
    ellipse(30, -11, 54, 54);

    // Eye highlights using array and loop
    fill(255);
    for (let highlight of this.eyeHighlights) {
      ellipse(
        -50 + highlight.xOffset,
        -11 + highlight.yOffset,
        highlight.size,
        highlight.size
      );
      ellipse(
        30 + highlight.xOffset,
        -11 + highlight.yOffset,
        highlight.size,
        highlight.size
      );
    }
  }

  drawNose() {
    fill(255, 220, 80);
    triangle(-10, 4, -20, 4, -15, 14);
  }

  drawMouth() {
    stroke(40);
    strokeWeight(3);
    noFill();
    arc(-22, 22, 18, 12, 0, PI / 2);
    arc(-8, 22, 18, 12, PI / 2, PI);
    noStroke();
  }

  drawBlush() {
    fill(255, 150, 180, 180);
    ellipse(-60, 29, 28, 18);
    ellipse(40, 29, 28, 18);
  }

  drawWhiskers() {
    // Uses arrays and loops for whiskers
    let whiskerBaseY = [19, 24, 29]; // Y positions for whiskers

    stroke(60);
    strokeWeight(2);

    // Left whiskers
    for (let i = 0; i < 3; i++) {
      line(
        -65,
        whiskerBaseY[i],
        -65 - this.whiskerLengths[i],
        whiskerBaseY[i] - 10 + i * 10
      );
    }

    // Right whiskers
    for (let i = 0; i < 3; i++) {
      line(
        45,
        whiskerBaseY[i],
        45 + this.whiskerLengths[i],
        whiskerBaseY[i] - 10 + i * 10
      );
    }
    noStroke();
  }

  drawLegs() {
    fill(this.color);
    // Front legs
    ellipse(-45, 64, 24, 45);
    ellipse(-5, 64, 24, 45);

    // Back legs
    ellipse(25, 69, 20, 40);
    ellipse(45, 69, 20, 40);
  }

  drawTail() {
    push();
    translate(80, 19); // Position relative to character
    rotate(-0.5);

    // Draw tail segments using array and loop
    for (let segment of this.tailSegments) {
      let wiggle = sin(t + segment.index * 0.4) * 0.5;
      let x = segment.index * 10;
      let y = wiggle * 10;

      fill(this.color);
      ellipse(x, y, segment.baseSize, segment.baseSize);
    }

    pop();
  }
}

function setup() {
  createCanvas(400, 400);
  noStroke();

  // Create character
  character = new Character(width / 2, height / 2, color(150, 80, 200));
}

function draw() {
  background(240);

  // Draw the character
  character.draw();

  t += 0.05;
}

function drawCharacter(x, y, color) {
  let tempChar = new Character(x, y, color);
  tempChar.draw();
}
