let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bg").appendChild(renderer.domElement);

// lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

// camera
camera.position.z = 3;

// load 3D girl model
const loader = new THREE.GLTFLoader();
loader.load('girl.glb', function(gltf) {
    const model = gltf.scene;
    scene.add(model);

    model.scale.set(1.5,1.5,1.5);
    model.position.y = -1;

    // animation
    const mixer = new THREE.AnimationMixer(model);
    if(gltf.animations.length > 0){
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    }

    function animate(){
        requestAnimationFrame(animate);
        mixer.update(0.01);

        model.rotation.y += 0.003; // slow rotate
        renderer.render(scene,camera);
    }
    animate();
});
