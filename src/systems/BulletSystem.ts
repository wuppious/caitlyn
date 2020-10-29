import { Not, System } from 'ecsy';
import Bullet from '../components/Bullet';
import CollidesWith from '../components/CollidesWith';
import Move from '../components/Move';

export default class BulletSystem extends System {
  static queries = {
    stopped: { components: [Bullet, Not(Move)] },
    collided: { components: [Bullet, CollidesWith] },
  };

  execute() {
    for (const bullet of this.queries.stopped.results) {
      bullet.remove();
    }

    for (const bullet of this.queries.collided.results) {
      const collider = bullet.getComponent<CollidesWith>(CollidesWith);
      for (const target of collider.targets) {
        target.remove();
      }
    }
  }
}
