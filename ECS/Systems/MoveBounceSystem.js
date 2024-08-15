import { System } from "./System.js";
import { RigidbodyComponent } from "../Components/RigidbodyComponent.js";
import { PlayerInputComponent } from "../Components/PlayerInputComponent.js";
import { CollisionRectComponent } from "../Components/CollisionRectComponent.js";

export class MoveBounceSystemSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << RigidbodyComponent.id | 1 << CollisionRectComponent.id;
        this.unwantedComponentBitset  = 1 << PlayerInputComponent.id ;

    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            if (this.ecs.hasComponentSet(this.systemEntities[i], this.unwantedComponentBitset)) { continue;}

            const rigidbodyComponent = this.ecs.getComponent(this.systemEntities[i], RigidbodyComponent);
            const collisionComponent = this.ecs.getComponent(this.systemEntities[i], CollisionRectComponent);

            //if collision is detected go in the opposite direction
            if (collisionComponent.bisColliding()){
                if (Math.sign(rigidbodyComponent.velocity.x) !== 0) {
                    rigidbodyComponent.velocity.x *= -1;
                } else if (Math.sign(rigidbodyComponent.velocity.y) !== 0) {
                    rigidbodyComponent.velocity.y *= -1;
                }
            }
        }
    }
}