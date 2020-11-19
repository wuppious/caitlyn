import { Entity } from 'ecsy';
import Collider from '~components/Collider';
import Health from '~components/Health';
import Speaker from '~components/Speaker';
import Sprite from '~components/Sprite';

export default function Cow(entity: Entity): Entity {
  entity.addComponent<Collider>(Collider, { radius: 20 });
  entity.addComponent<Health>(Health, { points: 100, max: 100 });
  entity.addComponent<Speaker>(Speaker, {
    lines: ['Moo', 'Mooooooo', 'Hmmmmh'],
    hurtLines: ['MOOOO', 'MOOH'],
  });
  entity.addComponent<Sprite>(Sprite, { name: 'cow' });

  return entity;
}
