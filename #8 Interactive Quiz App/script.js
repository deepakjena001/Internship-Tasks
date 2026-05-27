const startScreen =
  document.getElementById("startScreen");

const quizScreen =
  document.getElementById("quizScreen");

const resultScreen =
  document.getElementById("resultScreen");

const startBtn =
  document.getElementById("startBtn");

const questionNumber =
  document.getElementById("questionNumber");

const questionEl =
  document.getElementById("question");

const optionsEl =
  document.getElementById("options");

const nextBtn =
  document.getElementById("nextBtn");

const timerEl =
  document.getElementById("timer");

const scoreText =
  document.getElementById("scoreText");

const percentageText =
  document.getElementById("percentageText");

const gradeText =
  document.getElementById("gradeText");

const correctText =
  document.getElementById("correctText");

const wrongText =
  document.getElementById("wrongText");

const totalTimeText =
  document.getElementById("totalTimeText");

const feedbackText =
  document.getElementById("feedbackText");

const reviewContainer =
  document.getElementById("reviewContainer");

const quizQuestions = [

  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language",
    explanation:
      "HTML is used to structure webpages."
  },

  {
    question: "Which language is used for styling?",
    options: [
      "HTML",
      "CSS",
      "Python",
      "Java"
    ],
    answer: "CSS",
    explanation:
      "CSS is used for webpage styling."
  },

  {
    question: "Which keyword declares variable?",
    options: [
      "let",
      "style",
      "design",
      "font"
    ],
    answer: "let",
    explanation:
      "let is used to declare variables."
  },

  {
    question: "Which method selects element by ID?",
    options: [
      "query()",
      "select()",
      "getElementById()",
      "get()"
    ],
    answer: "getElementById()",
    explanation:
      "getElementById() selects element using id."
  },

  {
    question: "Which symbol is used for comments in JS?",
    options: [
      "//",
      "##",
      "<!-- -->",
      "**"
    ],
    answer: "//",
    explanation:
      "Double slash creates single-line comment."
  },

  {
    question: "Which function shows alert box?",
    options: [
      "show()",
      "alert()",
      "popup()",
      "message()"
    ],
    answer: "alert()",
    explanation:
      "alert() displays popup messages."
  },

  {
    question: "Which company created JavaScript?",
    options: [
      "Microsoft",
      "Google",
      "Netscape",
      "Apple"
    ],
    answer: "Netscape",
    explanation:
      "JavaScript was created at Netscape."
  },

  {
    question: "Which operator checks equality?",
    options: [
      "=",
      "==",
      "+",
      "!="
    ],
    answer: "==",
    explanation:
      "== checks value equality."
  },

  {
    question: "Which loop repeats code?",
    options: [
      "for",
      "style",
      "font",
      "design"
    ],
    answer: "for",
    explanation:
      "for loop repeats code multiple times."
  },

  {
    question: "Which function prints in console?",
    options: [
      "print()",
      "write()",
      "console.log()",
      "show()"
    ],
    answer: "console.log()",
    explanation:
      "console.log() prints inside console."
  }

];

let currentQuestion = 0;

let score = 0;

let userAnswers = [];

let totalSeconds = 0;

let questionSeconds = 0;

let timer;

startBtn.addEventListener(
  "click",
  startQuiz
);

nextBtn.addEventListener(
  "click",
  nextQuestion
);

function startQuiz() {

  startScreen.classList.add("hidden");

  quizScreen.classList.remove("hidden");

  startTimer();

  showQuestion();
}

function startTimer() {

  timer = setInterval(() => {

    totalSeconds++;

    questionSeconds++;

    timerEl.innerText =
      "Time: " + questionSeconds + "s";

  }, 1000);
}

function showQuestion() {

  const currentQuiz =
    quizQuestions[currentQuestion];

  questionNumber.innerText =
    `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

  questionEl.innerText =
    currentQuiz.question;

  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {

    const button =
      document.createElement("button");

    button.classList.add("option-btn");

    button.innerText = option;

    button.addEventListener(
      "click",
      () => selectAnswer(option)
    );

    optionsEl.appendChild(button);
  });
}

function selectAnswer(selectedOption) {

  const currentQuiz =
    quizQuestions[currentQuestion];

  const buttons =
    document.querySelectorAll(".option-btn");

  buttons.forEach(button => {

    button.disabled = true;

    if (
      button.innerText ===
      currentQuiz.answer
    ) {

      button.classList.add(
        "correct-answer"
      );
    }

    if (
      button.innerText ===
      selectedOption &&
      selectedOption !==
      currentQuiz.answer
    ) {

      button.classList.add(
        "wrong-answer"
      );
    }

    if (
      button.innerText ===
      selectedOption
    ) {

      button.classList.add(
        "selected"
      );
    }
  });

  const isCorrect =
    selectedOption ===
    currentQuiz.answer;

  if (isCorrect) {
    score++;
  }

  userAnswers.push({

    question:
      currentQuiz.question,

    userAnswer:
      selectedOption,

    correctAnswer:
      currentQuiz.answer,

    explanation:
      currentQuiz.explanation,

    isCorrect:
      isCorrect,

    timeTaken:
      questionSeconds
  });

  nextBtn.style.display =
    "block";
}x

function nextQuestion() {

  questionSeconds = 0;

  currentQuestion++;

  if (
    currentQuestion <
    quizQuestions.length
  ) {

    showQuestion();

  } else {

    endQuiz();
  }
}

function endQuiz() {

  clearInterval(timer);

  quizScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");

  let wrongAnswers =
    quizQuestions.length - score;

  let percentage =
    (score / quizQuestions.length) * 100;

  let grade = "";

  let feedback = "";

  if (percentage >= 90) {

    grade = "A+";

    feedback =
      "Excellent performance!";

  } else if (percentage >= 75) {

    grade = "A";

    feedback =
      "Great job!";

  } else if (percentage >= 60) {

    grade = "B";

    feedback =
      "Good effort!";

  } else if (percentage >= 40) {

    grade = "C";

    feedback =
      "Need more practice.";

  } else {

    grade = "F";

    feedback =
      "Keep learning and try again.";
  }

  scoreText.innerText =
    "Score: " + score;

  percentageText.innerText =
    "Percentage: " +
    percentage.toFixed(2) + "%";

  gradeText.innerText =
    "Grade: " + grade;

  correctText.innerText =
    "Correct Answers: " + score;

  wrongText.innerText =
    "Wrong Answers: " + wrongAnswers;

  totalTimeText.innerText =
    "Total Time: " +
    totalSeconds + " seconds";

  feedbackText.innerText =
    "Feedback: " + feedback;

  showReview();
}

function showReview() {

  reviewContainer.innerHTML = "";

  userAnswers.forEach((item, index) => {

    const div =
      document.createElement("div");

    div.classList.add("review-card");

    div.innerHTML = `
      <h3>Question ${index + 1}</h3>

      <p><strong>Question:</strong>
      ${item.question}</p>

      <p><strong>Your Answer:</strong>
      ${item.userAnswer}</p>

      <p><strong>Correct Answer:</strong>
      ${item.correctAnswer}</p>

      <p class="${item.isCorrect ? "correct" : "wrong"}">
      ${item.isCorrect ? "Correct" : "Wrong"}
      </p>

      <p><strong>Explanation:</strong>
      ${item.explanation}</p>

      <p><strong>Time Taken:</strong>
      ${item.timeTaken}s</p>
    `;

    reviewContainer.appendChild(div);
  });
}