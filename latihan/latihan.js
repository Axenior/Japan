let start = false
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;

let kana;
let kosakata;
let tempKosakata;
let tempKey;
let noQuestion = 0;
let correctAnswer = 0
let totalQuestion;
let totalSelectQuestion;

function startTimer(){
    intervalId = setInterval(function() {
        // seconds++
        // console.log(seconds)
        updateTimer()
    }, 1000);
    start = true
}

function stopTimer(){
    clearInterval(intervalId)
    console.log(seconds)
}

const timerElement = document.body.querySelector('.timer')
function updateTimer() {
    seconds++;

    // Update minutes and reset seconds if necessary
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    // Update hours and reset minutes if necessary
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    // Format hours, minutes, and seconds with leading zeros
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update the timer element
    timerElement.textContent = formattedTime;
}

let choose;
const container = document.body.querySelector('.container')
const totalQuestionElement = document.body.querySelector('.total-question')
const rangeQuestion = document.body.querySelector('#range-question')

const practiceBox = document.body.querySelector('.practice-container .box')
const practiceKosakata = document.body.querySelector('.practice-container .kosakata')
container.addEventListener('click',function(e){
    if(e.target.parentNode.classList.contains('content1')){
        choose = e.target.textContent.toLowerCase()
        container.classList.add('display')
        practiceBox.classList.remove('display')
        timerElement.classList.remove('display')
        getKana(choose)
        const back = document.body.querySelector('.back')
        back.classList.remove('display')
    }
    else if(e.target.parentNode.classList.contains('content2')){
        choose = e.target.textContent.toLowerCase()

        const handleAsyncOperation = async () => {
            await getTotalQuestion(choose);
            
            // Continue with the rest of your code here
            container.classList.add('display');

            rangeQuestion.innerHTML = `1 - ${totalQuestion}`
            totalQuestionElement.classList.remove('display');
            // practiceKosakata.classList.remove('display');
            // getKosakata(choose);
        };
        
        handleAsyncOperation();
        const back = document.body.querySelector('.back')
        back.classList.remove('display')
    }
    
})

const totalInput = document.body.querySelector('#total-input')
const submitButton = document.body.querySelector('#submit')

submitButton.addEventListener('click',function(){
    if(totalInput.value > 0 && totalInput.value <= totalQuestion){
        totalSelectQuestion = totalInput.value
        totalQuestionElement.classList.add('display')
        practiceKosakata.classList.remove('display');
        getKosakata(choose);
        const back = document.body.querySelector('.back')
        back.classList.add('display')
    }else{
        const alert = document.body.querySelector('.alert')
        alert.classList.remove('display')
    }
})

async function fetchKana(){
    try {
        const response = await fetch("../kana/kana.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error Loading JSON data : ", error);
        return null;
    }
}

async function fetchKosakata(x){
    try{
        const response = await fetch("../kosakata/"+x+".json");
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        return data;
    }catch (error){
        console.log("Error Loading JSON data : ",error)
        return null;
    }
}


const box_kana = document.querySelector('.box .top h1')
const input = document.body.querySelector('.box .bottom input')

function getRandomKeyAndDeleteKana(kana,choose) {
    const keys = Object.keys(kana);
    if (keys.length === 0) {
        stopTimer()
        box_kana.innerHTML = "Selesai"
        input.value = timerElement.textContent
        input.readOnly = true
        const back = document.body.querySelector('.back')
        back.classList.remove('display')
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    
    // Get the corresponding value for the random key
    const randomValue = kana[randomKey];
    
    tempKey = randomKey
    box_kana.innerHTML = randomValue[choose]

    // Delete the key-value pair from the object
    delete kana[randomKey];
}

async function getKana(choose) {
    kana = await fetchKana();
    totalQuestion = Object.keys(kana).length
    if(kana){
        getRandomKeyAndDeleteKana(kana,choose);
    }
}

input.addEventListener('keyup',function(){
    // Start a timer that repeats a function at a specified interval
    if(!start){
        startTimer()
        const back = document.body.querySelector('.back')
        back.classList.add('display')
    }
    if(input.value.toLowerCase() === tempKey){
        input.value =''
        correctAnswer++
        getRandomKeyAndDeleteKana(kana,choose)
    }
})

const numberElement = document.querySelector('.number-kanji')
const kanji = document.body.querySelector('.kosakata .kanji')
// console.log(kanji)
function getRandomKeyAndDeleteKosakata(kosakata) {
    const keys = Object.keys(kosakata);
    if (noQuestion == totalSelectQuestion) {
        const scoreElement = document.body.querySelector('.score')
        const numberScore = document.body.querySelector('.number-score p')
        numberScore.innerHTML = `${correctAnswer}/${numberElement.textContent}`
        kanji.innerHTML = "Selesai"
        kanji.classList.add('finish')
        scoreElement.classList.remove('display')
        optionContainer.classList.add('display')
        numberElement.classList.add('display')
        const back = document.body.querySelector('.back')
        back.classList.remove('display')
        return;
    }

    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    
    // Get the corresponding value for the random key
    const randomValue = kosakata[randomKey];

    tempKey = randomKey
    noQuestion++
    numberElement.innerHTML = noQuestion
    kanji.innerHTML = randomValue['kanji']
    getOption(tempKey)
    // Delete the key-value pair from the object
    delete kosakata[randomKey];
}

async function getKosakata(x){
    kosakata = await fetchKosakata(x);
    tempKosakata = await fetchKosakata(x);
    totalQuestion = Object.keys(kosakata).length
    if(kosakata){
        getRandomKeyAndDeleteKosakata(kosakata);
        // return kosakata;
    }
}

async function getTotalQuestion(x){
    kosakata = await fetchKosakata(x);
    totalQuestion = Object.keys(kosakata).length
}


const optionElements = document.body.querySelectorAll('.option')
function getOption(answerKey){
    const answer = answerKey
    // const tempOption = tempKosakata
    const tempOption = Object.assign({}, tempKosakata)

    delete tempOption[answer]

    let keys = Object.keys(tempOption);
    let randomIndex = Math.floor(Math.random() * keys.length);
    let randomKey = keys[randomIndex];
    const option1 = randomKey
    delete tempOption[randomKey]

    keys = Object.keys(tempOption);
    randomIndex = Math.floor(Math.random() * keys.length);
    randomKey = keys[randomIndex];
    const option2 = randomKey

    let options = [answer,option1,option2]
    optionElements.forEach(function(element){
        const randomIndex = Math.floor(Math.random() * options.length)
        element.children[0].innerHTML = options[randomIndex]
        element.children[1].innerHTML = tempKosakata[options[randomIndex]]['arti']
        // console.log(tempKosakata[options[randomIndex]]['arti'])

        options = options.slice(0, randomIndex).concat(options.slice(randomIndex + 1))
        // console.log(options)
    })
}

const optionContainer = document.body.querySelector('.option-container')

optionContainer.addEventListener('click', handleClick);

function handleClick(e) {
  let target = e.target;
  
  while (target && !target.classList.contains('option')) {
    target = target.parentElement;
  }
  if(target && target.classList.contains('option')){
      // Menonaktifkan event listener saat sedang berjalan
      optionContainer.removeEventListener('click', handleClick);
      
      if (target.firstElementChild.textContent == tempKey) {
          correctAnswer++;
        }
        optionElements.forEach(function(element){
            if(element.firstElementChild.textContent == tempKey){
                element.classList.add('correct')
            }else{
                element.classList.add('wrong')
            }
        })
        setTimeout(function () {
            optionElements.forEach(function(element){
                element.classList.remove('correct')
                element.classList.remove('wrong')
            })
            getRandomKeyAndDeleteKosakata(kosakata);
            
            optionContainer.addEventListener('click', handleClick);
        }, 1000);
    }

//   console.log(target);
}

