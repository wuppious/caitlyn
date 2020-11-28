import { System, SystemQueries } from 'ecsy';
import { distance2d } from 'utils';
import Position from '~components/Position';
import Sound from '~components/Sound';

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
        sound.audio_obj.rate(sound.pitch, sound.audio_id);
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

        sound.audio_obj.volume(volume, sound.audio_id);
        sound.audio_obj.stereo(balance, sound.audio_id);

        if (!sound.audio_obj.playing(sound.audio_id)) {
          sound.audio_obj.stop(sound.audio_id);
          entity.removeComponent(Sound);
        }
      });
    }
  };

export default AudioSystem;
