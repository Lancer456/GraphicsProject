var scene, player, cube, speed, score, level = 1;
var currentlyPressedKeys= [];
var collidableMeshes = [];
var obstacles = [], treasures = [];
// var interactable = [];  // Removed because it wasn't being used

var lognum = 0;
var detect= true, obDetect= true;
// create scene object
//7.65, 1, -3, 

var obsx;
var obsz;
//directions the obstacles move
var obs_direction;
var obs_velocity;
var obs_range;
var obs_speed;

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

    // ---- Player Creation -----
    create_player()
	player.position.set(-2.5, 1, 48);
    scene.add(player);

    create_obstacles();

	var geometry= new THREE.PlaneGeometry(100, 100, 32);
	// var material= new THREE.MeshLambertMaterial({ color: 0x404040, side: THREE.DoubleSide });
	var floorTexture= new THREE.ImageUtils.loadTexture('./Components/stone_floor.jpg');
	floorTexture.wrapS= floorTexture.wrapT= THREE.RepeatWrapping;
	floorTexture.repeat.set(20, 20);
	
	var material= new THREE.MeshLambertMaterial({ map: floorTexture, side: THREE.DoubleSide });
	plane= new THREE.Mesh(geometry, material);
	plane.rotation.x= Math.PI/2;

    scene.add(plane);

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

	pointLight= new THREE.PointLight(0xe1ad24, 1, 10);
	pointLight.position.set(player.position.x, player.position.y +1, player.position.z)
    scene.add(pointLight);
    player.add(pointLight)

    scene.add(pointLight)
    var ambientLight= new THREE.AmbientLight(0x464646);

    
    scene.add(ambientLight);
    
    add_obstacle();



	setupMaze();

    renderer.render(scene, camera);
    render();
}

function create_obstacles()
{
    obsx = [
    7.65, 0
    ];

    obsz = [
    -3, 0
    ];

//directions the obstacles move
    obs_direction = [
    'z', 'x'
    ];

    obs_velocity = [
    1, 1
    ];

    obs_range = [
    3, 3
    ];

    obs_speed = .3;
}

function create_player()
{
    player = new THREE.Object3D();

    // Loads in Texture

    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( );
    loader.load( './Components/Character Texture Lightened.jpg', function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
    } );

    // Loads in the player Model
    var loader = new THREE.OBJLoader( );
    loader.load( './Components/sam_textured.obj', function ( object ) {
        object.scale.set(0.01, 0.01, 0.01);
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
            }
        } );	
        object.position.set(-2.5, 2, 48);
        object.rotation.y = Math.PI;
        
        player = object;
        scene.add(object);

    } );


}

function add_obstacle()
{
     
    //creates an obstacle
    var obstacleMaterial = new THREE.MeshLambertMaterial({color: 0x890000});
    var obstacleGeom = new THREE.SphereGeometry(.75, 50);
    obstacles.push(new THREE.Mesh(obstacleGeom, obstacleMaterial));
    obstacles[level - 1].position.set(obsx[level - 1], 1, obsz[level - 1]);

    scene.add(obstacles[level - 1]);
}
//resets the position
function reset()
{
	player.position.set(-2.5, 1, 48);
    camera.position.x= player.position.x;
	camera.position.y= 7;
	camera.position.z= player.position.z+2.5;
}
    
function handle_input()
{
    speed = [0,0,0];

    if(currentlyPressedKeys[65] == true) //A key
    {
       speed[0]= -.205;
       player.rotation.y = 3 * (Math.PI/2);
    }
    if(currentlyPressedKeys[68] == true) //D key
    {
        speed[0]= .205;
        player.rotation.y = Math.PI/2;
    }
    if(currentlyPressedKeys[87] == true) //W key
    { 
        speed[2]= -.205;
        player.rotation.y = Math.PI;
    }
    if(currentlyPressedKeys[83] == true) //S key
    { 
        speed[2]= .205;
        player.rotation.y = 0;
    }

    if(currentlyPressedKeys[16] == true) //ShiftKey
    {
        for(var i = 0; i < speed.length; i++)
        {
            speed[i] = speed[i] * 1.5;
        }
    }
	//Development commands
	//Z to move player to near exit
	//X to toggle collision detection with walls
	//C to toggle obstacle detection
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
	if(currentlyPressedKeys[90] == true) //Z key
	{
		player.position.set(-2.5, 1, -42);
		camera.position.x= player.position.x;
		camera.position.y= 7;
		camera.position.z= player.position.z+2.5;
	}
	if(currentlyPressedKeys[88] == true) //X key
	{
		detect= !detect;
	}
	if(currentlyPressedKeys[67] == true) //C key
	{
		obDetect= !obDetect;
	}
}

function detect_end()
{
    //I'm sorry
    //Dammit CB...
    var endx, endz, playx, playz, r1, r2;
    endx = -2.5;
    endz = -47.5;
    playx = player.position.x;
    playz = player.position.z;
    r1 = 2;
    r2 = Math.sqrt((endx - playx) * (endx - playx) + (endz - playz) * (endz - playz));
    if(r2 < r1)
    {
        level++
        alert("PUT SOMETHING HERE");
		currentlyPressedKeys= [];
        reset();
        //add_obstacle();
    }
}

//collision detection for the obstacles
// I might be able to combine this with collision detection in detect_collisions() -- Wesley
function obstacle_collison()
{
	if(obDetect == true){
    var playx, playz, r1, r2;
    playx = player.position.x;
    playz = player.position.z;
    r1 = .75 /*obstacle radius*/ + .5 /*player radius*/;
    for(var i = 0; i < obstacles.length; i++)
    {
        r2 = Math.sqrt( Math.pow((playx - obstacles[i].position.x), 2) + Math.pow((playz - obstacles[i].position.z), 2));
        if(r2<r1)
        {
            alert("Try Again");
            reset();
        }
    }
	}
}

function detect_collisions()
{
    // Collision detection inspired by view-source:http://stemkoski.github.io/Three.js/Collision-Detection.html
    //and http://webmaestro.fr/collisions-detection-three-js-raycasting/

    detect_end();
    obstacle_collison();
	if(detect == true){
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
		var maximumDist= .6;
		var collisionResults= ray.intersectObjects(collidableMeshes);
		if (collisionResults.length > 0 && collisionResults[0].distance < maximumDist)
        {
            // console.log("Hit");
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
}

function update_position()
{
    lognum++;
    camera.position.x += speed[0];
    player.position.x += speed[0];

    camera.position.z += speed[2];
    player.position.z += speed[2];

    for(var i = 0; i < obstacles.length; i++)
    {
        if(obs_direction[i] == 'x')
        {   
            if(Math.abs(obstacles[i].position.x - obsx[i]) >= obs_range[i])
            {
                obs_velocity[i] = obs_velocity[i] * -1;
            }
            obstacles[i].position.x += obs_speed * obs_velocity[i];
        }
        else if(obs_direction[i] == 'z')
        {
            if(Math.abs(obstacles[i].position.z - obsz[i]) >= obs_range[i])
            {
                obs_velocity[i] = obs_velocity[i] * -1;
            }
            obstacles[i].position.z += obs_speed * obs_velocity[i];
        }
    }


    if(lognum == 30)
    {
        // console.log("x:" + player.position.x + " z: " + player.position.z);
        lognum = 0;
    }
    

}

function render()
{
    handle_input();
    detect_collisions();
    update_position();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
