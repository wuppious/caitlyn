import Phaser from 'phaser';
import { World, Component, Types, System, SystemStateComponent, Not } from 'ecsy';
import './index.css';

class Position extends Component<void> {
  x: number;
  y: number;

  static schema = {
    x: { type: Types.Number },
    y: { type: Types.Number },
  };

  reset() {
    this.x = 0;
    this.y = 0;
  }
}

class Sprite extends Component<void> {
  name: string;

  static schema = {
    name: { type: Types.String },
  };

  reset() {
    this.name = "";
  }
}

class SpriteObject extends SystemStateComponent<void> {
  sprite_obj: Phaser.GameObjects.Sprite | undefined;

  static schema = {
    sprite_obj: { type: Types.Ref },
  };

  reset() {
    this.sprite_obj = undefined;
  }
}

const DrawSystem = (scene: Phaser.Scene) =>
  class DrawSystem extends System {
    static queries = {
      add: { components: [Sprite, Not(SpriteObject)] },
      remove: { components: [Not(Sprite), SpriteObject] },
      position: { components: [Position, SpriteObject] },
    };

    execute() {
      this.queries.add.results.forEach(entity => {
        let sprite = entity.getComponent<Sprite>(Sprite);
        entity.addComponent(SpriteObject, {sprite_obj: scene.add.sprite(0, 0, sprite.name)})
      });

      this.queries.remove.results.forEach(entity => {
         entity.removeComponent(SpriteObject);
        // TODO: yeet
      });

      this.queries.position.results.forEach(entity => {
        let sprite = entity.getMutableComponent<SpriteObject>(SpriteObject);
        let position = entity.getComponent<Position>(Position);

        sprite.sprite_obj.x = position.x;
        sprite.sprite_obj.y = position.y;
      });
    }
  };

type KeyMap<T> = {
  [K in keyof T]: Phaser.Input.Keyboard.Key
}

const keys = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  right: Phaser.Input.Keyboard.KeyCodes.D,
};

const ControlSystem = (keymap: KeyMap<typeof keys>) =>
  class ControlSystem extends System {
    static queries = {
      control: { components: [Position] }
    };

    execute() {
      for (let entity of this.queries.control.results) {
        let pos = entity.getMutableComponent<Position>(Position);

        if (keymap.up.isDown) {
          pos.y -= 1;
        }
        if (keymap.down.isDown) {
          pos.y += 1;
        }
        if (keymap.left.isDown) {
          pos.x -= 1;
        }
        if (keymap.right.isDown) {
          pos.x += 1;
        }
      }
    }
  }

class Scene extends Phaser.Scene {
  keys: KeyMap<typeof keys>;
  rect: Phaser.GameObjects.Sprite;
  world: World;

  init() {
    let g = new Phaser.GameObjects.Graphics(this);
    g.fillStyle(0x0000FF);
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
    this.world.registerSystem(ControlSystem(this.createKeyMap(keys)));

    let entity = this.world.createEntity();
    entity.addComponent(Position, {x: 100, y: 100}).addComponent(Sprite, {name: 'rect'});
  }

  createKeyMap<T extends object>(map: T): KeyMap<T> {
    return this.input.keyboard.addKeys(map) as any;
  }

  update() {
    this.world.execute();
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
