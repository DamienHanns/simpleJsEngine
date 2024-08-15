import { System } from "./System.js";
import { CollisionRectComponent } from "../Components/CollisionRectComponent.js";

export class ResetCollisionsSystem extends System {
    constructor(ecs) {
        super(ecs);

        //todo other collision object doesnt really need a rigidbody, it would just need a collider
        this.componentBitset  = 1 << CollisionRectComponent.id ;
    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const entity = this.systemEntities[i];

            const collisionComponent = this.ecs.getComponent(entity, CollisionRectComponent);

            collisionComponent.collisions.left = false;
            collisionComponent.collisions.right = false;
            collisionComponent.collisions.above = false;
            collisionComponent.collisions.below = false;

            collisionComponent.entitiesCollidedWith.length = 0;
        }
    }
}