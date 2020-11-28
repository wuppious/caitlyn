import { System, SystemQueries } from 'ecsy';
import { Howl } from 'howler';
import { distance2d } from 'utils';
import Position from '~components/Position';
import Sound from '~components/Sound';

const AudioSystem = (scene: Phaser.Scene) =>
  class AudioSystem extends System {
    moo: Howl;

    static queries: SystemQueries = {
      sounds: {
        components: [Sound],
        listen: {
          added: true,
          removed: true,
        },
      },
    };

    init() {
      this.moo = new Howl({
        src: ['assets/audio/moo.ogg'],
      });
    }

    execute() {
      this.queries.sounds.added.forEach(entity => {
        const sound = entity.getMutableComponent<Sound>(Sound);
        sound.audio_id = this.moo.play();
        this.moo.rate(1.2 - Math.random() * 0.4, sound.audio_id);
      });

      this.queries.sounds.results.forEach(entity => {
        const sound = entity.getComponent<Sound>(Sound);

        let volume = 0;
        let balance = 0.0;

        if (entity.hasComponent(Position)) {
          const position = entity.getComponent<Position>(Position);
          const cameraPosition = {
            x: scene.cameras.main.worldView.centerX,
            y: scene.cameras.main.worldView.centerY,
          };

          const distance = distance2d(position, cameraPosition);
          volume = sound.volume / Math.max(1, distance / (100 * sound.volume));
          balance = Math.cos(
            Math.atan2(
              position.y - cameraPosition.y,
              position.x - cameraPosition.x
            )
          );
        }

        this.moo.volume(volume, sound.audio_id);
        this.moo.stereo(balance, sound.audio_id);

        if (!this.moo.playing(sound.audio_id)) {
          this.moo.stop(sound.audio_id);
          entity.removeComponent(Sound);
        }
      });
    }
  };

export default AudioSystem;
