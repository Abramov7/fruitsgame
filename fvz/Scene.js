

class Scene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    

    preload(){
        this.load.spritesheet("bad_apple", "images/bad_apple.png", {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.spritesheet("strawberry", "images/strawberry.png", {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.spritesheet("pineapple", "images/pineapple.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        
        this.load.image("tile", "images/tile.png")
        this.load.image("projectile", "images/projectile.png")
        this.load.image('veggie', "images/veggie.png")
        this.load.image('sun', 'images/sun.png')
    }

    create(){
        this.scene.start("playGame");
    }

}