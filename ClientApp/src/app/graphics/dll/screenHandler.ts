import { Scene, WebGLRenderer, PerspectiveCamera, Color, SRGBColorSpace , ACESFilmicToneMapping} from 'three';

export class SceneHandler {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;

  constructor(element: HTMLElement) {
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
  }

  private initResizeHandler() {
    window.addEventListener('resize', () => {
      this.resizeCanvasToDisplaySize();
    });
    this.resizeCanvasToDisplaySize();
  }

  private resizeCanvasToDisplaySize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
