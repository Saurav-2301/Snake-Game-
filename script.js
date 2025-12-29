const gameContainer = document.querySelector(".game-container");
const scoreContainer = document.querySelector(".score-container");

let foodX, foodY;
let headX = 12, headY = 12;
let velocityX = 0, velocityY = 0;
let snakeBody = [[12, 12]];
let score = 0;

// Generate food
function generateFood(){
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
}

// Reset on game over
function gameOver(){
    alert("💀 Game Over! Your Score: " + score);
    headX = 12; headY = 12;
    snakeBody = [[12, 12]]; // reset so snake appears again
    score = 0;
    velocityX = 0; velocityY = 0;
    scoreContainer.textContent = "Press Arrow Keys to Start | Score: 0";
    generateFood();
}

// Render
function renderGame(){
    let html = `<div class="food" style="grid-area:${foodY}/${foodX};"></div>`;

    // Food eat
    if(headX === foodX && headY === foodY){
        snakeBody.push([foodX, foodY]);
        generateFood();
        score += 10;
        scoreContainer.textContent = "Score: " + score;
    }

    headX += velocityX;
    headY += velocityY;

    // Wall hit
    if(headX < 1 || headX > 25 || headY < 1 || headY > 25){
        return gameOver();
    }

    // Update snake body
    snakeBody.unshift([headX, headY]);
    snakeBody.pop();

    // Self hit
    for(let i = 1; i < snakeBody.length; i++){
        if(snakeBody[i][0] === headX && snakeBody[i][1] === headY){
            return gameOver();
        }
    }

    // Draw snake
    for(let segment of snakeBody){
        html += `<div class="snake" style="grid-area:${segment[1]}/${segment[0]};"></div>`;
    }

    gameContainer.innerHTML = html;
}

generateFood();
setInterval(renderGame, 150);

// Controls
document.addEventListener("keydown", e => {
    if(e.key === "ArrowUp" && velocityY !== 1){ velocityX = 0; velocityY = -1; }
    if(e.key === "ArrowDown" && velocityY !== -1){ velocityX = 0; velocityY = 1; }
    if(e.key === "ArrowLeft" && velocityX !== 1){ velocityY = 0; velocityX = -1; }
    if(e.key === "ArrowRight" && velocityX !== -1){ velocityY = 0; velocityX = 1; }
});
