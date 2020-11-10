import { Not, System } from 'ecsy';
import Move from '../components/Move';
import Position from '../components/Position';
import Sprite from '../components/Sprite';
import SpriteObject from '../components/SpriteObject';

const DrawSystem = (scene: Phaser.Scene) =>
  class DrawSystem extends System {
    debugGraphic: Phaser.GameObjects.Graphics;
    debugText: Phaser.GameObjects.Text;

    static queries = {
      add: { components: [Sprite, Not(SpriteObject)] },
      remove: { components: [Not(Sprite), SpriteObject] },
      position: { components: [Position, SpriteObject] },

      moves: { components: [Move] },
    };

    init() {
      this.debugGraphic = scene.add.graphics();
      this.debugText = scene.add.text(10, 10, '');
      this.debugText.setScrollFactor(0);
    }

    execute(delta: number) {
      this.queries.add.results.forEach(entity => {
        const sprite = entity.getComponent<Sprite>(Sprite);
        entity.addComponent(SpriteObject, {
          sprite_obj: scene.add.sprite(0, 0, sprite.name),
        });
      });

      this.queries.remove.results.forEach(entity => {
        const sprite = entity.getComponent<SpriteObject>(SpriteObject);
        sprite.sprite_obj.destroy();

        entity.removeComponent(SpriteObject);
      });

      this.queries.position.results.forEach(entity => {
        const sprite = entity.getMutableComponent<SpriteObject>(SpriteObject);
        const position = entity.getComponent<Position>(Position);

        sprite.sprite_obj.x = position.x;
        sprite.sprite_obj.y = position.y;
      });

      // Debug graphics /////////////////////////////////////////////////////////

      this.debugGraphic.clear();
      this.debugGraphic.fillStyle(0xff0000);
      for (const entity of this.queries.moves.results) {
        const position = entity.getComponent<Move>(Move);
        this.debugGraphic.fillCircle(position.x, position.y, 5);
      }

      this.debugGraphic.fillStyle(0xffffff);
      this.debugText.setText('FPS: ' + 1 / delta);
    }
  };

export default DrawSystem;
