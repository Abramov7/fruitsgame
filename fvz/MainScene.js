class MainScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    selectedTile;
    scoreText;
    score = 0;
    sunTime = 3200;
    fruitTiles = [];
    currentFruit = 'bad_apple'

    create() {
        //Потом как то поменять
        this.input.keyboard.on('keydown-ONE', event => {
            this.currentFruit = 'bad_apple'
        })
        this.input.keyboard.on('keydown-TWO', event => {
            this.currentFruit = 'strawberry'
        })
        this.input.keyboard.on('keydown-THREE', event => {
            this.currentFruit = 'pineapple'
        })

        this.map = this.make.tilemap( {tileWidth: 16, tileHeight: 16, width: 16, height: 16});
        const tiles = this.map.addTilesetImage('tile');
        const layer = this.map.createBlankLayer('layer1', tiles);

        this.fruits = this.add.group();
        this.veggies = this.add.group();
        this.projectiles = this.add.group();
        
        this.anims.create({
            key: "bad_apple",
            frames: this.anims.generateFrameNumbers("bad_apple"),
            frameRate: 2,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: "strawberry",
            frames: this.anims.generateFrameNumbers("strawberry"),
            frameRate: 2,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: "pineapple",
            frames: this.anims.generateFrameNumbers("pineapple"),
            frameRate: 2,
            repeat: -1,
            yoyo: true
        })

        layer.fill(0, 0, 0, 4, 6)

        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight)
        this.selectedTile = this.map.getTileAt(2, 3);

        this.input.on('pointerdown', function(pointer){
            const pointerTileX = this.map.worldToTileX(pointer.x);
            const pointerTileY = this.map.worldToTileY(pointer.y);
            this.spawnFruit(this.currentFruit, this.map.tileToWorldX(pointerTileX), this.map.tileToWorldY(pointerTileY))
        }, this);


        this.timer = this.time.addEvent({
            delay: 2800,
            callback: this.spawnVeggie,
            callbackScope: this,
            loop: true
        })

        this.timer1 = this.time.addEvent({
            delay: Phaser.Math.Between(3200, 8400),
            callback: this.spawnSun,
            callbackScope: this,
            loop: false
        })

        this.physics.add.collider(this.projectiles, this.veggies, function(projectile, veggie) {
            projectile.destroy();
            //Костыль, как то исправить
            // veggie.body.velocity.x = -6
            //
            veggie.hp == 0 ? veggie.destroy() : veggie.hp -= 1
            console.log(veggie.hp)
            
        });

        this.physics.add.collider(this.fruits, this.veggies, function(fruit, veggie) {
            fruit.hp == 0 ? fruit.Die() : fruit.hp -= 1
        })

        this.scoreText = this.add.text(10, 100, 'SUN: 0', { fontSize: '24px', fill: 'white'});
        
    }

    spawnFruit(fruit_type, x, y){
        if (this.score >= 100 && !this.fruitTiles.includes(this.map.worldToTileX(x).toString()+this.map.worldToTileY(y).toString())){
            switch(fruit_type){
                case 'bad_apple':
                    var fruit = new BadApple(this, fruit_type, x+8, y+8, 10)
                    break;
                case 'strawberry':
                    var fruit = new Strawberry(this, fruit_type, x+8, y+8, 13)
                    break;
                case 'pineapple':
                    var fruit = new Pineapple(this, fruit_type, x+8, y+8, 28)
                    break;
            }
            
            this.score -= 100
            this.scoreText.setText('SUN: '+this.score)
            this.fruitTiles.push(this.map.worldToTileX(x).toString()+this.map.worldToTileY(y).toString())
        }
        
    }

    spawnVeggie(){
        var veggie = new Veggie(this, config.width, Phaser.Math.Between(0, config.height-20), 7)
    }

    spawnSun(){
        var sun = new Sun(this, Phaser.Math.Between(0, config.width), 0)
        this.timer1 = this.time.addEvent({
            delay: Phaser.Math.Between(3200, 8400),
            callback: this.spawnSun,
            callbackScope: this,
            loop: false
        })
    }

    update (time, delta)
    {   
        const p = this.input.activePointer;
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        const pointerTileX = this.map.worldToTileX(worldPoint.x);
        const pointerTileY = this.map.worldToTileY(worldPoint.y);

        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

        for(var i=0; i < this.projectiles.getChildren().length; i++){
            var b = this.projectiles.getChildren()[i];
            b.update();
        }

    }

}