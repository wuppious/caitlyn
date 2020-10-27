import Phaser from 'phaser';
import { World } from 'ecsy';

import './index.css';

import DrawSystem from './systems/DrawSystem';
import ControlSystem, { keys, KeyMap } from './systems/ControlSystem';
import Position from './components/Position';
import Sprite from './components/Sprite';
import SpriteObject from './components/SpriteObject';

class Scene extends Phaser.Scene {
  keys: KeyMap<typeof keys>;
  rect: Phaser.GameObjects.Sprite;
  world: World;

  init() {
    const g = new Phaser.GameObjects.Graphics(this);
    g.fillStyle(0x0000ff);
    g.fillRect(0, 0, 100, 100);
    g.generateTexture('rect', 100, 100);
  }

  create() {
    this.keys = this.createKeyMap(keys);

    this.world = new World();
    this.world.registerComponent(Position);
    this.world.registerComponent(Sprite);
    this.world.registerComponent(SpriteObject);

    this.world.registerSystem(DrawSystem(this));
    this.world.registerSystem(ControlSystem(this, this.keys));

    const entity = this.world.createEntity();
    entity
      .addComponent(Position, { x: 100, y: 100 })
      .addComponent(Sprite, { name: 'rect' });
  }

  createKeyMap<T extends object>(map: T): KeyMap<T> {
    return this.input.keyboard.addKeys(map) as any;
  }

  update(time: number, delta: number) {
    // NOTE: Phaser time is in ms, more intuitive to think in seconds
    this.world.execute(delta / 1000, time / 1000);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game-root',
    mode: Phaser.Scale.ENVELOP,
  },
  scene: Scene,
};

const game = new Phaser.Game(config);
