import { Component, ComponentSchema, Types } from 'ecsy';
import { Mesh } from 'three';

export default class MeshComponent extends Component<void> {
  ref: Mesh;

  static schema: ComponentSchema = {
    ref: { type: Types.Ref, default: 0 },
  };
}
