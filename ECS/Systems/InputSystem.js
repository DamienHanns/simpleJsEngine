import { System } from "./System.js";
import { PlayerInputComponent } from "../Components/PlayerInputComponent.js";

export class InputSystem extends System {
    constructor(ecs) {
        super(ecs);
        this.componentBitset = 1 << PlayerInputComponent.id;

        this.keys = {};

        document.addEventListener('keydown', (event) => {
            let key = event.key;
            if (key.length === 1) {
                key = key.toUpperCase();
            }

            this.keys[key] = true
        });

        document.addEventListener('keyup', (event) => {
            let key = event.key;
            if (key.length === 1) {
                key = key.toUpperCase();
            }

            this.keys[key] = false
        });

    }

    run() {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('no entities with input component'); return; }

        for (let i = 0; i < this.systemEntities.length; i++) {
            const inputComponent = this.ecs.getComponent(this.systemEntities[i], PlayerInputComponent);

            //check all inputs for a generically named boolean, then assign it.

            //Up Inputs
            inputComponent.up = this.keys.W || this.keys.ArrowUp;

            //Left Inputs
            inputComponent.left = this.keys.A || this.keys.ArrowLeft;

            //Down Inputs
            inputComponent.down = this.keys.S || this.keys.ArrowDown;

            //Right Inputs
            inputComponent.right = this.keys.D || this.keys.ArrowRight;

        }
    }
}