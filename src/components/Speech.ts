import { Component, ComponentSchema, Types } from 'ecsy';

export default class Speech extends Component<void> {
  text: string;
  timeout?: number;
  bubbleIndex: number;

  static schema: ComponentSchema = {
    text: { type: Types.String, default: '' },
    timeout: { type: Types.Number, default: undefined },
    bubbleIndex: { type: Types.Number },
  };
}
