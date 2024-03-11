import { Camera, Scene, Vector2, WebGLRenderer } from 'three';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export class RenderSetup {
  composer: EffectComposer;
  camera: Camera;
  scene: Scene;

  constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;

    this.composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    const bokehPass = new BokehPass(scene, camera, {
      focus: 67,
      aperture: 0.00001, //0.00005
      maxblur: 0.11
    });
    this.composer.addPass(bokehPass);

    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 0.2, 0.2, 0.9);
    this.composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);
  }
}
