import { ComponentSchema, SystemStateComponent, Types } from 'ecsy';

export default class SpriteObject extends SystemStateComponent<void> {
  sprite_obj: Phaser.GameObjects.Sprite | undefined;

  static schema: ComponentSchema = {
    sprite_obj: { type: Types.Ref, default: undefined },
  };
}
