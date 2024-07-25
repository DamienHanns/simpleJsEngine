import { SpriteComponent }   from "../ECS/Components/SpriteComponent.js";
import { PositionComponent } from "../ECS/Components/PositionComponent.js";
import { MovementComponent } from "../ECS/Components/MovementComponent.js";

export class EntityFactory {
    constructor(ecs) {
        this.ecs = ecs;
    }
    static createHugo (ecs, x = 0, y = 40) {
        this.entity = ecs.createEntity('hugo');
        ecs.addComponent(this.entity, new SpriteComponent());
        ecs.addComponent(this.entity, new PositionComponent(x, y));
        ecs.addComponent(this.entity, new MovementComponent());
    }

    static createNathaniel (ecs, x = 50, y = 20) {
        this.entity = ecs.createEntity('Nathaniel');
        ecs.addComponent(this.entity, new SpriteComponent());
        ecs.addComponent(this.entity, new PositionComponent(x, y));
        ecs.addComponent(this.entity, new MovementComponent());
    }

}
