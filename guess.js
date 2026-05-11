// ====================
// 猜數字遊戲
// ====================
let answer = Math.floor(Math.random() * 100) + 1;

// 猜測次數
let count = 0;

// 範圍
let min = 1;
let max = 100;

function checkGuess() {

    const input = document.getElementById("guessInput");

    const result = document.getElementById("guessResult");

    const history = document.getElementById("history");

    const guessCount =
        document.getElementById("guessCount");

    const guess = Number(input.value);

    // 防呆
    if (guess < 1 || guess > 100 || !guess) {

        result.textContent =
            "請輸入 1~100 的數字";

        return;
    }

    count++;

    guessCount.textContent =
        "猜測次數：" + count;

    // 判斷大小
    if (guess > answer) {

        result.textContent = "太大了！";

        // 更新最大值
        if (guess < max) {

            max = guess;
        }
    }

    else if (guess < answer) {

        result.textContent = "太小了！";

        // 更新最小值
        if (guess > min) {

            min = guess;
        }
    }

    else {

        result.textContent =
            "🎉 恭喜答對！";

    }

    // 更新歷程
    updateHistory();

    input.value = "";
}

// ====================
// 更新範圍顯示
// ====================

function updateHistory() {

    const history =
        document.getElementById("history");

    history.innerHTML = "";

    const li = document.createElement("li");

    // 三種情況
    if (min === 1) {

        li.textContent =
            "數字 < " + max;
    }

    else if (max === 100) {

        li.textContent =
            min + " < 數字";
    }

    else {

        li.textContent =
            min + " < 數字 < " + max;
    }

    history.appendChild(li);
}

// ====================
// 重新開始
// ====================

function restartGame() {

    answer =
        Math.floor(Math.random() * 100) + 1;

    count = 0;

    min = 1;
    max = 100;

    document.getElementById("guessResult")
        .textContent = "";

    document.getElementById("guessCount")
        .textContent = "猜測次數：0";

    document.getElementById("history")
        .innerHTML = "";

    document.getElementById("guessInput")
        .value = "";
}