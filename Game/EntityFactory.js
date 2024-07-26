import { SpriteComponent }   from "../ECS/Components/SpriteComponent.js";
import { PositionComponent } from "../ECS/Components/PositionComponent.js";
import { MovementComponent } from "../ECS/Components/MovementComponent.js";
import {PlayerInputComponent} from "../ECS/Components/PlayerInputComponent.js";

export class EntityFactory {

    static createHugo(ecs, xPos = 0, yPos = 0, xVel = 0, yVel) {
        const entity = ecs.createEntity('hugo');
        ecs.addComponent(entity, new SpriteComponent());
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new MovementComponent(xVel, yVel));
        ecs.addComponent(entity, new PlayerInputComponent());
    }

    static createNathaniel (ecs, xPos = 0, yPos = 0, xVel = 0, yVel) {
        const entity = ecs.createEntity('Nathaniel');
        ecs.addComponent(entity, new SpriteComponent());
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new MovementComponent(xVel, yVel));
    }

    static createPetra (ecs, xPos = 0, yPos = 0, xVel = 0, yVel) {
        const entity = ecs.createEntity('Nathaniel');
        ecs.addComponent(entity, new SpriteComponent());
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new MovementComponent(xVel, yVel));
    }


}
