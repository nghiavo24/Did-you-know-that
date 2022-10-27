// start the game loop
// - show the question
// - show the possible answers
// - show score
// - player read the question
// - player select an answer
// - player can no longer change answer
// - game tells player if answer is correct
// - game score gets updated
// - restarts the game loop if there are more questions
// - ends game if there are no more questions
//=============================================================================//
//Modal
const openBtn = document.getElementById('openModal');
const modal = document.getElementById('modal')
const close = document.getElementById('close')

const openModal = () => {
  modal.style.display = 'block';
}
const closeModal = () => {
  modal.style.display = 'none'
}
openBtn.addEventListener('click', openModal)
close.addEventListener('click', closeModal)

//=============================================================================//
const startButton = document.querySelector('.start-btn')
const nextButton = document.querySelector('.next-btn')
const questionContainerElement = document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtons = [
    document.getElementById('answer1'),
    document.getElementById('answer2'),
    document.getElementById('answer3')
]
const score = document.getElementById('score');
const scoreHeader = document.getElementById('score-header');
const playerHeader = document.getElementById('player-name-header')
const playerNameInput = document.getElementById('player-name')
const resetButton = document.querySelector('.reset-btn')
var playerAnswer = null;
var playerAnswered = false;
var amountWrong = 0
var playerScore = 0;
var j = 0;
var i = 0;
var reset = false;

startButton.addEventListener('click', gameStart)
resetButton.addEventListener('click', resetGame)

async function resetGame(){
    playerAnswer = null;
    playerAnswered = false;
    amountWrong = 0;
    playerScore = 0;
    j = 100;
    i = 100;
    reset = true;
    questionElement.classList.add("hide");
    resetButton.classList.add("hide");
    playerNameInput.value = null;
    playerNameInput.classList.remove("hide");
    startButton.classList.remove("hide");
    playerHeader.innerText = null;
    scoreHeader.classList.add("hide");
}

// gets random index in the source array
// removes from the random element from the source array
// adds random element into the output array
function fisherYatesShuffle(sourceArray){
    outputArray = []
    length = sourceArray.length
    console.log('sourceArray', sourceArray)
    for(let x = 0; x < length; x++){
        randomIndex = randomIntFromInterval(0, sourceArray.length - 1)
        outputArray.push(sourceArray[randomIndex])
        sourceArray.splice(randomIndex, 1)
    }
    return outputArray
}

async function gameStart () {
    //  hide/unhide html
    startButton.classList.add("hide")
    resetButton.classList.remove("hide")
    questionElement.classList.remove("hide")
    scoreHeader.classList.remove("hide")
    let userNameInput = playerNameInput.value
    playerHeader.innerText = userNameInput
    playerHeader.classList.remove("hide")
    playerNameInput.classList.add("hide")
    

    // add listeners to answer buttons to get the player answer
    for(let i = 0; i < answerButtons.length; i++){
        answerButtons[i].addEventListener('click', () => setAnswer(i))
        answerButtons[i].classList.remove("hide")
    }

    playerScore = 0
    reset = false
    console.log(marvel_questions)
    let questions = fisherYatesShuffle(marvel_questions.slice())
    // gameplay loop
    console.log('questions', questions)
    for(j = 0; j <questions.length; j++){
        let QuestionObject = questions[j];
        let question = QuestionObject.question
        console.log("-------------------");
        console.log(question);
        
        // show the question
        questionElement.innerText = question

        // show the answers
        let answers = QuestionObject.answers;
        for(i = 0; i < answers.length; i++) {
            let possibleAnswer = answers[i];
            console.log(`${i+1}: ${possibleAnswer.text}`)
            answerButtons[i].innerText = possibleAnswer.text
        }

        
        // wait for player answer
        await waitUserInput()
        console.log(`You answered:`)
        console.log(playerAnswer)

        // add score and change background color for wrong/right answer
        if(playerAnswer != null && answers[playerAnswer].correct === true){
            console.log("Thats Correct!")
            document.body.className = 'correct'
            playerScore += 1;
        }else {
            console.log("Thats Not Correct!")
            document.body.className = 'wrong'
            amountWrong += 1
        }

        // add change button colors for wrong/right answer
        for( let i = 0; i < answers.length; i++) {
            if(answers[i].correct == true){
                answerButtons[i].classList.add('correct')
            }else{
                answerButtons[i].classList.add('wrong')
            }
        }

        // show updated score
        console.log(`Your score is: ${playerScore}/${questions.length}`)
        score.innerText = `${playerScore}/${questions.length}`

        await sleep(1000)

        // if(amountWrong >= 3){
        //     //TODO: Add logic for ending game when more than three wrong answers
        // }

        // reset player answer and colors
        playerAnswer = null
        document.body.className = ''
        for( let i = 0; i < answers.length; i++) {
            if(answers[i].correct == true){
                answerButtons[i].classList.remove('correct')
            }else{
                answerButtons[i].classList.remove('wrong')
            }
        }
    }

    // hide/unhide html
    for(let i =0; i < answerButtons.length; i++){
        answerButtons[i].classList.add("hide")
    }
    questionElement.classList.add("hide")
    resetButton.classList.add("hide")
    // playerNameInput.value = null
    playerNameInput.classList.remove("hide")
    startButton.classList.remove("hide")
    if (playerScore < 3) {
        alert("Are you sure that you are not a DC fan?")
    } else if (playerScore > 3 && playerScore <7) {
        alert("Go back and re-watch all Marvel movies & series!")
    } else {
        alert("You are the only true Marvel fan!!!")
    }
}

// sets the player answer when an answer button is clicked
function setAnswer(answer_index){
    playerAnswer = answer_index;
    playerAnswered = true
}

// waits in an infitie loop until playerAnswered is changed to true  (playerAnswered is set to true by setAnswer())
async function waitUserInput() {
    while (playerAnswered == false && reset == false) await sleep(50); // pauses script
    playerAnswered = false; // reset var
}

// gets random number from range
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// stops program for an amount of time in miliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const marvel_questions = [
    {
        question: 'What is Black Widow real name?',
        answers: [
            {text: 'Natasha Romanoff', correct: true},
            {text: 'Pepper Potts', correct: false},
            {text: 'MJ', correct: false}
        ]
    },
    {
        question: 'What kind of doctor is Stephen Strange?',
        answers: [
            {text: 'Orthopedic Surgeon', correct: false},
            {text: 'Plastic Surgeon', correct: false},
            {text: 'Neurosurgeon', correct: true}
        ]
    },
    {
        question: 'What metal is Wakanda most precious resources?',
        answers: [
            {text: 'Adamantium', correct: false},
            {text: 'Vibranium', correct: true},
            {text: 'Dilithium', correct: false}
        ]
    },
    {
        question: 'What kind of cloak does Doctor Strange use?',
        answers: [
            {text: 'Steel', correct: false},
            {text: 'Invincible', correct: false},
            {text: 'Levitation', correct: true}
        ]
    },
    {
        question: 'What kind of war animal is bred by the Border Tribe in Black Panther?',
        answers: [
            {text: 'Panthers', correct: false},
            {text: 'Rhinos', correct: true},
            {text: 'Lions', correct: false}
        ]
    },
    {
        question: 'What is Black Widow final line before she sacrifices herself on Vomir?',
        answers: [
            {text: 'Clint', correct: false},
            {text: 'Let me go', correct: false},
            {text: 'It is okay', correct: true}
        ]
    },
    {
        question: 'Which Infinity Stone is in Loki scepter?',
        answers: [
            {text: 'Mind', correct: true},
            {text: 'Space', correct: false},
            {text: 'Power', correct: false}
        ]
    },
    {
        question: 'Which actress plays the role of an elite warrior Thena in the move Eternals?',
        answers: [
            {text: 'Scarlett Johansson', correct: false},
            {text: 'Angelina Jolie', correct: true},
            {text: 'Kim Kardashian', correct: false}
        ]
    },
    {
        question: 'What type of herb did the first Black Panther ingest to gain his power?',
        answers: [
            {text: 'Diamond-shaped herb', correct: false},
            {text: 'Moon-shaped herb', correct: true},
            {text: 'Heart-shaped herb', correct: false}
        ]
    },
    {
        question: 'Which of these Eternals is not names after a Greek or Roman God?',
        answers: [
            {text: 'Phastos', correct: false},
            {text: 'Makkari', correct: false},
            {text: 'Ikaris', correct: true}
        ]
    }
]