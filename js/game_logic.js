var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var gravity = .1;

Promise.all([
    fetch("/json/character.json").then(response => response.json()),
    fetch("/json/enemy.json").then(response => response.json())
])
.then(([character, enemy]) => {
    drawCharacter(character);
    drawEnemy(enemy);

    //game loop
    setInterval(function() {
        // clear screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw players
        drawCharacter(character);
        drawEnemy(enemy);

        // objects movement
        character.x += character.vx;
        enemy.x += enemy.vx;

        character.vy += gravity;
        character.y += character.vy;
        enemy.vy += gravity;
        enemy.y += enemy.vy;

        // game bounds
        if(character.x + character.width >= canvas.width || character.x < 0) character.vx = -character.vx;
        if(enemy.x + character.width >= canvas.width || enemy.x < 0) enemy.vx = -enemy.vx;

        if(character.y + character.height >= canvas.height) character.vy = -character.vy;
        if(enemy.y + enemy.height >= canvas.height) enemy.vy = -enemy.vy;

        //reset position if below canvas y axis
        if(character.y > canvas.height) character.y = 0;
        if(enemy.y > canvas.height) enemy.y = 0;

    }, 1000 / 60);
});

function drawCharacter(character) {
    context.fillStyle = character.color;
    context.fillRect(character.x, character.y, character.width, character.height);
}

function drawEnemy(enemy) {
    context.fillStyle = enemy.color;
    context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}