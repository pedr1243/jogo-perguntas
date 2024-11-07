const questions = [
    { question: "Qual é a capital do Brasil?", answers: ["Brasília", "São Paulo", "Rio de Janeiro"], correct: "Brasília" },
    { question: "Qual é a cor do céu?", answers: ["Verde", "Azul", "Amarelo"], correct: "Azul" },
    { question: "Quantos dias tem uma semana?", answers: ["5", "7", "10"], correct: "7" },
    { question: "Quantos continentes existem?", answers: ["5", "6", "7"], correct: "7" },
    { question: "Qual é o maior planeta do Sistema Solar?", answers: ["Terra", "Júpiter", "Marte"], correct: "Júpiter" },
    { question: "Quantos minutos tem uma hora?", answers: ["30", "45", "60"], correct: "60" },
    { question: "Quem escreveu 'Dom Casmurro'?", answers: ["Machado de Assis", "José de Alencar", "Clarice Lispector"], correct: "Machado de Assis" },
    { question: "Qual é a fórmula da água?", answers: ["H2O", "CO2", "O2"], correct: "H2O" },
    { question: "Quantos lados tem um quadrado?", answers: ["3", "4", "5"], correct: "4" },
    { question: "Qual é o país mais populoso do mundo?", answers: ["Estados Unidos", "Índia", "China"], correct: "China" },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const trophyContainer = document.getElementById("trophy-container");

function startGame() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    messageElement.textContent = '';
    trophyContainer.classList.add("hidden");
    showQuestion();
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Embaralha as respostas
    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    messageElement.textContent = '';
    answerButtons.innerHTML = '';
}

function selectAnswer(answer, button) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        score++;
        scoreElement.textContent = score;
        button.classList.add("correct");
        nextQuestion();
    } else {
        button.classList.add("wrong");
        showMessage(`Resposta errada! A resposta correta era: ${correctAnswer}`);
        setTimeout(() => nextQuestion(), 4100);  // Pule para a próxima pergunta após 2 segundos
    }
}

function nextQuestion() {
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function endGame() {
    if (score >= 8) {
        trophyContainer.classList.remove("hidden");
        showMessage(`Ual você é um gênio! Sua pontuação final é ${score}.`);
    }else{
        showMessage(`Que pena! sua pontuação é ${score}.`);
    }
}

function showMessage(message) {
    messageElement.textContent = '';
    let index = 0;
    const interval = setInterval(() => {
        if (index < message.length) {
            messageElement.textContent += message.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

startGame();
