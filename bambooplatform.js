let platform;

function setup () {
    createCanvas (400,600);
    platform = new BambooPlatform (80, 350, 240, 20);
}

function draw () {
    background (220);
    platform.show ();
}

class BambooPlatform {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

show () {
    push ();
    translate (this.x, this.y);


    // Main bamboo platform
    noStroke();
    fill(120, 180, 90); // bamboo green
    rect(0, 0, this.w, this.h, 10);

    // Bamboo 
    stroke(90, 140, 70);
    strokeWeight(3);
    for (let i = 30; i < this.w; i += 40) {
        line (i, 0, i, this.h);
    }

    // Highlights
    noStroke();
    fill(150, 210, 120 , 150);

    rect(4, 4, this.w - 8, this.h / 3, 8);


    pop();

}

}