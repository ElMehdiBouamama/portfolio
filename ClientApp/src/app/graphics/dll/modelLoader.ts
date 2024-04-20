import { GainMapLoader } from '@monogrid/gainmap-js';
import { BehaviorSubject } from 'rxjs';
import { Camera, Clock, Color, EquirectangularReflectionMapping, Group, Mesh, Scene, Texture, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { loadingElements } from '../graphics.component';

export class ModelLoader {
  HDRI: Texture;
  model: Group;

  constructor(public scene: Scene, public camera: Camera, private $isReady: BehaviorSubject<loadingElements>) { }

  addMouseEvents(target: HTMLElement) {
    var mouseDown = false,
      mouseX = 0,
      mouseY = 0,
      root = this.model;
    var onMouseMove = function (evt: MouseEvent | TouchEvent) {
      if (!mouseDown) {
        return;
      }
      let clX = (evt instanceof MouseEvent) ? evt.clientX : evt.touches.item(0)?.clientX ?? 0;
      var deltaX = clX - mouseX;
      mouseX = clX;
      root.rotation.y += deltaX / (Math.PI * 100);
      evt.stopPropagation();
    };
    var onMouseDown = function (evt: MouseEvent | TouchEvent) {
      mouseDown = true;
      let clX = (evt instanceof MouseEvent) ? evt.clientX : evt.touches.item(0)?.clientX ?? 0;
      let clY = (evt instanceof MouseEvent) ? evt.clientY : evt.touches.item(0)?.clientY ?? 0;
      mouseX = clX;
      mouseY = clY;
      evt.stopPropagation();
    };

    var onMouseUp = function (evt: MouseEvent | TouchEvent) {
      mouseDown = false;
      evt.stopPropagation();
    };

    target.addEventListener('mousemove', evt => onMouseMove(evt), { passive: true });
    target.addEventListener('touchmove', evt => onMouseMove(evt), { passive: true });
    target.addEventListener('mousedown', evt => onMouseDown(evt), { passive: true });
    target.addEventListener('touchstart', evt => onMouseDown(evt), { passive: true });
    target.addEventListener('mouseup', evt => onMouseUp(evt), { passive: true });
    target.addEventListener('touchend', evt => onMouseUp(evt), { passive: true });
  }

  loadHDRI([texture, gainmap, metadata]: [string, string, string], renderer: WebGLRenderer) {
    new GainMapLoader(renderer)
      .loadAsync([texture, gainmap,metadata])
      .then(res => {
        this.scene.background = res.renderTarget.texture;
        this.scene.background.mapping = EquirectangularReflectionMapping;
        this.scene.environment = res.renderTarget.texture;
        res.dispose();
        this.$isReady.next({ ...this.$isReady.value, hdri: true });
      });
  }

  loadModel(fileName: string, options: { visible?: boolean } = { visible: true }) {
    new GLTFLoader()
      .loadAsync(fileName, (xhr) => { /*console.log(xhr.loaded / xhr.total)*/ })
      .then((gltf) => {
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
        this.$isReady.next({ ...this.$isReady.value, model: true });
      });
  }
  animate(clock: Clock) {
    this.model.rotation.y -= 0.001;
    this.model.position.y += Math.sin(clock.getElapsedTime()) / 200;
  }
}
