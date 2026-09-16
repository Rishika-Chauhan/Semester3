const questions = [
    ['Which language is used to style web pages?', ['HTML', 'CSS', 'JavaScript', 'Python'], 'CSS'],
    ['Which method adds an item to the end of an array?', ['shift()', 'push()', 'pop()', 'slice()'], 'push()'],
    ['What does DOM stand for?', ['Document Object Model', 'Data Object Method', 'Digital Ordinance Model', 'Document Order Map'], 'Document Object Model']
];

const loginForm = document.getElementById('login');
const loginContainer = document.querySelector('.login-container');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.querySelector('.result-container');
const questionContainer = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');
let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timerId;
let answerSubmitted = false;

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    renderQuestion();
});

function renderQuestion() {
    const question = questions[currentQuestion];
    answerSubmitted = false;
    timeLeft = 20;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('progress').textContent = 'Question ' + (currentQuestion + 1) + ' of ' + questions.length;
    document.getElementById('feedback').textContent = '';
    submitButton.disabled = false;
    submitButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
    questionContainer.innerHTML = '<h3>' + question[0] + '</h3>';
    for (let i = 0; i < question[1].length; i++) {
        questionContainer.innerHTML += '<label class="answer-option"><input type="radio" name="answer" value="' + question[1][i] + '"> ' + question[1][i] + '</label>';
    }
    const options = document.querySelectorAll('.answer-option');
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            options.forEach(function (item) { item.classList.remove('selected'); });
            option.classList.add('selected');
        });
    });
    startTimer();
}

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
        timeLeft -= 1;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerId);
            submitAnswer(true);
        }
    }, 1000);
}

function submitAnswer() {
    if (answerSubmitted) return;
    answerSubmitted = true;
    clearInterval(timerId);
    const selected = document.querySelector('input[name="answer"]:checked');
    const correctAnswer = questions[currentQuestion][2];
    if (selected && selected.value === correctAnswer) score += 1;
    document.getElementById('feedback').textContent = 'Answer submitted.';
    submitButton.disabled = true;
    submitButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
}

submitButton.addEventListener('click', function () { submitAnswer(); });
nextButton.addEventListener('click', function () {
    currentQuestion += 1;
    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        clearInterval(timerId);
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        document.getElementById('result').textContent = 'You scored ' + score + ' out of ' + questions.length;
    }
});

document.getElementById('restart').addEventListener('click', function () {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    loginForm.reset();
});


