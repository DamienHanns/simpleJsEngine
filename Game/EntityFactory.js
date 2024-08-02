import { SpriteComponent }   from "../ECS/Components/SpriteComponent.js";
import { PositionComponent } from "../ECS/Components/PositionComponent.js";
import { RigidbodyComponent } from "../ECS/Components/RigidbodyComponent.js";
import { PlayerInputComponent } from "../ECS/Components/PlayerInputComponent.js";
import { CollisionRectComponent } from "../ECS/Components/CollisionRectComponent.js";

export class EntityFactory {

    //todo consider using a config object for parameters.
    static createHugo(ecs,
                      xPos = 0, yPos = 0,
                      maxTopSpeed = 500,
                      spritePath = "Game/Assets/Chick.png"
    ) {
        const entity = ecs.createEntity('hugo');
        ecs.addComponent(entity, new SpriteComponent(spritePath));
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new RigidbodyComponent(false, maxTopSpeed));
        ecs.addComponent(entity, new PlayerInputComponent());
        ecs.addComponent(entity, new CollisionRectComponent());
    }

    static createNathaniel (ecs,
                            xPos = 0, yPos = 0,
                            maxTopSpeed = 50,
                            spritePath = "Game/Assets/Chick.png"
    ) {
        const entity = ecs.createEntity('Nathaniel');
        ecs.addComponent(entity, new SpriteComponent(spritePath));
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new RigidbodyComponent());
        ecs.addComponent(entity, new CollisionRectComponent());
    }
}
