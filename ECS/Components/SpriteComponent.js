import {Component} from './Component.js';

export class SpriteComponent extends Component {
    static bIdSet = false;
    static id = Component.nextId++;

    constructor(
        spritePath = "./Chick.png",
        xOffset = 0, yOffset = 0,
        width = 32, height = 32
        ){

        super();

        this.sprite = new Image();
        this.sprite.src = spritePath;

        this.xPos = xOffset;
        this.yPos = yOffset;
        this.width = width;
        this.height = height;

        this.objectID = SpriteComponent.id;
        this.name = this.constructor.name;
    }

    getID(){
        console.log('sprite ID: ', SpriteComponent.id);
        return SpriteComponent.id;
    }
}