import { BehaviorSubject } from 'rxjs';
import { Camera, Color, Fog, InstancedMesh, Matrix4, PlaneGeometry, Quaternion, Scene, ShaderMaterial, TextureLoader, Vector3 } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { loadingElements } from '../graphics.component';

export class CloudsSetup {

  clouds: InstancedMesh
  fileName: string = 'cloud.webp';
  planeSize = 64;
  cloudSpacing = 700;
  numberClouds = 600;

  constructor(private scene: Scene, public camera: Camera, private $isReady: BehaviorSubject<loadingElements>) {
    this.camera = camera;
    const vertexShader = /* glsl */`
			    varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
				`;

    const fragmentShader = /* glsl */`
					uniform sampler2D map;
          uniform vec3 fogColor;
          uniform float fogNear;
          uniform float fogFar;
          varying vec2 vUv;

          void main() {

            float depth = (gl_FragCoord.z * 2.) / (gl_FragCoord.w * 1.);
            float fogFactor = smoothstep( fogNear, fogFar, depth );

            gl_FragColor = texture2D( map, vUv );
            gl_FragColor.w *= pow( gl_FragCoord.z, 0.0 );
            gl_FragColor = mix( gl_FragColor, vec4( fogColor , gl_FragColor.w ), fogFactor );

          }
				`;

    var fog = new Fog(0x76B5CC, 0, 600);
    scene.fog = fog;

    const material = new ShaderMaterial({
      uniforms: {
        "map": {
          value: new TextureLoader().load('/assets/imgs/' + this.fileName)
        },
        "fogColor": {
          value: fog.color
        },
        "fogNear": {
          value: fog.near
        },
        "fogFar": {
          value: fog.far
        },
      },
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: true,
      transparent: true,
    });

    const planeGeo = new PlaneGeometry(this.planeSize, this.planeSize);
    const matrix = new Matrix4();
    const geometries = [];

    const randomizeMatrix = function () {
      const position = new Vector3();
      const quaternion = new Quaternion();
      const scale = new Vector3();
      return function (matrix: Matrix4, cloudSpacing: number, numberClouds: number, i: number) {
        position.x = Math.random() * cloudSpacing - cloudSpacing / 2;
        position.y = - Math.random() * Math.random() * 200 - 35;
        position.z = i - numberClouds / 2 + 0.01;
        quaternion.setFromAxisAngle(new Vector3(0, 0, 1), Math.random() * Math.PI);
        scale.x = scale.y = Math.random() * Math.random() * 1.5 + 0.5;
        matrix.compose(position, quaternion, scale);
      };
    }();

    // TODO: Add attribute for position and time to live for each clonedPlaneGeo here
    for (let i = 0; i < this.numberClouds; i++) {
      randomizeMatrix(matrix, this.cloudSpacing, this.numberClouds, i);
      const clonedPlaneGeo = planeGeo.clone();
      clonedPlaneGeo.applyMatrix4(matrix);
      geometries.push(clonedPlaneGeo);
    }

    const planeGeos = mergeGeometries(geometries);
    this.clouds = new InstancedMesh(planeGeos, material, 1);
    this.clouds.name = "clouds";
    scene.add(this.clouds);
    $isReady.next({ ...$isReady.value, clouds: true });
  }

  animate() {
    // TODO: move the clouds independently from one another 
    this.clouds.position.x -= 0.1;
    this.clouds.position.x %= 250;
  }
}
