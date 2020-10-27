import Phaser from 'phaser';
import './index.css';

type KeyMap<T> = {
  [K in keyof T]: Phaser.Input.Keyboard.Key
}

const keys = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  right: Phaser.Input.Keyboard.KeyCodes.D,
};

class Scene extends Phaser.Scene {
  keys: KeyMap<typeof keys>;
  rect: Phaser.GameObjects.Sprite;

  init() {
    let g = new Phaser.GameObjects.Graphics(this);
    g.fillStyle(0x0000FF);
    g.fillRect(0, 0, 100, 100);
    g.generateTexture('rect', 100, 100);
  }

  create() {
    this.rect = this.add.sprite(100, 100, 'rect');
    this.keys = this.createKeyMap(keys);
  }

  createKeyMap<T extends object>(map: T): KeyMap<T> {
    return this.input.keyboard.addKeys(map) as any;
  }

  update() {
    if (this.keys.up.isDown) {
      this.rect.y -= 1;
    }
    if (this.keys.down.isDown) {
      this.rect.y += 1;
    }
    if (this.keys.left.isDown) {
      this.rect.x -= 1;
    }
    if (this.keys.right.isDown) {
      this.rect.x += 1;
    }
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
