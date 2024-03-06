import { GUI } from 'dat.gui';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Mesh, Color, Scene, Texture, Group, PMREMGenerator, Camera } from 'three';

export class ModelLoader {
  scene: Scene;
  gui: GUI;
  HDRI: Texture;
  model: Group;
  camera: Camera;

  constructor(scene: Scene, gui: GUI, camera: Camera) {
    this.scene = scene;
    this.gui = gui;
    this.camera = camera;
  }

  async loadModel(path: string, folder: GUI, options: { addControl?: boolean, visible?: boolean, control?: TransformControls } = { addControl: false, visible: true }) {
    const gltf = await new GLTFLoader().loadAsync(
      path,
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      }
    );
    gltf.scene.traverse(function (node) {
      if (node instanceof Mesh) {
        if (options.addControl && options.control) options.control.attach(node);
        if (!options.visible) node.visible = false;
        try {
          const subFolder = folder.addFolder(node.name.toLowerCase());
          subFolder.addColor(node.material, 'color').onChange(e => {
            const c = new Color(e.r / 255, e.g / 255, e.b / 255);
            console.log(c);
            node.material.color = c;
            //console.log(e / 255);
          });
          subFolder.add(node.position, 'x');
          subFolder.add(node.position, 'y');
          subFolder.add(node.position, 'z');
          subFolder.add(node, 'visible');
          if (node.name.toLowerCase() == "cube001") {
            node.material.color = new Color(0.02, 0.285, 0.04);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
    this.scene.add(gltf.scene);
    this.model = gltf.scene;
    return gltf.scene;
  }

  addMouseEvents(target: HTMLElement) {
    var mouseDown = false,
      mouseX = 0,
      mouseY = 0,
      root = this.model,
      camera = this.camera;
    target.addEventListener('mousemove', function (evt) {
      evt.preventDefault();
      if (!mouseDown) {
        return;
      }
      var deltaX = evt.clientX - mouseX;
      //var deltaY = evt.clientY - mouseY;
      mouseX = evt.clientX;
      //mouseY = evt.clientY;
      //camera.position.x += deltaX / 4000;
      //camera.position.y -= deltaY / 4000;
      //camera.position.z += deltaX * deltaY;
      root.rotation.y += deltaX / (Math.PI * 100);
      evt.stopPropagation();
    }, false);
    target.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      mouseDown = true;
      mouseX = evt.clientX;
      mouseY = evt.clientY;
      evt.stopPropagation();
    }, false);
    target.addEventListener('mouseup', function (evt) {
      evt.preventDefault();
      mouseDown = false;
      evt.stopPropagation();
    }, false);
  }

  loadHDRI(path: string, renderer: THREE.WebGLRenderer) {
    this.HDRI = new RGBELoader().load(path, texture => {
      const gen = new PMREMGenerator(renderer)
      const envMap = gen.fromEquirectangular(texture).texture
      this.scene.environment = envMap
      this.scene.background = envMap
      texture.dispose()
      gen.dispose();
    });
  }

  animate() {
    // ... (add any model-related animation logic here)
  }
}
