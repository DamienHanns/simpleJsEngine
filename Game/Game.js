import { EntityFactory } from "./EntityFactory.js";

import { ApplyMovementSystem } from '../ECS/Systems/ApplyMovementSystem.js';
import { RenderSystem } from "../ECS/Systems/RenderSystem.js";
import { InputSystem } from "../ECS/Systems/InputSystem.js";
import {CalculatePlayerMovementSystem} from "../ECS/Systems/CalculatePlayerMovementSystem.js";


export class Game{
    constructor(ecs) {
        this.ecs = ecs

        this.scenes = [];
        this.currentSceneIndex = 0;
        this.sceneLoaded = false;

        this.loadScene();
    }

    run()   {
        this.ecs.processEntityCreationQueue();
        this.ecs.runSystems();
        //ecs.removeEntities();
    }

    //todo create a scenedata object
    //todo change this function to load sceneData passed into it as a parameter
    loadScene(/* sceneData */){
        //todo evaluate if this check is needed after choosing a better way of handling scene loading
        if (this.sceneLoaded) { return }

        ////////entity setup////////////
        this.ecs.entityCreationQueue(() => EntityFactory.createHugo(this.ecs,0, 0, 0, 0));
        this.ecs.entityCreationQueue(() => EntityFactory.createNathaniel(this.ecs,0,0, 0, 1));

        //////level systems/////////
        this.ecs.addSystem(new InputSystem(this.ecs));
        this.ecs.addSystem(new CalculatePlayerMovementSystem(this.ecs))
        this.ecs.addSystem(new ApplyMovementSystem(this.ecs));
        this.ecs.addSystem(new RenderSystem(this.ecs));

        this.sceneLoaded = true
    }

}

