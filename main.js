var scene, player, cube, speed, score = 0, level = 0;
var scoreText;
var currentlyPressedKeys= [];
var collidableMeshes = [];
var obstacles = [], treasures = [];
// var interactable = [];  // Removed because it wasn't being used

// for player model animation
var mesh, action = {}, mixer, fadeAction;
var mixers = [];
// var clock = new THREE.Clock; 


//7.65, 1, -3, 
// obstacle variables
var obsx;
var obsz;
//directions the obstacles move
var obs_direction;
var obs_velocity;
var obs_range;
var obs_speed;

// For Debugging purposes only
var lognum = 0;
var detect= true, obDetect= true;

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

    // Create Floor
	var geometry= new THREE.PlaneGeometry(100, 100, 32);
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

	// add lighting to scene
    init_lighting();

    //Add text on the screen
    fix_text();

    //Initializing level compnonets
	setupMaze();
    create_obstacles();
    create_treasures();


    renderer.render(scene, camera);
    render();
    animate();
}

function fix_text()
{
    if(scoreText != null)
    {
        scene.remove(scoreText);
    }
    var textGeometry = new THREE.TextGeometry( "Score: " + score, 
    {
        size: .05,
        height: .005,
        curveSegments: 12,

    });

    var textMaterial = new THREE.MeshBasicMaterial( 
        { color: 0xff0000 }
    );
    //  -2.5, 2, 48
    scoreText = new THREE.Mesh( textGeometry, textMaterial );
    scoreText.position.set(player.position.x - .5, 5, player.position.z + 2);
    scoreText.rotation.x =  -Math.PI/2 + .5; //Set to match camera angle
    scene.add( scoreText );
}

function create_obstacles()
{
     obsx = [
    7.65, 2.5, 32.5, 40.0, 17.5,
    27.5, 35.0, 22.5, 12.5, -27.5,
    -22.5, -25.0
    ];
    //
    obsz = [
    -3, 45.5, 30.0, 27.5, 10.5,
    -2.5, -23.0, -25.0, -13.0, -18.0,
    -19.0, -48.0
    ];
    obs_direction = [
    'z', 'z', 'z', 'x', 'z',
    'x', 'x', 'z', 'z', 'z',
    'z', 'x'
    ];
    obs_velocity = [
    1, 1, -1, -1, 1,
    -1, -1, 1, -1, 1,
    -3, -1
    ];
    obs_range = [
    4, 3, 2, 3, 5,
    5, 2, 5, 4, 5,
    10, 8
    ];

    obs_speed = .05;

    initial_obstacles();
}

function initial_obstacles()
{
    var num = obsx.length;
    //num = 8;
    for(var i = 0; i < num; i++)
    {
        add_obstacle();
    }
}

function create_player()
{
    player = new THREE.Object3D();

    // Loads in player


    var loader = new THREE.JSONLoader();

    loader.load( './components/sam_textured_rigged_animated.json' , function( geometry, materials ) {

        materials.forEach( function ( material ) {
            material.skinning = true;
        });

        mesh = new THREE.SkinnedMesh(
            geometry, new THREE.MeshFaceMaterial( materials )
        );

        mesh.scale.set(.25,.25,.25);
        mixer = new THREE.AnimationMixer( mesh );

        action.idle = mixer.clipAction( mesh.geometry.animations[0] );
        

        mesh.position.set(-2.5, 0, 48);
        mesh.rotation.y = Math.PI;
        player = mesh;
        scene.add( player );
        action.idle.setEffectiveWeight(1).play();
        // mixer.clipAction(mesh.geometry.animations[0]).play();
        mixers.push(mixer);
    });


    player.position.set(-2.5, 0, 48);
}

function animate() {
    // var delta = clock.getDelta();
    // console.log("mixers length: " + mixers.length);
    if (mixers.length > 0)        
        mixers[0].update(.15);
    
    // set the timeout to 15 frames per second rather than 30
    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000/15);
    
    // requestAnimationFrame( animate );
    render();

}


function add_obstacle()
{
     if(level < obsx.length)
     {
        //creates an obstacle
        var obstacleMaterial = new THREE.MeshLambertMaterial({color: 0x890000});
        var obstacleGeom = new THREE.SphereGeometry(.75, 50);
        obstacles.push(new THREE.Mesh(obstacleGeom, obstacleMaterial));
        obstacles[level].position.set(obsx[level], 1, obsz[level]);

        scene.add(obstacles[level]);
        level++;
     }
}
//resets the position
function reset()
{
	player.position.set(-2.5, 0, 48);
    camera.position.x= player.position.x;
	camera.position.y= 7;
	camera.position.z= player.position.z+2.5;
    scoreText.position.set(player.position.x - .5, 5, player.position.z + 2);
}
    
function handle_input()
{
    speed = [0,0,0];

    if(currentlyPressedKeys[65] == true) //A key
    {
       speed[0]= -.1;
       player.rotation.y = 3 * (Math.PI/2);
    }
    if(currentlyPressedKeys[68] == true) //D key
    {
        speed[0]= .1;
        player.rotation.y = Math.PI/2;
    }
    if(currentlyPressedKeys[87] == true) //W key
    { 
        speed[2]= -.1;
        player.rotation.y = Math.PI;
    }
    if(currentlyPressedKeys[83] == true) //S key
    { 
        speed[2]= .1;
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
		teleport([-2.5, 1, -42])
		
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

function teleport(position) // Teleports player and associated objects to a specified position
{
    player.position.set(position[0], position[1], position[2]);
    camera.position.x= player.position.x;
    camera.position.y= 7;
    camera.position.z= player.position.z+2.5;
    fix_text();
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
        alert("PUT SOMETHING HERE");
		currentlyPressedKeys= [];
        reset();
        add_obstacle();
    }
}

//collision detection for the obstacles
// I might be able to combine this with collision detection in detect_collisions() -- Wesley
// Nevermind I gave up...
function obstacle_collison()
{
	if(obDetect == true)
    {
        var playx, playz, r1, r2;
        playx = player.position.x;
        playz = player.position.z;
        r1 = .75 /*obstacle radius*/ + .5 /*player radius*/;
        for(var i = 0; i < obstacles.length; i++)
        {
            r2 = Math.sqrt( Math.pow((playx - obstacles[i].position.x), 2) + Math.pow((playz - obstacles[i].position.z), 2));
            if(r2<r1)
            {
                score -= 50;
                fix_text()
                reset();
            }
        }
	}
}

function treasure_collision()
{
    var r1, r2;
    var playx = player.position.x;
    var playz = player.position.z;
    r1 = 1 + .5 /*player radius*/;
    for(var i = treasures.length-1; i >=0; i--)
    {
        r2 = Math.sqrt( Math.pow((playx - treasures[i].position.x), 2) + Math.pow((playz - treasures[i].position.z), 2));
        if(r2<r1)
        {
            // Increment Score and remove the treasure so it can only be picked up once
            score += 50;
            scene.remove(treasures[i])
            var loc = collidableMeshes.indexOf(treasures[i]);
            if(loc != -1)
            {
                collidableMeshes.splice(loc, 1);
            }
            treasures.splice(i, 1);
            fix_text()

        }
    }
}

function detect_collisions()
{
    // Collision detection inspired by view-source:http://stemkoski.github.io/Three.js/Collision-Detection.html
    //and http://webmaestro.fr/collisions-detection-three-js-raycasting/

    detect_end();
    obstacle_collison();
    treasure_collision();
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
    scoreText.position.x += speed[0];

    camera.position.z += speed[2];
    player.position.z += speed[2];
    scoreText.position.z += speed[2];

    // Handles movement of obstacles
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

    // set the timeout to 15 frames per second rather than 30
    setTimeout( function() {
        requestAnimationFrame( render );
    }, 1000/15);
    // requestAnimationFrame(render);
}
