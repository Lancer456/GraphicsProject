function setupMaze(){
	outerWalls();
	
	var x_pos= [
		-25, -15, -5, 20, 35, 
		-40, -30, -20, -10, 0, 15, 30, 35, 45, 
		-45, -35, -5, 0, 10, 25, 35, 40,
		-45, -35, -30, -15, -5, 0, 5, 25, 30, 35, 45,
		-45, -40, -20, -10, 0, 5, 15, 25, 45,
		-45, -25, 5, 10, 20, 35, 45,
		-45, -35, -30, -20, -15, 0, 5, 10, 20, 30, 40, 45,
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
		-35, -15, -5, 0, 10, 20, 30, 45,
		-47.5, -42.5, -37.5, -32.5, -12.5, -2.5, 7.5, 12.5, 22.5, 42.5,
		-37.5, -27.5, -22.5, -17.5, 2.5, 7.5, 17.5, 22.5, 27.5, 47.5,
		-42.5, -32.5, -27.5, -22.5, -17.5, -12.5, -7.5, 12.5, 17.5, 22.5, 32.5, 42.5,
		-37.5, -22.5, 7.5, 12.5, 17.5, 37.5,
		-32.5, -27.5, -22.5, -17.5, -12.5, -7.5, -2.5, 22.5, 27.5, 32.5, 42.5,
		-37.5, -27.5, -12.5, -7.5, -2.5, 12.5, 17.5, 27.5, 32.5,
		-42.5, -32.5, -7.5, 22.5, 32.5, 37.5, 42.5,
		-47.5, -27.5, -17.5, -12.5, 2.5, 22.5, 27.5,
		-37.5, -32.5, -22.5, 7.5, 37.5, 42.5,
		-37.5, -32.5, -27.5, -22.5, -17.5, -2.5, 2.5, 12.5, 17.5, 22.5, 32.5, 42.5, 47.5,
		-32.5, -27.5, -22.5, -12.5, -7.5, -2.5, 12.5, 27.5,
		-47.5, -37.5, -32.5, -27.5, -17.5, -12.5, -7.5, 2.5, 7.5, 32.5, 37.5, 42.5, 47.5,
		-37.5, -17.5, -12.5, -2.5, 2.5, 7.5, 22.5, 32.5, 37.5,
		-47.5, -42.5, -37.5, -32.5, -17.5, -2.5, 7.5, 12.5, 17.5, 27.5, 42.5,
		-42,5, -37.5, -32.5, -27.5, -7.5, 7.5, 12.5, 17.5, 37.5,
		-37.5, -32.5, -12.5, -2.5, 2.5, 17.5, 27.5, 32.5,
		-42.5, -37.5, -22.5, -17.5, 22.5, 27.5, 37.5, 42.5, 47.5,
		-42.5, -37.5, -27.5, -22.5, -17.5, -12.5, -7.5, -2.5, 2.5, 7.5, 12.5, 22.5, 27.5, 32.5, 42.5,
		-47.5, -42.5, -22.5, -17.5, 37.5
	];
	var z_pos= [
		47.5, 47.5, 47.5, 47.5, 47.5, 
		42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 42.5, 
		37.5, 37.5, 37.5, 37.5, 37.5, 37.5, 37.5, 37.5,
		32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5, 32.5,
		27.5, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5,
		22.5, 22.5, 22.5, 22.5, 22.5, 22.5, 22.5,
		17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5,
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
		-37.5, -37.5, -37.5, -37.5, -37.5, -37.5,
		-42.5, -42.5, -42.5, -42.5, -42.5, -42.5, -42.5, -42.5,
		-47.5, -47.5, -47.5, -47.5, -47.5, -47.5, -47.5, -47.5,
		45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
		40, 40, 40, 40, 40, 40, 40, 40, 40, 40,
		35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35,
		30, 30, 30, 30, 30, 30,
		25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
		20, 20, 20, 20, 20, 20, 20, 20, 20,
		15, 15, 15, 15, 15, 15, 15,
		10, 10, 10, 10, 10, 10, 10,
		5, 5, 5, 5, 5, 5,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		-5, -5, -5, -5, -5, -5, -5, -5,
		-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10,
		-15, -15, -15, -15, -15, -15, -15, -15,
		-20, -20, -20, -20, -20, -20, -20, -20, -20, -20, -20,
		-25, -25, -25, -25, -25, -25, -25, -25, -25,
		-30, -30, -30, -30, -30, -30, -30, -30,
		-35, -35, -35, -35, -35, -35, -35, -35, -35,
		-40, -40, -40, -40, -40, -40, -40, -40, -40, -40, -40, -40, -40, -40, -40,
		-45, -45, -45, -45, -45, -45
	];
	var rotation= [
		0, 0, 0, 0, 0, 
		0, 0, 0, 0, 0, 0, 0, 0, 0, 
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
		0, 0, 0, 0, 0, 0, 0, 0,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2,
		Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2
	];
	
	// var wallMaterial= new THREE.MeshLambertMaterial({ color: 0x003399 });
	var wallMaterial= new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('brick_wall.jpg') });
	var wallGeometry= new THREE.CubeGeometry(0.5,5,5.5);
	
	for(var i=0; i<x_pos.length; i++){
		var wall= new THREE.Mesh(wallGeometry, wallMaterial);
		
		wall.position.set(x_pos[i], 2.5, z_pos[i]);
		wall.rotation.y= rotation[i];
		collidableMeshes.push(wall);
		scene.add(wall);
	}
	
	var geometry= new THREE.CubeGeometry(5, 0, 5);
	var material= new THREE.MeshLambertMaterial({color: 0x990066});
	exit= new THREE.Mesh(geometry, material);
	exit.position.set(-2.5, 0.1, -47.5);
	scene.add(exit);
}

function outerWalls(){
	// var wallMaterial= new THREE.MeshLambertMaterial({ color: 0x003399 });
	var wallTexture= new THREE.ImageUtils.loadTexture('brick_wall.jpg');
	wallTexture.wrapS= wallTexture.wrapT= THREE.RepeatWrapping;
	wallTexture.repeat.set(20, 1);
	
	var wallMaterial= new THREE.MeshLambertMaterial({ map: wallTexture });
	var wallGeometry= new THREE.CubeGeometry(0.6, 3, 100.5);
	
	var bottomWall= new THREE.Mesh(wallGeometry, wallMaterial);
	bottomWall.position.set(0, 1.5, 50);
	bottomWall.rotation.y= Math.PI/2;
	collidableMeshes.push(bottomWall);
	scene.add(bottomWall);
	
	wallGeometry= new THREE.CubeGeometry(0.6, 5.1, 100.5);
	
	var leftWall= new THREE.Mesh(wallGeometry, wallMaterial);
	leftWall.position.set(-50, 2.5, 0);
	collidableMeshes.push(leftWall);
	scene.add(leftWall);
	
	var topWall= new THREE.Mesh(wallGeometry, wallMaterial);
	topWall.position.set(0, 2.5, -50);
	topWall.rotation.y= Math.PI/2;
	collidableMeshes.push(topWall);
	scene.add(topWall);
	
	var rightWall= new THREE.Mesh(wallGeometry, wallMaterial);
	rightWall.position.set(50, 2.5, 0);
	collidableMeshes.push(rightWall);
	scene.add(rightWall);
}