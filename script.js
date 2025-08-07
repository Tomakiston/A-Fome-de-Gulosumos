let player, playerWalking, playerEating, playerCollided;
let ground, groundImage;
let tree, treeImage;
let cake, cakeImage, cakeGroup;
let enemy1, enemy2, enemy3, enemyGroup;

let cakeIcon, cakeIconImg;

let score = 0;
let lifes = 3;

let fullHeart, twoHeart, oneHeart, emptyHeart;
let fullHeartImg, twoHeartImg, oneHeartImg, emptyHeartImg;

const play = 1;
const end = 0;
let gameState = play;
let gameOver;

function preload() {
    playerWalking = loadAnimation("./assets/walking1.png", "./assets/walking2.png");
    playerEating = loadAnimation("./assets/eating.png");
    playerCollided = loadAnimation("./assets/collided.png");

    groundImage = loadImage("./assets/ground.png");
    treeImage = loadImage("./assets/tree.png");
    cakeImage = loadImage("./assets/cake.png");

    enemy1 = loadImage("./assets/evilCandy1.png");
    enemy2 = loadImage("./assets/evilCandy2.png");
    enemy3 = loadImage("./assets/evilCandy2.png");

    cakeIconImg = loadImage("./assets/cake.png");

    fullHeartImg = loadImage("./assets/fullHeart.png");
    twoHeartImg = loadImage("./assets/twoHeart.png");
    oneHeartImg = loadImage("./assets/oneHeart.png");
    emptyHeartImg = loadImage("./assets/emptyHeart.png");

    gameOver = loadImage("./assets/gameOver.png");
}

function setup() {
    createCanvas(1200,400);

    ground = createSprite(600, 385)
    ground.addImage("ground", groundImage);
    ground.scale = 1.5;

    player = createSprite(150, 313);
    player.addAnimation("walking", playerWalking);
    player.addAnimation("eating", playerEating);
    player.addAnimation("collided", playerCollided);
    player.scale = 1.5;

    cakeIcon = createSprite(1020, 40);
    cakeIcon.addImage("cakeIcon", cakeIconImg);
    cakeIcon.scale = 1.8;

    emptyHeart = createSprite(40, 20);
    emptyHeart.addImage("emptyHeart", emptyHeartImg);
    emptyHeart.visible = false;
    emptyHeart.scale = 1.8;

    oneHeart = createSprite(40, 20);
    oneHeart.addImage("oneHeart", oneHeartImg);
    oneHeart.visible = false;
    oneHeart.scale = 1.8;

    twoHeart = createSprite(40, 20);
    twoHeart.addImage("twoHeart", twoHeartImg);
    twoHeart.visible = false;
    twoHeart.scale = 1.8;

    fullHeart = createSprite(40, 20);
    fullHeart.addImage("fullHeart", fullHeartImg);
    fullHeart.scale = 1.8;

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

    textSize(25);
    fill("black");
    text("X    " + score, 1070, 52);

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