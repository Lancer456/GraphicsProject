var currentlyPressedKeys= [];
var collidableMeshes= [];
var interactable= []; //boolean array-used to detemine if the object is interactable
 
// create scene object
var scene, player, cube, speed;

window.onload= function init(){
    window.addEventListener("keydown", function(event){
		currentlyPressedKeys[event.keyCode]= true;
    });
    
    window.addEventListener("keyup", function(event){
		currentlyPressedKeys[event.keyCode]= false;
    });
	
	var width= window.innerWidth;
	var height= window.innerHeight;
	
	renderer= new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

	// create scene object
	scene= new THREE.Scene;

	var playerMaterial= new THREE.MeshLambertMaterial({ color: 0x890000});

	var sphereGeom= new THREE.SphereGeometry(.3, 50);
	player= new THREE.Mesh(sphereGeom, playerMaterial);
	player.position.set(0, 1, 49);
	interactable.push(true);

	var geometry= new THREE.PlaneGeometry(100, 100, 32);
	var material= new THREE.MeshLambertMaterial( {color: 0x404040, side: THREE.DoubleSide} );
	plane= new THREE.Mesh(geometry, material);
	plane.rotation.x= Math.PI/2;

	// create perspective camera
	camera= new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
	camera.position.x= player.position.x;
	camera.position.y= 5;
	camera.position.z= player.position.z+2;
	camera.rotation.x= -Math.PI /2 + .5;

	// add to scene and renderer
	scene.add(camera); 
	renderer.render(scene, camera);

	// add lighting and add to scene 

	pointLight= new THREE.PointLight(0xaabbcc);
	pointLight.position.x = player.position.x;
    pointLight.y = 2;
    pointLight.z = player.position.z+20;

    var ambientLight = new THREE.AmbientLight( 0x464646)

	scene.add(pointLight);
	scene.add(player);
	scene.add(plane);
    scene.add(ambientLight);

	setupMaze();

    renderer.render(scene, camera);
    render();
}
    
function handle_input()
{
    speed = [0,0,0]

    if(currentlyPressedKeys[65] == true)
    { //A key
       speed[0]= -.05
    }
    if(currentlyPressedKeys[68] == true)
    { //D key
        speed[0]= .05;
    }
    if(currentlyPressedKeys[87] == true) //W key
    { 
        speed[2]= -.05
    }
    if(currentlyPressedKeys[83] == true) //S key
    { 
        speed[2]= .05
    }

    if(currentlyPressedKeys[16] == true) //ShiftKey
    {
        for(var i = 0; i < speed.length; i++)
        {
            speed[i] = speed[i] * 1.5;
        }
    }
    if(currentlyPressedKeys[81] == true) //Q key
    {
		camera.position.y -= 1;
    }
	if(currentlyPressedKeys[69] == true) //E key
    {
		camera.position.y += 1;
    }
}

function detect_collisions()
{
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
    
    for(var i=0; i<rays.length; i++)
    {
		var directionVector= rays[i];
        var ray= new THREE.Raycaster(originPoint, directionVector.clone().normalize());
		var maximumDist= .3;
		var collisionResults= ray.intersectObjects(collidableMeshes);
		if (collisionResults.length > 0 && collisionResults[0].distance < maximumDist)
        {
            console.log("Hit");
            if(directionVector.x > 0 && speed[0] > 0)
            {
                speed[0] = 0;
            }
            if(directionVector.x < 0 && speed[0] < 0)
            {
                speed[0] = 0;
            }
            if(directionVector.z < 0 && speed[2] < 0)
            {
                speed[2] = 0;
            }
            if(directionVector.z > 0 && speed[2] > 0)
            {
                speed[2] = 0;
            }
        }
	}
}

function interact()
{

}

function update_position(){
    camera.position.x += speed[0];
    player.position.x += speed[0];

    camera.position.z += speed[2];
    player.position.z += speed[2];
}

function setupMaze(){
	outerWalls();
	
	var x_pos= [
		-25, -15, -5, 20, 35, 
		-40, -30, -20, -10, 0, 15, 30, 35, 45, 
		-45, -35, -5, 0, 10, 25, 35, 40,
		-45, -35, -30, -15, -5, 0, 5, 25, 30, 35, 45,
		-45, -40, -20, -10, 0, 5, 15, 25, 45,
		-45, -25, 5, 10, 20, 35, 45,
		-45, -40, -35, -20, -15, 0, 5, 10, 20, 30, 45,
		-40, -35, -25, -20, -10, 0, 5, 10, 15, 30, 40, 45,
		-45, -40, -30, -25, -15, -5, 0, 10, 15, 20, 30, 35, 45,
		-45, -40, -15, -10, -5, 0, 10, 15, 25, 30,
		-45, -40, -15, -10, 5, 20, 35, 45,
		-40, -20, 0, 5, 15, 20, 25, 35, 40,
		-45, -30, -20, -5, 15, 20, 25, 30,
		-40, -30, -25, -10, 0, 15, 25, 35, 45,
		-25, -20, -15, -10, 0, 5, 30, 40,
		-45, -25, -20, -10, 0, 10, 20, 25, 35, 40, 45,
		-45, -30, -25, -20, -10, -5, 5, 10, 15, 25, 35, 45,
		-35, -30, -10, 0, 10, 35,
		-35, -30, -10, 0, 5, 15, 35, 45,
		-35, -15, -5, 0, 10, 20, 30, 45];
	var z_pos= [
		47.5, 47.5, 47.5, 47.5, 47.5, 
		42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 
		37.5, 37.5, 37.5, 37.5, 37.5, 37.5, 37.5, 37.5,
		32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5,
		27.5, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5,
		22.5, 22.5, 22.5, 22.5, 22.5, 22.5, 22.5,
		17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5,
		12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5,
		7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5,
		2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
		-2.5, -2.5, -2.5, -2.5, -2.5, -2.5, -2.5, -2.5,
		-7.5, -7.5, -7.5, -7.5, -7.5, -7.5, -7.5, -7.5, -7.5,
		-12.5, -12.5, -12.5, -12.5, -12.5, -12.5, -12.5, -12.5,
		-17.5, -17.5, -17.5, -17.5, -17.5, -17.5, -17.5, -17.5, -17.5,
		-22.5, -22.5, -22.5, -22.5, -22.5, -22.5, -22.5, -22.5,
		-27.5, -27.5, -27.5, -27.5, -27.5, -27.5, -27.5, -27.5, -27.5, -27.5, -27.5,
		-32.5, -32.5, -32.5, -32.5, -32.5, -32.5, -32.5, -32.5, -32.5, -32.5, -32.5, -32.5,
		-37.5, -37.5, -37.5, -37.5, -37.5, -37.5
		-42.5, -42.5, -42.5, -42.5, -42.5, -42.5, -42.5, -42.5
		-47.5, -47.5, -47.5, -47.5, -47.5, -47.5, -47.5, -47.5];
	var rotation= [
		0, 0, 0, 0, 0, 
		0, 0, 0, 0, 0, 0, 0, 0, 0, 
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0];
	
	var wallMaterial= new THREE.MeshLambertMaterial({ color: 0x003399 });
	var wallGeometry= new THREE.CubeGeometry(0.5,5,5);
	
	for(var i=0; i<x_pos.length; i++){
		var wall= new THREE.Mesh(wallGeometry, wallMaterial);
		
		wall.position.set(x_pos[i], 2.5, z_pos[i]);
		wall.rotation.y= rotation[i];
		collidableMeshes.push(wall);
		scene.add(wall);
	}
}

function outerWalls(){
	var wallMaterial= new THREE.MeshLambertMaterial({ color: 0x003399 });
	var wallGeometry= new THREE.CubeGeometry(0.5,2,100.5);
	
	var bottomWall= new THREE.Mesh(wallGeometry, wallMaterial);
	bottomWall.position.set(0,1,50);
	bottomWall.rotation.y= Math.PI/2;
	collidableMeshes.push(bottomWall);
	scene.add(bottomWall);
	
	var leftWall= new THREE.Mesh(wallGeometry, wallMaterial);
	leftWall.position.set(-50,1,0);
	collidableMeshes.push(leftWall);
	scene.add(leftWall);
	
	var topWall= new THREE.Mesh(wallGeometry, wallMaterial);
	topWall.position.set(0,1,-50);
	topWall.rotation.y= Math.PI/2;
	collidableMeshes.push(topWall);
	scene.add(topWall);
	
	var rightWall= new THREE.Mesh(wallGeometry, wallMaterial);
	rightWall.position.set(50,1,0);
	collidableMeshes.push(rightWall);
	scene.add(rightWall);
}

function render()
{
    handle_input();
    detect_collisions();
    update_position();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
