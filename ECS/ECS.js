import {Entity} from "./Entity.js";
import {Component} from "./Components/Component.js";

export class ECS {
    constructor() {
        this.entities = [];
        this.allComponentPools = [];
        this.componentBitsets = new Uint32Array(1000);

        this.allSystems = [];
    }

    /////////////////ENTITIES AND COMPONENTS////////////////////////

    createEntity(name) {
        const entity = new Entity(name);
        this.entities.push(entity);
        return entity;
    }

    getEntity(id) {
        return this.entities[id];
    }

    getAllEntities () { return this.entities; };
    getAllComponents(){ return this.allComponentPools; };

    addComponent(entity, component) {
        const entityID = entity.getID();
        const componentID = component.getID();

        //if already has component return
        if (this.hasComponents(entityID, 1 << componentID)) {
            console.log('Already has component: ', component.constructor.name);
            return;
        }

        //use the componentID as the index value in componentPools,
        //if there is no pool at index, create a new pool there
        if (!this.allComponentPools[componentID]) { this.allComponentPools[componentID] = []; }

        //adds the given component into the pool at the index of its ID.
        this.allComponentPools[componentID][entityID] = component;

        //add component to bitset
        this.componentBitsets[entityID] |= 1 << componentID;

        //this.checkBinaryValue(this.componentBitsets[entityID])
    }



    checkBinaryValue(valueToCheck){
        let binaryString = valueToCheck.toString(2);
        binaryString.padStart(32, '0');
        console.log(binaryString);
    }

    getComponent(entity, component) {
        const componentPool = this.allComponentPools[component.id];
        return componentPool ? componentPool[entity] : undefined;
    }

    //todo DONT NEED BOTH getEntity FUNCTIONS
    getEntitiesWithComponent(requiredComponents) {
        const entities = [];

        for (let i = 0; i < this.entities.length; i++) {
            if ((this.componentBitsets[i] & requiredComponents) === requiredComponents) {
                entities.push(i);
            }
        }

        return entities;
    }

    getEntitiesWithComponentSet(requiredComponents) {
        const entities = [];

        for (let i = 0; i < this.entities.length; i++) {
            if ((this.componentBitsets[i] & requiredComponents) === requiredComponents) {
                entities.push(i);
            }
        }

        return entities;
    }

    removeComponent(entityID, component) {
        this.componentBitsets[entityID] &= ~ 1 << component.getID();
    }

    hasComponents(entityID, requiredComponentSet) {
        return (this.componentBitsets[entityID] & requiredComponentSet) === requiredComponentSet;
    }

    ////////////////////SYSTEMS//////////////////////

    addSystem(system) {
        //if system doesn't already exist, add system to allSystems array
        if (this.allSystems.includes(system)) {
            console.log("can't add system ", system.constructor.name ," as system already exists" );
            return;
        }

        this.allSystems.push(system);
        console.log("move system added");
    }

    runSystems(){
        this.allSystems.forEach(system => {
            system.run();
        });
    }
}

