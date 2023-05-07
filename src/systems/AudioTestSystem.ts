import { Entity, System } from 'ecsy';
import Audio from '~/components/Audio';
import PositionComponent from '~/components/PositionComponent';
import Sprite from '~/components/Sprite';
import sounds from '~/sounds';

/**
 * Creates an audio entity in the world to test positional audio
 */
export default class AudioTestSystem extends System {
  interval = 0.5;
  timer = 0;
  origin = {
    x: 0,
    y: 0,
  };

  speed = (Math.PI / 8) * (Math.random() * 2 - 1);

  entity?: Entity;

  init() {
    const angle = Math.random() * Math.PI * 2;
    this.origin.x = Math.cos(angle) * (Math.random() * 200 + 1000);
    this.origin.y = Math.sin(angle) * (Math.random() * 200 + 1000);

    this.entity = this.world.createEntity('Audio Test Entity');
    this.entity.addComponent<PositionComponent>(PositionComponent, {
      x: this.origin.x,
      y: this.origin.y,
    });
    this.entity.addComponent<Sprite>(Sprite, { name: 'cow' });
  }

  execute(_: any, timer: number) {
    if (this.timer < timer) {
      this.timer = timer + this.interval;
      this.entity.removeComponent(Audio);
      this.entity.addComponent<Audio>(Audio, {
        obj: sounds.environment.gravel,
        volume: 0.5,
        pitch: Math.random() / 2 + 1,
      });
    }
    const distance = ((1 - Math.sin(timer)) / 2) * 200 + 200;
    const angle = this.speed * timer;
    const x = this.origin.x + Math.cos(angle) * distance;
    const y = this.origin.y + Math.sin(angle) * distance;

    const position =
      this.entity.getMutableComponent<PositionComponent>(PositionComponent);
    position.x = x;
    position.y = y;
  }
}
