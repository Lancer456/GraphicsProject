
currentlyPressedKeys = [];
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
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xddaa66});
var player = new THREE.Mesh(cubeGeometry, cubeMaterial);

// create perspective camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 5;
camera.position.z = 0;
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

/*
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);
 */
 
renderer.render(scene, camera);

function handle_input()
{
    if(currentlyPressedKeys[65] == true) //A key
    {
       camera.position.x -= .2;
    }
    if(currentlyPressedKeys[68] == true) //D key
    {
        camera.position.x +=.2;
    }
    if(currentlyPressedKeys[87] == true) //W key
    {
        camera.position.z -= .2;
    }
    if(currentlyPressedKeys[83] == true) //S key
    {
        camera.position.z +=.2;
    }

    //camera.lookAt(cube.position);
}

function render() 
{
    
    handle_input();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    player.rotation.y += 0.01;
	
}
render();

