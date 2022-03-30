export default class Prefab {


    constructor( sourceData ) {

        this.__private__ = {
            name: "Strong Box",
            value: "0",
            height: "70",
            width: "70",
            texture: "strong-box",
            mass: "90",
            restitution: "0",
            friction: "1",
            shape: "square"
        }

        this.$view = null;
        const my = this.__private__;
        
        if (sourceData != undefined){
            my = { ...my, ...sourceData}
        }
    }
    
    get mass() { return this.__private__.mass }

    set mass(newMass){
        const my = this.__private__;

        my.mass = newMass;
    }



    populate( sourceData ) {
        const my = this.__private__;

        let data = sourceData;
        if (sourceData.typeof === "string")
            data = JSON.parse( sourceData );

        my = { ...data };
    }


    serialize() {

        return JSON.stringify( this.data );
    }
}