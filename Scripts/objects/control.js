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