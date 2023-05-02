import { System, SystemQueries } from 'ecsy';
import Position from '~/components/Position';
import Sound from '~/components/Sound';

const AudioSystem = (scene: Phaser.Scene) =>
  class AudioSystem extends System {
    static queries: SystemQueries = {
      sounds: {
        components: [Sound],
        listen: {
          added: true,
          removed: true,
        },
      },
    };

    execute() {
      this.queries.sounds.added.forEach(entity => {
        const sound = entity.getMutableComponent<Sound>(Sound);
        sound.audio_id = sound.audio_obj.play();
        sound.audio_obj.volume(sound.volume, sound.audio_id);
        sound.audio_obj.rate(sound.pitch, sound.audio_id);
        sound.audio_obj.pannerAttr(
          {
            refDistance: 1,
            distanceModel: 'linear',
            maxDistance: 1000,
            panningModel: 'HRTF',
            rolloffFactor: 0.1,
          },
          sound.audio_id
        );
      });

      this.queries.sounds.results.forEach(entity => {
        const sound = entity.getComponent<Sound>(Sound);
        if (!sound.audio_obj.playing(sound.audio_id)) {
          sound.audio_obj.stop(sound.audio_id);
          entity.removeComponent(Sound);
          return;
        }

        if (entity.hasComponent(Position)) {
          const position = entity.getComponent<Position>(Position);
          const cameraPosition = {
            x: scene.cameras.main.worldView.centerX,
            y: scene.cameras.main.worldView.centerY,
          };

          sound.audio_obj.pos(
            position.x - cameraPosition.x,
            0,
            position.y - cameraPosition.y,
            sound.audio_id
          );
        }
      });
    }
  };

export default AudioSystem;
