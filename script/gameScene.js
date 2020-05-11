class GameScene extends Phaser.Scene {

    constructor() {
        super({key : 'gameScene'});
    }

    init() {

    };

    preload() {
        this.load.on('progress', function (value) {
            console.log(value);
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        this.load.on('complete', function () {
            console.log('complete');
        });
    }

    create() {


    }

    update() {

    }


    end() {

    }

}

export default GameScene;