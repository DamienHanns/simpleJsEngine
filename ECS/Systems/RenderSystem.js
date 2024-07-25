import {System} from "./System.js";
import {PositionComponent} from "../Components/PositionComponent.js";
import {SpriteComponent} from "../Components/SpriteComponent.js";

export class RenderSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset = 1 << SpriteComponent.id | 1 << PositionComponent.id;
    }

    run() {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to render'); return; }

        const canvas = document.getElementById('gameCanvas');
        const context = canvas.getContext('2d');

        // Clear the canvas and redraw all sprites
        context.clearRect(0, 0, canvas.width, canvas.height);

        //if both sprite and position components are true, render the data
        for (let i = 0; i < this.systemEntities.length; i++) {
            const spriteComponent = this.ecs.getComponent(this.systemEntities[i], SpriteComponent);
            const positionComponent = this.ecs.getComponent(this.systemEntities[i], PositionComponent);

            context.drawImage(spriteComponent.sprite, positionComponent.x, positionComponent.y);
        }
    }
}