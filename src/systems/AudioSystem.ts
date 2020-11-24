import { System, SystemQueries } from 'ecsy';
import { distance2d } from 'utils';
import Position from '~components/Position';
import Sound from '~components/Sound';

const AudioSystem = (scene: Phaser.Scene) =>
  class AudioSystem extends System {
    static queries: SystemQueries = {
      sounds: { components: [Sound] },
    };

    execute() {
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
          balance = -Math.cos(
            Math.atan2(
              position.y - cameraPosition.y,
              position.x - cameraPosition.x
            )
          );
        }

        console.debug(`Sound "${sound.description}"`, { balance, volume });
        entity.removeComponent(Sound);
      });
    }
  };

export default AudioSystem;
