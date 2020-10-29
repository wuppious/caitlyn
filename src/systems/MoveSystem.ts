import { System } from 'ecsy';
import Move from '../components/Move';
import Position from '../components/Position';

export default class MoveSystem extends System {
  static queries = {
    move: { components: [Move, Position] },
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

      if (pos.x == move.x && pos.y == move.y) {
        entity.removeComponent(Move);
      }
    }
  }
}
