import { System, SystemQueries } from 'ecsy';
import Audio from '~/components/Audio';
import Position from '~/components/Position';

const AudioSystem = (scene: Phaser.Scene) =>
  class AudioSystem extends System {
    static queries: SystemQueries = {
      audio: {
        components: [Audio],
        listen: {
          added: true,
          removed: true,
        },
      },
      positionalAudio: {
        components: [Audio, Position],
        listen: {
          added: true,
        },
      },
    };

    init() {
      Howler.orientation(0, -1, 0, 0, 0, -1);
    }

    execute() {
      this.updateListener();
      this.handleAdded();
      this.handleRemoved();
      this.update();
    }

    updateListener() {
      Howler.pos(
        scene.cameras.main.worldView.centerX,
        scene.cameras.main.worldView.centerY,
        5
      );
    }

    handleAdded() {
      this.queries.audio.added.forEach(entity => {
        const audio = entity.getMutableComponent<Audio>(Audio);

        audio.id = audio.obj.play();
        audio.obj.loop(audio.loop, audio.id);
        audio.obj.volume(audio.volume, audio.id);
        audio.obj.rate(audio.pitch, audio.id);
      });

      this.queries.positionalAudio.added.forEach(entity => {
        const audio = entity.getMutableComponent<Audio>(Audio);
        const position = entity.getComponent<Position>(Position);
        audio.obj.pos(position.x, position.y, 0, audio.id);
        audio.obj.pannerAttr(
          {
            refDistance: 100,
            distanceModel: 'inverse',
            maxDistance: 1000,
            panningModel: 'HRTF',
            rolloffFactor: 1,
          },
          audio.id
        );
      });
    }

    handleRemoved() {
      this.queries.audio.removed.forEach(entity => {
        const audio = entity.getRemovedComponent<Audio>(Audio);
        if (audio && audio.obj.playing(audio.id)) {
          audio.obj.stop(audio.id);
        }
      });
    }

    update() {
      this.queries.audio.results.forEach(entity => {
        const audio = entity.getComponent<Audio>(Audio);

        if (!audio.obj.playing(audio.id)) {
          entity.removeComponent(Audio);
          return;
        }
      });

      this.queries.positionalAudio.results.forEach(entity => {
        const audio = entity.getComponent<Audio>(Audio);
        const position = entity.getComponent<Position>(Position);
        audio.obj.pos(position.x, position.y, 0, audio.id);
      });
    }
  };

export default AudioSystem;
