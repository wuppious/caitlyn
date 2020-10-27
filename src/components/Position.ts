import { Component, ComponentSchema, Types } from 'ecsy';

export default class Position extends Component<void> {
  x: number;
  y: number;

  static schema: ComponentSchema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
  };
}
