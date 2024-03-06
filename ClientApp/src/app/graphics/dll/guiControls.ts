import { GUI } from 'dat.gui';
import { Camera, WebGLRenderer } from 'three';

export class GUIController {
  gui: GUI;
  objectsFolder: GUI;
  sceneFolder: GUI;

  constructor(renderer: WebGLRenderer, camera: Camera) {
    this.gui = new GUI();
    this.sceneFolder = this.gui.addFolder('scene');
    const cameraFolder = this.sceneFolder.addFolder("camera")
    const camPosFolder = cameraFolder.addFolder("position");
    camPosFolder.add(camera.position, 'x', -10, 100, 0.01);
    camPosFolder.add(camera.position, 'y', -10, 100, 0.01);
    camPosFolder.add(camera.position, 'z', -10, 100, 0.01);
    const camRotFolder = cameraFolder.addFolder("rotation");
    camRotFolder.add(camera.rotation, 'x', -Math.PI, Math.PI, 0.01);
    camRotFolder.add(camera.rotation, 'y', -Math.PI, Math.PI, 0.01);
    camRotFolder.add(camera.rotation, 'z', -Math.PI, Math.PI, 0.01);
    this.objectsFolder = this.gui.addFolder('objects');
    const rendererFolder = this.sceneFolder.addFolder('renderer');
    rendererFolder.add(renderer, 'toneMappingExposure', 0, 1, 0.01);
  }
}
