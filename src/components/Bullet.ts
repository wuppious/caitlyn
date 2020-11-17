import { ComponentSchema, Component, Types } from 'ecsy';

export default class Bullet extends Component<void> {
  damage: number;

  static schema: ComponentSchema = {
    damage: { type: Types.Number, default: 0 },
  };
}
