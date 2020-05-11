import config from '../Config/config.js';

export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('CreditsScene');
  }

  create () {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#ffffff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Charles et Julien', { fontSize: '26px', fill: '#fff' });
    this.legalText = this.add.text(0, 0, 'Copyright tous droits reserver', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
        this.legalText,
        this.zone
    );

    this.madeByText.setY(1000);
    this.legalText.setY(1500);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.legalTween = this.tweens.add({
      targets: this.legalText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 2000,
      onComplete: function () {
        this.legalTween.destroy;
        this.scene.start('TitleScene');
      }.bind(this)
    });
  }
};