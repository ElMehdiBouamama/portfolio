import { DirectionalLight, DirectionalLightHelper, Color } from 'three'

export class LightsSetup {
  constructor(scene: any) {
    // ... (add lights setup logic here)
    const directionalLight = new DirectionalLight(new Color("#ffffff"), 5);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    const helper = new DirectionalLightHelper(directionalLight);
    scene.add(directionalLight);
  }
}
