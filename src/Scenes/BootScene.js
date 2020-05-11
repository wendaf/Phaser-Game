export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
    }

    create() {
        this.scene.start("PreloadScene");
        PhaserGUIAction(this);
    }

}