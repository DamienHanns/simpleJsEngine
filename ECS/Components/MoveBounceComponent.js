import { Component } from './Component.js';

export class MoveBounceComponent extends Component {
    static id = Component.nextId++;

    constructor(){
        super();
    }

    getID(){
        return MoveBounceComponent.id;
    }
}