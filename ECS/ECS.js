import {Entity} from "./Entity.js";

export class ECS {
    constructor() {
        this.entities = [];
        this.entitiesToAdd = [];
        this.entitiesToRemove = [];
        this.freedEntities = []

        this.allComponentPools = [];
        this.componentBitsets = new Uint32Array(1000);

        this.allSystems = [];
    }

    //todo make the naming more consistent, esp where the bitsets are concerned

    /////////////////ENTITIES AND COMPONENTS////////////////////////

    //when the data is needed then get the components themselves, otherwise leave them alone
    //when testing for components use the componentBitsets

    //todo add check of freedEntities. If there is one available recycle it.
    createEntity(name) {
        //check freedEntityLength if not 0
            //get the id stored there use it for the index of this.entities,
            //if a new name has been passed in, assign the name parameter to it
            //return the id

        const entity = new Entity(name);

        this.entities.push(entity);
        return entity;
    }

    getEntity(id) { return this.entities[id]; }

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

    getEntitiesWithComponentSet(requiredComponents) {
        const entities = [];

        // i in the for loop has the same value as the corrisponding entity ids.
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

    //todo consider using a template function for entity creation
    entityCreationQueue(creationFunction){
        this.entitiesToAdd.push(creationFunction);
    }

    processEntityCreationQueue(){
        while (this.entitiesToAdd.length > 0) {
            const createEntityFunction = this.entitiesToAdd.shift();
            createEntityFunction();
        }
    }

    removeEntity(entityID) {
        this.entitiesToRemove.push(entityID);
    }

    //todo test the removal process
    //set componentSet to 0 and add the entityID to freedEntities for recycling
    processEntityRemovals(){
        while (this.entitiesToRemove.length > 0) {
            const entityID = this.entitiesToRemove.shift();
            this.componentBitsets[entityID] = 0;

            this.freedEntities.push(entityID);
        }
    }

    ////////////////////SYSTEMS//////////////////////

    addSystem(system) {
        //if system doesn't already exist, add system to allSystems array
        if (this.allSystems.includes(system)) {
            console.log("can't add system ", system.constructor.name ," as system already exists" );
            return;
        }

        this.allSystems.push(system);
        console.log(system.constructor.name, " added");
    }

    runSystems(deltaTime){
        this.allSystems.forEach(system => {
            system.run(deltaTime);
        });
    }
}

