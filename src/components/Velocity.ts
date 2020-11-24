import { Component, ComponentSchema, Types } from 'ecsy';

export default class Velocity extends Component<void> {
  speed: number;
  direction: number;

  static schema: ComponentSchema = {
    speed: { type: Types.Number },
    direction: { type: Types.Number },
  };
}
