import {Component} from './Component.js';

export class CollisionRectComponent extends Component {
    static id = Component.nextId++;

    constructor(width= 32, height= 32 , xOffset = 0, yOffset = 0) {
        super();
        this.width = width;
        this.height = height;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.collisionSprite = 'Game/Assets/CollisionSprite.png'
    }

    getID(){
        return CollisionRectComponent.id;
    }
}