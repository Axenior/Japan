let start = false
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;

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
    // Increment the seconds
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
const practiceBox = document.body.querySelector('.practice-container .box')
container.addEventListener('click',function(e){
    if(e.target.parentNode.classList.contains('content1')){
        choose = e.target.textContent.toLowerCase()
        container.classList.add('display')
        practiceBox.classList.remove('display')
        timerElement.classList.remove('display')
        getKana(choose)
    }
})
async function fetchKana(){
    try {
        const response = await fetch("/kana/kana.json");
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

let kana;
let tempKey;
let correctAnswer = 0
let totalQuestion;

const box_kana = document.querySelector('.box .top h1')
const input = document.body.querySelector('.box .bottom input')

function getRandomKeyAndDelete(kana,choose) {
    const keys = Object.keys(kana);
    if (keys.length === 0) {
        stopTimer()
        box_kana.innerHTML = "Selesai"
        input.value = timerElement.textContent
        input.readOnly = true
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    
    // Get the corresponding value for the random key
    const randomValue = kana[randomKey];
    
    // Delete the key-value pair from the object
    
    tempKey = randomKey
    box_kana.innerHTML = randomValue[choose]
    delete kana[randomKey];
}

async function getKana(choose) {
    kana = await fetchKana();
    totalQuestion = Object.keys(kana).length
    if(kana){
        getRandomKeyAndDelete(kana,choose);
    }

}

input.addEventListener('keyup',function(){
    // Start a timer that repeats a function at a specified interval
    if(!start){
        startTimer()
    }
    if(input.value.toLowerCase() === tempKey){
        input.value =''
        correctAnswer++
        getRandomKeyAndDelete(kana,choose)
    }
})
