import { Component, ComponentSchema, Types } from 'ecsy';

export default class Damage extends Component<void> {
  points: number;

  static schema: ComponentSchema = {
    points: { type: Types.Number, default: 0 },
  };
}
