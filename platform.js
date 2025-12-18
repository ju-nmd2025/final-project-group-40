// Platfrom general class & set all platfrom on same width
class Platform {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 20;
    this.vx = 0;
    this.isBroken = false;
  }

  update() {
    this.x += this.vx;
  }

  offscreen() {
    return this.y > height + 50;
  }

  show() {
    push();
    fill(150);
    noStroke();
    rect(this.x, this.y, this.w, this.h, 5);
    pop();
  }
}

//======BAMBMOO PLATFORM=====//

class BambooPlatform extends Platform {
  constructor(x, y) {
    super(x, y, 100, 20);
  }

  show() {
    push();
    translate(this.x, this.y);

    // Main bamboo platform
    noStroke();
    fill(120, 180, 90); // bamboo green
    rect(0, 0, this.w, this.h, 10);

    // Bamboo
    stroke(90, 140, 70);
    strokeWeight(3);
    for (let i = 30; i < this.w; i += 40) {
      line(i, 0, i, this.h);
    }

    // Highlights
    noStroke();
    fill(150, 210, 120, 150);

    rect(4, 4, this.w - 8, this.h / 3, 8);

    pop();
  }
}

//======SUSHI PLATFORM====//

class SushiPlatform extends Platform {
  constructor(x, y, w, h) {
    super(x, y, 100);
  }

  show() {
    push();
    translate(this.x + this.w / 2, this.y);
    scale(100 / 260);
    rectMode(CENTER);
    noStroke();

    // Rice shape
    fill(220); // white rice
    ellipse(0, 32, 260 * 0.95, 70 * 0.45);

    // Rice base
    fill(250); // white rice
    stroke(230);
    strokeWeight(2);
    ellipse(0, 22, this.w, this.h * 0.6);

    // Rice details
    fill(230);
    for (let i = -this.w / 2 + 15; i < this.w / 2; i += 20) {
      for (let j = 12; j < 32; j += 8) {
        ellipse(i + random(-1, 2), j + random(-1, 1), 3, 3);
      }
    }

    // Salmon part
    fill(255, 120, 120); // pink salmon
    beginShape();
    vertex(-110, 10);
    bezierVertex(-65, -35, 65, -35, 110, 10);
    vertex(100, 30);
    bezierVertex(65, 10, -65, 10, -100, 30);
    endShape(CLOSE);

    // Salmo stripes
    stroke(255, 170, 170);
    strokeWeight(3);
    noFill();
    for (let i = -this.w / 2 + 40; i < this.w / 4; i += 35) {
      bezier(i, 18, i + 10, 5, i + 20, 5, i + 30, 10);
    }

    // Highlights
    noStroke();
    fill(255, 200);
    ellipse(0, -5, this.w * 0.6, 18);

    pop();
  }
}

//======CLOUD PLATFORM====//
class CloudPlatform extends Platform {
  constructor(x, y) {
    super(x, y, 100, 22);

    this.color = random() > 0.5 ? color(280, 185, 205) : color(180, 190, 200);

    this.puffs = [];

    // Bottom layer
    for (let i = 0; i < 5; i++) {
      this.puffs.push({
        x: map(i, 0, 4, -45, 45),
        y: random(-4, 2),
        s: random(26, 32),
      });
    }

    // Top layer - puffy part
    for (let i = 0; i < 3; i++) {
      this.puffs.push({
        x: map(i, 0, 2, -25, 25),
        y: random(-14, -8),
        s: random(34, 42),
      });
    }
  }

  show() {
    push();
    translate(this.x + this.w / 2, this.y);
    noStroke();
    fill(this.color);

    // Base platform
    rect(-60, 4, 120, 18, 10);

    // Puffy cloud body
    for (let p of this.puffs) {
      ellipse(p.x, p.y, p.s);
    }

    // highlight
    fill(255, 80);
    ellipse(0, -14, 60, 24);

    pop();
  }
}
