import { World } from 'ecsy';
import Phaser from 'phaser';

import Bullet from '~/components/Bullet';
import CameraTarget from '~/components/CameraTarget';
import Collider from '~/components/Collider';
import CollidesWith from '~/components/CollidesWith';
import Controllable from '~/components/Controllable';
import Damage from '~/components/Damage';
import Health from '~/components/Health';
import Move from '~/components/Move';
import Position from '~/components/Position';
import Sound from '~/components/Sound';
import Speaker from '~/components/Speaker';
import Speech from '~/components/Speech';
import Sprite from '~/components/Sprite';
import SpriteObject from '~/components/SpriteObject';
import Cow from '~/entities/cow';
import Player from '~/entities/player';
import AudioSystem from '~/systems/AudioSystem';
import BulletSystem from '~/systems/BulletSystem';
import CameraSystem from '~/systems/CameraSystem';
import ControlSystem from '~/systems/ControlSystem';
import DamageSystem from '~/systems/DamageSystem';
import DrawSystem from '~/systems/DrawSystem';
import MoveSystem from '~/systems/MoveSystem';
import SpeechSystem from '~/systems/SpeechSystem';
import { generateGraphics } from '~/utils';

export default class WorldScene extends Phaser.Scene {
  world: World;

  preload() {
    this.load.image('background', 'assets/tiles/background.png');
  }

  init() {
    generateGraphics(this);
  }

  create() {
    this.world = new World();

    this.world.registerComponent(Position);
    this.world.registerComponent(Move);
    this.world.registerComponent(Controllable);
    this.world.registerComponent(Collider);
    this.world.registerComponent(CollidesWith);
    this.world.registerComponent(Sprite);
    this.world.registerComponent(SpriteObject);
    this.world.registerComponent(Bullet);
    this.world.registerComponent(Health);
    this.world.registerComponent(Damage);
    this.world.registerComponent(CameraTarget);
    this.world.registerComponent(Speaker);
    this.world.registerComponent(Speech);
    this.world.registerComponent(Sound);

    this.world.registerSystem(ControlSystem(this));
    this.world.registerSystem(MoveSystem);
    this.world.registerSystem(BulletSystem);
    this.world.registerSystem(DamageSystem);
    this.world.registerSystem(SpeechSystem);
    this.world.registerSystem(AudioSystem(this));
    this.world.registerSystem(CameraSystem(this));
    this.world.registerSystem(DrawSystem(this));

    const player = this.world.createEntity();
    player.addComponent<Position>(Position, { x: 100, y: 200 });

    Player(player);

    const cow = this.world.createEntity();
    cow.addComponent<Position>(Position, { x: 300, y: 400 });

    Cow(cow);
  }

  update(time: number, delta: number) {
    // NOTE: Phaser time is in ms, more intuitive to think in seconds
    this.world.execute(delta / 1000, time / 1000);
  }
}
