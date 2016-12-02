var lightPositions = [
    [-2.5, 1.25, 48], [20, 1.25, 37.5]
];

function init_lighting()
{
	var pointLight= new THREE.PointLight(0xe1ad24, 1, 15);

    for(var i=0; i< lightPositions.length; i++)
    {
        var newLight = pointLight.clone();
        newLight.position.set(lightPositions[i][0], lightPositions[i][1], lightPositions[i][2])
        scene.add(newLight);
    }

    var ambientLight= new THREE.AmbientLight(0x404040); //252525 for final value
    scene.add(ambientLight);
}