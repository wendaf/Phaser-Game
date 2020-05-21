import Button from "../Objects/Button.js";
import config from "../Config/config.js";

export default class EndScene extends Phaser.Scene {

    constructor() {
        super("EndScene");
    }

    create() {

        this.text = this.add.text(300, 100, 'GAME OVER', { fontSize: 40 });

        this.model = this.sys.game.globals.model;
        if(this.model.soundOn === true)
        {
            this.sys.game.globals.bgMusic.stop();
            this.gameOverS = this.sound.add('gameOver', { volume: 1.5, loop: false });
            this.gameOverS.play();
        }
        // Game
        this.gameButton = new Button(this, config.width/2, config.height/2 - 50, 'blueButton1', 'blueButton2', 'Replay', 'GameScene');
        // main menu
        this.MainButton = new Button(this, config.width/2, config.height/2 + 50, 'blueButton1', 'blueButton2', 'Main menu', 'TitleScene');

    }
}