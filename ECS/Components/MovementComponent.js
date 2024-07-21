import {Component} from './Component.js';

export class MovementComponent extends Component {
    static bIdSet = false;
    static id = Component.nextId++;

    constructor(
        x = 0, y = 0,
    ){
        super();
        this.xVelocity = 7;
        this.yVelocity = 9;


        this.objectID = MovementComponent.id;
        this.name = this.constructor.name;
    }

    getID(){
        return MovementComponent.id;
    }
}