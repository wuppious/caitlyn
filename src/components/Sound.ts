import { Component, ComponentSchema, Types } from 'ecsy';

export default class Sound extends Component<void> {
  audio_obj?: Phaser.Sound.BaseSound;
  description: string;
  volume: number;

  static schema: ComponentSchema = {
    audio_obj: { type: Types.Ref },
    description: { type: Types.String, default: 'No audio description' },
    volume: { type: Types.Number, default: 0 },
  };
}
