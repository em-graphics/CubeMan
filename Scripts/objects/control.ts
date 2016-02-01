/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    //Control class
    export class Control {
        //Public Instance Variables 
        public rotationSpeed:number;
        
        //Constructor
        constructor(rotationSpeed:number) {
           this.rotationSpeed = rotationSpeed;
        }        
    }
}
