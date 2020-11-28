import { System } from 'ecsy';
import sounds from 'sounds';
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
      let sound = undefined;
      const volume = tookDamage ? 1 : 0.5;
      const pitch = 1.2 - Math.random() * 0.4;

      if (speaker.timeout <= 0 || tookDamage) {
        const timeout = 1 + Math.random();
        speaker.timeout = timeout + 2 + Math.random() * 10;

        if (tookDamage) {
          if (speaker.hurtLines.length > 0) {
            const index = Math.floor(speaker.hurtLines.length * Math.random());
            text = speaker.hurtLines[index];
            sound = sounds.cow.hurt;
          }
        } else {
          if (speaker.lines.length > 0) {
            const index = Math.floor(speaker.lines.length * Math.random());
            text = speaker.lines[index];
            sound = sounds.cow.moo;
          }
        }

        if (entity.hasComponent(Speech)) {
          entity.removeComponent(Speech);
        }

        entity.removeComponent(Sound);
        entity.addComponent<Sound>(Sound, {
          audio_obj: sound,
          description: text,
          volume,
          pitch,
        });

        entity.addComponent<Speech>(Speech, { text, timeout });
      } else {
        speaker.timeout -= delta;
      }
    });
  }
}
