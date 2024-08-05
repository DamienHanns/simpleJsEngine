import {Component} from './Component.js';

export class CollisionRectComponent extends Component {
    static id = Component.nextId++;

    constructor(reportCollisions = false, width= 32, height= 32, xOffset = 0, yOffset = 0) {
        super();
        this.width = width;
        this.height = height;

        this.xOffset = xOffset;
        this.yOffset = yOffset;

        this.collisions = {
            above: false, below: false,
            left: false, right: false
        };


        this.reportCollisions = reportCollisions;
    }

    getID(){
        return CollisionRectComponent.id;
    }
}