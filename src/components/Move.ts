import { Component, ComponentSchema, Types } from 'ecsy';

export default class Move extends Component<void> {
  x: number;
  y: number;
  speed: number;

  static schema: ComponentSchema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
    speed: { type: Types.Number, default: 0 },
  };
}
