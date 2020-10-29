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
  }

  create() {
    this.world = new World();
    this.world.registerComponent(Position);
    this.world.registerComponent(Move);
    this.world.registerComponent(Controllable);
    this.world.registerComponent(Sprite);
    this.world.registerComponent(SpriteObject);

    this.world.registerSystem(ControlSystem(this));
    this.world.registerSystem(MoveSystem);
    this.world.registerSystem(DrawSystem(this));

    this.world
      .createEntity()
      .addComponent(Position, { x: 100, y: 100 })
      .addComponent(Controllable)
      .addComponent(Sprite, { name: 'player' });

    this.world
      .createEntity()
      .addComponent(Position, { x: 300, y: 300 })
      .addComponent(Sprite, { name: 'cow' });
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
