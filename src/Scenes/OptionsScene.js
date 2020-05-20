import Button from '/src/Objects/Button.js';

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('OptionsScene');
  }

  create () {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });

    this.musicButton = this.add.image(250, 250, 'checkedBox');
    this.musicText = this.add.text(300, 240, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(250, 350, 'checkedBox');
    this.soundText = this.add.text(300, 340, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', function () {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));

    new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'TitleScene');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.pause();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.resume();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
};
