import { Component, ComponentSchema, Types } from 'ecsy';
import { Vector3 } from 'three';

export default class Vector3Component extends Component<void> {
  value: Vector3;
  static schema: ComponentSchema = {
    value: { type: Types.Ref, default: new Vector3() },
  };
}
