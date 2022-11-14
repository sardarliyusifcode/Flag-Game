const gameBody = document.querySelector(".game-body");
const flagImg = document.querySelector('.flag');
const gameInput = document.querySelector('.game-input');
const gameSubmit = document.querySelector('.game-submit');
const timer = document.querySelector(".timer");
const startGameButton = document.querySelector(".start-game-button");
const startNewGameButton = document.querySelector(".start-new-game-button");
const timeOut = document.querySelector(".time-out");
const correctAnswers = document.querySelector('.correct-answers')

// Get Data From API
fetch("https://restcountries.com/v2/all")
  .then((response) => response.json())
  .then((data) => {
    const arr = data;
    let correctAnswer = 0;

    // Click Event for Start Game
    startGameButton.addEventListener("click", () => {
      startGame();
    });
    // Click Event for Start New Game
    startNewGameButton.addEventListener("click", () => {
      location.reload();
    });
    // Set first Flag-img
    let flagIndex = Math.floor(Math.random() * 240)
    flagImg.setAttribute('src', `${arr[flagIndex].flags.png}`)
    // When Submit 
    gameSubmit.addEventListener('click', () => {
        if(gameInput.value == arr[flagIndex].name){
            correctAnswer++;
        }
        flagIndex = Math.floor(Math.random() * 240);
        flagImg.setAttribute('src', `${arr[flagIndex].flags.png}`);
        gameInput.value=""
    })

    const startGame = () => {
      gameBody.classList.remove("d-none");
      timer.classList.remove("d-none");
      startGameButton.classList.add("d-none");
      let time = timer.innerText - 1;
      const myset = setInterval(() => {
        timer.innerText = time;
        time -= 1;
        if (time == -1) {
          clearInterval(myset);
          timer.classList.add("d-none");
          timeOut.classList.remove("d-none");
          startNewGameButton.classList.remove("d-none");
          correctAnswers.innerText= correctAnswer;
          gameBody.classList.add('d-none')
        }
      }, 1000);
    };
  });
