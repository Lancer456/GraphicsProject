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
        
        object.position.set(22, 1, 37.5)
        object.rotation.y = Math.PI / 2;
        treasures.push(object)
        collidableMeshes.push(object)
        scene.add(object)
    });

    
}