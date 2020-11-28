import { System } from 'ecsy';
import Damage from '~components/Damage';
import Sound from '~components/Sound';
import Speaker from '~components/Speaker';
import Speech from '~components/Speech';

export default class SpeechSystem extends System {
  static queries = {
    speakers: {
      components: [Speaker],
    },
    speech: {
      components: [Speech],
    },
  };

  execute(delta: number) {
    this.queries.speech.results.forEach(entity => {
      const speech = entity.getMutableComponent<Speech>(Speech);
      if (speech.timeout === undefined) return;
      if (speech.timeout <= 0) {
        entity.removeComponent(Speech);
      } else {
        speech.timeout -= delta;
      }
    });

    this.queries.speakers.results.forEach(entity => {
      const speaker = entity.getMutableComponent<Speaker>(Speaker);
      const tookDamage = entity.hasComponent(Damage, true);
      let text = '...';

      if (speaker.timeout <= 0 || tookDamage) {
        entity.removeComponent(Sound);
        entity.addComponent<Sound>(Sound, {
          description: 'test sound',
          volume: 0.5,
        });

        const timeout = 1 + Math.random();
        speaker.timeout = timeout + 2 + Math.random() * 2;

        if (tookDamage) {
          if (speaker.hurtLines.length > 0) {
            const index = Math.floor(speaker.hurtLines.length * Math.random());
            text = speaker.hurtLines[index];
          }
        } else {
          if (speaker.lines.length > 0) {
            const index = Math.floor(speaker.lines.length * Math.random());
            text = speaker.lines[index];
          }
        }

        if (entity.hasComponent(Speech)) {
          entity.removeComponent(Speech);
        }
        entity.addComponent<Speech>(Speech, { text, timeout });
      } else {
        speaker.timeout -= delta;
      }
    });
  }
}
