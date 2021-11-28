"use strict"

const inputCapital = document.querySelector(".Capital");
const inputRisk = document.querySelector(".Risk");
const inputProfit = document.querySelector(".Profit");
const inputOdds = document.querySelector(".Odds");
const inputTrades = document.querySelector(".Trades");
const buttonCalculate = document.querySelector(".btn--calc");
const message = document.querySelector(".Message");
const allInputs = document.querySelectorAll(".input");

const capitalArrayContainer = document.querySelector(".ArrayOfCapital");

// This function formats whatever number is given, and seperates them in 1000's for easier reading at the end.
const numberFormat1000 = function (number) {

    const numberString = number.toString(10);

    const numArr = [];
    for (let i = 0; i < numberString.length; i++) {
        numArr.push(numberString[i]);
    }

    for (let i = numArr.length - 3; i > 0; i -= 3) {
        numArr.splice(i, 0, ",");
    }

    const finalNumber = numArr.join("");
    return finalNumber;

}

// This function returns an array of trading outcomes depending on the probability of winning, and number of trades given.
const oneOutOf = function (num, numTrades) {
    const allNumbers = [];
    const winningNumbers = [];
    for (let i = 0; i < numTrades; i++) {
        const ranNum = Math.trunc(Math.random() * num) + 1;
        allNumbers.push(ranNum);
        if (ranNum === num) winningNumbers.push(ranNum);
    };


    let trades = [];
    let totalTrades, winTrades, loseTrades = 0;
    for (let i = 0; i < numTrades; i++) {
        if (allNumbers[i] === num) allNumbers[i] = 1;
        else allNumbers[i] = 0;
    };

    // Final array of trading outcomes.
    console.log(allNumbers)
    return allNumbers;

}

const calcCapital = function (risk, profit, num, numTrades, startingCapital) {

    // Calling function that generates the possibilities of winning/losing trades for given odds and saving it into a variable to loop over.
    const trade = oneOutOf(num, numTrades);
    let capital = startingCapital;

    // Generating capital income/loss for each trade and adding HTML elements.
    for (let i = 0; i < numTrades; i++) {
        if (trade[i] === 1) {
            capital = (1 + profit / 100) * capital;
            console.log(capital.toFixed());
            capitalArrayContainer.insertAdjacentHTML("beforeend", `<label><span class="SpanProfit">Trade ${i + 1}: ${capital.toFixed()}</span></label><br>`)

        } else {
            capital = ((100 - risk) / 100) * capital
            console.log(capital.toFixed());
            capitalArrayContainer.insertAdjacentHTML("beforeend", `<label><span class="SpanRisk">Trade ${i + 1}: ${capital.toFixed()}</span></label><br>`)
        }
    }

    // Calculation of the final gain/loss and adding green/red span.
    const gainLoss = function () {
        if (capital - startingCapital > 0) return ` <span class="SpanProfit">gain of ${(((capital - startingCapital) / startingCapital) * 100).toFixed(2)}</span>`;
        else return `<span class="SpanRisk">loss of ${(((capital - startingCapital) / startingCapital) * 100).toFixed(2)}</span>`;
    };

    // Removing and adding a new child with the text message.
    message.innerHTML = "";
    message.insertAdjacentHTML("beforeend", `If you were to start trading with a capital of ${numberFormat1000(startingCapital.toFixed())} with the odds of 1 to ${num} (${1 / num * 100}%) of winning a trade, after ${numTrades} trades you would end up with ${numberFormat1000(capital.toFixed())}. That is a ${gainLoss()} %! `);

};

// Main functionality 
buttonCalculate.addEventListener("click", function () {

    // Hiding elements and erasing the container.
    message.classList.add("hidden");
    capitalArrayContainer.classList.add("hidden");
    capitalArrayContainer.innerHTML = "";

    // Check to see if inputs are correct before trying to run the function.
    if (!isACorrectNumber()) {
        alert("Please fill in a positive number.");
        return;
    }

    // Main function call
    setTimeout(() => {
        calcCapital(
            +inputRisk.value,
            +inputProfit.value,
            +inputOdds.value,
            +inputTrades.value,
            +inputCapital.value)

        capitalArrayContainer.classList.remove("hidden");

        message.classList.remove("hidden");
    }, 1000);



});

// Clumsy checking if the input is a number greater than 0
const isACorrectNumber = function () {
    if (+inputCapital.value < 1) return false;
    if (+inputRisk.value < 1) return false;
    if (+inputProfit.value < 1) return false;
    if (+inputOdds.value < 1) return false;
    if (+inputTrades.value < 1) return false;

    return true;
};

