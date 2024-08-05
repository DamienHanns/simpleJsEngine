import {Component} from './Component.js';

export class RigidbodyComponent extends Component {
    static id = Component.nextId++;

    constructor(
        isStatic = true, maxMoveSpeed = 500, velX = 0, velY = 0
    ){
        super();
        this.isStatic = isStatic;
        this.maxMoveSpeed = isStatic ? 0 : maxMoveSpeed;

        this.velocity = {
            x: velX,
            y: velY,
        }

        this.name = this.constructor.name;
    }



    getID(){
        return RigidbodyComponent.id;
    }
}