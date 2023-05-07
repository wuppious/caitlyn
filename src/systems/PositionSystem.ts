import { System, SystemQueries } from 'ecsy';
import MeshComponent from '~/components/MeshComponent';
import PositionComponent from '~/components/PositionComponent';

export default class PositionSystem extends System {
  timer = 0;
  static queries: SystemQueries = {
    meshes: {
      components: [MeshComponent, PositionComponent],
    },
  };

  execute() {
    this.queries.meshes.results.forEach(entity => {
      const position =
        entity.getComponent<PositionComponent>(PositionComponent);
      const mesh = entity.getMutableComponent<MeshComponent>(MeshComponent);

      mesh.ref.position.set(
        position.value.x,
        position.value.y,
        position.value.z
      );
    });
  }
}
