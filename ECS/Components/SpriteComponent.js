import {Component} from './Component.js';

export class SpriteComponent extends Component {
    static id = Component.nextId++;

    constructor(
        spritePath,
        xOffset = 0, yOffset = 0,
        width = 32, height = 32
        ){
        super();
        this.sprite = new Image();
        this.sprite.src = spritePath;

        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
    }

    getID(){
        return SpriteComponent.id;
    }
}