import {Component} from './Component.js';

export class MovementComponent extends Component {
    static id = Component.nextId++;

    constructor(
        maxMoveSpeed = 500, xVelocity = 0, yVelocity = 0,
    ){
        super();
        this.maxMoveSpeed = maxMoveSpeed;

        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;

        this.name = this.constructor.name;
    }



    getID(){
        return MovementComponent.id;
    }
}