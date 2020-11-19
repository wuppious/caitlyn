import { Entity } from 'ecsy';
import CameraTarget from '~components/CameraTarget';
import Controllable from '~components/Controllable';
import Sprite from '~components/Sprite';

export default function Player(entity: Entity): Entity {
  entity.addComponent<CameraTarget>(CameraTarget);
  entity.addComponent<Controllable>(Controllable);
  entity.addComponent<Sprite>(Sprite, { name: 'player' });

  return entity;
}
