import { ECS } from './ECS/ECS.js';
import { Game } from "./Game/Game.js";


//after setting up the ECS, setup game, game will load in the first scene at the end of it constructor call
//readying it for the game loop and game.run().
const ecs = new ECS();
const game = new Game(ecs);

let lastTimestamp = 0;

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  game.run(deltaTime);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);