import { System } from "./System.js";
import { MovementComponent } from "../Components/MovementComponent.js";
import { CollisionRectComponent } from "../Components/CollisionRectComponent.js";
import { PositionComponent } from "../Components/PositionComponent.js";

export class CalculateCollisionSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << MovementComponent.id | 1 << CollisionRectComponent.id | 1 << PositionComponent.id ;

    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        //todo, take movment into account. At current all others need a movementComponent in order to register collisions.
        for (let i = 0; i < this.systemEntities.length; i++) {
            const moveComponent = this.ecs.getComponent(this.systemEntities[i], MovementComponent);
            const collisionComponent = this.ecs.getComponent(this.systemEntities[i], CollisionRectComponent);
            const positionComponent = this.ecs.getComponent(this.systemEntities[i], PositionComponent);

            for (let j = 0; j < this.systemEntities.length; j++){
                //avoid self collisions
                if (j === i) { continue;}

                const otherMoveComponent = this.ecs.getComponent(this.systemEntities[j], MovementComponent);
                const otherCollisionComponent = this.ecs.getComponent(this.systemEntities[j], CollisionRectComponent);
                const otherPositionComponent = this.ecs.getComponent(this.systemEntities[j], PositionComponent);

                report(
                    positionComponent.x < otherPositionComponent.x + otherCollisionComponent.width &&
                    positionComponent.x + collisionComponent.width > otherPositionComponent.x &&
                    positionComponent.y < otherPositionComponent.y + otherCollisionComponent.height &&
                    positionComponent.y + collisionComponent.height > otherPositionComponent.y);
            }
        }

        function report(hasCollided){
            if (hasCollided){
                console.log(hasCollided);
            }
        }
    }

}