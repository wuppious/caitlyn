import { Component, ComponentSchema, Types } from 'ecsy';

export default class Health extends Component<void> {
  points: number;
  max: number;

  static schema: ComponentSchema = {
    points: { type: Types.Number, default: -1 },
    max: { type: Types.Number, default: -1 },
  };
}
