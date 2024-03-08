import { Scene, WebGLRenderer, PerspectiveCamera, Color, SRGBColorSpace , ACESFilmicToneMapping} from 'three';

export class SceneHandler {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;

  constructor(element: HTMLElement) {
    // Create a new Three.js scene
    this.scene = new Scene();
    this.scene.background = new Color(0, 0, 0);
    // Initialize a WebGLRenderer with alpha and antialiasing
    this.renderer = new WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;

    // Set pixel ratio to handle high-density displays
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // Append the renderer's canvas to the specified HTML element
    this.camera = new PerspectiveCamera(50, element.clientWidth / element.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 50);
    this.camera.rotation.set(-0.2, 0, 0);
    element.appendChild(this.renderer.domElement);
    // Add any additional setup functions as needed
    this.initResizeHandler();
  }

  private initResizeHandler() {
    window.addEventListener('resize', () => {
      this.resizeCanvasToDisplaySize();
    });
    // Initial call to set the correct canvas size
    this.resizeCanvasToDisplaySize();
  }

  private resizeCanvasToDisplaySize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Update renderer and camera aspect ratio
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
