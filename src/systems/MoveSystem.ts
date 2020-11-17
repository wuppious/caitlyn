import { Entity, System } from 'ecsy';
import Collider from '~components/Collider';
import CollidesWith from '~components/CollidesWith';
import Move from '~components/Move';
import Position from '~components/Position';

export default class MoveSystem extends System {
  static queries = {
    move: { components: [Move, Position] },
    colliders: { components: [Collider, Position] },
    removeChecks: { components: [CollidesWith, Position] },
  };

  execute(delta: number) {
    for (const entity of this.queries.move.results) {
      const move = entity.getComponent<Move>(Move);
      const pos = entity.getMutableComponent<Position>(Position);

      const step = move.speed * delta;

      // Target vector
      const tx = move.x - pos.x;
      const ty = move.y - pos.y;

      // Resize target vector to length `step`
      const mag = Math.sqrt(tx * tx + ty * ty);
      const dx = (tx / mag) * step;
      const dy = (ty / mag) * step;

      if (Math.abs(tx) < Math.abs(dx)) {
        pos.x = move.x;
      } else {
        pos.x += dx;
      }

      if (Math.abs(ty) < Math.abs(dy)) {
        pos.y = move.y;
      } else {
        pos.y += dy;
      }

      if (entity.hasComponent(Collider)) {
        const myCollider = entity.getComponent<Collider>(Collider);
        for (const target of this.queries.colliders.results) {
          if (target === entity) continue;

          const targetCollider = target.getComponent<Collider>(Collider);
          const targetPos = target.getComponent<Position>(Position);
          const distanceX = targetPos.x - pos.x;
          const distanceY = targetPos.y - pos.y;
          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
          );

          if (distance < targetCollider.radius + myCollider.radius) {
            this.addCollision(entity, target);
            this.addCollision(target, entity);
          } else {
            this.removeCollision(entity, target);
            this.removeCollision(target, entity);
          }
        }
      }

      if (pos.x == move.x && pos.y == move.y) {
        entity.removeComponent(Move);
      }
    }

    for (const entity of this.queries.removeChecks.results) {
      for (const target of [
        ...entity.getComponent<CollidesWith>(CollidesWith).targets,
      ]) {
        if (!target.alive) {
          this.removeCollision(entity, target);
        }
      }
    }
  }

  addCollision(self: Entity, target: Entity) {
    if (!self.hasComponent(CollidesWith)) {
      self.addComponent(CollidesWith);
    }
    const c = self.getMutableComponent<CollidesWith>(CollidesWith);
    c.targets.push(target);
  }

  removeCollision(self: Entity, target: Entity) {
    if (!self.hasComponent(CollidesWith)) return;
    const c = self.getMutableComponent<CollidesWith>(CollidesWith);
    c.targets = c.targets.filter(t => t !== target);
    if (c.targets.length == 0) {
      self.removeComponent(CollidesWith);
    }
  }
}
