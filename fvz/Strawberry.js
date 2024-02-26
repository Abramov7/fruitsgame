class Strawberry extends Fruit{
    constructor(scene, fruit_sprite, x, y, hp){
        super(scene, fruit_sprite, x, y, hp)

        this.timer = scene.time.addEvent({
            delay: 12000,
            callback: this.spawnSun,
            callbackScope: this,
            loop: true
        })
    }

    spawnSun(){
        var sun = new Sun(this.scene, this.x, this.y)
    }
}