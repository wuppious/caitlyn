import { Component, ComponentSchema, Types } from 'ecsy';

export default class Speaker extends Component<void> {
  lines: string[];
  hurtLines: string[];
  timeout: number;

  static schema: ComponentSchema = {
    lines: { type: Types.Array },
    hurtLines: { type: Types.Array },
    timeout: { type: Types.Number, default: 0 },
  };
}
