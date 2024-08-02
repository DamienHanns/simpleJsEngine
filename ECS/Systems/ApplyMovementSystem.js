import {System} from "./System.js";
import {PositionComponent} from "../Components/PositionComponent.js";
import {RigidbodyComponent} from "../Components/RigidbodyComponent.js";

export class ApplyMovementSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << PositionComponent.id | 1 << RigidbodyComponent.id ;
    }

    run(maxMoveSpeed) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const rigidbodyComponent = this.ecs.getComponent(this.systemEntities[i], RigidbodyComponent);
            const position = this.ecs.getComponent(this.systemEntities[i], PositionComponent);

            position.x += rigidbodyComponent.xVelocity;
            position.y += rigidbodyComponent.yVelocity;
        }
    }
}