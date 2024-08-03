import {Component} from './Component.js';

export class CollisionSpriteComponent extends Component {
    static id = Component.nextId++;

    constructor(
        showCollisionSprite = false, spritePath = 'Game/Assets/CollisionSprite.png'
        ){
        super();

        this.showColliisonSprite = showCollisionSprite;
        this.collisionSpritePath = 'Game/Assets/CollisionSprite.png'

        this.collisionSprite = new Image();
        this.collisionSprite.src = this.collisionSpritePath;
    }

    getID(){
        return CollisionSpriteComponent.id;
    }
}