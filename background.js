//Background 
let stars = [];
const NUM_STARS = 100;

//Arrays to store building info 
let leftBuildings = [];
let rightBuildings = [];
const NUM_BUILDINGS = 6;

function setup() {
 createCanvas(400, 700);
 noStroke();


 // stars
 for (let i = 0; i < NUM_STARS; i++) {
   stars.push({
     x: random(width),
     y: random(height * 0.6),
     r: random(1, 4),
     speed: random(0.01, 0.05),
     phase: random(TWO_PI)
   });
 }


 // left side buildings
 for (let i = 0; i < NUM_BUILDINGS; i++) {
   let w = random(40, 65);
   let h = random(180, 300);
   let x = random(5, 60);
   let y = height - h + 30;
   leftBuildings.push({ x, y, w, h });
 }


 // right side buildings
 for (let i = 0; i < NUM_BUILDINGS; i++) {
   let w = random(40, 65);
   let h = random(180, 300);
   let x = random(width - 70, width - 20);
   let y = height - h + 30;
   rightBuildings.push({ x, y, w, h });
 }
}


function draw() {
 // lighter night sky
 background(35, 40, 120);


 // soft neon glow
 fill(9, 40, 190, 35);
 ellipse(width / 2, height * 0.55, width * 1.6, 240);


 fill(60, 200, 255, 30);
 ellipse(width * 0.3, height * 0.45, width, 140);


 // stars
 for (let s of stars) {
   let a = 150 + 100 * sin(frameCount * s.speed + s.phase);
   fill(255, 255, 220, a);
   ellipse(s.x, s.y, s.r);
 }


 // Draw left buildings
 for (let b of leftBuildings) {
   fill(12, 10, 25, 220);
   rect(b.x, b.y, b.w, b.h, 8);


   // windows
   for (let wy = b.y + 20; wy < b.y + b.h - 20; wy += 18) {
     for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 12) {
       if (random() > 0.35) {
         fill(255, 120, 200, 200);
       } else {
         fill(60, 60, 90, 180);
       }
       rect(wx, wy, 6, 10, 2);
     }
   }
 }


 // Draw right buildings
 for (let b of rightBuildings) {
   fill(12, 10, 25, 220);
   rect(b.x, b.y, b.w, b.h, 8);


   // multiple windows
   for (let wy = b.y + 20; wy < b.y + b.h - 20; wy += 18) {
     for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 12) {
       if (random() > 0.35) {
         fill(255, 120, 200, 200);
       } else {
         fill(60, 60, 90, 180);
       }
       rect(wx, wy, 6, 10, 2);
     }
   }
 }


 // small neon lights floating 
 fill(255, 120, 200, 40);
 ellipse((frameCount * 0.4) % width, height * 0.25, 40, 18);


 fill(60, 200, 255, 30);
 ellipse((frameCount * 0.6 + 120) % width, height * 0.15, 30, 12);
}
