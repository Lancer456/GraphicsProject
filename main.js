
var currentlyPressedKeys = [];
var collidableMeshes = [];
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
 
// create scene object
var scene = new THREE.Scene;

// create simple geometry and add to scene
var cubeGeometry = new THREE.CubeGeometry(1,1, 1);
//var cubeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('crate.jpg')});
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000});
var player = new THREE.Mesh(cubeGeometry, cubeMaterial); // Cube object is a stand in for the player model

var sphereGeom = new THREE.SphereGeometry(1);
var sphere = new THREE.Mesh(sphereGeom, cubeMaterial);
sphere.position.set(2, 0, 1)
collidableMeshes.push(sphere);

var geometry = new THREE.PlaneGeometry( 5, 5, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = Math.PI / 2;

// create perspective camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 5;
camera.position.z = 1;
camera.rotation.x = -Math.PI /2 + (1/4);

// add to scene and renderer
scene.add(camera); 
renderer.render(scene, camera);

// create the view matrix


// add lighting and add to scene 
var pointLight = new THREE.PointLight(0xaabbcc);
pointLight.position.set(10, 16, 16);
scene.add(pointLight);
scene.add(player);
scene.add(sphere);
scene.add(plane)

window.onload = function init()
{
    window.addEventListener("keydown", function(event) {
		currentlyPressedKeys[event.keyCode] = true;
    });
    
    window.addEventListener("keyup", function(event) {
		currentlyPressedKeys[event.keyCode] = false;
    });

    render();
}

/*
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);
 */
 
renderer.render(scene, camera);

function handle_input()
{
    var speed = 0.05
    
    /*
    if((player.position.x == 0) || (player.position.z == 0) || (player.position.x == 5) || (player.position.z == 5))
    {
        speed = 0;
    }
    */
    if(currentlyPressedKeys[65] == true) //A key
    {
       camera.position.x -= speed;
       player.position.x -= speed;
    }
    if(currentlyPressedKeys[68] == true) //D key
    {
        camera.position.x += speed;
        player.position.x += speed;
    }
    if(currentlyPressedKeys[87] == true) //W key
    {
        camera.position.z -= speed;
        player.position.z -= speed;
    }
    if(currentlyPressedKeys[83] == true) //S key
    {
        camera.position.z += speed;
        player.position.z += speed;
    }

    //camera.lookAt(cube.position);
}








function render() 
{
    
    handle_input();
    renderer.render(scene, camera);
    requestAnimationFrame(render);	
}


