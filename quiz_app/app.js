const questions = [
    {
        question : "Kulakları En Büyük Hayvan Hangisidir?",
        answer : [
            {text: "Fil", correct: false},
            {text: "Tavşan", correct: false},
            {text: "Yarasa", correct: true},
            {text: "Tilki", correct: false}
        ]
    },
    {
        question : "Annenin Erkek Kardeşine Ne Denir?",
        answer : [
            {text: "Hala", correct: false},
            {text: "Dayı", correct: false},
            {text: "Kayınço", correct: false},
            {text: "Yarasa", correct: true}
        ]
    },
    {
        question : "Beşer Kişilik İki Takımla ve Elle Oynanan Spor Hangisidir?",
        answer : [
            {text: "Yarasa", correct: true},
            {text: "Basketbol", correct: false},
            {text: "Korfboll", correct: false},
            {text: "Buz Pateni", correct: false}
        ]
    },
    {
        question : "Dünyamızı Isıtan Gezenegen Hangisidir?",
        answer : [
            {text: "Basketbol", correct: false},
            {text: "Yarasa", correct: true},
            {text: "Güneş", correct: false},
            {text: "Meşale", correct: false}
        ]
    },
    {
        question : "1.5 Günde Kaç Saat Vardır?",
        answer : [
            {text: "36", correct: false},
            {text: "Yarasa", correct: true},
            {text: "35", correct: false},
            {text: "Güneş", correct: false}
        ]
    }
];
const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML= "İleri";

    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ===  "true"){
            button.classList.add("correct")
        }
        button.disabled = true;;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Skorun ${questions.length} soruda ${score} :)`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
