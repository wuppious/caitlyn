import { World } from 'ecsy';
import {
  Camera,
  HemisphereLight,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Renderer,
  Scene,
  Vector3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import MeshComponent from '~/components/MeshComponent';
import PositionComponent from '~/components/PositionComponent';
import SpinComponent from '~/components/SpinComponent';
import PositionSystem from '~/systems/PositionSystem';
import RenderSystem from '~/systems/RenderSystem';
import SpinSystem from '~/systems/SpinSystem';

export default class WorldScene {
  world: World;
  scene: Scene;
  camera: Camera;
  controls: OrbitControls;

  constructor(renderer: Renderer) {
    this.world = new World();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, renderer.domElement);

    /**
     * Components
     */
    this.world.registerComponent(PositionComponent);
    this.world.registerComponent(MeshComponent);
    this.world.registerComponent(SpinComponent);

    /**
     * Systems
     */
    this.world.registerSystem(PositionSystem);
    this.world.registerSystem(RenderSystem(renderer, this.scene, this.camera));
    this.world.registerSystem(SpinSystem);

    /**
     * Setup light sources
     */
    const light = new PointLight(0xaabbff, 0.5);
    light.position.x = 0;
    light.position.y = 10;
    light.position.z = 0;
    this.scene.add(light);
    const hemisphere = new HemisphereLight(0xffffff, 0x7070aa, 0.4);
    hemisphere.position.set(0, -2, 0);
    this.scene.add(hemisphere);

    /** Entities */
    const geometry = new IcosahedronGeometry();
    const material = new MeshStandardMaterial({ color: 0x00ff00 });

    const cube = this.world.createEntity();
    cube.addComponent<MeshComponent>(MeshComponent, {
      ref: new Mesh(geometry, material),
    });
    cube.addComponent<SpinComponent>(SpinComponent, {
      vec: new Vector3(1, 1, 1),
      speed: 1,
    });
    cube.addComponent<PositionComponent>(PositionComponent);
  }

  update(delta: number, timer: number) {
    this.controls.update();
    this.world.execute(delta, timer);
  }
}
