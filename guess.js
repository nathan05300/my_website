// ====================
// 猜數字遊戲
// ====================

let answer = Math.floor(Math.random() * 100) + 1;

function checkGuess() {

    const input = document.getElementById("guessInput");
    const result = document.getElementById("guessResult");

    const guess = Number(input.value);

    if (guess > answer) {
        result.textContent = "太大了！";
    }
    else if (guess < answer) {
        result.textContent = "太小了！";
    }
    else {
        result.textContent = "恭喜答對！";

        answer = Math.floor(Math.random() * 100) + 1;
    }

    input.value = "";
}

