import Phaser from 'phaser';
import { World } from 'ecsy';

import './index.css';

import DrawSystem from './systems/DrawSystem';
import ControlSystem from './systems/ControlSystem';
import Position from './components/Position';
import Sprite from './components/Sprite';
import SpriteObject from './components/SpriteObject';
import Controllable from './components/Controllable';
import Move from './components/Move';
import MoveSystem from './systems/MoveSystem';
import Collider from './components/Collider';
import CollidesWith from './components/CollidesWith';
import Bullet from './components/Bullet';
import BulletSystem from './systems/BulletSystem';
import CameraSystem from './systems/CameraSystem';
import CameraTarget from './components/CameraTarget';
import Speech from './components/Speech';
import SpeechSystem from './systems/SpeechSystem';
import Speaker from './components/Speaker';

class Scene extends Phaser.Scene {
  rect: Phaser.GameObjects.Sprite;
  world: World;

  init() {
    const player = new Phaser.GameObjects.Graphics(this);
    player.fillStyle(0x0000ff);
    player.fillCircle(20, 20, 20);
    player.generateTexture('player', 40, 40);

    const npc1 = new Phaser.GameObjects.Graphics(this);
    npc1.fillStyle(0x00ff00);
    npc1.fillCircle(20, 20, 20);
    npc1.generateTexture('npc1', 40, 40);

    const cow = new Phaser.GameObjects.Graphics(this);
    cow.fillStyle(0xffff00);
    cow.fillCircle(20, 20, 20);
    cow.generateTexture('cow', 40, 40);

    const bullet = new Phaser.GameObjects.Graphics(this);
    bullet.fillStyle(0xffff00);
    bullet.fillCircle(4, 4, 4);
    bullet.generateTexture('bullet', 8, 8);
  }

  create() {
    this.world = new World();

    this.world.registerComponent(Position);
    this.world.registerComponent(Move);
    this.world.registerComponent(Controllable);
    this.world.registerComponent(Collider);
    this.world.registerComponent(CollidesWith);
    this.world.registerComponent(Sprite);
    this.world.registerComponent(SpriteObject);
    this.world.registerComponent(Bullet);
    this.world.registerComponent(CameraTarget);
    this.world.registerComponent(Speaker);
    this.world.registerComponent(Speech);

    this.world.registerSystem(ControlSystem(this));
    this.world.registerSystem(MoveSystem);
    this.world.registerSystem(BulletSystem);
    this.world.registerSystem(SpeechSystem);
    this.world.registerSystem(CameraSystem(this));
    this.world.registerSystem(DrawSystem(this));

    this.world
      .createEntity()
      .addComponent<CameraTarget>(CameraTarget)
      .addComponent<Position>(Position, { x: 100, y: 100 })
      .addComponent<Controllable>(Controllable)
      .addComponent<Sprite>(Sprite, { name: 'player' });

    this.world
      .createEntity()
      .addComponent<Position>(Position, { x: 300, y: 300 })
      .addComponent<Collider>(Collider, { radius: 20 })
      .addComponent<Speaker>(Speaker, { lines: ['Moo', 'Mooooooo', 'Hmmmmh'] })
      .addComponent<Sprite>(Sprite, { name: 'cow' });
  }

  update(time: number, delta: number) {
    // NOTE: Phaser time is in ms, more intuitive to think in seconds
    this.world.execute(delta / 1000, time / 1000);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-root',
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  scene: Scene,
  fps: {
    min: 30,
    target: 60,
  },
};

const game = new Phaser.Game(config);
