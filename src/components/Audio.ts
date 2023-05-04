import { Component, ComponentSchema, Types } from 'ecsy';
import { Howl } from 'howler';

export default class Audio extends Component<void> {
  id?: number;
  obj: Howl;
  description: string;
  volume: number;
  pitch: number;
  loop: boolean;

  static schema: ComponentSchema = {
    id: { type: Types.Number },
    obj: { type: Types.Ref },
    description: { type: Types.String, default: 'No audio description' },
    volume: { type: Types.Number, default: 0 },
    pitch: { type: Types.Number, default: 1 },
    loop: { type: Types.Boolean, default: false },
  };
}
