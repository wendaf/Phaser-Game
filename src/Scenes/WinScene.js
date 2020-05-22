import Button from "../Objects/Button.js";
import config from "../Config/config.js";

export default class WinScene extends Phaser.Scene {

    constructor() {
        super("WinScene");
    }

    create() {

        this.text = this.add.text(300, 100, 'VICTORY', { fontSize: 40 });

        this.model = this.sys.game.globals.model;
        if(this.model.soundOn === true)
        {
            this.sys.game.globals.bgMusic.stop();
            this.winS = this.sound.add('win', { volume: 1.5, loop: false });
            this.winS.play();
        }
        // Restart
        this.gameButton = new Button(this, config.width/2, config.height/2 - 50, 'blueButton1', 'blueButton2', 'Restart', 'GameScene');
        // main menu
        this.MainButton = new Button(this, config.width/2, config.height/2 + 50, 'blueButton1', 'blueButton2', 'Main menu', 'TitleScene');

    }
}