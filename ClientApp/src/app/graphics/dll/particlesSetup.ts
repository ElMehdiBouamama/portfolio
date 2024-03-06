import { WindParticle } from './windParticle';
import { Scene, Vector3 } from 'three';

export class ParticlesSetup {
  particles: WindParticle[] = [];
  particlesNumber = 200;
  constructor(scene: Scene) {
    function* generator() {
      let i = -1;
      while (true) {
        const segmentLength = 5;
        const turbulence = 1;
        // ! We have to wrapped points into a THREE.Vector3 this time
        i++;
        //let t = (i / 10) * 12 * Math.PI;
        //yield new THREE.Vector3(
        //  Math.cos(t * (Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5))) * segmentLength * 50,
        //  Math.sin(t * (Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5))) * segmentLength * 50,
        //  0,
        //);
        yield new Vector3(
          i * segmentLength,
          (Math.random() * (turbulence * 2)) - turbulence,
          (Math.random() * (turbulence * 2)) - turbulence,
        );
      }
    }

    for (let i = 0; i < this.particlesNumber; i++) {
      this.particles.push(new WindParticle(scene, generator()));
    }
  }

  animate() {
    this.particles.forEach(particle => particle.animate());
  }
}
