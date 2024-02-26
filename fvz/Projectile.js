class Projectile extends Phaser.GameObjects.Sprite{
    constructor(scene, origin, speed){
        super(scene, origin.x, origin.y, 'projectile')
        this.speed = 100;
        scene.add.existing(this);
        scene.projectiles.add(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.x = this.speed;
        this.setScale(0.5)
        // scene.fruits.add(this);
    }

    update(){
        if (this.x > 250) {
            console.log('im out!')
            this.destroy();
        }
    }
}