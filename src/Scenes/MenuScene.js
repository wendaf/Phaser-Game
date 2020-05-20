import config from '/src/Config/config.js';
import Button from '/src/Objects/Button.js';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {
        // Resume
        this.resumeButton = new Button(this, config.width/2, config.height/2 - 50, 'blueButton1', 'blueButton2', 'Resume', 'GameScene');

        // Title
        this.menuButton = new Button(this, config.width/2, config.height/2 + 50, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');

        this.ESCKey = this.input.keyboard.addKey('ESC');
        this.ESCKey.on('down',  function () {
            console.log("ESC pressed");
            this.isPaused = this.scene.isPaused('GameScene');
            if (true === this.isPaused) {
                this.scene.stop();
                this.scene.resume("GameScene");
            }
        }, this);
    }
}