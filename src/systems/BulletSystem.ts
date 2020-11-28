import { Not, System } from 'ecsy';
import Bullet from '~components/Bullet';
import CollidesWith from '~components/CollidesWith';
import Damage from '~components/Damage';
import Move from '~components/Move';

export default class BulletSystem extends System {
  static queries = {
    stopped: { components: [Bullet, Not(Move)] },
    collided: { components: [Bullet, CollidesWith] },
  };

  execute() {
    this.queries.stopped.results.forEach(entity => {
      entity.remove();
    });

    this.queries.collided.results.forEach(entity => {
      const bullet = entity.getComponent<Bullet>(Bullet);
      const collider = entity.getComponent<CollidesWith>(CollidesWith);
      collider.targets.forEach(target => {
        if (target.hasComponent(Damage)) {
          const damage = target.getMutableComponent<Damage>(Damage);
          damage.points += bullet.damage;
        } else {
          target.addComponent<Damage>(Damage, { points: bullet.damage });
        }
      });

      entity.removeComponent(Move);
    });
  }
}
