import {System} from "./System.js";
import {PositionComponent} from "../Components/PositionComponent.js";
import {MovementComponent} from "../Components/MovementComponent.js";

export class ApplyMovementSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << PositionComponent.id | 1 << MovementComponent.id ;
    }

    run() {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const moveComponent = this.ecs.getComponent(this.systemEntities[i], MovementComponent);
            const position = this.ecs.getComponent(this.systemEntities[i], PositionComponent);

            position.x += moveComponent.xVelocity;
            position.y += moveComponent.yVelocity;
        }
    }
}