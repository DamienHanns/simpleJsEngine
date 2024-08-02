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

        for (let i = 0; i < this.systemEntities.length; i++) {

            const moveComponent = this.ecs.getComponent(this.systemEntities[i], MovementComponent);
            const collisionComponent = this.ecs.getComponent(this.systemEntities[i], CollisionRectComponent);
            const positionComponent = this.ecs.getComponent(this.systemEntities[i], PositionComponent);

            const xVelocity = moveComponent.xVelocity;
            const yVelocity = moveComponent.yVelocity;

            //todo adjust for offsets.
            const xTopLeft = positionComponent.x;
            const yTopLeft = positionComponent.y;

            const xTopRight = positionComponent.x + collisionComponent.width;
            const yTopRight = positionComponent.y;

            const xBottomLeft = positionComponent.x;
            const yBottomLeft = positionComponent.y + collisionComponent.height;

            const xBottomRight = positionComponent.x + collisionComponent.width;
            const yBottomRight = positionComponent.y + collisionComponent.height;

            //console.log('xTopLeft: ', Math.floor(xTopLeft * 100) / 100 , 'yTopLeft',Math.floor(yTopLeft * 100) / 100);
           // console.log('xTopRight: ', Math.floor(xTopRight * 100) / 100 , 'yTopRight',Math.floor(yTopRight * 100) / 100);

           // console.log('xBottomLeft: ', Math.floor(xBottomLeft * 100) / 100 , 'yBottomLeft',Math.floor(yBottomLeft * 100) / 100);
           // console.log('xBottomRight: ', Math.floor(xBottomRight * 100) / 100 , 'yBottomRight',Math.floor(yBottomRight * 100) / 100);

            for (let j = 0; j < this.systemEntities.length; j++){
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