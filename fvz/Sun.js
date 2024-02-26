class Sun extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'sun')
        scene.add.existing(this);
        this.setInteractive({ useHandCursor: true})
        // scene.suns.add(this);
        // this.speed = 50;
        // scene.physics.world.enableBody(this);
        // this.body.velocity.y = this.speed;
        this.on('pointerdown', function(pointer){
            this.scene.score += 100;
            this.scene.scoreText.setText('SUN: '+this.scene.score)
            this.destroy();
        }, this)

        this.scene.tweens.add({
            targets: this,
            y: Phaser.Math.Between(0, config.height)
        });
    }
}