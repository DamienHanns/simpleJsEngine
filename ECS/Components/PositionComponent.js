import {Component} from './Component.js';

export class PositionComponent extends Component {
    static id = Component.nextId++;

    constructor(
        x = 0, y = 0,
    ){
        super();
        this.x = x;
        this.y = y;
    }

    getID(){
        return PositionComponent.id;
    }
}