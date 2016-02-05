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
var objects;
(function (objects) {
    //Control class
    var Control = (function () {
        //Constructor
        function Control(rotationSpeed) {
            this.rotationSpeedY = rotationSpeed;
            this.rotationSpeedX = rotationSpeed;
            this.rotationSpeedZ = rotationSpeed;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map