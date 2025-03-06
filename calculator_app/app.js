// Calculator App

const display = document.querySelector(".display");
let history = [];
const historyContainer = document.querySelector(".history");
const historyList = document.querySelector(".history-list");
const clearButton = document.querySelector("clear-history");

function appendToDisplay(input){
    display.value += input;
}

function calculate(){
    try{
    let input = display.value;

    // islemi hesapla değeri yaz
    let result = eval(display.value);
      display.value = result;

    // geçmise ekleme
    let newEntry = `${input} = ${display.value}`
    history.push(newEntry);
    updateHistory();

    // LocalStorage'a kaydet
    localStorage.setItem("calcHistory", JSON.stringify(history));
    }
    catch{
        display.value = "Error";
    }
}

function clearDisplay(){
    display.value = "";
}

function updateHistory(){
    historyList.innerHTML = "";
    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });

}

function clearHistory(){
    history = [];
    localStorage.removeItem("calcHistory");
    updateHistory();
}