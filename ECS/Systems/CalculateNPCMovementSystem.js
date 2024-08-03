import { System } from "./System.js";
import { RigidbodyComponent } from "../Components/RigidbodyComponent.js";
import { PlayerInputComponent } from "../Components/PlayerInputComponent.js";

export class CalculateNPCMovementSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << RigidbodyComponent.id ;
        this.unwantedComponentBitset  = 1 << PlayerInputComponent.id ;
    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            if (this.ecs.hasComponentSet(this.systemEntities[i], this.unwantedComponentBitset)) { continue;}

            const rigidbodyComponent = this.ecs.getComponent(this.systemEntities[i], RigidbodyComponent);

            rigidbodyComponent.xVelocity = (rigidbodyComponent.maxMoveSpeed) * deltaTime;
            rigidbodyComponent.yVelocity = (rigidbodyComponent.maxMoveSpeed) * deltaTime;
        }
    }
}