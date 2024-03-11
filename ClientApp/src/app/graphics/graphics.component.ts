import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import gsap from "gsap";
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Clock, Vector3 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { transitionService } from '../shared/transition.service';
import { CameraController } from './dll/cameraControls';
import { CharacterController } from './dll/characterControls';
import { CloudsSetup } from './dll/cloudSetup';
import { LightsSetup } from './dll/lightSetup';
import { ModelLoader } from './dll/modelLoader';
import { ParticlesSetup } from './dll/particlesSetup';
import { RenderSetup } from './dll/renderControls';
import { SceneHandler } from './dll/screenHandler';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements AfterViewInit {
  @ViewChild('graphicsContainer', { static: true }) el: ElementRef;
  @ViewChild('loadingScreen', { static: true }) loadingEl: ElementRef;
  sceneHandler: SceneHandler;
  cameraControl: CameraController;
  lightsSetup: LightsSetup;
  modelLoader: ModelLoader;
  renderControl: RenderSetup;
  characterControl: CharacterController;
  cloudsControl: CloudsSetup;
  particlesControl: ParticlesSetup;
  HDRI: any;
  mainModel: any;
  clock: Clock;
  shouldMoveCamera$: BehaviorSubject<Vector3> = new BehaviorSubject(new Vector3());

  constructor(private ngZone: NgZone, private service: transitionService) {
  }

  async ngAfterViewInit() {
    this.ngZone.runOutsideAngular(async () => {
      this.clock = new Clock();
      this.sceneHandler = new SceneHandler(this.el.nativeElement);
      this.lightsSetup = new LightsSetup(this.sceneHandler.scene);
      this.modelLoader = new ModelLoader(this.sceneHandler.scene, this.sceneHandler.camera);
      this.cloudsControl = new CloudsSetup(this.sceneHandler.scene, this.sceneHandler.camera);
      this.modelLoader.loadHDRI('../../../assets/imgs/animestyled_hdr.hdr', this.sceneHandler.renderer);
      this.mainModel = await this.modelLoader.loadModel('../../../assets/models/pirate.glb');
      this.modelLoader.addMouseEvents(this.el.nativeElement);
      this.particlesControl = new ParticlesSetup(this.sceneHandler.scene);
      this.renderControl = new RenderSetup(this.sceneHandler.scene, this.sceneHandler.camera, this.sceneHandler.renderer);
      this.el.nativeElement.appendChild(this.sceneHandler.renderer.domElement);
      this.loadingEl.nativeElement.classList.add('fade-out');
      this.sceneHandler.camera.position.set(0, 10, 20);
      this.sceneHandler.camera.rotation.set(-0.2, 0, 0);
      this.animate(this.renderControl.composer);
      this.service.isLoaded$.next(true);
      this.clock.start();
      setTimeout(() => {
        this.loadingEl.nativeElement.classList.add('d-none')
        this.shouldMoveCamera$
          .pipe(distinctUntilChanged())
          .subscribe(pos => {
            gsap.to(this.sceneHandler.camera.position, { duration: 1, x: pos.x, y: pos.y, z: pos.z });
          });
      }, 250);
    });
  }

  animate(composer: EffectComposer) {
    requestAnimationFrame(() => this.animate(composer));
    this.cloudsControl.animate();
    this.particlesControl.animate();
    this.mainModel.rotation.y -= 0.001;
    this.mainModel.position.y += Math.sin(this.clock.getElapsedTime()) / 200;
    this.shouldMoveCamera$.next(this.targetCameraPosition);
    composer.render();
  }
  private routesTargetPosition: { [route: string]: Vector3; } = {
    Home: new Vector3(0, 4.5, 14.5),
    About: new Vector3(-7, 0, 6),
    Projects: new Vector3(3, -5, 6)
  };
  get targetCameraPosition() {
    return this.routesTargetPosition[this.service.currentPage];
  }

}
