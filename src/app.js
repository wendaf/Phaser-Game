import config from '/src/Config/config.js';
import BootScene from '/src/Scenes/BootScene.js';
import PreloadScene from '/src/Scenes/PreloadScene.js';
import TitleScene from '/src/Scenes/TitleScene.js';
import InstructionScene from '/src/Scenes/InstructionScene.js';
import OptionsScene from '/src/Scenes/OptionsScene.js';
import GameScene from '/src/Scenes/GameScene.js';
import EndScene from '/src/Scenes/EndScene.js';
import Model from '/src/Model.js';
import Credits from "/src/Scenes/CreditsScene.js";


// Our scene
const bootScene = new BootScene();
const preloadScene = new PreloadScene();
const titleScene = new TitleScene();
const instructionScene = new InstructionScene();
const optionsScene = new OptionsScene();
const gameScene = new GameScene();
const endScene = new EndScene();
const model = new Model();
const credits = new Credits();

// Our game Object
const game = new Phaser.Game(config);


game.globals = { model, bgMusic: null };

// load scenes
game.scene.add('BootScene', bootScene);
game.scene.add('PreloadScene', preloadScene);
game.scene.add('TitleScene', titleScene);
game.scene.add('InstructionScene', instructionScene);
game.scene.add('OptionsScene', optionsScene);
game.scene.add("GameScene", gameScene);
game.scene.add("EndScene", endScene);
game.scene.add("CreditsScene", credits);

// start title
game.scene.start('BootScene');