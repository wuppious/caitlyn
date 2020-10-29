import { Component, ComponentSchema, Entity, Types } from 'ecsy';

export default class CollidesWith extends Component<void> {
  targets: Entity[];

  static schema: ComponentSchema = {
    targets: { type: Types.Array },
  };
}
