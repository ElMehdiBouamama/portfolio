import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import gsap from "gsap";
import { BehaviorSubject, Observable, distinctUntilChanged, of } from 'rxjs';
import { Clock, Vector3 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { transitionService } from '../shared/transition.service';
import { CloudsSetup } from './dll/cloudSetup';
import { LightsSetup } from './dll/lightSetup';
import { ModelLoader } from './dll/modelLoader';
import { RenderSetup } from './dll/renderControls';
import { SceneHandler } from './dll/screenHandler';
import { ParticlesSystem } from './dll/particlesSystem';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicsComponent implements AfterViewInit {
  @ViewChild('graphicsContainer', { static: true }) el: ElementRef;
  @ViewChild('loadingScreen', { static: true }) loadingEl: ElementRef;
  sceneHandler: SceneHandler;
  lightsSetup: LightsSetup;
  modelLoader: ModelLoader;
  renderControl: RenderSetup;
  cloudsControl: CloudsSetup;
  particlesControl: ParticlesSystem;
  HDRI: any;
  mainModel: any;
  clock: Clock;
  shouldMoveCamera$: BehaviorSubject<Vector3> = new BehaviorSubject(new Vector3());

  $isReady: BehaviorSubject<loadingElements>;

  constructor(private ngZone: NgZone, private service: transitionService) {
  }

  async ngAfterViewInit() {
    this.ngZone.runOutsideAngular(async () => {
      this.$isReady = new BehaviorSubject<loadingElements>({
        model: false,
        scene: false,
        lights: false,
        clouds: false,
        hdri: false,
        particles: false
      });
      this.clock = new Clock();
      this.sceneHandler = new SceneHandler(this.el.nativeElement, this.$isReady);
      this.lightsSetup = new LightsSetup(this.sceneHandler.scene, this.$isReady);
      this.modelLoader = new ModelLoader(this.sceneHandler.scene, this.sceneHandler.camera, this.$isReady);
      this.cloudsControl = new CloudsSetup(this.sceneHandler.scene, this.sceneHandler.camera, this.$isReady);
      this.particlesControl = new ParticlesSystem(this.sceneHandler.scene, this.$isReady);
      this.modelLoader.loadHDRI('../../../assets/imgs/animestyled_hdr.hdr', this.sceneHandler.renderer);
      this.modelLoader.loadModel('../../../assets/models/pirate.glb');
      this.$isReady.subscribe(x => {
        let isReady = Object.values(x).reduce((p, c) => p && c);
        this.service.isLoaded$.next(isReady);
        if (isReady) {
          this.mainModel = this.modelLoader.model;
          this.modelLoader.addMouseEvents(this.el.nativeElement);
          this.renderControl = new RenderSetup(this.sceneHandler.scene, this.sceneHandler.camera, this.sceneHandler.renderer);
          this.el.nativeElement.appendChild(this.sceneHandler.renderer.domElement);
          this.sceneHandler.camera.position.set(0, 10, 20);
          this.sceneHandler.camera.rotation.set(-0.2, 0, 0);
          this.loadingEl.nativeElement.classList.add('fade-out');
          this.animate(this.renderControl.composer);
          this.clock.start();
          setTimeout(() => {
            this.loadingEl.nativeElement.classList.add('d-none')
            this.shouldMoveCamera$
              .pipe(distinctUntilChanged())
              .subscribe(pos => {
                gsap.to(this.sceneHandler.camera.position, { duration: 2, x: pos.x, y: pos.y, z: pos.z });
              });
          }, 250);
        }
      });
    });
  }

  animate(composer: EffectComposer) {
    requestAnimationFrame(() => this.animate(composer));
    this.cloudsControl.animate();
    this.particlesControl.animate();
    this.modelLoader.animate(this.clock);
    this.shouldMoveCamera$.next(this.targetCameraPosition);
    composer.render();
  }

  private routesTargetPosition: { [route: string]: Vector3; } = {
    Home: new Vector3(0, 4.5, 14.5),
    About: new Vector3(-7, 0, 6),
    Projects: new Vector3(3, -5, 6),
    Techs: new Vector3(7, 0, 6)
  };

  get targetCameraPosition() {
    return this.routesTargetPosition[this.service.currentPage];
  }
}

export interface loadingElements {
  model: boolean;
  scene: boolean;
  lights: boolean;
  clouds: boolean;
  hdri: boolean;
  particles: boolean;
}
