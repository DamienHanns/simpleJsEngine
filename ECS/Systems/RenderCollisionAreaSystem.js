import {System} from "./System.js";
import { PositionComponent } from "../Components/PositionComponent.js";
import { CollisionRectComponent} from "../Components/CollisionRectComponent.js";
import { CollisionSpriteComponent } from "../Components/CollisionSpriteComponent.js";

export class RenderCollisionAreaSystem extends System {
    constructor(ecs) {
        super(ecs);

        this.componentBitset = 1 << CollisionSpriteComponent.id | 1 << CollisionRectComponent.id | 1 << PositionComponent.id;
    }

    run() {
        this.systemEntities = this.ecs.getEntitiesWithComponentSet(this.componentBitset);

        if (this.systemEntities === undefined) { console.log('has no entities to render'); return; }

        const canvas = document.getElementById('gameCanvas');
        const context = canvas.getContext('2d');


        for (let i = 0; i < this.systemEntities.length; i++) {
            const collisionSpriteComponent = this.ecs.getComponent(this.systemEntities[i], CollisionSpriteComponent);
            if (!collisionSpriteComponent.showColliisonSprite) { continue; }

            const collisionRectComponent = this.ecs.getComponent(this.systemEntities[i], CollisionRectComponent);
            const positionComponent = this.ecs.getComponent(this.systemEntities[i], PositionComponent);

            const xPos = positionComponent.x + collisionRectComponent.xOffset
            const yPos = positionComponent.y + collisionRectComponent.yOffset

            context.drawImage(collisionSpriteComponent.collisionSprite, xPos, yPos);
        }
    }
}