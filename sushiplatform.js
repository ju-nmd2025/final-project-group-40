let sushiPlatform;

function setup() {
    createCanvas(400,600);
    sushiPlatform = new SushiPlatform(200, 350, 260, 70);   
}

function draw() {
    background(240);
    sushiPlatform.show();
}

class SushiPlatform {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }


show() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    noStroke();

    // Rice shape
    fill(220); // white rice
    ellipse(0, 32, this.w * 0.95, this.h * 0.45);

    // Rice base 
    fill(250); // white rice
    stroke(230);
    strokeWeight(2);
    ellipse(0, 22, this.w, this.h * 0.6);

    // Rice details 
    fill (230);
    for (let i = -this.w / 2 + 15; i < this.w / 2; i += 20) {
        for (let j = 12; j < 32; j += 8) {
            ellipse(i + random(-1, 2), j + random(-1, 1), 3 , 3);
        }
    }

    // Salmon part 
    fill(255, 120, 120); // pink salmon
    beginShape();
    vertex(-this.w / 2 + 20, 10);
    bezierVertex (
        -this.w / 4, -35, 
        this.w / 4, -35,
        this.w / 2 -20, 10
    );
    vertex(this.w / 2 - 10, 30);
    bezierVertex(
        this.w / 4, 10,
        -this.w / 4, 10,
        -this.w / 2 + 10, 30
    );
    endShape(CLOSE);

    // Salmo stripes
    stroke(255, 170, 170);
    strokeWeight(3);
    noFill();
    for (let i = -this.w / 2 + 40; i < this.w / 4; i += 35) {
        bezier(
            i, 18,
            i + 10, 5,
            i + 20, 5, 
            i + 30, 10
        );
    }

    // Highlights
    noStroke();
    fill(255,200);
    ellipse(0, -5, this.w * 0.6, 18);
    
pop();

}

}