let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

// ARRAY OF WINNING PATTERNS
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "blue";
        } else {
            box.innerText = "X";
            box.style.color = "red";
        }
        turnO = !turnO;
        box.disabled = true;

        // Check winner first, then draw
        let winner = checkWinner();
        if (!winner && checkDraw()) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "black";
    });
};

const showWinner = (winner) => {
    msg.innerText = `CONGRATULATIONS ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Modified checkWinner to return the winner or null
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return pos1;
        }
    }
    return null;
};

const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);