let firstNumber = "";
let secondNumber = "$";

let tempFirstNumber = "";
let tempSecondNumber = "";

let operator = "";
let outputNumber = 0;

for (let i = 0; i < 17; i++) {
    $("#btn-" + i).click(function () {
        let btnID = $('#btn-' + i);
        let pressedBtnText = btnID.text().trim();
        switch (pressedBtnText) {
            case "C" :
                firstNumber = "";
                secondNumber = "$";
                tempFirstNumber = "";
                tempSecondNumber = "";
                operator = "";
                outputNumber = 0;
                $('#input-field').val("0");
                break;

            case "+":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "-":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "/":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "*":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "=":
                if (isNaN(secondNumber)) {
                    $('#input-field').val(tempFirstNumber);
                } else {
                    outputNumber = getOutPut(operator, firstNumber, secondNumber);
                    $('#input-field').val(outputNumber);
                    tempFirstNumber = "";
                    tempSecondNumber = "";
                    setNumbers(outputNumber, "");
                }
                break;

            default:
                setNumbers(pressedBtnText, pressedBtnText);
                break;
        }
    });
}

function getOutPut(operatorSign, fNumber, sNumber) {
    if (operatorSign === "+") {
        outputNumber = parseFloat(fNumber) + parseFloat(sNumber);
        return outputNumber;
    } else if (operatorSign === "-") {
        outputNumber = parseFloat(fNumber) - parseFloat(sNumber);
        return outputNumber;
    } else if (operatorSign === "/") {
        outputNumber = parseFloat(fNumber) / parseFloat(sNumber);
        return outputNumber;
    } else {
        outputNumber = parseFloat(fNumber) * parseFloat(sNumber);
        return outputNumber;
    }
}

function setNumbers(fNumber, sNumber) {
    if (tempFirstNumber !== "Undefined") {
        tempFirstNumber += fNumber;
        $('#input-field').val(tempFirstNumber);
    }

    if (tempFirstNumber === "Undefined") {
        tempSecondNumber += sNumber;
        secondNumber = tempSecondNumber;
        $('#input-field').val(secondNumber);
    }
}