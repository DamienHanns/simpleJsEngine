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

    checkCollisionNodesHorizontal (nodePosA, entityBPos, velocityA, widthA, heightA, widthB, heightB ){
        // Calculate the effective collision nodes based on entity sizes
        let numNodes = Math.ceil(heightA / heightB);  // Calculate the number of nodes to consider
        let collisionDetected = false;

        for (let i = 0; i <= numNodes; i++) {
            let interpolatedHeight = nodePosA.y + (i * (heightA / numNodes));

            collisionDetected = collisionDetected || (
                nodePosA.x + (velocityA.x + this.buffer) >= entityBPos.x &&
                nodePosA.x + (velocityA.x - this.buffer) <= entityBPos.x + widthB &&
                interpolatedHeight >= entityBPos.y &&
                interpolatedHeight <= entityBPos.y + heightB
            );

            if (collisionDetected) break;
        }

        return collisionDetected;
    }

    checkCollisionNodesVertical (nodePosA, entityBPos, velocityA, widthA, heightA, widthB, heightB ){
        // Calculate the effective collision nodes based on entity sizes
        let numNodes = Math.ceil(widthA / widthB);  // Calculate the number of nodes to consider
        let collisionDetected = false;

        for (let i = 0; i <= numNodes; i++) {
            let interpolatedWidth = nodePosA.x + i * (widthA / numNodes);

            collisionDetected = collisionDetected || (
                interpolatedWidth >= entityBPos.x &&
                interpolatedWidth <= entityBPos.x + widthB &&
                nodePosA.y + (velocityA.y + this.buffer) >= entityBPos.y &&
                nodePosA.y + (velocityA.y - this.buffer) <= entityBPos.y + heightB
            );

            if (collisionDetected) break;
        }

        return collisionDetected;
    }

    addToCollisionsArray(collisionArray, entityB){
        if (!collisionArray.includes(entityB)) {
            collisionArray.push(entityB);
        }
    }

    //get the collision node positions of the moving object being tested, and check the positions in gamespace that the object is about to
    //move to by adding the rigidbodys velocity to it.
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
                const entityB = this.systemEntities[j];

                //avoid self collisions
                if (entityA === entityB) { continue; }

                const positionComponentB = this.ecs.getComponent(entityB, PositionComponent);
                const collisionComponentB = this.ecs.getComponent(entityB, CollisionRectComponent);
                const entityBPos = { x: positionComponentB.x , y: positionComponentB.y };


                //////////////////VERTICAL COLLISIONS///////////////
                //if there are no vertical collisions update the y on positionComponent
                const verticalDirection  = Math.sign(rigidbodyComponentA.velocity.y);
                if (verticalDirection !== 0){
                    if (verticalDirection > 0){
                        if (this.checkCollisionNodesVertical (
                            this.botLeftA,
                            entityBPos,
                            rigidbodyComponentA.velocity,
                            collisionComponentA.width, collisionComponentA.height,
                            collisionComponentB.width, collisionComponentB.height
                        )) {
                            collisionComponentA.collisions.below = true;

                            this.addToCollisionsArray(collisionComponentA.entitiesCollidedWith, entityB);
                        }
                    }
                    else if (this.checkCollisionNodesVertical (
                            this.topLeftA, entityBPos,
                            rigidbodyComponentA.velocity,
                            collisionComponentA.width, collisionComponentA.height,
                            collisionComponentB.width, collisionComponentB.height
                        )) {
                            collisionComponentA.collisions.above = true;

                            this.addToCollisionsArray(collisionComponentA.entitiesCollidedWith, entityB);
                        }
                }

                //update collision node positions before the horizontal checks.
                // this is to try and prevent clipping through corners.
                if (collisionComponentA.collisions.below === false && collisionComponentA.collisions.above === false){
                    this.newY = positionComponentA.y + rigidbodyComponentA.velocity.y;
                    this.topLeftA = { x: this.newX , y: this.newY };
                    this.topRightA = { x: this.newX + collisionComponentA.width, y: this.newY };
                    this.botLeftA = { x: this.newX, y: this.newY + collisionComponentA.height };
                    this.botRightA = { x: this.newX + collisionComponentA.width, y: this.newY + collisionComponentA.height };
                }


                //////////////////HORIZONTAL COLLISIONS///////////////
                //if there are no horizontal collisions update the x on positionComponent
                const horizontalDirection = Math.sign(rigidbodyComponentA.velocity.x);
                if (horizontalDirection !== 0){
                    if (horizontalDirection > 0){
                        if (this.checkCollisionNodesHorizontal(
                            this.topRightA,
                            entityBPos,
                            rigidbodyComponentA.velocity,
                            collisionComponentA.width, collisionComponentA.height,
                            collisionComponentB.width, collisionComponentB.height
                        )) {
                            collisionComponentA.collisions.right = true;

                            this.addToCollisionsArray(collisionComponentA.entitiesCollidedWith, entityB);
                        }
                    }
                    else if (this.checkCollisionNodesHorizontal(
                            this.topLeftA,
                            entityBPos,
                            rigidbodyComponentA.velocity,
                            collisionComponentA.width, collisionComponentA.height,
                            collisionComponentB.width, collisionComponentB.height
                        )) {
                            collisionComponentA.collisions.left = true;

                            this.addToCollisionsArray(collisionComponentA.entitiesCollidedWith, entityB);
                        }
                }
            }

            if (! collisionComponentA.collisions.below && ! collisionComponentA.collisions.above) {
                positionComponentA.y += rigidbodyComponentA.velocity.y;
            } else {

                console.log('colliding!!!');
            }

            if (! collisionComponentA.collisions.right && ! collisionComponentA.collisions.left) {
                positionComponentA.x += rigidbodyComponentA.velocity.x;
            }else {

                console.log('colliding!!!');
            }
        }
    }
}