class BadApple extends Fruit{
    constructor(scene, fruit_sprite, x, y, hp){
        super(scene, fruit_sprite, x, y, hp)

        this.preFX.setPadding(16);
        this.barrel = this.preFX.addBarrel(1);
        
        this.timer = scene.time.addEvent({
            delay: 3250,
            callback: this.Shoot,
            callbackScope: this,
            loop: true
        })
    }

    Shoot(){
        var bullet = new Projectile(this.scene, this)
        
        this.scene.add.tween({
            targets: this.barrel,
            amount: 1.2,
            yoyo: true,
            duration: 180
        })
    }
}