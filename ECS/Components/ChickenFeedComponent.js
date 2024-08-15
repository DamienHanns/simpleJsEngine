import { Component } from './Component.js';

export class ChickenFeedComponent extends Component {
    static id = Component.nextId++;

    constructor(){
        super();
    }

    getID(){
        return ChickenFeedComponent.id;
    }
}