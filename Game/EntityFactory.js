import { SpriteComponent }   from "../ECS/Components/SpriteComponent.js";
import { PositionComponent } from "../ECS/Components/PositionComponent.js";
import { MovementComponent } from "../ECS/Components/MovementComponent.js";
import { PlayerInputComponent } from "../ECS/Components/PlayerInputComponent.js";

export class EntityFactory {

    static createHugo(ecs, xPos = 0, yPos = 0, maxTopSpeed = 500) {
        const entity = ecs.createEntity('hugo');
        ecs.addComponent(entity, new SpriteComponent());
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new MovementComponent(maxTopSpeed));
        ecs.addComponent(entity, new PlayerInputComponent());
    }

    static createNathaniel (ecs, xPos = 0, yPos = 0, maxTopSpeed = 50) {
        const entity = ecs.createEntity('Nathaniel');
        ecs.addComponent(entity, new SpriteComponent());
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new MovementComponent(maxTopSpeed));
    }

    static createPetra (ecs, xPos = 260, yPos = 300, maxTopSpeed = 100) {
        const entity = ecs.createEntity('Nathaniel');
        ecs.addComponent(entity, new SpriteComponent());
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new MovementComponent(maxTopSpeed));
    }


}
