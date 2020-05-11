import config from '/src/Config/config.js';
import Button from '/src/Objects/Button.js';

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("TitleScene");
    }

    preload() {

    }

    create() {
        // Game
        this.gameButton = new Button(this, config.width/2, config.height/2 - 150, 'blueButton1', 'blueButton2', 'Play', 'GameScene');

        // Options
        this.optionsButton = new Button(this, config.width/2, config.height/2 - 50, 'blueButton1', 'blueButton2', 'Options', 'OptionsScene');

        // Instruction
        this.optionsButton = new Button(this, config.width/2, config.height/2 + 50, 'blueButton1', 'blueButton2', 'Rules', 'InstructionScene');

        // Credits
        this.creditsButton = new Button(this, config.width/2, config.height/2 + 150, 'blueButton1', 'blueButton2', 'Credits', 'CreditsScene');

        this.model = this.sys.game.globals.model;
        if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.model.bgMusicPlaying = true;
            this.sys.game.globals.bgMusic = this.bgMusic;
        }
    }

    centerButton (gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
            gameObject,
            this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
        );
    }

    centerButtonText (gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

}