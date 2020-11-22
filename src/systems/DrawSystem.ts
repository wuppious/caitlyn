import { Not, System } from 'ecsy';
import Health from '~components/Health';
import Move from '~components/Move';
import Position from '~components/Position';
import Speech from '~components/Speech';
import Sprite from '~components/Sprite';
import SpriteObject from '~components/SpriteObject';

const DrawSystem = (scene: Phaser.Scene) =>
  class DrawSystem extends System {
    healthbarGraphic: Phaser.GameObjects.Graphics;
    debugGraphic: Phaser.GameObjects.Graphics;
    debugText: Phaser.GameObjects.Text;
    speechBubbles: { [id: string]: Phaser.GameObjects.Text } = {};

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

      healthbars: {
        components: [Health, Position],
      },
    };

    init() {
      this.healthbarGraphic = scene.add.graphics();
      this.debugGraphic = scene.add.graphics();
      this.debugText = scene.add.text(10, 10, '');
      this.debugText.setScrollFactor(0);
    }

    execute(delta: number) {
      this.handleSprites();

      this.handleSpeechBubbles();
      this.handleHealthbars();

      this.handleDebugGraphics(delta);
    }

    handleSprites() {
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
    }

    handleSpeechBubbles() {
      this.queries.speech.removed.forEach(entity => {
        const text = this.speechBubbles[entity.id];
        text.destroy();
        delete this.speechBubbles[entity.id];
      });

      this.queries.speech.added.forEach(entity => {
        const speech = entity.getMutableComponent<Speech>(Speech);
        const position = entity.getComponent<Position>(Position);

        const text = scene.add.text(position.x, position.y, speech.text);
        this.speechBubbles[entity.id] = text;
      });

      this.queries.speech.results.forEach(entity => {
        const position = entity.getComponent<Position>(Position);
        const text = this.speechBubbles[entity.id];

        text.setPosition(position.x - text.width / 2, position.y - 80, -1000);
      });
    }

    handleHealthbars() {
      this.healthbarGraphic.clear();

      this.queries.healthbars.results.forEach(entity => {
        const health = entity.getComponent<Health>(Health);
        if (health.max <= 0) return;

        const position = entity.getComponent<Position>(Position);

        const HEALTHBAR_WIDTH = 80;
        const HEALTHBAR_HEIGHT = 5;
        const HEALTHBAR_OFFSET = 50;

        const width = (HEALTHBAR_WIDTH * health.points) / health.max;

        this.healthbarGraphic.fillStyle(0xff0000);
        this.healthbarGraphic.fillRect(
          position.x - HEALTHBAR_WIDTH / 2,
          position.y - HEALTHBAR_HEIGHT / 2 + HEALTHBAR_OFFSET,
          HEALTHBAR_WIDTH,
          HEALTHBAR_HEIGHT
        );

        this.healthbarGraphic.fillStyle(0x00ff00);
        this.healthbarGraphic.fillRect(
          position.x - HEALTHBAR_WIDTH / 2,
          position.y - HEALTHBAR_HEIGHT / 2 + HEALTHBAR_OFFSET,
          width,
          HEALTHBAR_HEIGHT
        );
      });
    }

    handleDebugGraphics(delta: number) {
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
