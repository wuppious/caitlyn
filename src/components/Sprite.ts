import { Component, ComponentSchema, Types } from 'ecsy';

export default class Sprite extends Component<void> {
  name: string;

  static schema: ComponentSchema = {
    name: { type: Types.String, default: '' },
  };
}
