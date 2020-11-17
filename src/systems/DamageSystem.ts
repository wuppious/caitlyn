import { System } from 'ecsy';
import Damage from '~components/Damage';
import Health from '~components/Health';

export default class DamageSystem extends System {
  static queries = {
    damaged: { components: [Damage] },
  };

  execute() {
    this.queries.damaged.results.forEach(entity => {
      const damage = entity.getComponent<Damage>(Damage);
      if (entity.hasComponent(Health)) {
        const health = entity.getMutableComponent<Health>(Health);
        health.points -= damage.points;

        entity.removeComponent(Damage);

        if (health.points <= 0) {
          entity.remove();
        }
      }
    });
  }
}
