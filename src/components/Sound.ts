import { Component, ComponentSchema, Types } from 'ecsy';
import { Howl } from 'howler';
export default class Sound extends Component<void> {
  audio_id?: number;
  audio_obj: Howl;
  description: string;
  volume: number;
  pitch: number;

  static schema: ComponentSchema = {
    audio_id: { type: Types.Number },
    audio_obj: { type: Types.Ref },
    description: { type: Types.String, default: 'No audio description' },
    volume: { type: Types.Number, default: 0 },
    pitch: { type: Types.Number, default: 1 },
  };
}
