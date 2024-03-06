import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Camera, AxesHelper, Vector3 } from 'three';
export class CameraController {
  camera: Camera;
  orbit: OrbitControls;
  helper: AxesHelper;

  constructor(element: HTMLElement) {
    //this.orbit = new OrbitControls(camera, renderer.domElement);
    //this.orbit.enableDamping = true;
    //this.orbit.minAzimuthAngle = Math.PI / 7;
    //this.orbit.minPolarAngle = Math.PI / 2 - 0.3;
    //this.orbit.maxAzimuthAngle = Math.PI / 4;
    //this.orbit.maxPolarAngle = Math.PI / 2;
    //this.orbit.target = new THREE.Vector3(0, 0, 0);
    //this.orbit.update();

    //const orbitFolder = gui.addFolder("orbit");
    //const orbitTargetFolder = orbitFolder.addFolder("target");
    //orbitTargetFolder.add(orbit.target, 'x', -100, 100, 0.01);
    //orbitTargetFolder.add(orbit.target, 'y', -100, 100, 0.01);
    //orbitTargetFolder.add(orbit.target, 'z', -100, 100, 0.01);
    //const orbitPosFolder = orbitFolder.addFolder("position");
    //orbitPosFolder.add(orbit.position0, 'x', -10, 10, 0.01);
    //orbitPosFolder.add(orbit.position0, 'y', -10, 10, 0.01);
    //orbitPosFolder.add(orbit.position0, 'z', -10, 10, 0.01);
  }

  update(model_position: Vector3) {
    //this.orbit.target = model_position;
    //this.orbit.update();
  }
}
