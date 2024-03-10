import { GUI } from 'dat.gui';
import { WebGLRenderer, Vector2, Color, Raycaster, Object3D, Camera, Scene } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';

export class RenderSetup {
  composer: EffectComposer;
  camera: Camera;
  scene: Scene;

  constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer, gui: GUI) {
    this.camera = camera;
    this.scene = scene;

    this.composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    //const ssaoPass = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
    //ssaoPass.kernelRadius = 0.1;
    //ssaoPass.minDistance = 0.001;
    //ssaoPass.maxDistance = 0.01;
    ////ssaoPass.enabled = false;
    //this.composer.addPass(ssaoPass);

    const bokehPass = new BokehPass(scene, camera, {
      focus: 67,
      aperture: 0.00001, //0.00005
      maxblur: 0.11
    });
    //bokehPass.enabled = false;
    this.composer.addPass(bokehPass);

    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 0.2, 0.2, 0.9);
    //bloomPass.enabled = false;
    this.composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    //const ssaoFolder = gui.addFolder('SSAO');
    //ssaoFolder.add(ssaoPass, 'output', {
    //  'Default': SSAOPass.OUTPUT.Default,
    //  'SSAO Only': SSAOPass.OUTPUT.SSAO,
    //  'SSAO Only + Blur': SSAOPass.OUTPUT.Blur,
    //  'Depth': SSAOPass.OUTPUT.Depth,
    //  'Normal': SSAOPass.OUTPUT.Normal
    //}).onChange(function (value) {
    //  ssaoPass.output = value;
    //});
    //ssaoFolder.add(ssaoPass, 'kernelRadius').min(0).max(0.3);
    //ssaoFolder.add(ssaoPass, 'minDistance').min(0.001).max(0.02);
    //ssaoFolder.add(ssaoPass, 'maxDistance').min(0.01).max(0.3);
    //ssaoFolder.add(ssaoPass, 'enabled');

    const bloomFolder = gui.addFolder('bloom');
    bloomFolder.add(bloomPass, 'threshold', 0, 1, 0.01);
    bloomFolder.add(bloomPass, 'strength', 0, 1, 0.01);
    bloomFolder.add(bloomPass, 'radius', 0, 1, 0.01);
    bloomFolder.add(bloomPass, 'enabled').onChange((v: boolean) => {
      const pass = this.composer.passes.find(x => x == bloomPass);
      if (pass) pass.enabled = v;
    });

    const bokehFolder = gui.addFolder('bokeh');
    bokehFolder.add((bokehPass.uniforms as any).focus, 'value', 0, 1000, 0.1);
    bokehFolder.add((bokehPass.uniforms as any).aperture, 'value', 0, 0.0001, 0.00001);
    bokehFolder.add((bokehPass.uniforms as any).maxblur, 'value', 0, 1, 0.01);
    bokehFolder.add(bokehPass, 'enabled');
  }

  addOutlinesToModel(scene: Scene, renderer: WebGLRenderer) {
    const outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, this.camera);
    outlinePass.hiddenEdgeColor = new Color("#fffffff");
    this.composer.addPass(outlinePass);
    const mouse = new Vector2();
    let selectedObjects: Object3D[] = [];
    const selectableObjectNames = ["head", "cube002", "cube001", "sphere001", "mats"];
    const camera = this.camera;
    const raycaster = new Raycaster();
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    function onPointerMove(event: MouseEvent) {
      event.preventDefault();
      if (event.isTrusted === false) return;
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      checkIntersection();

      function addSelectedObject(object: Object3D) {
        selectedObjects = [];
        if (selectableObjectNames.includes(object.name.toLowerCase())) {
          selectedObjects.push(object);
          if (object.name.toLowerCase() == "sphere001") {
            //console.log(object);
            //object.translateY(5);
          }
        }
      }
      function checkIntersection() {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(scene, true);
        if (intersects.length > 0) {
          const selectedObject = intersects[0].object;
          addSelectedObject(selectedObject);
          outlinePass.selectedObjects = selectedObjects;
          //selectedObjects.forEach(obj => obj.translateY(1));
        } else {
          outlinePass.selectedObjects = [];
        }
      }
    }

  }
}
