import { Component, ComponentSchema, Types } from 'ecsy';

export default class Decay extends Component<void> {
  timer = 0;

  static schema: ComponentSchema = {
    timer: { type: Types.Number, default: 0 },
  };
}
