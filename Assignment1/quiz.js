const questions = [
    ['Which language is used to style web pages?', ['HTML', 'CSS', 'JavaScript', 'Python'], 'CSS'],
    ['Which method adds an item to the end of an array?', ['shift()', 'push()', 'pop()', 'slice()'], 'push()'],
    ['What does DOM stand for?', ['Document Object Model', 'Data Object Method', 'Digital Ordinance Model', 'Document Order Map'], 'Document Object Model'],
    ['Which operator is used for strict equality in JavaScript?', ['==', '===', '=', '!='], '==='],
    ['Which HTML tag is used to create an unordered list?', ["<ul>", "<ol>", "<li>", "<list>"], "<ul>"],
    ['What does CSS stand for?', ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Syntax', 'Colorful Style System'], 'Cascading Style Sheets'],
    ['Which keyword is used to declare a constant in JavaScript?', ['let', 'var', 'const', 'static'], 'const'],
    ['Which property changes the text color in CSS?', ['background-color', 'font-style', 'color', 'text-align'], 'color'],
    ['Which method converts a JSON string into a JavaScript object?', ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.read()'], 'JSON.parse()'],
    ['What does API stand for?', ['Application Programming Interface', 'Automated Program Instruction', 'Advanced Program Integration', 'Application Process Input'], 'Application Programming Interface']
];

const loginForm = document.getElementById('login');
const loginContainer = document.querySelector('.login-container');
const quizContainer = document.querySelector('.quiz-container');
const resultContainer = document.querySelector('.result-container');
const questionContainer = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');
const studentInfo = document.getElementById('student-info');
const resultText = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timerId;
let answerSubmitted = false;
let studentName = 'Student';
let studentSection = 'N/A';

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const sectionInput = document.querySelector('input[name="section"]:checked');
    studentName = nameInput.value.trim() || 'Student';
    studentSection = sectionInput ? sectionInput.value : 'N/A';
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

    questionContainer.replaceChildren();

    const heading = document.createElement('h3');
    heading.textContent = question[0];
    questionContainer.appendChild(heading);

    for (let i = 0; i < question[1].length; i++) {
        const label = document.createElement('label');
        label.className = 'answer-option';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = question[1][i];

        const text = document.createTextNode(' ' + question[1][i]);
        label.appendChild(input);
        label.appendChild(text);
        questionContainer.appendChild(label);
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

    const message = selected ? 'Answer submitted.' : 'Time is up! No answer was selected.';
    document.getElementById('feedback').textContent = message;
    submitButton.disabled = true;
    submitButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
}

function showResult() {
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    let title = 'Nice effort!';
    let detail = 'Keep practicing and you will improve fast.';

    if (percentage >= 90) {
        title = 'Excellent work!';
        detail = 'You have a strong understanding of the topic.';
    } else if (percentage >= 70) {
        title = 'Great job!';
        detail = 'You are doing really well. Stay consistent.';
    } else if (percentage >= 50) {
        title = 'Good attempt!';
        detail = 'You are close. A bit more practice will make you stronger.';
    }

    studentInfo.textContent = studentName + ' • Section ' + studentSection;
    resultText.innerHTML = '<span class="score-number">' + score + '</span> / ' + totalQuestions + ' <span class="percent-tag">(' + percentage + '%)</span>';
    resultMessage.textContent = title + ' ' + detail;
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
        showResult();
    }
});

document.getElementById('restart').addEventListener('click', function () {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    loginForm.reset();
    document.getElementById('feedback').textContent = '';
});


