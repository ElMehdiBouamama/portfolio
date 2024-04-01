import { BufferAttribute, BufferGeometry, Color, Points, PointsMaterial, Scene, Vector3 } from 'three';

export class ParticlesSystem {
  particlesNumber = 200;
  speed: { x: number, y: any } = {
    x: 0.01,
    y: 0.005
  };
  positions: Float32Array;
  ttls: Float32Array;
  geometry: BufferGeometry;
  material: PointsMaterial;
  points: Points;



  constructor(scene: Scene) {
    this.positions = new Float32Array(this.particlesNumber * 3);
    this.ttls = new Float32Array(this.particlesNumber);

    for (let i = 0; i < this.particlesNumber; i++) {
      this.positions[i * 3] = Math.random() * 50 - 20;
      this.positions[i * 3 + 1] = Math.random() * 10 - 5;
      this.positions[i * 3 + 2] = -Math.random() * 20 + 10;
      this.ttls[i] = Math.random() * 200 + 300; // TTL Between 300 and 500 frames
    }

    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('ttl', new BufferAttribute(this.ttls, 1));

    this.material = new PointsMaterial({ color: new Color(1, 1, 1).multiplyScalar(15), size: 0.1 });
    this.points = new Points(this.geometry, this.material);
    scene.add(this.points);
  }

  animate() {
    const positions = this.points.geometry.attributes.position;
    const ttls = this.points.geometry.attributes.ttl;

    for (let i = 0; i < this.particlesNumber; i++) {
      const index = i * 3;

      // Update position based on velocity
      positions.array[index] -= this.speed.x;
      positions.array[index + 1] -= Math.sin(positions.array[index]) * this.speed.y;

      // Update ttl and reset position if ttl reaches 0
      if ((ttls.array[i] -= 1) <= 0) {
        positions.array[index] = Math.random() * 50 - 20;
        positions.array[index + 1] = Math.random() * 10 - 5;
        positions.array[index + 2] = -Math.random() * 20 + 10;
        ttls.array[i] = Math.random() * 100 + 500;
      }
    }

    // Update the buffer attributes
    positions.needsUpdate = true;
    ttls.needsUpdate = true;
  }
}
