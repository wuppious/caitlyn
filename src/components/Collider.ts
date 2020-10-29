import { Component, ComponentSchema, Types } from 'ecsy';

export default class Collider extends Component<void> {
  // For now all colliders can be circles
  radius: number;

  static schema: ComponentSchema = {
    radius: { type: Types.Number, default: 0 },
  };
}
