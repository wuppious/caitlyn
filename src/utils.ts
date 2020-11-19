export function generateGraphics(scene: Phaser.Scene) {
  const player = new Phaser.GameObjects.Graphics(scene);
  player.fillStyle(0x0000ff);
  player.fillCircle(20, 20, 20);
  player.generateTexture('player', 40, 40);

  const npc1 = new Phaser.GameObjects.Graphics(scene);
  npc1.fillStyle(0x00ff00);
  npc1.fillCircle(20, 20, 20);
  npc1.generateTexture('npc1', 40, 40);

  const cow = new Phaser.GameObjects.Graphics(scene);
  cow.fillStyle(0xffffff);
  cow.fillCircle(20, 20, 20);
  cow.fillStyle(0x333333);
  for (let i = 0; i < 15; i++) {
    const size = Math.max(Math.random() * 8, 4);
    const dist = Math.random() * (20 - size);
    const ang = Math.random() * Math.PI * 2;

    cow.fillCircle(20 + Math.cos(ang) * dist, 20 + Math.sin(ang) * dist, size);
  }
  cow.generateTexture('cow', 40, 40);

  const bullet = new Phaser.GameObjects.Graphics(scene);
  bullet.fillStyle(0xffff00);
  bullet.fillCircle(4, 4, 4);
  bullet.generateTexture('bullet', 8, 8);
}

interface Point {
  x: number;
  y: number;
}

export function distance2d(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
