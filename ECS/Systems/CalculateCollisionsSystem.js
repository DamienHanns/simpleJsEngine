import { System } from "./System.js";
import { RigidbodyComponent } from "../Components/RigidbodyComponent.js";
import { CollisionRectComponent } from "../Components/CollisionRectComponent.js";
import { PositionComponent } from "../Components/PositionComponent.js";

//check if moving objects will collide with other entities with CollisionRectComponent.
//first check vertical collisions. If no collision occurs update the y value of the collision nodes,
//then check for horizontal collision. collision checks are based on the velocity value in the rigidbody
export class CalculateCollisionsSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.newX = 0;
        this.newY = 0;

        this.buffer = 1;

        this.topLeftA = { x: 0, y: 0 };
        this.topRightA = { x: 0, y: 0 };
        this.botLeftA = { x: 0, y: 0 };
        this.botRightA = { x: 0, y: 0 };

        //todo other collision object doesnt really need a rigidbody, it would just need a collider
        this.componentBitset  = 1 << RigidbodyComponent.id | 1 << CollisionRectComponent.id | 1 << PositionComponent.id ;
    }

    checkCollisionNodesHorizontal (nodePosA, entityBPos, velocityA, widthB, heightB ){
        return (nodePosA.x + (velocityA.x + this.buffer) >= entityBPos.x &&
            nodePosA.x + (velocityA.x - this.buffer) <= entityBPos.x + widthB &&
            nodePosA.y >= entityBPos.y &&
            nodePosA.y <= entityBPos.y + heightB);
    }

    checkCollisionNodesVertical (nodePosA, entityBPos, velocityA, widthB, heightB ){
        return (nodePosA.x >= entityBPos.x &&
            nodePosA.x <= entityBPos.x + widthB &&
            nodePosA.y + ( velocityA.y + this.buffer ) >= entityBPos.y &&
            nodePosA.y  + ( velocityA.y - this.buffer ) <= entityBPos.y + heightB);
    }


    //get the collision node positions of the moving object being tested, and check the positions in gamespace that the object is about to
    //move to by adding the rigidboys velocity to it.
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
            this.newX = positionComponentA.x;
            this.newY = positionComponentA.y;

            this.topLeftA = { x: this.newX , y: this.newY };
            this.topRightA = { x: this.newX + collisionComponentA.width, y: this.newY };
            this.botLeftA = { x: this.newX, y: this.newY + collisionComponentA.height };
            this.botRightA = { x: this.newX + collisionComponentA.width, y: this.newY + collisionComponentA.height };

            collisionComponentA.collisions.left = false;
            collisionComponentA.collisions.right = false;
            collisionComponentA.collisions.above = false;
            collisionComponentA.collisions.below = false;

            for (let j = 0; j < this.systemEntities.length; j++){
                //avoid self collisions
                if (j === i) { continue;}

                const entityB = this.systemEntities[j];
                const positionComponentB = this.ecs.getComponent(entityB, PositionComponent);
                const collisionComponentB = this.ecs.getComponent(entityB, CollisionRectComponent);
                const entityBPos = { x: positionComponentB.x , y: positionComponentB.y };

                let bEntitiesHaveCollided = false;

                //todo needs to check collision agaisnt smaller objects, 16 by 16
                const verticalDirection  = Math.sign(rigidbodyComponentA.velocity.y);
                if (verticalDirection !== 0){
                    if (verticalDirection > 0){
                        if (this.checkCollisionNodesVertical(this.botRightA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.below = true;
                            bEntitiesHaveCollided = true;
                        }
                        if (this.checkCollisionNodesVertical (this.botLeftA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.below = true;
                            bEntitiesHaveCollided = true;
                        }
                    } else {
                        if (this.checkCollisionNodesVertical (this.topLeftA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.above = true;
                            bEntitiesHaveCollided = true;
                        }
                        if (this.checkCollisionNodesVertical (this.topRightA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.above = true;
                            bEntitiesHaveCollided = true;
                        }
                    }
                }

                //update collision node positions before the horizontal checks. this is to try and prevent clipping through corners.
                if (collisionComponentA.collisions.below === false && collisionComponentA.collisions.above === false){
                    this.newY = positionComponentA.y + rigidbodyComponentA.velocity.y;
                    this.topLeftA = { x: this.newX , y: this.newY };
                    this.topRightA = { x: this.newX + collisionComponentA.width, y: this.newY };
                    this.botLeftA = { x: this.newX, y: this.newY + collisionComponentA.height };
                    this.botRightA = { x: this.newX + collisionComponentA.width, y: this.newY + collisionComponentA.height };
                }

                //todo collisions only check corners, consider intermediary points between the corners for differently sized objects
                const horizontalDirection = Math.sign(rigidbodyComponentA.velocity.x);
                if (horizontalDirection !== 0){
                    if (horizontalDirection > 0){
                        if (this.checkCollisionNodesHorizontal(this.topRightA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.right = true;
                            bEntitiesHaveCollided = true;
                        }
                        if (this.checkCollisionNodesHorizontal(this.botRightA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.right = true;
                            bEntitiesHaveCollided = true;
                        }
                    } else {
                        if (this.checkCollisionNodesHorizontal(this.topLeftA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.left = true;
                            bEntitiesHaveCollided = true;
                        }
                        if (this.checkCollisionNodesHorizontal(this.botLeftA, entityBPos, rigidbodyComponentA.velocity, collisionComponentB.width, collisionComponentB.height)) {
                            collisionComponentA.collisions.left = true;
                            bEntitiesHaveCollided = true;
                        }
                    }
                }

                //add to entities collided with
                collisionComponentA.entitiesCollidedWith.push(this.systemEntities[j]);
            }



            //todo collect info on entities being collided with.
            //todo move the velocity change to another system that would be un after this.
            if (collisionComponentA.collisions.below || collisionComponentA.collisions.above) { rigidbodyComponentA.velocity.y = 0; }
            if (collisionComponentA.collisions.right || collisionComponentA.collisions.left) { rigidbodyComponentA.velocity.x = 0; }
        }
    }
}