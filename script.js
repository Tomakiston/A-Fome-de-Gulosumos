let player, playerWalking;
let ground, groundImage;
let tree, treeImage;
let cake, cakeImage, cakeGroup;
let enemy1, enemy2, enemy3, enemyGroup;

function preload() {
    playerWalking = loadAnimation("./assets/walking1.png", "./assets/walking2.png");
    groundImage = loadImage("./assets/ground.png");
    treeImage = loadImage("./assets/tree.png");
    cakeImage = loadImage("./assets/cake.png");
    enemy1 = loadImage("./assets/evilCandy1.png");
    enemy2 = loadImage("./assets/evilCandy2.png");
    enemy3 = loadImage("./assets/evilCandy2.png");
}

function setup() {
    createCanvas(1200,400);

    ground = createSprite(600, 385)
    ground.addImage("ground", groundImage);
    ground.scale = 1.5;

    player = createSprite(150, 313);
    player.addAnimation("walking", playerWalking);
    player.scale = 1.5;

    enemyGroup = new Group();
    cakeGroup = new Group();
}   

function draw() {
    background("#34e3af");

    if(keyDown("space") && player.y >= 100) {
        player.velocityY = -12;
    } 
    player.velocityY += 0.8;
    player.collide(ground);

    spawnTrees();
    spawnCakes();
    spawnEnemies();

    drawSprites();
}

function spawnTrees() {
    let randomNumber = Math.floor(Math.random()*120) + 10;

    if(frameCount%randomNumber === 0) {
        tree = createSprite(1250, 324);
        tree.addImage("tree", treeImage);
        tree.scale = 1.5;
        tree.velocityX = -6;
        tree.depth = player.depth;
        player.depth++;

        tree.lifetime = 250;
    }
}

function spawnCakes() {
    let randomNumber = Math.floor(Math.random()* 200) + 50;
    let randomNumber2 = Math.floor(Math.random()* 240) + 150;

    if(frameCount%randomNumber === 0) {
        cake = createSprite(1250, randomNumber2);
        cake.addImage("cake", cakeImage);
        cake.scale = 1.5;
        cake.velocityX = -7;
        cake.lifetime = 200;

        if(cake.y < 240 || cake.y > 350) {
            cake.destroy();
        }

        cakeGroup.add(cake);
    }
}

function spawnEnemies() {
    let rand = Math.floor(Math.random()* 200) + 100;

    if(frameCount%rand === 0) {
        var enemy = createSprite(1250, 339);
        enemy.velocityX = -7;
        let randomNumber = Math.round(random(1, 3));
        switch(randomNumber) {
            case 1: enemy.addImage(enemy1);
                    break;
            case 2: enemy.addImage(enemy2);
                    break;
            case 3: enemy.addImage(enemy3);
                    break;
            default: break;
        }
        enemy.scale = 1.5;
        enemy.lifetime = 200;

        enemyGroup.add(enemy);
    }
}