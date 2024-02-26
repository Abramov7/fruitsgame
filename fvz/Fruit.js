class Fruit extends Phaser.GameObjects.Sprite{
    constructor(scene, fruit_sprite, x, y, hp){
        super(scene, x, y, fruit_sprite)
        this.hp = hp;
        scene.add.existing(this);
        scene.fruits.add(this);
        scene.physics.world.enableBody(this);
        this.body.setImmovable(true)
        this.play(fruit_sprite)
        
        //separate
        
    }

    Die() {
        if (this.timer != null) {
            this.timer.remove()
        }
        this.destroy()
    }

    
}
