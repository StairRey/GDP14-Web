import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap@3.6.1';

const camera = new THREE.PerspectiveCamera(
    6.5, 
    window.innerWidth / window.innerHeight, 
    1.0, 
    1000
);

camera.position.z = 40;

const scene = new THREE.Scene();
let arborform;
let mixer;

const loader = new GLTFLoader();
loader.load('3D_Files/Assembly_and_disassembly.glb', 
    function(gltf) {
        arborform = gltf.scene;
        scene.add(arborform);

        mixer = new THREE.AnimationMixer(arborform);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });
        modelMove();
    },
    function(xhr) {},
    function(error) {
        console.error('GLTF load error:', error);
    }
);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(500, 1000, 200);
scene.add(directionalLight);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Scroll-based animation control
let scrollprogress = 0;
window.addEventListener('scroll', () => {
    const scrolltop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollprogress = scrolltop / docHeight;
});


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    if (mixer && arborform) {
        const duration = mixer._actions[0]._clip.duration;
        mixer.setTime(scrollprogress * duration);
    }
    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'MTSpace1', 
        position: {x: 1.2, y: -1.0, z: 15.0},
        rotation: {x: 0.6, y: -0.5, z: 0.0}
    },

    {
        id: 'model3D', 
        position: {x: -2.5, y: -1.8, z: 0.0},
        rotation: {x: 0.1, y: -0.5, z: 0.0}
    },
    {
        id: 'TheProject', 
        position: {x: 2.5, y: -1.8, z: 0.0},
        rotation: {x: 0.4, y: -2.0, z: 0.0}
    },
    {
        id: 'About', 
        position: {x: -2.5, y: -1.5, z: 0.0},
        rotation: {x: 0.6, y: -0.5, z: 0.0}
    },

    {
        id: 'MTSpace2', 
        position: {x: 0, y: -1.7, z: 0.0},
        rotation: {x: 0.6, y: -0.9, z: 0.0}
    },

];


const modelMove = () => {
    const sections = document.querySelectorAll('.maintxt');
    let currentSection;
    sections.forEach((maintxt) => {
        const rect = maintxt.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            currentSection = maintxt.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );

    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active].position;
        let new_rotation = arrPositionModel[position_active].rotation;
        const targetX = new_coordinates.x * window.innerWidth / 1600;

        gsap.to(arborform.position, {
            x: targetX,
            y: new_coordinates.y ,
            z: new_coordinates.z ,
            duration: 1.0,
            ease: "power2.out"
        });
        gsap.to(arborform.rotation, {
            x: new_rotation.x,
            y: new_rotation.y,
            z: new_rotation.z,
            duration: 2.5,
            ease: "power2.out"
        });
    }
};

window.addEventListener('scroll', () => {
    if (arborform) {
        modelMove();
    }
});
window.addEventListener('resize', () => {
    renderer.setSize(
        window.innerWidth, 
        window.innerHeight
    );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})


// credit to: https://www.youtube.com/watch?v=zNXQS2DfckU&t=135s