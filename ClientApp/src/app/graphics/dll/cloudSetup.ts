import { Camera, Color, Fog, InstancedMesh, Matrix4, PlaneGeometry, Quaternion, Scene, ShaderMaterial, TextureLoader, Vector3 } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class CloudsSetup {

  camera: Camera;
  clouds: InstancedMesh
  fileName: string = 'cloud.png';
  planeSize = 64;
  cloudSpacing = 700;
  numberClouds = 600;

  constructor(scene: Scene, camera: Camera) {
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

    for (let i = 0; i < this.numberClouds; i++) {
      randomizeMatrix(matrix, this.cloudSpacing, this.numberClouds, i);
      const clonedPlaneGeo = planeGeo.clone();
      clonedPlaneGeo.applyMatrix4(matrix);
      geometries.push(clonedPlaneGeo);
    }

    const planeGeos = mergeGeometries(geometries);
    this.clouds = new InstancedMesh(planeGeos, material, 1);
    this.clouds.name = "clouds";

    // Instanced Geometry

    //this.clouds = new InstancedMesh(planeGeo, material, this.numberClouds);

    //for (let i = 0; i < this.numberClouds; i++) {
    //  randomizeMatrix(matrix, this.cloudSpacing, this.numberClouds, i);
    //  this.clouds.setMatrixAt(i, matrix);
    //}

    scene.add(this.clouds);


    //scene.add(this.clouds);

    // GUI
    const parameters = {
      fogColor: fog.color,
      fogNear: fog.near,
      fogFar: fog.far
    };
    function update() {
      material.uniforms.fogColor.value = new Color(parameters.fogColor.r / 255, parameters.fogColor.g / 255, parameters.fogColor.b / 255);
      material.uniforms.fogNear.value = parameters.fogNear;
      material.uniforms.fogFar.value = parameters.fogFar;
    }
  }

  animate() {
    this.clouds.position.x -= 0.1;
    this.clouds.position.x %= 100;
  }
}
