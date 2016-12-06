//7.65, 1, -3, 
// obstacle variables
var obsx;
var obsz;
//directions the obstacles move
var obs_direction;
var obs_velocity;
var obs_range;
var obs_speed;
var loader, drone;

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

function add_obstacle()
{
     if(level < obsx.length)
     {
        drone = new THREE.Object3D();

        loader = new THREE.JSONLoader();
        //load a resource
        loader.load( './Components/Feather1.json' , function ( geometry, materials ) {
                var material = new THREE.MultiMaterial( materials );
                var object = new THREE.Mesh( geometry, material );
                // object.scale.set(.5,.5,.5);
                drone = object;
                // scene.add( drone );
                obstacles.push(drone);
                obstacles[level].position.set(obsx[level], 1, obsz[level]);
                scene.add(obstacles[level]);
                level++;
            }
        );
     }
}

function move_obstacles()
{
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
}

//collision detection for the obstacles
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
                scoreText.innerHTML = "Score:" + score;
                reset();
            }
        }
	}
}