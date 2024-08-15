import { SpriteComponent }   from "../ECS/Components/SpriteComponent.js";
import { PositionComponent } from "../ECS/Components/PositionComponent.js";
import { RigidbodyComponent } from "../ECS/Components/RigidbodyComponent.js";
import { PlayerInputComponent } from "../ECS/Components/PlayerInputComponent.js";
import { CollisionRectComponent } from "../ECS/Components/CollisionRectComponent.js";
import { CollisionSpriteComponent } from "../ECS/Components/CollisionSpriteComponent.js";
import { ChickenFeedComponent } from "../ECS/Components/ChickenFeedComponent.js";

export class EntityFactory {

    //todo consider using a config object for parameters.
    static createHugo(ecs,
                      xPos = 0, yPos = 0,
                      maxTopSpeed = 500,
                      spritePath = "Game/Assets/Chick.png"
    ) {
        let entity = ecs.createEntity('hugo');
        ecs.addComponent(entity, new SpriteComponent(spritePath));
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new RigidbodyComponent(false, maxTopSpeed));
        ecs.addComponent(entity, new PlayerInputComponent());
        ecs.addComponent(entity, new CollisionRectComponent(32,32));
        ecs.addComponent(entity, new CollisionSpriteComponent());
    }

    static createNathaniel (ecs,
                            xPos = 0, yPos = 0,
                            maxTopSpeed = 500,
                            spritePath = "Game/Assets/Chick.png"
    ) {
        let entity = ecs.createEntity('Nathaniel');
        ecs.addComponent(entity, new SpriteComponent(spritePath));
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new RigidbodyComponent(false, maxTopSpeed, 0, 1));
        ecs.addComponent(entity, new CollisionRectComponent(32,32));
        ecs.addComponent(entity, new CollisionSpriteComponent());
    }

    static createWallBlock (ecs,
                            xPos = 0, yPos = 0,
                            maxTopSpeed = 50,
                            spritePath = "Game/Assets/WallSprite.png"
    ) {
        let entity = ecs.createEntity('WallBlock');
        ecs.addComponent(entity, new SpriteComponent(spritePath));
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new RigidbodyComponent());
        ecs.addComponent(entity, new CollisionRectComponent(32,32));
        ecs.addComponent(entity, new CollisionSpriteComponent());

    }

    static createChickenFeed (ecs,
                            xPos = 0, yPos = 0,
                            maxTopSpeed = 0,
                            spritePath = "Game/Assets/ChickenFeed.png"
    ) {
        let entity = ecs.createEntity('ChickenFeed');
        ecs.addComponent(entity, new SpriteComponent(spritePath));
        ecs.addComponent(entity, new PositionComponent(xPos, yPos));
        ecs.addComponent(entity, new RigidbodyComponent());
        ecs.addComponent(entity, new CollisionRectComponent(10,10 ));
        ecs.addComponent(entity, new CollisionSpriteComponent());
        ecs.addComponent(entity, new ChickenFeedComponent());

    }
}
