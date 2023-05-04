import { System } from 'ecsy';
import Decay from '~/components/Decay';
import ToBeRemoved from '~/components/ToBeRemoved';

export default class EntitySystem extends System {
  static queries = {
    decay: {
      components: [Decay],
    },
    toRemove: {
      components: [ToBeRemoved],
      listen: {
        added: true,
        removed: true,
      },
    },
  };

  execute(delta: number) {
    this.queries.decay.results.forEach(entity => {
      const decay = entity.getMutableComponent<Decay>(Decay);
      if (decay.timer > 0) {
        decay.timer -= delta;
      } else {
        entity.removeComponent(Decay);
        entity.addComponent(ToBeRemoved);
      }
    });

    this.queries.toRemove.added.forEach(entity => {
      entity.remove();
    });
  }
}
