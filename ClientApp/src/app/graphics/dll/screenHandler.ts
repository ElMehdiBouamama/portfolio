import { BehaviorSubject } from 'rxjs';
import { ACESFilmicToneMapping, Color, PerspectiveCamera, SRGBColorSpace, Scene, WebGLRenderer } from 'three';
import { loadingElements } from '../graphics.component';

export class SceneHandler {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;

  constructor(element: HTMLElement, $isReady: BehaviorSubject<loadingElements>) {
    this.scene = new Scene();
    this.scene.background = new Color(0, 0, 0);
    this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera = new PerspectiveCamera(50, element.clientWidth / element.clientHeight, 0.1, 1000);
    this.initResizeHandler();
    $isReady.next({ ...$isReady.value, scene: true });
  }

  private initResizeHandler() {
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('DOMContentLoaded', () => this.onResize());
  }

  onResize() {
    var w = window.innerWidth;;
    var h = window.innerHeight;
    this.renderer.setSize(w, h, true);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private resizeCanvasToDisplaySize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
