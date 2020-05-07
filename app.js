const config = {
	type : Phaser.AUTO,
	width: 800,
	height: 600,
	input: {
		gamepad: true
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 300}
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
}


let game = new Phaser.Game(config);



function preload()
{

}

function create()
{
	PhaserGUIAction(this);
}

function update()
{

}