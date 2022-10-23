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

function gameStart () {
    let score = 0;

    for(let j = 0; j <questions.length; j++){
        let QuestionObject = questions[j];
        let question = QuestionObject.question
        console.log("-------------------");
        console.log(question);

        let answers = QuestionObject.answers;
        for( let i = 0; i < answers.length; i++) {
            let possibleAnswer = answers[i]; // {text: 'Natasha Romanoff', correct: true}
            console.log(`${i+1}: ${possibleAnswer.text}`) 
        }
        let playerAnswer = randomIntFromInterval(0,2)
        console.log(`You answered: ${answers[playerAnswer].text}`)

        if(answers[playerAnswer].correct === true){
            console.log("Thats Correct!")
            score +=1;
        }else {
            console.log("Thats Not Correct!")
        }

        console.log(`Your score is: ${score}/${questions.length}`)

    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const questions = [
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
        question: 'WWhich Infinity Stone is in Loki scepter?',
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

gameStart()