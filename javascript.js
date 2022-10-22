const startButton = document.querySelector('.start-btn')
const nextButton = document.querySelector('.next-btn')
const questionContainerElement = document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtonsElement = document.querySelector('#answer-buttons')

let shuffledQuestions, currentQuestion

startButton.addEventListener('click', startGame)
// Start button to start the game
nextButton.addEventListener('click', () => {
    currentQuestion++
    selectNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');// Add the class .hide will make the 'Start' button go away
    questionContainerElement.classList.remove('hide')// Remove the class 'hide' will make the question & answers visible
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    selectNextQuestion()
}



function selectNextQuestion () {
    resetBoard()
    showQuestion(shuffledQuestions[currentQuestion])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetBoard() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
function selectAnswer (e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestion + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is Black Widow real name?',
        answers: [
            {text: 'Natasha Romanoff', correct: true},
            {text: 'Pepper Potts', correct: false},
            {text: 'Valkarye', correct: false}
        ]
    },
    {
        question: 'What is Captain America real name',
        answers: [
            {text: 'Chris Evans', correct: false},
            {text: 'Ryan Goulding', correct: false},
            {text: 'Steve Roger', correct: true}
        ]
    },
    {
        question: 'Is the Captain America the first Avenger',
        answers: [
            {text: 'True', correct: true},
            {text: 'False', correct: false},
        ]
    }
]