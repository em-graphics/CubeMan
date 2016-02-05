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
    export class gameObject extends THREE.Mesh {
        //Private Instance Variables
        private _geometry: THREE.Geometry;
        private _material: THREE.Material;
        //Constructor
        constructor(geometry: THREE.Geometry, material: THREE.Material, x:number, y:number, z:number) {
            super(geometry, material);
            this._geometry = geometry;
            this._material = material;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
    }
}