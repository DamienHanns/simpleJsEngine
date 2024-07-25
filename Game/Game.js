import { EntityFactory } from "./EntityFactory.js";

import { MovementSystem } from '../ECS/Systems/MovementSystem.js';
import { RenderSystem } from "../ECS/Systems/RenderSystem.js";


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

    loadScene(){
        //todo evaluate if this check is needed after choosing a better way of handling scene loading
        if (this.sceneLoaded) { return }

        ////////entity setup////////////
        this.ecs.entityCreationQueue(() => EntityFactory.createHugo(this.ecs,40, 30));
        this.ecs.entityCreationQueue(() => EntityFactory.createNathaniel(this.ecs,0,0));

        //////level systems/////////
        this.ecs.addSystem(new MovementSystem(this.ecs));
        this.ecs.addSystem(new RenderSystem(this.ecs));

        this.sceneLoaded = true
    }

}

