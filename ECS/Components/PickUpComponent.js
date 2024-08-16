import {Component} from "./Component.js";

export class PickUpComponent extends Component {
    static id = Component.nextId++;

    constructor(){
        super();
    }

    getID(){
        return PickUpComponent.id;
    }
}