// Initial values
let counter = 15;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;


const quizQuestions = [
    {
        question: "What is the name of Spongebob's best friend?",
        choices: ["Patrick Star", "Sandy Cheeks", "Doodle-bob", "Mr.Krabs"],
        correctAnswer: "Patrick Star"
    },

    {
        question: "Where does Spongebob work?",
        choices: ["Chum Bucket", "Salty Splatoon", "Krusty Krab", "Weenie Hut Jr's"],
        correctAnswer: "Krusty Krab"
    },

    {
        question: "What is Spongebob's Favorite Hobby?",
        choices: ["Bubble-blowing", "Dancing", "Fry-cooking", "Jellyfishing"],
        correctAnswer: "Jellyfishing"
    },

    {
        question: "What kind of pet does Spongebob have?",
        choices: ["Sea-bear", "Jellyfish", "Snail", "Rock"],
        correctAnswer: "Snail"
    },
    {
        question: "What is the name of Spongebob's Boss?",
        choices: ["Mr. Squidward", "Larry the Lobster", "Smitty Werbermenjensen", "Mr. Krabs"],
        correctAnswer: "Mr. Krabs"
    },
];

const funImages = [
    'https://media.giphy.com/media/UvOcKPHrkKSLm/giphy.gif',
    'https://media.giphy.com/media/BcP6MWBzfkd2w/giphy.gif',
    'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
];

const sadImages = [
    'https://media.giphy.com/media/tSgrWN1uHXdcc/giphy.gif',
    'https://media.giphy.com/media/l6iDb0HCdAU1O/giphy.gif',
];

// If the timer is over, then go to the next question
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('Game is over!!!!!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
    
}

// Start a 30 seconds timer for user to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices to the browser
function loadQuestion() {
    counter = 15;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; // 
    const choices = quizQuestions[currentQuestion].choices; // 

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// Either correct/wrong choice selected, go to the next question
// Event Delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Winsss!!!!');
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('Lost!!!!');
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }
});


function displayResult() {
    const result = `
        <p>You got ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length} <br> Try again! </p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function() {
    counter = 15;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}


// Display a .gif when question is answered
function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
            <p class="preload-image">You are Correct!</p>
            <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(funImages)}" />
        `);
    } else {
        $('#game').html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image">Better luck next time!</p>
            <img src="${randomImage(sadImages)}" />
        `);
    }
}

$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});