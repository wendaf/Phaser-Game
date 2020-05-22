import Button from "../Objects/Button.js";
import config from "../Config/config.js";

export default class InstructionScene extends Phaser.Scene {

    constructor() {
        super("InstructionScene");
    }

    create() {
        this.text = this.add.text(260, 100, 'Instructions', { fontSize: 40 });

        const text = 'Récupérer un maximum de pièces tout en \n' +
            'atteignant la porte située à la \n' +
            'fin de la carte sans se faire tuer \n' +
            'par les ennemies.';

        this.startText = this.add.text(250, 190, text, { fontSize: 20 });

        // Add go back button to title screen
        this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');

    }

    backButton() {
        this.scene.start('TitleScene');
    }

}