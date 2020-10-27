import { System } from 'ecsy';
import Position from '../components/Position';

export type KeyMap<T> = {
  [K in keyof T]: Phaser.Input.Keyboard.Key;
};

export const keys = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  right: Phaser.Input.Keyboard.KeyCodes.D,
};

const ControlSystem = (scene: Phaser.Scene, keymap: KeyMap<typeof keys>) =>
  class ControlSystem extends System {
    static queries = {
      control: { components: [Position] },
    };

    init() {
      scene.input.keyboard.addKeys(keymap);
    }

    execute(delta: number) {
      for (const entity of this.queries.control.results) {
        const pos = entity.getMutableComponent<Position>(Position);

        if (keymap.up.isDown) {
          pos.y -= 100 * delta;
        }
        if (keymap.down.isDown) {
          pos.y += 100 * delta;
        }
        if (keymap.left.isDown) {
          pos.x -= 100 * delta;
        }
        if (keymap.right.isDown) {
          pos.x += 100 * delta;
        }
      }
    }
  };

export default ControlSystem;
