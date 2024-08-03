import { System } from "./System.js";
import { RigidbodyComponent } from "../Components/RigidbodyComponent.js";
import { CollisionRectComponent } from "../Components/CollisionRectComponent.js";
import { PositionComponent } from "../Components/PositionComponent.js";

export class CalculateCollisionsSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << RigidbodyComponent.id | 1 << CollisionRectComponent.id | 1 << PositionComponent.id ;

    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const collisionComponent = this.ecs.getComponent(this.systemEntities[i], CollisionRectComponent);
            if (collisionComponent.isStatic === true) { continue; }

            const rigidbodyComponent = this.ecs.getComponent(this.systemEntities[i], RigidbodyComponent);
            const positionComponent = this.ecs.getComponent(this.systemEntities[i], PositionComponent);

            let xPosition = positionComponent.x + rigidbodyComponent.xVelocity;
            let yPosition = positionComponent.y + rigidbodyComponent.yVelocity;

            for (let j = 0; j < this.systemEntities.length; j++){
                //avoid self collisions
                if (j === i) { continue;}

               // const otherRigidbodyComponent = this.ecs.getComponent(this.systemEntities[j], RigidbodyComponent);
                const otherCollisionComponent = this.ecs.getComponent(this.systemEntities[j], CollisionRectComponent);
                const otherPositionComponent = this.ecs.getComponent(this.systemEntities[j], PositionComponent);

                //todo take collision offsets into account
                const hasCollided = (
                    xPosition < otherPositionComponent.x + otherCollisionComponent.width &&
                    xPosition + collisionComponent.width > otherPositionComponent.x &&
                    yPosition < otherPositionComponent.y + otherCollisionComponent.height &&
                    yPosition + collisionComponent.height > otherPositionComponent.y);

                if (hasCollided) {
                    rigidbodyComponent.xVelocity = 0;
                    rigidbodyComponent.yVelocity = 0;
                }
            }
        }

        function report(hasCollided){
            if (hasCollided){
                console.log(hasCollided);
            }
        }
    }

}