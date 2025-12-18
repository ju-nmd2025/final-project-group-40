// Platfrom general class & set all platfrom on same width
class Platform {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.w = 55;
    this.h = h;
    this.vx = 0;
    this.isBroken = false;
  }

  update() {
    this.x += this.vx;
  }

  offscreen() {
    return this.y > height + 50;
  }
}

// cloud platfrom - static one
class CloudPlatform extends Platform {
  constructor(x, y) {
    super(x, y, 14);
    this.color = random() > 0.5 ? color(280, 185, 205) : color(180, 190, 200);

    this.puffs = [];
    for (let i = 0; i < 3; i++) {
      this.puffs.push({
        x: map(i, 0, 2, -this.w / 3, this.w / 3),
        s: random(16, 20),
      });
    }
  }

  draw() {
    push();
    translate(this.x + this.w / 2, this.y);
    noStroke();
    fill(this.color);

    rect(-this.w / 2, 0, this.w, this.h, 6);
    for (let p of this.puffs) {
      ellipse(p.x, -5, p.s);
    }
    pop();
  }
}
