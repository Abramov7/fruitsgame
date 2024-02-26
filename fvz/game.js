var config = {
    width: 250,
    height: 120,
    backgorundColor: 0x000000,
    scene: [Scene, MainScene],
    pixelArt: true,
    zoom: 4,
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}

var game = new Phaser.Game(config);