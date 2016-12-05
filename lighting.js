var lightPositions = [
    [-2.5, 2.5 , 48], [20, 2, 37.5], [22, 2, 41],
    [25, 2, 48], [27, 2, 27], [47, 2, 45], 
    [47, 2, 32], [47, 2, 8.5], [38, 2, 18],
    [19, 2, 2.5], [28, 2, -2.5], [17, 2, -28]
];

var lights = [];

// Sprites and movement inspired by https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/CanvasRenderer.js

function init_lighting()
{
	var pointLight= new THREE.PointLight(0xe1ad24, 1, 10);
    // var sprite = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0xff0040} ) );

    var spriteTexture= new THREE.ImageUtils.loadTexture('./Components/disc.png');

    var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: spriteTexture, color: 0xe1ad24} ) );
    sprite.scale.set( .08, .08 , .08 );
    pointLight.add( sprite );
    for(var i=0; i< lightPositions.length; i++)
    {
        var newLight = pointLight.clone();
        newLight.position.set(lightPositions[i][0], lightPositions[i][1], lightPositions[i][2])
        lights.push(newLight);
        scene.add(newLight);
    }

    var ambientLight= new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
}

function move_lights()
{
    var time = Date.now() * 0.0005;

    for(var i=0; i< lights.length; i++)
    {
        var light = lights[i];
        light.position.x += Math.sin( time ) * .02;
        light.position.y += Math.cos( time ) * .02;
		light.position.z += Math.cos( time ) * .02;
    }
}