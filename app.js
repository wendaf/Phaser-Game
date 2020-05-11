import TitleScene from './script/titleScene.js';
import GameScene from './script/gameScene.js';
import PreloadScene from './script/preloadScene.js';

// Our game scene
const gameScene = new GameScene();
const titleScene = new TitleScene();
const preloadScene = new PreloadScene();


// We no longer add the scene to the config
const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	autoCenter: Phaser.Scale.CENTER_BOTH,
	input: {
		gamepad: true
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 300}
		}
	},
};

// Our game Object
const game = new Phaser.Game(config);

// load scenes
game.scene.add('preloadScene', preloadScene);
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start('preloadScene');