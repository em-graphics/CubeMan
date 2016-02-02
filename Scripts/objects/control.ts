/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    //Control class
    export class Control {
        //Public Instance Variables 
        public rotationSpeedY:number;
        public rotationSpeedX:number;
        public rotationSpeedZ:number;
        
        //Constructor
        constructor(rotationSpeed:number) {
           this.rotationSpeedY = rotationSpeed;
           this.rotationSpeedX = rotationSpeed;
           this.rotationSpeedZ = rotationSpeed;
        }        
    }
}
