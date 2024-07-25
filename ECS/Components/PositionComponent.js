import {Component} from './Component.js';

export class PositionComponent extends Component {
    static bIdSet = false;
    static id = Component.nextId++;

    constructor(
        x = 0, y = 0,
    ){
        super();
        this.x = x;
        this.y = y;
        this.name = this.constructor.name;
    }

    getID(){
        return PositionComponent.id;
    }
}