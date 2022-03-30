'use strict';

export default class GameObject {

    #prefab;

    constructor( prefab ) {

        this.#prefab = prefab
    }


    get mass() { return this.#prefab.mass }
    set mass( newMass ) { this.#prefab.mass = newMass  }


    populate( sourceData ) {
        const my = this.#prefab.populate( sourceData );
    }


    serialize() { return this.#prefab.serialize() }
}