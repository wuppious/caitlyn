import { Not, System } from 'ecsy';
import Move from '../components/Move';
import Position from '../components/Position';
import Speech from '../components/Speech';
import Sprite from '../components/Sprite';
import SpriteObject from '../components/SpriteObject';

const DrawSystem = (scene: Phaser.Scene) =>
  class DrawSystem extends System {
    debugGraphic: Phaser.GameObjects.Graphics;
    debugText: Phaser.GameObjects.Text;
    speechBubbles: Phaser.GameObjects.Text[] = [];

    static queries = {
      add: { components: [Sprite, Not(SpriteObject)] },
      remove: { components: [Not(Sprite), SpriteObject] },
      position: { components: [Position, SpriteObject] },

      moves: { components: [Move] },

      speech: {
        components: [Speech, Position],
        listen: {
          added: true,
          removed: true,
        },
      },
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

      this.renderSpeechBubbles();

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

    renderSpeechBubbles() {
      this.queries.speech.added.forEach(entity => {
        const speech = entity.getMutableComponent<Speech>(Speech);
        const position = entity.getComponent<Position>(Position);

        const text = scene.add.text(position.x, position.y, speech.text);
        const index = this.speechBubbles.push(text) - 1;

        speech.bubbleIndex = index;
      });

      this.queries.speech.removed.forEach(entity => {
        const speech = entity.getRemovedComponent<Speech>(Speech);
        const [text] = this.speechBubbles.splice(speech.bubbleIndex, 1);
        text.destroy();
      });

      this.queries.speech.results.forEach(entity => {
        const speech = entity.getComponent<Speech>(Speech);
        const position = entity.getComponent<Position>(Position);
        const text = this.speechBubbles[speech.bubbleIndex];

        text.setPosition(position.x - text.width / 2, position.y - 80, -1000);
      });
    }
  };

export default DrawSystem;
