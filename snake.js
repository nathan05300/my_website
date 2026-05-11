// ====================
// 貪吃蛇遊戲
// ====================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
    { x: 200, y: 200 }
];

let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

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

    // 蛇頭
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;

    // 吃到食物
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

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // 撞牆
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {

        clearInterval(game);

        alert("遊戲結束！");
    }

    snake.unshift(newHead);
}

function collision(head, array) {

    for (let i = 0; i < array.length; i++) {

        if (
            head.x === array[i].x &&
            head.y === array[i].y
        ) {
            return true;
        }
    }

    return false;
}

const game = setInterval(drawGame, 120);