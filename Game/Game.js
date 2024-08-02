import { EntityFactory } from "./EntityFactory.js";

import { ApplyMovementSystem } from '../ECS/Systems/ApplyMovementSystem.js';
import { RenderSystem } from "../ECS/Systems/RenderSystem.js";
import { InputSystem } from "../ECS/Systems/InputSystem.js";
import { CalculatePlayerMovementSystem } from "../ECS/Systems/CalculatePlayerMovementSystem.js";
import { CalculateNPCMovementSystem } from "../ECS/Systems/CalculateNPCMovementSystem.js";
import { CalculateCollisionSystem } from "../ECS/Systems/CalculateCollisionSystem.js";

//the main gameloop to processed from game.run(). All entities are queued for creation, and systems are added, then the
//gameloop is then executed with them.

export class Game{
    constructor(ecs) {
        this.ecs = ecs

        this.scenes = [];
        this.currentSceneIndex = 0;

        this.loadScene();
    }

    run(deltaTime)   {
        this.ecs.processEntityCreationQueue();
        this.ecs.runSystems(deltaTime);
        //ecs.removeEntities();
    }

    //todo create a sceneData object
    //todo change this function to load sceneData passed into it as a parameter
    loadScene(/* sceneData */){
        ////////entity setup////////////
        this.ecs.entityCreationQueue(() => EntityFactory.createHugo(this.ecs,100, 100, 150,"Game/Assets/Chick.png"));
        this.ecs.entityCreationQueue(() => EntityFactory.createNathaniel(this.ecs,100,50, 0, "Game/Assets/Chick.png"));
        this.ecs.entityCreationQueue(() => EntityFactory.createNathaniel(this.ecs,100,150, 0, "Game/Assets/Chick.png"));
        this.ecs.entityCreationQueue(() => EntityFactory.createNathaniel(this.ecs,50,100, 0, "Game/Assets/Chick.png"));
        this.ecs.entityCreationQueue(() => EntityFactory.createNathaniel(this.ecs,150,100, 0, "Game/Assets/Chick.png"));




        //////level systems/////////
        this.ecs.addSystem(new InputSystem(this.ecs));
        this.ecs.addSystem(new CalculatePlayerMovementSystem(this.ecs));
        this.ecs.addSystem(new CalculateNPCMovementSystem(this.ecs));
        this.ecs.addSystem(new CalculateCollisionSystem(this.ecs));
        this.ecs.addSystem(new ApplyMovementSystem(this.ecs));
        this.ecs.addSystem(new RenderSystem(this.ecs));

    }
}

