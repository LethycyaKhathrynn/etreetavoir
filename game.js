const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Elle - ÊTRE",
        choice1: "Est",
        choice2: "Sommes",
        choice3: "Es",
        choice4: "Sont",
        choice5: "Êtes",
        answer: 1,
    },
    {
        question: "Vous - AVOIR",
        choice1: "A",
        choice2: "As",
        choice3: "Ont",
        choice4: "Avez",
        choice5: "Avons",
        answer: 4,
    },
    {
        question: "Tu - AVOIR",
        choice1: "Avons",
        choice2: "Ai",
        choice3: "As",
        choice4: "Ont",
        choice5: "Avez",
        answer: 3,
    },
    {
        question: "Ils - ÊTRE",
        choice1: "Êtes",
        choice2: "Es",
        choice3: "Sommes",
        choice4: "Suis",
        choice5: "Sont",
        answer: 5,
    },
    {
        question: "J' - AVOIR",
        choice1: "Ai",
        choice2: "As",
        choice3: "A",
        choice4: "Avons",
        choice5: "Ont",
        answer: 1,
    },
    {
        question: "Tu - ÊTRE",
        choice1: "Suis",
        choice2: "Es",
        choice3: "Êtes",
        choice4: "Sont",
        choice5: "Sommes",
        answer: 2,
    },
    {
        question: "Il - AVOIR",
        choice1: "Avez",
        choice2: "Ont",
        choice3: "A",
        choice4: "Avons",
        choice5: "Ai",
        answer: 3,
    },
    {
        question: "Elles - AVOIR",
        choice1: "Avons",
        choice2: "Ont",
        choice3: "Avez",
        choice4: "As",
        choice5: "A",
        answer: 2,
    },
    {
        question: "Vous - ÊTRE",
        choice1: "Sommes",
        choice2: "Sont",
        choice3: "Êtes",
        choice4: "Suis",
        choice5: "Est",
        answer: 3,
    },
    {
        question: "Je - ÊTRE",
        choice1: "Sommes",
        choice2: "Sont",
        choice3: "Est",
        choice4: "Suis",
        choice5: "Es",
        answer: 4,
    },
    {
        question: "Nous - ÊTRE",
        choice1: "Sommes",
        choice2: "Êtes",
        choice3: "Sont",
        choice4: "Suis",
        choice5: "Es",
        answer: 1,
    },
    {
        question: "Nous - AVOIR",
        choice1: "As",
        choice2: "Avez",
        choice3: "Ont",
        choice4: "Ai",
        choice5: "Avons",
        answer: 5,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://lethycyakhathrynn.github.io/etreetavoir/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} - ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 100)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()