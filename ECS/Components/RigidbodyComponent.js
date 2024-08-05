import {Component} from './Component.js';

export class RigidbodyComponent extends Component {
    static id = Component.nextId++;

    constructor(
        isStatic = true, maxMoveSpeed = 500,
    ){
        super();
        this.isStatic = isStatic;
        this.maxMoveSpeed = isStatic ? 0 : maxMoveSpeed;

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.name = this.constructor.name;
    }



    getID(){
        return RigidbodyComponent.id;
    }
}