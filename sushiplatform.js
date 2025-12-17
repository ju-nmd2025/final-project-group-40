let sushiPlatform;

function setup() {
    createCanvas(400,600);
    sushiPlatform = new SushiPlatform(80, 350, 240, 20);   
}

function draw() {
    background(220);
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


    // Rice base 
    fill(255); // white rice
    stroke(200);
    strokeWeight(1);
    rect(0, 0, this.w, this.h, 40);

    // Topping salmon 
    fill(255, 120, 120); // pink salmon
    stroke(220, 100, 100);
    strokeWeight(1);
    //Adding curves to the salmon
    beginShape();
    vertex(10, 0);
    bezierVertex(this.w * 0.25, -this.h * 0.6, this.w *0.75, -this.h * 0.6, this.w - 10, 0);
    vertex(this.w - 10, this.h * 0.4);
    bezierVertex(this.w * 0.75, this.h * 0.1, this.w * 0.25, this.h * 0.1, 10, this.h *0,4);
    endShape(CLOSE);
    
    // Seaweed wrap
    fill(20, 60, 20); //dark green seaweed
    noStroke();
    rect(0, this.h * 0.7, this.w, this.h * 0.3, 10);


    // Highlights
    noStroke();
    fill(255,255, 0);rect(4, 4, this.w - 8, this.h / 3, 8);

     //* More details
    fill(0);
    for (let i = 5; i < this.w; i += 15) {
        for (let j = 5; j < this.h * 0.6; j += 10) {
            ellipse(i, j, 3, 3);
        }
    }
    
pop();

}
}
