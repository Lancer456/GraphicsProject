
var currentlyPressedKeys = [];
 var speed = [0,0,0];

        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 0, 1)
    ];

    var originPoint = player.position.clone();
    
    for (var i = 0; i < rays.length; i++)
	{	
        
		var directionVector = rays[i];
        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var maximumDist = .25;
		var collisionResults = ray.intersectObjects( collidableMeshes );
		if ( collisionResults.length > 0 && collisionResults[0].distance < maximumDist ) 
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
    detect_collisions()
    update_position();
    renderer.render(scene, camera);
    requestAnimationFrame(render);	
}
render();

