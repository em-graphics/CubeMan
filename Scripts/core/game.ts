/// <reference path="_reference.ts"/>

// Main Game File

//ThreeJS Aliases

import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var head: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry:CubeGeometry;
var cubeMaterial:LambertMaterial;
var body: Mesh;
var arm_left: Mesh;
var arm_right: Mesh;
var leg_left: Mesh;
var leg_right: Mesh;
var shoe_left: Mesh;
var shoe_right: Mesh;
var t_left: Mesh;
var t_right: Mesh;

function init() {
    //Instantiate a new Scene objects
    scene = new Scene();
    
    //setup the default renderer
    setupRenderer(); 
    
    //setup the camera
    setupCamera();
    
    // Add an axis helper o the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(16, 16, 1, 1),
        new LambertMaterial({ color: 0xe79b61 }),
        0, 0, 0);
        
    plane.rotation.x = -0.5 * Math.PI;
    
    scene.add(plane);
    console.log("Added Plane Primitive to scene");
    
    //Add a Cube to the Scene
    cubeMaterial = new LambertMaterial({color:0x00ff00});
    cubeGeometry = new CubeGeometry(2, 2, 2);
    
    head = new Mesh(cubeGeometry,new LambertMaterial({color:0xffe08c}));
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 3;
    
    body = new Mesh(new CubeGeometry(3, 4, 3), new LambertMaterial({color:0xffffff}));
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 5;
    
    t_left = new Mesh(new CubeGeometry(1, 1, 1), new LambertMaterial({color:0xffffff}));
    t_left.castShadow = true;
    t_left.receiveShadow = true;
    t_left.position.x = 2;
    t_left.position.y = 1;
    
    t_right = new Mesh(new CubeGeometry(1, 1, 1), new LambertMaterial({color:0xffffff}));
    t_right.castShadow = true;
    t_right.receiveShadow = true;
    t_right.position.x = -2;
    t_right.position.y = 1;
    
    arm_left = new Mesh(new CubeGeometry(1.5, 1, 1), new LambertMaterial({color:0xffe08c}));
    arm_left.castShadow = true;
    arm_left.receiveShadow = true;
    arm_left.position.y = 1;
    arm_left.position.x = 3.25;
   
    arm_right = new Mesh(new CubeGeometry(1.5, 1, 1), new LambertMaterial({color:0xffe08c}));
    arm_right.castShadow = true;
    arm_right.receiveShadow = true;
    arm_right.position.y = 1;
    arm_right.position.x = -3.25;
    
    leg_left = new Mesh(new CubeGeometry(1, 6, 1), new LambertMaterial({color:0x005766}));
    leg_left.castShadow = true;
    leg_left.receiveShadow = true;
    leg_left.position.x = 0.7;
    leg_left.position.y = -2;
    
    leg_right = new Mesh(new CubeGeometry(1, 6, 1), new LambertMaterial({color:0x005766}));
    leg_right.castShadow = true;
    leg_right.receiveShadow = true;
    leg_right.position.x = -0.7;
    leg_right.position.y = -2;
    
    scene.add(body);
    body.add(arm_left);
    body.add(arm_right);
    body.add(head);
    body.add(t_left);
    body.add(t_right);
    body.add(leg_left);
    body.add(leg_right);
      
    console.log("Added Cube Primitive to scene");
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x404040);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    //Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(10, 23.1, 5.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    spotLight.target.position.set(0,3,3);
    spotLight.shadowDarkness = 0.5;
    
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    //Add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);

    //Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene");

    document.body.appendChild(renderer.domElement);
    //Render the scene
    gameLoop(); 	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = CScreen.RATIO;
//    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
//    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeedX',-0.5,0.5);
    gui.add(controlObject, 'rotationSpeedY',-0.5,0.5);
    gui.add(controlObject, 'rotationSpeedZ',-0.5,0.5);
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
function gameLoop(): void {
    stats.update();
  
    body.rotation.y += control.rotationSpeedY;
    body.rotation.x += control.rotationSpeedX;
    body.rotation.z += control.rotationSpeedZ;
    
    //render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    //render the scene
    renderer.render(scene, camera);
}

//Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
//    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

//Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}



