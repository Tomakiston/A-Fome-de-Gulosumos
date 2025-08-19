let player, playerWalking, playerEating, playerCollided;
let ground, groundImage;
let tree, treeImage, treeGroup;
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
let gameOver, gameOverImg;

let isHit = false;
let hitTimer = 0;

let canJump = false;
let lastOnGroundTime = 0;
const MS = 100;

let pixelFont;

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

    gameOverImg = loadImage("./assets/gameOver.png");

    pixelFont = loadFont("Tiny5-Regular.ttf");
}

function setup() {
    createCanvas(1200,400);
    textFont(pixelFont);

    ground = createSprite(600, 385);
    ground.addImage("ground", groundImage);
    ground.scale = 1.5;
    ground.imovable = true;

    player = createSprite(150, 313);
    player.addAnimation("walking", playerWalking);
    player.addAnimation("eating", playerEating);
    player.addAnimation("collided", playerCollided);
    player.changeAnimation("walking");
    player.scale = 1.5;
    
    ground.setCollider("rectangle", 0, 0, ground.width, 30);
    player.setCollider("rectangle", 0, 0, player.width*0.5, player.height*1);

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

    gameOver = createSprite(width / 2, height / 2);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    enemyGroup = new Group();
    cakeGroup = new Group();
    treeGroup = new Group();
}   

function draw() {
    background("#34e3af");

    textSize(30);
    fill("black");
    text("X    " + score, 1070, 49);

    if(gameState === play) {
        gameOver.visible = false;

        /*if(keyWentDown("space") && player.touching.ground) {
            player.velocityY = -12;
        } */
        player.velocityY += 0.8;
        const onGround = player.collide(ground);
        if(onGround) {
            canJump = true;
            lastOnGroundTime = millis();
        }
        else {
            if(millis() - lastOnGroundTime > MS) {
                canJump = false;
            }
        }
        const jumpPressed = keyWentDown("space") || keyWentDown(" ");
        if(jumpPressed && canJump) {
            player.velocityY = -13;
            canJump = false;
        }

        spawnTrees();
        spawnCakes();
        spawnEnemies();

        for (let i = 0; i < enemyGroup.length; i++) {
            if (player.overlap(enemyGroup[i])) {
                enemyGroup[i].remove();
                lifes--;
            }
        }

        if(lifes === 3) {
            emptyHeart.visible = false;
            oneHeart.visible = false;
            twoHeart.visible = false;
            fullHeart.visible = true;
        }
        if(lifes === 2) {
            emptyHeart.visible = false;
            oneHeart.visible = false;
            twoHeart.visible = true;
            fullHeart.visible = false;
        }
        if(lifes === 1) {
            emptyHeart.visible = false;
            oneHeart.visible = true;
            twoHeart.visible = false;
            fullHeart.visible = false;
        }
        if(lifes === 0) {
            emptyHeart.visible = true;
            oneHeart.visible = false;
            twoHeart.visible = false;
            fullHeart.visible = false;

            gameState = end;
        }

        for (let i = 0; i < cakeGroup.length; i++) {
            if (player.overlap(cakeGroup[i])) {
                cakeGroup[i].remove();
                score++;

                player.changeAnimation("eating");
                isHit = true;
                hitTimer = millis();
            }
        }
        if(isHit && millis() - hitTimer > 250) {
            player.changeAnimation("walking");
            isHit = false;
        }

    }

    if(gameState === end) {
        gameOver.visible = true;

        player.velocityY = 0;
        enemyGroup.setVelocityXEach(0);
        cakeGroup.setVelocityXEach(0);
        treeGroup.setVelocityXEach(0);

        player.changeAnimation("collided");
        
        enemyGroup.setLifetimeEach(-1);
        cakeGroup.setLifetimeEach(-1);
        treeGroup.setLifetimeEach(-1);
    }

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
        treeGroup.add(tree);
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