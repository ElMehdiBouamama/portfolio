import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { InputHandler } from './inputHandler';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class CharacterController {
  private clock: THREE.Clock;
  private _model: THREE.Object3D;
  private _animations: Record<string, THREE.AnimationAction> = {};
  private _mixer: THREE.AnimationMixer;
  private _speed: number = 2;
  private _currentVelocity: number = 0.0;
  private axeshelper: THREE.AxesHelper;
  private _input: Record<string, boolean> = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };
  public get modelPosition() {
    return this._model.position
  }

  constructor(scene: THREE.Scene,
    path: string,
    inputHandler: InputHandler,
    animations?: string[]) {
    this._loadModel(path, animations, scene);
    this._handleInput(inputHandler);
    this.clock = new THREE.Clock();
  }

  private _loadModel(path: string, animations: string[] = [], scene: THREE.Scene) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this._model = gltf.scene;
      this._model.position.set(0, 0, 0);
      scene.add(this._model);
      this.axeshelper = new THREE.AxesHelper(1);
      scene.add(this.axeshelper);

      this._mixer = new THREE.AnimationMixer(this._model);

      animations.forEach((animName) => {
        const clip = gltf.animations.find((clip) => clip.name === animName);
        if (clip) {
          const action = this._mixer.clipAction(clip);
          this._animations[animName] = action;
        }
      });

      // Play the first animation if available
      const firstAnimation = animations.length > 0 ? animations[0] : null;
      if (firstAnimation) {
        this._playAnimation(firstAnimation);
      }
    });
  }

  private _playAnimation(name: string) {
    const animation = this._animations[name];
    if (animation) {
      animation.reset();
      animation.play();
    }
  }

  private _handleInput(inputHandler: InputHandler) {
    const updateInput = () => {
      this._input.forward = inputHandler.isKeyPressed('w');
      this._input.backward = inputHandler.isKeyPressed('s');
      this._input.left = inputHandler.isKeyPressed('a');
      this._input.right = inputHandler.isKeyPressed('d');
    };

    document.addEventListener('keydown', updateInput);
    document.addEventListener('keyup', updateInput);
  }

  update(camera: THREE.Camera, orbit: OrbitControls) {
    const timeInSeconds = this.clock.getDelta();
    if (!this._mixer || !this._model) return;

    this._mixer.update(timeInSeconds);
    this.axeshelper.position.copy(this.modelPosition);

    // Acceleration and deceleration factors
    const acceleration = 0.1;
    // Option 2: Lerp towards zero
    const decelerationTime = 0.1; // Time in seconds for deceleration animation
    this._currentVelocity = THREE.MathUtils.lerp(this._currentVelocity, 0, Math.min(1, timeInSeconds / decelerationTime));

    // Current velocity and movement direction
    let movement = new THREE.Vector3(0, 0, 0);
    const targetVelocity = Math.min(this._speed * (this._input.forward || this._input.backward || this._input.left || this._input.right ? 1 : 0), 1); // Limit maximum speed to 3

    // Update current velocity based on input
    this._currentVelocity = THREE.MathUtils.lerp(this._currentVelocity, targetVelocity, 1 - Math.pow(1 - acceleration, timeInSeconds));

    // Adjust movement based on key presses
    if (this._input.forward) movement.z = -1;
    else if (this._input.backward) movement.z = 1;
    if (this._input.left) movement.x = -1;
    else if (this._input.right) movement.x = 1;
    movement.normalize();

    // Apply movement and camera position
    this._model.position.x += -movement.z * (this._speed * this._currentVelocity);
    this._model.position.z += movement.x * (this._speed * this._currentVelocity);
    camera.position.lerp(new THREE.Vector3().addVectors(this._model.position, new THREE.Vector3(-2, 0.5, 0)), 0.999 * timeInSeconds); // Increased damping factor for smoother camera movement
    orbit.update();

    // Animation playback
    if (movement.lengthSq() > 0) {
      if (this._animations.walk) this._playAnimation('walk');
    } else {
      if (this._animations.idle) this._playAnimation('idle');
    }
  }
}
