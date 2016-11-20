var currentlyPressedKeys= [];
var collidableMeshes= [];
var speed= [0,0,0];

var width= window.innerWidth;
var height= window.innerHeight;

var renderer= new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
 
// create scene object
var scene= new THREE.Scene;

// create simple geometry and add to scene
var cubeGeometry= new THREE.CubeGeometry(1, 1, 1);
var cubeMaterial= new THREE.MeshLambertMaterial({ color: 0xff0000});
var cube= new THREE.Mesh(cubeGeometry, cubeMaterial);

var sphereGeom= new THREE.SphereGeometry(.3, 50);
var player= new THREE.Mesh(sphereGeom, cubeMaterial);
player.position.set(0, 1, 49);
cube.position.set(2, 0, 1)
collidableMeshes.push(cube);

var geometry= new THREE.PlaneGeometry(100, 100, 32);
var material= new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
var plane= new THREE.Mesh(geometry, material);
plane.rotation.x= Math.PI/2;

// create perspective camera
var camera= new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.x= player.position.x;
camera.position.y= 5;
camera.position.z= player.position.z+1;
camera.rotation.x= -Math.PI /2 + (1/4);

// add to scene and renderer
scene.add(camera); 
renderer.render(scene, camera);

// add lighting and add to scene 
var pointLight= new THREE.PointLight(0xaabbcc);
pointLight.position.set(10, 16, 16);
scene.add(pointLight);
scene.add(player);
scene.add(cube);
scene.add(plane);

window.onload= function init(){
    window.addEventListener("keydown", function(event) {
		currentlyPressedKeys[event.keyCode] = true;
    });
    
    window.addEventListener("keyup", function(event) {
		currentlyPressedKeys[event.keyCode] = false;
    });

	setupMaze();
    render();
}




function render() 
{
    
function handle_input(){
    speed = [0,0,0]

    if(currentlyPressedKeys[65] == true){ //A key
       speed[0]= -.05
    }
    if(currentlyPressedKeys[68] == true){ //D key
        speed[0]= .05;
    }
    if(currentlyPressedKeys[87] == true){ //W key
        speed[2]= -.05
    }
    if(currentlyPressedKeys[83] == true){ //S key
        speed[2]= .05
    }
}

function detect_collisions(){
    // Collision detection inspired by view-source:http://stemkoski.github.io/Three.js/Collision-Detection.html
    //and http://webmaestro.fr/collisions-detection-three-js-raycasting/

    this.rays= [
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 0, 1)
    ];

    var originPoint= player.position.clone();
    
    for(var i=0; i<rays.length; i++){
		var directionVector= rays[i];
        var ray= new THREE.Raycaster(originPoint, directionVector.clone().normalize());
		var maximumDist= .25;
		var collisionResults= ray.intersectObjects(collidableMeshes);
		if (collisionResults.length > 0 && collisionResults[0].distance < maximumDist){
            console.log("Hit");
            if(directionVector.x > 0 && speed[0] > 0){
                speed[0] = 0;
            }
            if(directionVector.x < 0 && speed[0] < 0){
                speed[0] = 0;
            }
            if(directionVector.z < 0 && speed[2] < 0){
                speed[2] = 0;
            }
            if(directionVector.z > 0 && speed[2] > 0){
                speed[2] = 0;
            }
        }
	}
}

function update_position(){
    camera.position.x += speed[0];
    player.position.x += speed[0];

    camera.position.z += speed[2];
    player.position.z += speed[2];
}

function setupMaze(){
	var wallGeometry= new THREE.CubeGeometry(0.5,5,5);
	var wallMaterial= new THREE.MeshLambertMaterial({ color: 0x003399 });
	var wall= new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(2, 1, 47.5);
	collidableMeshes.push(wall);
	scene.add(wall);
}

function render(){
    handle_input();
    detect_collisions();
    update_position();
    renderer.render(scene, camera);
    requestAnimationFrame(render);	
    requestAnimationFrame(render);
}
render();

