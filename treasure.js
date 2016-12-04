var treasurePositions = [
    [22, .5, 37.5], [23, .5, 48], [47, .5, 43]

];

var rotations = [
    Math.PI/2, 3*Math.PI/2, Math.PI
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