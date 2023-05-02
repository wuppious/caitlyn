import { System } from 'ecsy';
import Cow from '~/entities/cow';
import Bullet from '~/components/Bullet';
import Collider from '~/components/Collider';
import Controllable from '~/components/Controllable';
import Move from '~/components/Move';
import Position from '~/components/Position';
import Sprite from '~/components/Sprite';

export type KeyMap<T> = {
  [K in keyof T]: Phaser.Input.Keyboard.Key;
};

export const keys = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  right: Phaser.Input.Keyboard.KeyCodes.D,
};

const ControlSystem = (scene: Phaser.Scene) =>
  class ControlSystem extends System {
    keymap: KeyMap<typeof keys>;
    rightButtonDown = false;
    leftButtonDown = false;
    middleButtonDown = false;

    static queries = {
      control: { components: [Controllable, Position] },
    };

    init() {
      this.keymap = scene.input.keyboard.addKeys(keys) as any;
      scene.input.mouse.disableContextMenu();
    }

    execute(delta: number) {
      const keymap = this.keymap;
      const mouse = scene.input.activePointer;
      const speed = 150;

      for (const entity of this.queries.control.results) {
        const pos = entity.getMutableComponent<Position>(Position);

        if (keymap.up.isDown) {
          pos.y -= speed * delta;
        }
        if (keymap.down.isDown) {
          pos.y += speed * delta;
        }
        if (keymap.left.isDown) {
          pos.x -= speed * delta;
        }
        if (keymap.right.isDown) {
          pos.x += speed * delta;
        }

        if (mouse.rightButtonDown() && !this.rightButtonDown) {
          entity.removeComponent(Move);
          entity.addComponent(Move, {
            x: mouse.worldX,
            y: mouse.worldY,
            speed,
          });
        }

        if (mouse.leftButtonDown() && !this.leftButtonDown) {
          const bullet = this.world.createEntity();
          bullet
            .addComponent<Position>(Position, { x: pos.x, y: pos.y })
            .addComponent<Move>(Move, {
              x: mouse.worldX,
              y: mouse.worldY,
              speed: 2000,
            })
            .addComponent<Collider>(Collider, { radius: 2 })
            .addComponent<Sprite>(Sprite, { name: 'bullet' })
            .addComponent<Bullet>(Bullet, { damage: 45 });
        }
      }

      if (mouse.middleButtonDown() && !this.middleButtonDown) {
        const cow = this.world.createEntity();
        cow.addComponent<Position>(Position, {
          x: mouse.worldX,
          y: mouse.worldY,
        });

        Cow(cow);
      }

      this.rightButtonDown = mouse.rightButtonDown();
      this.leftButtonDown = mouse.leftButtonDown();
      this.middleButtonDown = mouse.middleButtonDown();
    }
  };

export default ControlSystem;
