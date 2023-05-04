import Phaser from 'phaser';

import './index.css';
import WorldScene from './scenes/WorldScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-root',
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  audio: {
    noAudio: true,
  },
  scene: WorldScene,
  fps: {
    min: 30,
    target: 60,
  },
};

const game = new Phaser.Game(config);
