class Veggie extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, hp){
        super(scene, x, y, 'veggie')
        scene.add.existing(this);
        scene.veggies.add(this);
        this.hp = hp;
        this.speed = 6.5;
        scene.physics.world.enableBody(this);
        this.body.velocity.x = -this.speed;
        this.body.setBounce(1, 0)
        this.body.setAcceleration(-this.speed*2, 0)
        this.body.setMaxVelocity(this.speed)
        

        this.scene.tweens.add({
            targets: this,
            angle: -30,
            repeat: -1,
            yoyo: true
        });
    }

    Die(){
        if (this.scene.eatTimer != null) {
            this.destroy()

        }
    }
}