import {
  Platform,
  BambooPlatform,
  SushiPlatform,
  CloudPlatform,
} from "platform.js";
import { Character } from "./character";

let character;
let platforms = [];
let score = 0;
let gameState = "start"; // Game initial status
let scrollSpeed = 2;

// Setup
function setup() {
  // same size as background
  createCanvas(400, 700);

  // create character
  character = new Character(width / 2, height - 100, color(150, 80, 200));
  initPlatforms();

  // Generate initial platforms
  platforms.push(new BambooPlatform(100, 600));
  platforms.push(new SushiPlatform(250, 500));
  platforms.push(new CloudPlatform(150, 400));
}

function keyPressed() {
  if (
    character.y + character.h === floor ||
    character.isColliding(character, platform)
  ) {
    character.y -= 120;
  }
}
