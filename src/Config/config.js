export default {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#004d60',
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
            gravity: {y: 300}
        }
    },
};