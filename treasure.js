var treasurePositions = [
    [22, .5, 37.5], [23, .5, 48], [47, .5, 43],
    [18, .5, -28], [47.5, .5, -2.1], [43, .5, 12],
    [37.6, .5, -27.5], [12, .5, 2.69]

];

var rotations = [
    Math.PI/2, 3*Math.PI/2, Math.PI,
    Math.PI, 0, -Math.PI / 2, 0, Math.PI
];



function create_treasures()
{
    var geometry = new THREE.BoxGeometry(2, 2, 2);
    var material= new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader( );
    loader.load( './Components/treasure_chest.jpg', function ( image ) 
    {
        texture.image = image;
        texture.needsUpdate = true;
    } );

    // Loads in the treasure box Model
    var loader = new THREE.OBJLoader( );
    // Model from TurboSquid.com
    loader.load( './Components/treasure_chest.obj', function ( object ) 
    {
        //object.scale.set(0.01, 0.01, 0.01);
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh ) 
            {
                child.material.map = texture;
            }
        } );	

        for(var i=0; i<treasurePositions.length && i< rotations.length; i++)
        {
            console.log("Treasure chest started")
            var treasure = object.clone();
            treasure.position.set(treasurePositions[i][0], treasurePositions[i][1], treasurePositions[i][2]);
            treasure.rotation.y = rotations[i];
            treasures.push(treasure)
            collidableMeshes.push(treasure)
            scene.add(treasure)
        }

    });

    
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
            scoreText.innerHTML = "Score:" + score;

        }
    }
}
