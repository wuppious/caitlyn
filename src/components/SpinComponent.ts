import { Component, ComponentSchema, Types } from 'ecsy';
import { Vector3 } from 'three';

export default class SpinComponent extends Component<void> {
  vec?: Vector3;
  speed?: number;

  static schema: ComponentSchema = {
    vec: { type: Types.Ref },
    speed: { type: Types.Number, default: 0 },
  };
}
