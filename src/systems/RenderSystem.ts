import { System } from 'ecsy';
import { Camera, Renderer, Scene } from 'three';
import MeshComponent from '~/components/MeshComponent';

const RenderSystem = (renderer: Renderer, scene: Scene, camera: Camera) =>
  class RenderSystem extends System {
    static queries = {
      objects: {
        components: [MeshComponent],
        listen: {
          added: true,
          removed: true,
        },
      },
    };

    execute() {
      this.queries.objects.added.forEach(entity => {
        const mesh = entity.getComponent<MeshComponent>(MeshComponent);
        scene.add(mesh.ref);
      });

      this.queries.objects.removed.forEach(entity => {
        const mesh = entity.getRemovedComponent<MeshComponent>(MeshComponent);
        scene.remove(mesh.ref);
      });

      renderer.render(scene, camera);
    }
  };

export default RenderSystem;
