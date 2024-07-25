import { ECS } from './ECS/ECS.js';
import {Game} from "./Game/Game.js";

//create ECS, 
//todo check list for entity creation, create entities,
//todo check for systems to load, run systems,
//todo check for entities to remove or clear and remove them
const ecs = new ECS();
const game = new Game(ecs);


gameLoop();

function gameLoop() {
  game.run();
  requestAnimationFrame(gameLoop);
}
