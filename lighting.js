var lightPositions = [
    [-2.5, 2, 48], [20, 1.25, 37.5], [22, 1.25, 41],
    [25, 1.25, 48], [27, 1.25, 27], [47, 1.25, 45], 
    [47, 1.25, 32], [47, 1.25, 8.5], [38, 1.25, 18],
    [19, 1.25, 2.5], [28, 1.25, -2.5], [17, 1.25, -28]
];

function init_lighting()
{
	var pointLight= new THREE.PointLight(0xe1ad24, 1, 10);
    // var sprite = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0xff0040} ) );

    var spriteTexture= new THREE.ImageUtils.loadTexture('./Components/disc.png');

    var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: spriteTexture, color: 0xe1ad24} ) );
    sprite.scale.set( .1, .1 , .1 );
    pointLight.add( sprite );
    for(var i=0; i< lightPositions.length; i++)
    {
        var newLight = pointLight.clone();
        newLight.position.set(lightPositions[i][0], lightPositions[i][1], lightPositions[i][2])
        scene.add(newLight);
    }

    var ambientLight= new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
}