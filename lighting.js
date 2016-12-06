var lightPositions = [
    [-2.5, 3 , 48], [-2, 2.5, 47], [20, 3, 37.5], [22, 3, 41],
    [25, 3, 48], [27, 3, 27], [47, 3, 45],
/*
    [47, 3, 32], [47, 3, 8.5], [38, 3, 18],
    [19, 3, 2.5], [28, 3, -2.5], [17, 3, -28],
    [12, 3, 48], [30, 3, 37.5], [30, 3, 28], [30.5, 2.5, 27.5],
    [32, 3, 23], [41, 3, 30], [46, 3, 45], 
    [45.5, 3, 45.5], [46.5, 2.75, 46], [37, 2.5, 1,4], 
    [39, 3, -3.5], [38.5, 3, -2], [37.7, 2.5, 28],
    [47.5, 3, -3], [47, 2.5, -3], [34, 3, -12.6],
    [44.8, 3, -23], [29.8, 3, -43], [16, 3, -42.6],
    [5.6, 3, -37.6], [20.4, 3, 12.5], [12, 3, 15],
    [12, 3, 2.7]
*/

    [-2.5, 3, -44], [-2.7, 4, -43], [-2.4, 2.5, -45], [-2.5, 3.1, -44]
];
 // Too many lights causes performance to slow down a lot unfortunately
 // Not due to the sprites or the movement but rather the point lights themsleves

var lights = [];

// Sprites and movement inspired by https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/CanvasRenderer.js

function init_lighting()
{
	var pointLight= new THREE.PointLight(0xe1ad24, 1.5, 6);

    var spriteTexture= new THREE.ImageUtils.loadTexture('./Components/spark1.png');

    var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: spriteTexture, color: 0xffae3f} ) );
    sprite.scale.set( .08, .08 , .08 );
    sprite.position.set(pointLight.position.x, pointLight.position.y, pointLight.position.z)
    pointLight.add( sprite );
    for(var i=0; i< lightPositions.length; i++)
    {
        var newLight = pointLight.clone();
        newLight.position.set(lightPositions[i][0], lightPositions[i][1], lightPositions[i][2])
        lights.push(newLight);
        scene.add(newLight);
    }

    var ambientLight= new THREE.AmbientLight(0x303030);
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