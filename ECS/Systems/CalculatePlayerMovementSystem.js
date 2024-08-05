import { System } from "./System.js";
import { PlayerInputComponent } from "../Components/PlayerInputComponent.js";
import { RigidbodyComponent } from "../Components/RigidbodyComponent.js";

export class CalculatePlayerMovementSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset  = 1 << PlayerInputComponent.id | 1 << RigidbodyComponent.id ;
    }

    run(deltaTime) {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to run on'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const rigidbodyComponent = this.ecs.getComponent(this.systemEntities[i], RigidbodyComponent);
            const playerInputComponent = this.ecs.getComponent(this.systemEntities[i], PlayerInputComponent);

            //take the input and affect the movementComponent
            let inputX = 0
            inputX += playerInputComponent.left ? -1 : 0;
            inputX += playerInputComponent.right ? 1 : 0;

            let inputY = 0
            inputY += playerInputComponent.up ? -1 : 0;
            inputY += playerInputComponent.down ? 1 : 0;

            let playerMoveSpeed = rigidbodyComponent.maxMoveSpeed;

            rigidbodyComponent.velocity.x = (playerMoveSpeed * inputX) * deltaTime;
            rigidbodyComponent.velocity.y = (playerMoveSpeed * inputY) * deltaTime;
        }
    }
}