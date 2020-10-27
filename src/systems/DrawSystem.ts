import { Not, System } from 'ecsy';
import Position from '../components/Position';
import Sprite from '../components/Sprite';
import SpriteObject from '../components/SpriteObject';

const DrawSystem = (scene: Phaser.Scene) =>
  class DrawSystem extends System {
    static queries = {
      add: { components: [Sprite, Not(SpriteObject)] },
      remove: { components: [Not(Sprite), SpriteObject] },
      position: { components: [Position, SpriteObject] },
    };

    execute() {
      this.queries.add.results.forEach(entity => {
        const sprite = entity.getComponent<Sprite>(Sprite);
        entity.addComponent(SpriteObject, {
          sprite_obj: scene.add.sprite(0, 0, sprite.name),
        });
      });

      this.queries.remove.results.forEach(entity => {
        entity.removeComponent(SpriteObject);
        // TODO: yeet
      });

      this.queries.position.results.forEach(entity => {
        const sprite = entity.getMutableComponent<SpriteObject>(SpriteObject);
        const position = entity.getComponent<Position>(Position);

        sprite.sprite_obj.x = position.x;
        sprite.sprite_obj.y = position.y;
      });
    }
  };

export default DrawSystem;
