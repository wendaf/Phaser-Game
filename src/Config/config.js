export default {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#004d60',
    title: 'My game',
    version: '0.1a',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        gamepad: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: {y: 575},
            gravity: {y: 10},
            debug: true
        }
    },
};