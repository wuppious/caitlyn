import { System } from 'ecsy';
import Speaker from '../components/Speaker';
import Speech from '../components/Speech';

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
      if (speaker.timeout <= 0) {
        const index = Math.floor(speaker.lines.length * Math.random());
        const line = speaker.lines[index];
        const timeout = 1 + Math.random();

        entity.addComponent<Speech>(Speech, { text: line, timeout });
        speaker.timeout = timeout + 2 + Math.random() * 2;
      } else {
        speaker.timeout -= delta;
      }
    });
  }
}
