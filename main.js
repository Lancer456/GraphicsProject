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

	var sphereGeom= new THREE.SphereGeometry(.5, 50);
	player= new THREE.Mesh(sphereGeom, playerMaterial);
	player.position.set(-2.5, 1, 48);
	interactable.push(true);

	var geometry= new THREE.PlaneGeometry(100, 100, 32);
	var material= new THREE.MeshLambertMaterial( {color: 0x404040, side: THREE.DoubleSide} );
	plane= new THREE.Mesh(geometry, material);
	plane.rotation.x= Math.PI/2;

	// create perspective camera
	camera= new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
	camera.position.x= player.position.x;
	camera.position.y= 7;
	camera.position.z= player.position.z+2.5;
	camera.rotation.x= -Math.PI/2 + .5;

	// add to scene and renderer
	scene.add(camera); 
	renderer.render(scene, camera);

	// add lighting and add to scene 

	pointLight= new THREE.PointLight(0xffffff, 1, 6);
	pointLight.position.x = player.position.x;
    pointLight.position.y = 5;
    pointLight.position.z = player.position.z+1;

    var ambientLight= new THREE.AmbientLight(0x464646);

    player.add(pointLight)

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
		camera.position.z -= .25;
    }
	if(currentlyPressedKeys[69] == true) //E key
    {
		camera.position.y += 1;
		camera.position.z += .25;
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
		var maximumDist= .5;
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

function update_position()
{
    camera.position.x += speed[0];
    player.position.x += speed[0];

    camera.position.z += speed[2];
    player.position.z += speed[2];
}

function render()
{
    handle_input();
    detect_collisions();
    update_position();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
