/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    //Point class
    var Point = (function () {
        //Constructor
        function Point(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return Point;
    })();
    objects.Point = Point;
})(objects || (objects = {}));
//# sourceMappingURL=point.js.map