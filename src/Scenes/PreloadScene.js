export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        // add logo image
        this.logo = this.add.image(400, 140, 'logo');
        this.logo.setScale(0.7);

        // display progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

        // Any Assets you want to load in
        this.load.image('blueButton1', 'assets/ui/blue_button02.png');
        this.load.image('blueButton2', 'assets/ui/blue_button03.png');
        this.load.image('phaserLogo', 'assets/logo.png');
        this.load.image('box', 'assets/ui/grey_box.png');
        this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
        this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
        this.load.audio('bgMusic', ['assets/audio/music.mp3']);
        // audio game
        this.load.audio('gameMusic', ['assets/audio/game.mp3']);
        this.load.audio('lifeLost', ['assets/audio/life-lost.mp3']);
        this.load.audio('gameOver', ['assets/audio/game-over.mp3']);
        this.load.audio('coin', ['assets/audio/coin.mp3']);
        this.load.audio('win', ['assets/audio/win.mp3']);
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'assets/game/map.json');
        // tiles in spritesheet
        this.load.spritesheet('tiles', 'assets/game/tiles.png', {frameWidth: 70, frameHeight: 70});
        // simple coin image
        this.load.image('coin', 'assets/game/coinGold.png');
        // background image
        this.load.image('background', 'assets/background.png');
        // player animations
        this.load.atlas('player', 'assets/game/player.png', 'assets/game/player.json');
        // enemy 1
        this.load.spritesheet("enemy1", 'assets/game/enemy1/slime.png', {frameWidth: 32, frameHeight: 32});
        // enemy 2
        this.load.spritesheet("enemy2", 'assets/game/enemy2/slime.png', {frameWidth: 112, frameHeight: 68});
        // enemy 3
        this.load.spritesheet("enemy3", 'assets/game/enemy3/bee.png', {frameWidth: 128, frameHeight: 100});
        // goal
        this.load.image("goal", 'assets/game/goal.png');
    }

    ready() {
        this.scene.start('TitleScene');
    }

}