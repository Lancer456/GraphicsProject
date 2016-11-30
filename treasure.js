var positions = [
    [22, 1, 37.5]

];

var rotations = [
    Math.PI/2
];



function create_treasures()
{
    var geometry = new THREE.BoxGeometry(2, 2, 2);
    var material= new THREE.MeshLambertMaterial({ color: 0xFFD700, side: THREE.DoubleSide });
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
        
        for(var i=0; i<positions.length && i< rotations.length; i++)
        {
            var treasure = object.clone();
            treasure.position.set(positions[i][0], positions[i][1], positions[i][2]);
            treasure.rotation.y = rotations[i];
            treasures.push(treasure)
            collidableMeshes.push(treasure)
            scene.add(treasure)
        }

    });

    
}