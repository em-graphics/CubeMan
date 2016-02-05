/*
Source file name : https://github.com/em-graphics/CubeMan.git
Live link : http://cubeman-eunmi.azurewebsites.net/
Author : Eunmi Han(300790610)
Date last Modified : Feb 05, 2016
Program Description : Rotating Cube Man
Revision History :1.12

Last Modified by Eunmi Han

*/
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
