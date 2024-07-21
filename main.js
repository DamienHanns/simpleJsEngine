import { SpriteComponent } from './ECS/Components/SpriteComponent.js';
import { PositionComponent } from './ECS/Components/PositionComponent.js';
import { MovementSystem } from './ECS/Systems/MovementSystem.js';
import { RenderSystem } from "./ECS/Systems/RenderSystem.js";

import { ECS } from './ECS/ECS.js';
import {MovementComponent} from "./ECS/Components/MovementComponent.js";


//create ECS, check list for entity creation, create entities,
//check for systems to load, run systems,
//check for entities to remove or clear, remove them
//repeat
const ecs = new ECS();

//todo move to game file
////////entity setup////////////
let hugo = ecs.createEntity("hugo");
let nathaniel = ecs.createEntity("nathaniel");
let petra = ecs.createEntity("petra");
let cleo = ecs.createEntity("cleo");

ecs.addComponent(hugo, new SpriteComponent());
ecs.addComponent(hugo, new PositionComponent(0, 40));
ecs.addComponent(hugo, new MovementComponent());

ecs.addComponent(nathaniel, new PositionComponent());

ecs.addComponent(nathaniel, new PositionComponent());
ecs.addComponent(petra, new SpriteComponent());



//////level systems/////////
let moveSys = new MovementSystem(ecs);
let renderSystem = new RenderSystem(ecs);
ecs.addSystem(moveSys);
ecs.addSystem(renderSystem);
ecs.addSystem(renderSystem);

gameLoop();

function gameLoop() {
  ecs.runSystems();
  requestAnimationFrame(gameLoop);
}
