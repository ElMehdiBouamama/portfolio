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
    var onMouseMove = function (evt: MouseEvent | TouchEvent) {
      evt.preventDefault();
      if (!mouseDown) {
        return;
      }
      let clX = (evt instanceof MouseEvent) ? evt.clientX: evt.touches.item(0)?.clientX ?? 0;
      var deltaX = clX - mouseX;
      mouseX = clX;
      root.rotation.y += deltaX / (Math.PI * 100);
      evt.stopPropagation();
    };
    var onMouseDown = function (evt: MouseEvent | TouchEvent) {
      evt.preventDefault();
      mouseDown = true;
      let clX = (evt instanceof MouseEvent) ? evt.clientX : evt.touches.item(0)?.clientX ?? 0;
      let clY = (evt instanceof MouseEvent) ? evt.clientY : evt.touches.item(0)?.clientY ?? 0;
      mouseX = clX;
      mouseY = clY;
      evt.stopPropagation();
    };

    var onMouseUp = function (evt: MouseEvent | TouchEvent) {
      evt.preventDefault();
      mouseDown = false;
      evt.stopPropagation();
    };

    target.addEventListener('mousemove', evt => onMouseMove(evt), false);
    target.addEventListener('touchmove', evt => onMouseMove(evt), false);
    target.addEventListener('mousedown', evt => onMouseDown(evt), false);
    target.addEventListener('touchstart', evt => onMouseDown(evt), false);
    target.addEventListener('mouseup', evt => onMouseUp(evt), false);
    target.addEventListener('touchend', evt => onMouseUp(evt), false);
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
