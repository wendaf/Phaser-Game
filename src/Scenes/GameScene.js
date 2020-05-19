export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {
    }

    init() {
        this.score = 0;
        this.life = 5;
        this.sys.game.globals.bgMusic.stop();
        this.model = this.sys.game.globals.model;
        this.model.bgMusicPlaying = false;
        if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('gameMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.model.bgMusicPlaying = true;
            this.sys.game.globals.bgMusic = this.bgMusic;
        }
    }

    create() {

        // load the map
        this.map = this.make.tilemap({ key: 'map' });

        // tiles for the ground layer
        const groundTiles = this.map.addTilesetImage('tiles');
        // create the ground layer
        this.groundLayer = this.map.createDynamicLayer('World', groundTiles, 0, 0);
        // the player will collide with this layer
        this.groundLayer.setCollisionByExclusion([-1]);

        // coin image used as tileset
        const coinTiles = this.map.addTilesetImage('coin');
        // add coins as tiles
        this.coinLayer = this.map.createDynamicLayer('Coins', coinTiles, 0, 0);

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite
        this.spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
        this.player = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y, 'player');
        this.player.setBounce(0.2); // our player will bounce from items
        this.player.setCollideWorldBounds(true); // don't go out of the map

        // small fix to our player images, we resize the physics body object slightly
        this.player.body.setSize(this.player.width, this.player.height - 8);

        this.physics.add.collider(this.groundLayer, this.player);

        // Enemy 1
        this.spawnEnemy1 = this.map.findObject("Objects", obj => obj.name === "Enemy 1");
        this.enemy1 = this.physics.add.sprite(this.spawnEnemy1.x, this.spawnEnemy1.y, 'enemy1');
        this.enemy1.setCollideWorldBounds(true);
        this.enemy1.setScale(1.5);
        this.physics.add.collider(this.groundLayer, this.enemy1);
        this.enemy1X = this.map.findObject("Objects", obj => obj.name === "Limit 1_0");
        this.tweens.add({
            targets: this.enemy1,
            props: {
                x: this.enemy1X.x,
            },
            duration: 5000,
            autoStart: true,
            delay: 0,
            repeat: -1,
            yoyo: true,
            flipX: true,
        });
        this.anims.create({
            key: 'walk_enemie1',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });
        this.enemy1.anims.play('walk_enemie1', true); // play walk animation

        this.coinLayer.setTileIndexCallback(17, this.collectCoin, this);
        // when the player overlaps with a tile with index 17, collectCoin
        // will be called
        this.physics.add.overlap(this.player, this.coinLayer);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', { prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // idle with only one frame, so repeat is not neaded
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 'p1_stand' }],
            frameRate: 10,
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        // this text will show the score
        this.textS = this.add.text(20, 570, 'SCORE : '+this.score, {
            fontSize: '20px',
            fill: '#ffffff'
        });
        // fix the text to the camera
        this.textS.setScrollFactor(0);
        // this text will show the score
        this.textL = this.add.text(20, 540, 'VIES : '+this.life, {
            fontSize: '20px',
            fill: '#ffffff'
        });
        // fix the text to the camera
        this.textL.setScrollFactor(0);
    }

    // this function will be called when the player touches a coin
    collectCoin(sprite, tile) {
        this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        this.score++// add 10 points to the score
        this.textS.setText('SCORE : '+this.score); // set the text to show the current score
        return false;
    }

    update(time, delta) {
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200); // move left
            this.player.anims.play('walk', true); // play walk animation
            this.player.flipX = true; // flip the sprite to the left
        }
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200); // move right
            this.player.anims.play('walk', true); // play walk animatio
            this.player.flipX = false; // use the original sprite looking to the right
        } else {
            this.player.body.setVelocityX(0);
            this.player.anims.play('idle', true);
        }
        // jump
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-500);
        }
        this.physics.collide(this.player, this.enemy1, this.lifeReduce, false, this);
        if(this.life === 0 ) {
            this.end();
        }
    }
    lifeReduce()
    {
        this.life -= 1;
        this.textL.setText('VIES : '+this.life);
        if(this.player.x >= this.enemy1.x)
        {
            this.player.x +=75;
        }
        else
        {
            this.player.x -=75;
        }
    }


    end() {

        // Restart the scene
        this.registry.destroy();
        this.events.off();
        this.scene.restart();
    }

}