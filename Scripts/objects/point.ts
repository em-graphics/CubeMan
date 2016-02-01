/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    //Point class
    export class Point { 
        public x:number;
        public y:number;
        public z:number;
        //Constructor
        constructor(x:number, y:number, z:number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
}
