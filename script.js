const questions = [
    {
        question:"What does the acronym HTML stand for?",
        answers: [
            { text:"Home Tool Markup Language", correct:false},
            { text:"Hyper Text Markup Language", correct:true},
            { text:"Hyperlink and Text Markup Language", correct:false},
            { text:"Hyperlinking and Typing Markup Language", correct:false},
        ]
    },
    {
        question:"Which attribute is used to specify the alternative text for an image?",
        answers: [
            { text:"alt", correct:true},
            { text:"alt-text", correct:false},
            { text:"src", correct:false},
            { text:"title", correct:false},
        ]  
    },
    {
        question:"Which attribute is used to specify the URL of an external CSS file in HTML?",
        answers: [
            { text:"link", correct:false},
            { text:"src", correct:false},
            { text:"style", correct:false},
            { text:"href", correct:true},
        ]
    },
    {
        question:"Which attribute is used to specify the URL of an external CSS file?",
        answers: [
            { text:"src", correct:false},
            { text:"href", correct:true},
            { text:"rel", correct:false},
           { text:"style", correct:false},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Set the initial time in seconds

let timerInterval; // Variable to store the setInterval instance

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60; // Reset the time
  nextButton.innerHTML = "Next";
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  stopTimer(); // Stop the timer when showing the score
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
      stopTimer();
      showScore();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
