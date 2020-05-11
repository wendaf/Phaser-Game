class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:'titleScene'});
    }

    preload() {
    }

    create() {
        const bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0,0);

        const text = this.add.text(400, 300, 'Welcome to my game!');
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickButton());
        PhaserGUIAction(this);
    }
    clickButton() {
        this.scene.switch('gameScene');
    }

}

export default TitleScene;