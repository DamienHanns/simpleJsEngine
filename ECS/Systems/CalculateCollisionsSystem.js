import { System } from "./System.js";
import { RigidbodyComponent } from "../Components/RigidbodyComponent.js";
import { CollisionRectComponent } from "../Components/CollisionRectComponent.js";
import { PositionComponent } from "../Components/PositionComponent.js";


//check if collisions on moving objects will occur this frame and adjust the rigidbody velocity accordingly.

export class CalculateCollisionsSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << RigidbodyComponent.id | 1 << CollisionRectComponent.id | 1 << PositionComponent.id ;
    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const entityA = this.systemEntities[i];

            const rigidbodyComponentA = this.ecs.getComponent(entityA, RigidbodyComponent);

            if (rigidbodyComponentA.isStatic) { continue; }

            const collisionComponentA = this.ecs.getComponent(entityA, CollisionRectComponent);
            const positionComponentA = this.ecs.getComponent(entityA, PositionComponent);

            //todo take into account offset values for both entityA and entityB
            const newX = positionComponentA.x;
            const newY = positionComponentA.y;

            collisionComponentA.collisions.left = false;
            collisionComponentA.collisions.right = false;
            collisionComponentA.collisions.above = false;
            collisionComponentA.collisions.below = false;

            let topLeftA = { x: newX , y: newY };
            let topRightA = { x: newX + collisionComponentA.width, y: newY };
            let botLeftA = { x: newX, y: newY + collisionComponentA.height };
            let botRightA = { x: newX + collisionComponentA.width, y: newY + collisionComponentA.height };

            for (let j = 0; j < this.systemEntities.length; j++){
                //avoid self collisions
                if (j === i) { continue;}

                const entityB = this.systemEntities[j];
                const positionComponentB = this.ecs.getComponent(entityB, PositionComponent);

                const entityBPos = { x: positionComponentB.x , y: positionComponentB.y };


                //todo collisions only check corners, consider intermediary points between the corners for differently sized objects
                const horizontalDirection = Math.sign(rigidbodyComponentA.velocity.x);
                if (horizontalDirection !== 0){
                    if (horizontalDirection > 0){
                        if (checkCollisionNodesHorizontal(topRightA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.right = true; }
                        if (checkCollisionNodesHorizontal(botRightA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.right = true; }
                    } else {
                        if (checkCollisionNodesHorizontal(topLeftA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.left = true }
                        if (checkCollisionNodesHorizontal(botLeftA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.left = true }
                    }
                }
                //todo check if i can slip into corners
                const verticalDirection  = Math.sign(rigidbodyComponentA.velocity.y);
                if (verticalDirection !== 0){
                    if (verticalDirection > 0){
                        if (checkCollisionNodesVertical(botRightA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.below = true }
                        if (checkCollisionNodesVertical (botLeftA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.below = true }
                    } else {
                        if (checkCollisionNodesVertical (topLeftA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.above = true }
                        if (checkCollisionNodesVertical (topRightA, entityBPos, rigidbodyComponentA.velocity))
                        { collisionComponentA.collisions.above = true }
                    }
                }
            }

            if (collisionComponentA.collisions.below || collisionComponentA.collisions.above) { rigidbodyComponentA.velocity.y = 0; }
            if (collisionComponentA.collisions.right || collisionComponentA.collisions.left) { rigidbodyComponentA.velocity.x = 0; }
        }

        function checkCollisionNodesHorizontal (nodePosA, entityBPos, velocity, widthB = 32, heightB = 32){
            return (nodePosA.x + velocity.x >= entityBPos.x &&
                nodePosA.x + velocity.x <= entityBPos.x + widthB &&
                nodePosA.y >= entityBPos.y &&
                nodePosA.y <= entityBPos.y + heightB);
        }

        function checkCollisionNodesVertical (nodePosA, entityBPos, velocity, widthB = 32, heightB = 32){
            return (nodePosA.x >= entityBPos.x &&
                nodePosA.x <= entityBPos.x + widthB &&
                nodePosA.y + velocity.y >= entityBPos.y &&
                nodePosA.y  + velocity.y <= entityBPos.y + heightB);
        }
    }
}