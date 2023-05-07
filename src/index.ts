import { Clock, WebGLRenderer } from 'three';
import './index.css';
import WorldScene from './scenes/3DWorldScene';

const appNode = document.getElementById('game-root');
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
appNode.appendChild(renderer.domElement);

const worldScene = new WorldScene(renderer);
const clock = new Clock();

function animate() {
  requestAnimationFrame(animate);
  worldScene.update(clock.getDelta(), clock.getElapsedTime());
}

animate();
