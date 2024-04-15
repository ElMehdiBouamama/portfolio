import { BehaviorSubject } from 'rxjs';
import { Color, DirectionalLight, DirectionalLightHelper, Scene } from 'three';
import { loadingElements } from '../graphics.component';

export class LightsSetup {
  constructor(scene: Scene, $isReady: BehaviorSubject<loadingElements>) {
    const directionalLight = new DirectionalLight(new Color("#ffffff"), 5);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    const helper = new DirectionalLightHelper(directionalLight);
    scene.add(directionalLight);
    $isReady.next({ ...$isReady.value, lights: true });
  }
}
