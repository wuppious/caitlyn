import { System } from 'ecsy';
import MeshComponent from '~/components/MeshComponent';
import SpinComponent from '~/components/SpinComponent';

export default class SpinSystem extends System {
  static queries = {
    spinners: {
      components: [SpinComponent, MeshComponent],
    },
  };

  execute(delta: number) {
    this.queries.spinners.results.forEach(entity => {
      const mesh = entity.getComponent<MeshComponent>(MeshComponent);
      const spin = entity.getComponent<SpinComponent>(SpinComponent);

      mesh.ref.rotation.x += spin.vec.x * spin.speed * delta;
      mesh.ref.rotation.y += spin.vec.y * spin.speed * delta;
      mesh.ref.rotation.z += spin.vec.z * spin.speed * delta;
    });
  }
}
