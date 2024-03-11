import { BufferGeometry, CatmullRomCurve3, Color, InstancedMesh, Scene, Vector3 } from 'three';
import { MeshLine, MeshLineMaterial } from 'three.meshline';
export class WindParticle {
  lineMesh: any;
  lineMeshParams = {
    transparent: true,
    opacity: 1,
    sizeAttenuation: 1,
    lineWidth: 0.05,
    color: (new Color('#ffffff')).multiplyScalar(25),
    dashArray: 1,     // always has to be the double of the line
    dashOffset: -Math.random() * 5,    // start the dash at zero
    dashRatio: 0.999,  // visible length range min: 0.99, max: 0.5
  };
  private points: Vector3[] = [];
  nbrOfPoints = 10;

  constructor(scene: Scene, generator: any) {
    // Build an array of points
    var t = 0;
    for (let i = 0; i < this.nbrOfPoints; i++) {
      this.points.push(generator.next().value);
    }

    //for (let i = 0; i < this.nbrOfPoints; i++) {
    //  // ! We have to wrapped points into a THREE.Vector3 this time
    //  this.points.push(new THREE.Vector3(
    //    i * this.segmentLength,
    //    (Math.random() * (this.turbulence * 2)) - this.turbulence,
    //    (Math.random() * (this.turbulence * 2)) - this.turbulence,
    //  ));
    //}

    // Build the geometry
    const linePoints = new BufferGeometry().setFromPoints(new CatmullRomCurve3(this.points).getPoints(50));
    const line = new MeshLine();
    line.setGeometry(linePoints);

    // Build the material with good parameters to animate it.
    const material = new MeshLineMaterial(this.lineMeshParams);

    // Build the Mesh
    const depth = Math.random() * -15;
    this.lineMesh = new InstancedMesh(line.geometry, material, 1);
    this.lineMesh.position.x = -20 - (depth * 0);
    this.lineMesh.position.y =
      Math.random() * 15 - 10;
    this.lineMesh.position.z = depth;
    //const gui = new GUI();
    ////gui.add(this.lineMesh.position, 'x');
    //gui.add(this.lineMesh.position, 'y');
    //gui.add(this.lineMesh.position, 'z');
    //gui.add(this.lineMesh.material.uniforms.dashArray, 'value');
    //gui.add(this.lineMesh.material.uniforms.lineWidth, 'value');
    scene.add(this.lineMesh);
  }

  animate() {
    // Check if the dash is out to stop animate it.
    if (this.lineMesh.material.uniforms.dashOffset.value > 0)
      this.lineMesh.material.uniforms.dashOffset.value = -2;
    // Decrement the dashOffset value to animate the path with the dash.
    this.lineMesh.material.uniforms.dashOffset.value += 0.0005;
  }
}
