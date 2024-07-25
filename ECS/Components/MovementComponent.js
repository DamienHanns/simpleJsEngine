import {Component} from './Component.js';

export class MovementComponent extends Component {
    static bIdSet = false;
    static id = Component.nextId++;

    constructor(
        x = 0, y = 0,
    ){
        super();
        this.xVelocity = 2;
        this.yVelocity = 3;

        this.name = this.constructor.name;
    }

    getID(){
        return MovementComponent.id;
    }
}