import Button from "../Objects/Button.js";
import config from "../Config/config.js";

export default class InstructionScene extends Phaser.Scene {

    constructor() {
        super("InstructionScene");
    }

    preload() {

    }

    create() {
        this.text = this.add.text(300, 100, 'Instructions', { fontSize: 40 });

        const text = 'Lorem ipsum dolor sit amet, \n' +
            'consectetur adipiscing elit,\n' +
            'sed do eiusmod tempor incididunt ut labore \n' +
            'et dolore magna aliqua. \n' +
            'fugiat nulla pariatur.';

        this.startText = this.add.text(250, 190 , text, { fontSize: 20 });


        // Add go back button to title screen
        this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');

    }

    backButton() {
        this.scene.start('TitleScene');
    }

}