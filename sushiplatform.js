let sushiPlatform;

function setup() {
    createCanvas (400,600);
    sushiPlatform = new SushiPlatform (80,350,240,20);   
}

function draw () {
    background (220);
    sushiPlatform.show();
}

class SushiPlatform {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

show () {
    push ();
    translate (this.x, this.y);


    // Rice base 
    noStroke();
    fill(255); // white rice
    rect(0, 0, this.w, this.h, 10);

    // Seaweed wrap
    fill (20, 60, 20); //dark green seaweed
    rect(0, this.h * 0.6, this.w, this.h * 0.4, 10);

    // Topping salmon 
    fill(255, 100, 100, 180); // pink salmon
    rect(10, 0, this.w - 20, this.h * 0.4, 8);

    //* More details
    fill(200);
    for(let i = 5; i < this.w; i += 15) {
        for (let j = 5; j < this.h * 0.6; j += 10) {
            ellipse (i, j, 3, 3);
        }
    }
    
    pop();
}
