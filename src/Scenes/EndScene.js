export default class EndScene extends Phaser.Scene {

    constructor() {
        super("EndScene");
    }

    create() {

        const text = 'Game Over';

        const startText = this.add.text(100, 100, text);

        // Add go back button to title screen
        const backText = this.add.text(100, 500, 'Go Back');
        backText.setInteractive({ useHandCursor: true });
        backText.on('pointerdown', () => this.backButton());

    }

    backButton() {
        this.scene.start('TitleScene');
    }

}