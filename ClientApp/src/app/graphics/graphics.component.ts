import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Vector3 } from 'three';
import { SceneHandler } from './dll/screenHandler';
import { CameraController } from './dll/cameraControls';
import { LightsSetup } from './dll/lightSetup';
import { GUIController } from './dll/guiControls';
import { ModelLoader } from './dll/modelLoader';
import { RenderSetup } from './dll/renderControls';
import { CharacterController } from './dll/characterControls';
import { CloudsSetup } from './dll/cloudSetup';
import { ParticlesSetup } from './dll/particlesSetup';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { transitionService } from '../shared/transition.service';
import gsap from "gsap";
import Stats from 'stats.js'
import { BehaviorSubject, distinctUntilChanged, from, timer } from 'rxjs';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements AfterViewInit {
  @ViewChild('graphicsContainer', { static: true }) el: ElementRef;
  sceneHandler: SceneHandler;
  cameraControl: CameraController;
  lightsSetup: LightsSetup;
  guiControl: GUIController;
  modelLoader: ModelLoader;
  renderControl: RenderSetup;
  characterControl: CharacterController;
  cloudsControl: CloudsSetup;
  particlesControl: ParticlesSetup;
  HDRI: any;
  mainModel: any;
  stats: Stats;
  shouldMoveCamera$: BehaviorSubject<Vector3> = new BehaviorSubject(new Vector3());

  constructor(private ngZone: NgZone, private service: transitionService) {
  }

  async ngAfterViewInit() {
    this.ngZone.runOutsideAngular(async () => {
      this.sceneHandler = new SceneHandler(this.el.nativeElement);
      this.cameraControl = new CameraController(this.el.nativeElement);
      this.lightsSetup = new LightsSetup(this.sceneHandler.scene);
      this.guiControl = new GUIController(this.sceneHandler.renderer, this.sceneHandler.camera);
      this.guiControl.gui.hide();
      this.modelLoader = new ModelLoader(this.sceneHandler.scene, this.guiControl.objectsFolder, this.sceneHandler.camera);
      this.cloudsControl = new CloudsSetup(this.sceneHandler.scene, this.guiControl.sceneFolder, this.sceneHandler.camera);
      // Loading assets
      this.modelLoader.loadHDRI('../../../assets/imgs/animestyled_hdr.hdr', this.sceneHandler.renderer);
      this.mainModel = await this.modelLoader.loadModel('../../../assets/models/pirate.glb', this.guiControl.objectsFolder);
      this.modelLoader.addMouseEvents(this.el.nativeElement);
      this.particlesControl = new ParticlesSetup(this.sceneHandler.scene);
      this.renderControl = new RenderSetup(this.sceneHandler.scene, this.sceneHandler.camera, this.sceneHandler.renderer, this.guiControl.sceneFolder);
      //this.renderControl.addOutlinesToModel(this.sceneHandler.scene, this.sceneHandler.renderer);
      this.stats = new Stats()
      this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.dom)
      this.shouldMoveCamera$
        .pipe(distinctUntilChanged())
        .subscribe(pos => {
          gsap.to(this.sceneHandler.camera.position, { duration: 1, x: pos.x, y: pos.y, z: pos.z });
        });
      this.animate(this.renderControl.composer, 0);
    });
  }

  animate(composer: EffectComposer, i: number) {
    requestAnimationFrame(() => this.animate(composer, i));
    this.cloudsControl.animate();
    this.particlesControl.animate();
    this.mainModel.rotation.y -= 0.001;
    this.mainModel.position.y += Math.sin(i/50) / 400;
    this.shouldMoveCamera$.next(this.targetCameraPosition);
    composer.render();
    i++;
    this.stats.update();
  }
  private routesTargetPosition: { [route: string]: Vector3; } = {
    Home: new Vector3(0, 3.25, 12),
    About: new Vector3(-7, 0, 6),
    Projects: new Vector3(3, -5, 6)
  };
  get targetCameraPosition() {
    return this.routesTargetPosition[this.service.currentPage];
  }

}
