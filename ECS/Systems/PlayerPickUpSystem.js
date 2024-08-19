import { System } from "./System.js";
import { CollisionRectComponent } from "../Components/CollisionRectComponent.js";
import { PlayerInputComponent } from "../Components/PlayerInputComponent.js";
import { PickUpComponent } from "../Components/PickUpComponent.js";
import { RigidbodyComponent } from "../Components/RigidbodyComponent.js";

export class PlayerPickUpSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << CollisionRectComponent.id | 1 << PlayerInputComponent.id;
        this.pickUpComponent = 1 << PickUpComponent.id;
    }

    //check collisionComponent.entitiesCollidedWith on player for pickUpComponents.
    // If found, process the pickups and remove the pick entity
    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const collisionComponent = this.ecs.getComponent(this.systemEntities[i], CollisionRectComponent);

            if (collisionComponent.bisColliding()) {
             for (let i = 0; i < collisionComponent.entitiesCollidedWith.length; i++) {
                    if (this.ecs.hasComponents(collisionComponent.entitiesCollidedWith[i], this.pickUpComponent)){
                        const pickUp = this.ecs.getComponent(collisionComponent.entitiesCollidedWith[i], PickUpComponent);

                        if (pickUp.type === 'speed'){
                            const rigidbodyComponent = this.ecs.getComponent(this.systemEntities[i], RigidbodyComponent);
                            if (rigidbodyComponent !== undefined){
                                rigidbodyComponent.maxMoveSpeed += pickUp.value;

                            }
                        }

                        this.ecs.removeEntity(collisionComponent.entitiesCollidedWith[i]);
                    }
                }
            }
        }
    }
}