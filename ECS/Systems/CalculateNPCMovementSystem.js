import { System } from "./System.js";
import { MovementComponent } from "../Components/MovementComponent.js";
import { PlayerInputComponent } from "../Components/PlayerInputComponent.js";

export class CalculateNPCMovementSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << MovementComponent.id ;
        this.unwantedComponentBitset  = 1 << PlayerInputComponent.id ;
    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            if (this.ecs.hasComponentSet(this.systemEntities[i], this.unwantedComponentBitset)) { continue;}

            const moveComponent = this.ecs.getComponent(this.systemEntities[i], MovementComponent);

            moveComponent.xVelocity = (moveComponent.maxMoveSpeed) * deltaTime;
            moveComponent.yVelocity = (moveComponent.maxMoveSpeed) * deltaTime;
        }
    }
}