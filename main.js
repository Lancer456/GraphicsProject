var player, scene, plane, camera, pointLight, renderer;
currentlyPressedKeys= [];

window.onload= function init(){
    window.addEventListener("keydown", function(event) {
		currentlyPressedKeys[event.keyCode] = true;
    });
    
    window.addEventListener("keyup", function(event) {
		currentlyPressedKeys[event.keyCode] = false;
    });
	
	var width= window.innerWidth;
	var height= window.innerHeight;

	renderer= new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);
	
	// create scene object
	scene= new THREE.Scene;

	// create simple geometry and add to scene
	var cubeGeometry = new THREE.CubeGeometry(1,1,1);

	//var cubeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('crate.jpg')});
	var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000});
	player = new THREE.Mesh(cubeGeometry, cubeMaterial); // Cube object is a stand in for the player model
	player.position.set(0, 1, 49);

	var sphereGeom = new THREE.SphereGeometry(1);
	var sphere = new THREE.Mesh(sphereGeom, cubeMaterial);
	sphere.position.set(3, 2, 5);

	var geometry = new THREE.PlaneGeometry( 100, 100, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
	plane = new THREE.Mesh( geometry, material );
	plane.rotation.x = Math.PI / 2;
	// create perspective camera
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
	camera.position.x = player.position.x;
	camera.position.y = 5;
	camera.position.z = player.position.z+1;
	camera.rotation.x = -Math.PI /2 + (1/4);

	// add to scene and renderer
	scene.add(camera); 
	renderer.render(scene, camera);
	
	// add lighting and add to scene 
	pointLight = new THREE.PointLight(0xaabbcc);
	pointLight.position.set(10, 16, 16);
	scene.add(pointLight);
	scene.add(player);
	scene.add(sphere);
	scene.add(plane);

	setupMaze();
    render();
}

function handle_input(){
    if(currentlyPressedKeys[65] == true){ //A key
       camera.position.x -= .2;
       player.position.x -= .2;
    }
    if(currentlyPressedKeys[68] == true){ //D key
        camera.position.x += .2;
        player.position.x += .2;
    }
    if(currentlyPressedKeys[87] == true){ //W key
        camera.position.z -= .2;
        player.position.z -= .2;
    }
    if(currentlyPressedKeys[83] == true){ //S key
        camera.position.z += .2;
        player.position.z += .2;
    }
	if(currentlyPressedKeys[81] == true){ camera.position.y += .5; }
	if(currentlyPressedKeys[69] == true){ camera.position.y -= .5; }
}

function setupMaze(){
	var wallGeometry= new THREE.CubeGeometry(0.5,10,10);
	var wallMaterial= new THREE.MeshLambertMaterial({ color: 0x003399 });
	var wall= new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(2,1,45);
	scene.add(wall);
}

function render(){
    handle_input();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}