function init_lighting()
{
	var pointLight= new THREE.PointLight(0xe1ad24, 1, 10);
	pointLight.position.set(player.position.x, player.position.y +1, player.position.z)
    scene.add(pointLight);
    player.add(pointLight)

    scene.add(pointLight)
    var ambientLight= new THREE.AmbientLight(0x464646);

    
    scene.add(ambientLight);
}