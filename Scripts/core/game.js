/*
Source file name : https://github.com/em-graphics/CubeMan.git
Live link : http://cubeman-eunmi.azurewebsites.net/
Author : Eunmi Han(300790610)
Date last Modified : Feb 05, 2016
Program Description : Rotating Cube Man
Revision History :1.12

Last Modified by Eunmi Han

*/
/// <reference path="_reference.ts"/>
// Main Game File
//ThreeJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var head;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var body;
var arm_left;
var arm_right;
var leg_left;
var leg_right;
var shoe_left;
var shoe_right;
var t_left;
var t_right;
var tpocket;
var eye_left;
var eye_right;
var skinMaterial;
var shirtsMaterial;
var pantsMaterial;
var shoesMaterial;
var planeMaterial;
var test;
function init() {
    //Instantiate a new Scene objects
    scene = new Scene();
    //setup the default renderer
    setupRenderer();
    //setup the camera
    setupCamera();
    scene.add(this.camera);
    // Add an axis helper o the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene");
    //Add a Plane to the Scene
    planeMaterial = new LambertMaterial({ color: 0xe79b61 });
    plane = new gameObject(new PlaneGeometry(20, 16, 1, 1), planeMaterial, 0, 0, 0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene");
    //Add a Cube to the Scene
    skinMaterial = new LambertMaterial({ color: 0xffe08c });
    shirtsMaterial = new LambertMaterial({ color: 0xffffff });
    pantsMaterial = new LambertMaterial({ color: 0x005766 });
    shoesMaterial = new LambertMaterial({ color: 0xff1212 });
    head = new Mesh(new CubeGeometry(2, 2, 2), skinMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 2;
    eye_left = new Mesh(new CubeGeometry(0.3, 0.4, 0.3), new LambertMaterial({ color: 0x000000 }));
    eye_left.castShadow = true;
    eye_left.receiveShadow = true;
    eye_left.position.y = 2.5;
    eye_left.position.z = -0.9;
    eye_left.position.x = 0.5;
    eye_right = new Mesh(new CubeGeometry(0.3, 0.4, 0.3), new LambertMaterial({ color: 0x000000 }));
    eye_right.castShadow = true;
    eye_right.receiveShadow = true;
    eye_right.position.y = 2.5;
    eye_right.position.z = -0.9;
    eye_right.position.x = -0.5;
    body = new Mesh(new CubeGeometry(3, 3, 3), shirtsMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 5;
    tpocket = new Mesh(new CubeGeometry(1, 1, 0.25), new LambertMaterial({ color: 0x8c8c8c }));
    tpocket.castShadow = true;
    tpocket.receiveShadow = true;
    tpocket.position.x = -0.6;
    tpocket.position.y = 0.6;
    tpocket.position.z = -1.5;
    t_left = new Mesh(new CubeGeometry(1, 1, 1), shirtsMaterial);
    t_left.castShadow = true;
    t_left.receiveShadow = true;
    t_left.position.x = 2;
    t_left.position.y = 0.5;
    t_right = new Mesh(new CubeGeometry(1, 1, 1), shirtsMaterial);
    t_right.castShadow = true;
    t_right.receiveShadow = true;
    t_right.position.x = -2;
    t_right.position.y = 0.5;
    arm_left = new Mesh(new CubeGeometry(1.5, 1, 1), skinMaterial);
    arm_left.castShadow = true;
    arm_left.receiveShadow = true;
    arm_left.position.y = 0.5;
    arm_left.position.x = 3.25;
    arm_right = new Mesh(new CubeGeometry(1.5, 1, 1), skinMaterial);
    arm_right.castShadow = true;
    arm_right.receiveShadow = true;
    arm_right.position.y = 0.5;
    arm_right.position.x = -3.25;
    shoe_left = new Mesh(new CubeGeometry(1, 0.5, 2), shoesMaterial);
    shoe_left.castShadow = true;
    shoe_left.receiveShadow = true;
    shoe_left.position.x = 0.7;
    shoe_left.position.y = -4.25;
    shoe_left.position.z = -0.5;
    shoe_right = new Mesh(new CubeGeometry(1, 0.5, 2), shoesMaterial);
    shoe_right.castShadow = true;
    shoe_right.receiveShadow = true;
    shoe_right.position.x = -0.7;
    shoe_right.position.y = -4.25;
    shoe_right.position.z = -0.5;
    leg_left = new Mesh(new CubeGeometry(1, 5, 1), pantsMaterial);
    leg_left.castShadow = true;
    leg_left.receiveShadow = true;
    leg_left.position.x = 0.7;
    leg_left.position.y = -1.5;
    leg_right = new Mesh(new CubeGeometry(1, 5, 1), pantsMaterial);
    leg_right.castShadow = true;
    leg_right.receiveShadow = true;
    leg_right.position.x = -0.7;
    leg_right.position.y = -1.5;
    scene.add(body);
    body.add(eye_left);
    body.add(eye_right);
    body.add(tpocket);
    body.add(arm_left);
    body.add(arm_right);
    body.add(head);
    body.add(t_left);
    body.add(t_right);
    body.add(leg_left);
    body.add(leg_right);
    body.add(shoe_left);
    body.add(shoe_right);
    console.log("Added Cube Primitive to scene");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x404040);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    //Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    // spotLight.position.set(10, 23.1, 5.4);
    spotLight.position.set(-40, 60, 10);
    //spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    spotLight.target.position.set(0, 3, 3);
    //spotLight.shadowDarkness = 0.5;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    //Add controls
    gui = new GUI();
    control = new Control(0.1);
    addControl(control);
    //Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene");
    document.body.appendChild(renderer.domElement);
    //Render the scene
    gameLoop();
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = CScreen.RATIO;
    camera.updateProjectionMatrix();
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeedX', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedY', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedZ', -0.5, 0.5);
    //Add color picker gui
    gui.addColor({ color: 0xffe08c }, 'color').onChange(function (newColor) {
        skinMaterial.color.setHex(newColor);
    });
    gui.addColor({ color: 0xffffff }, 'color').onChange(function (newColor) {
        shirtsMaterial.color.setHex(newColor);
    });
    gui.addColor({ color: 0x005766 }, 'color').onChange(function (newColor) {
        pantsMaterial.color.setHex(newColor);
    });
    gui.addColor({ color: 0xff1212 }, 'color').onChange(function (newColor) {
        shoesMaterial.color.setHex(newColor);
    });
    gui.addColor({ color: 0xe79b61 }, 'color').onChange(function (newColor) {
        planeMaterial.color.setHex(newColor);
    });
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
//Setup main game loop
function gameLoop() {
    stats.update();
    body.rotation.y += control.rotationSpeedY;
    body.rotation.x += control.rotationSpeedX;
    body.rotation.z += control.rotationSpeedZ;
    //body.geometry = this.test;
    //render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    //render the scene
    renderer.render(scene, camera);
}
//Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
//Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map