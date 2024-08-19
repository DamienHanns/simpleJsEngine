import {Component} from "./Component.js";

export class PickUpComponent extends Component {
    static id = Component.nextId++;

    constructor(pickUpType = 'speed', pickUpValue = 10){
        super();

        this.type = pickUpType;
        this.value = pickUpValue;
    }

    getID(){
        return PickUpComponent.id;
    }
}