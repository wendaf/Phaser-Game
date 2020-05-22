export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {}

    init() {
        this.score = 0;
        this.life = 100;
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

        this.goalCoord = this.map.findObject("Objects", obj => obj.name === "Goal");
        this.goal = this.add.image(this.goalCoord.x, this.goalCoord.y, 'goal');
        this.physics.add.existing(this.goal);
        this.physics.add.collider(this.groundLayer, this.goal);

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // create the player sprite
        this.spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
        this.player = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y, 'player');
        this.player.setBounce(0.1); // our player will bounce from items
        this.player.setCollideWorldBounds(true); // don't go out of the map

        // small fix to our player images, we resize the physics body object slightly
        this.player.body.setSize(this.player.width, this.player.height - 8);

        this.physics.add.collider(this.groundLayer, this.player);

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

        // Enemy 2
        this.spawnEnemy2 = this.map.findObject("Objects", obj => obj.name === "Enemy 2");
        this.enemy2 = this.physics.add.sprite(this.spawnEnemy2.x, this.spawnEnemy2.y, 'enemy2');
        this.enemy2.setCollideWorldBounds(true);
        this.enemy2.setOrigin(0.5, 1);
        this.enemy2.setScale(1);
        this.enemy2.body.setSize(this.width - 40, this.height - 20)
        this.physics.add.collider(this.groundLayer, this.enemy2);
        this.enemy2X = this.map.findObject("Objects", obj => obj.name === "Limit 1_1");
        this.tweens.add({
            targets: this.enemy2,
            props: {
                x: this.enemy2X.x,
            },
            duration: 5000,
            autoStart: true,
            delay: 0,
            repeat: -1,
            yoyo: true,
            flipX: true,
        });
        this.anims.create({
            key: 'walk_enemie2',
            frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1,
        });
        this.enemy2.anims.play('walk_enemie2', true); // play walk animation

        // Enemy 3
        this.spawnEnemy3 = this.map.findObject("Objects", obj => obj.name === "Enemy 3");
        this.enemy3 = this.physics.add.sprite(this.spawnEnemy3.x, this.spawnEnemy3.y, 'enemy3');
        this.enemy3.setCollideWorldBounds(true);
        this.enemy3.setOrigin(0.5, 1);
        this.enemy3.setScale(1);
        this.enemy3.body.setSize(80, 135);
        this.physics.add.collider(this.groundLayer, this.enemy3);
        this.enemy3X = this.map.findObject("Objects", obj => obj.name === "Limit 1_2");
        this.tweens.add({
            targets: this.enemy3,
            props: {
                x: this.enemy3X.x,
            },
            duration: 5000,
            autoStart: true,
            delay: 0,
            repeat: -1,
            yoyo: true,
            flipX: true,
        });
        this.anims.create({
            key: 'fly_enemie3',
            frames: this.anims.generateFrameNumbers('enemy3', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1,
        });
        this.enemy3.anims.play('fly_enemie3', true); // play walk animation

        this.coinLayer.setTileIndexCallback(17, this.collectCoin, this);
        // when the player overlaps with a tile with index 17, collectCoin
        // will be called
        this.physics.add.overlap(this.player, this.coinLayer);

        this.cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#b3b3e0');

        this.camera = this.cameras.add(10, 5, 200, 100).setZoom(1 / 6).setName('mini').setBackgroundColor("#ccccff").setAlpha(0.75);

        // this text will show the score
        this.scoreText = this.add.text(20, 570, 'SCORE: ' + this.score, {
            fontSize: '22px',
            fill: '#ffffff'
        });
        // fix the text to the camera
        this.scoreText.setScrollFactor(0);

        // this text will show the life
        this.lifeText = this.add.text(20, 540, 'VIES: ' + this.life+ ' %', {
            fontSize: '22px',
            fill: '#ffffff'
        });
        // fix the text to the camera
        this.lifeText.setScrollFactor(0);

        this.button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
        this.button.setScrollFactor(0);
        this.button.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
                this.button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
                this.button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);

        this.ESCKey = this.input.keyboard.addKey('ESC');
        this.ESCKey.on('down', function () {
            this.isPaused = this.scene.isPaused('GameScene');
            if (false === this.isPaused) {
                this.cursors.left.reset();
                this.cursors.right.reset();
                this.cursors.up.reset();
                this.cursors.down.reset();
                this.scene.pause();
                this.scene.launch('MenuScene');
            }
        }, this);

    }

    // this function will be called when the player touches a coin
    collectCoin(sprite, tile) {
        if(this.model.soundOn === true)
        {
            this.coinS = this.sound.add('coin', { volume: 1.0, loop: false });
            this.coinS.play();
        }
        this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        this.score++// add 10 points to the score
        this.scoreText.setText('SCORE: ' + this.score); // set the text to show the current score
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
        if (this.cursors.up.isDown && this.player.body.onFloor() || this.cursors.space.isDown && this.player.body.onFloor()) {

            this.player.body.setVelocityY(-500);
        }
        this.camera.scrollX = this.player.x;
        this.camera.scrollY = this.player.y;

        this.physics.collide(this.player, this.enemy1, this.lifeReduce, false, this);

        this.physics.collide(this.player, this.enemy2, this.lifeReduce, false, this);

        this.physics.collide(this.player, this.enemy3, this.lifeReduce, false, this);

        this.physics.collide(this.player, this.goal, this.finish, false, this);

        if (this.life === 0) {
            this.end();
        }

    }

    lifeReduce() {
        this.life -= 25;
        this.lifeText.setText('VIES: ' + this.life+ ' %');
        this.cameras.main.shake(500, 0.025);

        if (this.player.x >= this.enemy1.x || this.player.x >= this.enemy2.x) {
            this.player.x += 75;
        } else {
            this.player.x -= 75;
        }
        if(this.model.soundOn === true)
        {
            this.lifeLostS = this.sound.add('lifeLost', { volume: 1.0, loop: false });
            this.lifeLostS.play();
        }
    }

    finish() {
        this.scene.start("WinScene");
    }

    end() {
        this.scene.start('EndScene');
    }

}