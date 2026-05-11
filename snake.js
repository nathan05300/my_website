// ====================
// 貪食蛇遊戲（可開始 + 重新開始）
// ====================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake, direction, food, score, game;

let isRunning = false;

// 初始化
function initSnake() {

    snake = [{ x: 200, y: 200 }];

    direction = "RIGHT";

    score = 0;

    document.getElementById("score").textContent = score;

    document.getElementById("gameOverText").textContent = "";

    document.getElementById("restartBtn").style.display = "none";

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

// 開始遊戲
function startGame() {

    if (isRunning) return;

    initSnake();

    isRunning = true;

    game = setInterval(drawGame, 120);
}

// 重新開始
function restartSnake() {

    clearInterval(game);

    isRunning = false;

    startGame();
}

// 控制方向
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    if (!isRunning) return;

    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }

    else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

// 畫遊戲
function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 畫蛇
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i === 0 ? "lime" : "green";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );
    }

    // 畫食物
    ctx.fillStyle = "red";

    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;

    // 吃食物
    if (snakeX === food.x && snakeY === food.y) {

        score++;

        document.getElementById("score").textContent = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    }
    else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    // 撞牆 / 撞自己
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        gameOver();
        return;
    }

    snake.unshift(newHead);
}

// Game Over
function gameOver() {

    clearInterval(game);

    isRunning = false;

    document.getElementById("gameOverText").textContent =
        "💀 遊戲結束！";

    document.getElementById("restartBtn").style.display =
        "inline-block";
}

// 碰撞偵測
function collision(head, array) {

    for (let i = 0; i < array.length; i++) {

        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }

    return false;
}
function changeDirection(event) {

    // 🚫 阻止方向鍵捲動畫面
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }

    if (!isRunning) return;

    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }
    else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }
    else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}