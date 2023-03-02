const screenDisplay = document.getElementById("inputField");
const numButtons = document.querySelectorAll("[data-number]");
const operButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const delButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-clear-all]");
const prevOperandTextElem = document.querySelector("[data-prev-operand]");
const currOperandTextElem = document.querySelector("[data-curr-operand]");

let upperOperand = "";
let lowerOperand = "";
let currOperation = null;

numButtons.forEach((numButton) => {
  numButton.addEventListener("click", () =>
    appendNumber(numButton.textContent)
  );
});

operButtons.forEach((operButton) => {
  operButton.addEventListener("click", () =>
    chooseOperation(operButton.textContent)
  );
});

equalButton.addEventListener("click", () => evaluate());
delButton.addEventListener("click", () => deleteNum());
clearAllButton.addEventListener("click", () => clear());
window.addEventListener("keydown", handleKeyBoardInput);

function appendNumber(btn) {
  if (btn === "." && lowerOperand.includes(".")) return;
  currOperandTextElem.textContent += btn;
  lowerOperand = currOperandTextElem.textContent;
}

function chooseOperation(operator) {
  if (currOperation !== null) evaluate();
  upperOperand = currOperandTextElem.textContent;
  currOperation = operator;
  prevOperandTextElem.textContent = `${upperOperand} ${currOperation} `;
  currOperandTextElem.textContent = "";
}

function evaluate() {
  if (currOperation === null) return;
  if (currOperation === "/" && currOperandTextElem.textContent === "0") {
    alert("You DO know that you can not divide by 0! Right?");
    clear();
    return;
  }
  if (lowerOperand === "" || upperOperand === "") return clear();

  lowerOperand = currOperandTextElem.textContent;
  currOperandTextElem.textContent = resultRounded(
    operate(currOperation, upperOperand, lowerOperand)
  );

  prevOperandTextElem.textContent = `${upperOperand} ${currOperation} ${lowerOperand} =`;

  currOperation = null;
}

function resultRounded(number) {
  return Math.round(number * 1000) / 1000;
}

function clear() {
  currOperandTextElem.textContent = "";
  prevOperandTextElem.textContent = "";
  prevOperand = "";
  currOperand = "";
  currOperation = null;
}

function deleteNum() {
  currOperandTextElem.textContent = currOperandTextElem.textContent
    .toString()
    .slice(0, -1);
}

function handleKeyBoardInput(e) {
  if (e.key === "Escape") clear();
  if (e.key === "Backspace") deleteNum();
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendNumber(e.key);
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    chooseOperation(e.key);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, numOne, numTwo) {
  numOne = Number(numOne);
  numTwo = Number(numTwo);

  switch (operator) {
    case "+":
      return add(numOne, numTwo);
      break;
    case "-":
      return subtract(numOne, numTwo);
      break;
    case "*":
      return multiply(numOne, numTwo);
      break;
    case "/":
      return divide(numOne, numTwo);
      break;
    default:
      return;
  }
}
