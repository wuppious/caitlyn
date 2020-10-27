import Phaser from 'phaser';
import './index.css';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game-root',
    mode: Phaser.Scale.ENVELOP,
  },
};

const game = new Phaser.Game(config);
