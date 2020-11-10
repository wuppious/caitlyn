import { Entity, System } from 'ecsy';
import CameraTarget from '../components/CameraTarget';
import Position from '../components/Position';

const CameraSystem = (scene: Phaser.Scene) =>
  class CameraSystem extends System {
    private target: Entity;

    static queries = {
      target: {
        components: [CameraTarget, Position],
        listen: {
          added: true,
          removed: true,
        },
      },
    };

    execute() {
      this.queries.target.removed.forEach(removed => {
        if (removed === this.target) {
          scene.cameras.main.stopFollow();
        }
      });

      this.queries.target.added.forEach(added => {
        this.target = added;
        const position = added.getComponent(Position);
        scene.cameras.main.startFollow(position);
      });
    }
  };

export default CameraSystem;