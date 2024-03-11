import { Camera, Color, Group, Mesh, PMREMGenerator, Scene, Texture } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

export class ModelLoader {
  scene: Scene;
  HDRI: Texture;
  model: Group;
  camera: Camera;

  constructor(scene: Scene, camera: Camera) {
    this.scene = scene;
    this.camera = camera;
  }

  async loadModel(path: string, options: { visible?: boolean } = { visible: true }) {
    const gltf = await new GLTFLoader().loadAsync(
      path,
      (xhr) => { }
    );
    gltf.scene.traverse(function (node) {
      if (node instanceof Mesh) {
        //if (options.addControl && options.control) options.control.attach(node);
        if (!options.visible) node.visible = false;
        if (node.name.toLowerCase() == "cube001") {
          node.material.color = new Color(0.02, 0.285, 0.04);
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
      root = this.model;
    target.addEventListener('mousemove', function (evt) {
      evt.preventDefault();
      if (!mouseDown) {
        return;
      }
      var deltaX = evt.clientX - mouseX;
      mouseX = evt.clientX;
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
  }
}
