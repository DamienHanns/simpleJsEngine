import {Component} from './Component.js';

export class PlayerInputComponent extends Component {
    static id = Component.nextId++;

    constructor(
    ){
        super();

        this.down = false;
        this.left = false;
        this.right = false;
        this.up = false;
    }

    //todo check the uses of getID.
    getID(){
        return PlayerInputComponent.id;
    }
}

/*
this.keys = {
            W: false,
            A: false,
            S: false,
            D: false,
            ArrowUp: false,
            ArrowLeft: false,
            ArrowDown: false,
            ArrowRight: false
        };
 */