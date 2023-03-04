let lowerNum = "";
let upperNum = "";
let currentOperation = null;

const numButtons = document.querySelectorAll("[data-number]");
const operButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-clear-all]");
const prevNumberTextEl = document.getElementById("prevNumber");
const currNumberTextEl = document.getElementById("currNumber");

numButtons.forEach((numBtn) => {
  numBtn.addEventListener("click", () => appendNumber(numBtn.textContent));
});

operButtons.forEach((operBtn) => {
  operBtn.addEventListener("click", () => chooseOperation(operBtn.textContent));
});

clearAllButton.addEventListener("click", () => clear());
deleteButton.addEventListener("click", () => deleteNum());
equalButton.addEventListener("click", () => evaluate());
window.addEventListener("keydown", handleKeyBoardInput);

function clear() {
  currentOperation = null;
  currNumberTextEl.textContent = "";
  prevNumberTextEl.textContent = "";
  upperNum = "";
  lowerNum = "";
}

function deleteNum() {
  currNumberTextEl.textContent = currNumberTextEl.textContent
    .toString()
    .slice(0, -1);
}

function appendNumber(num) {
  if (num === "." && lowerNum.includes(".")) return;
  currNumberTextEl.textContent += num;
  lowerNum = currNumberTextEl.textContent;
}

function chooseOperation(operator) {
  if (currentOperation !== null) evaluate();
  upperNum = currNumberTextEl.textContent;
  currentOperation = operator;
  prevNumberTextEl.textContent = `${upperNum} ${operator}`;
  currNumberTextEl.textContent = "";
}

function evaluate() {
  if (currentOperation === null) return;
  if (currNumberTextEl.textContent === "0" && currentOperation === "/") {
    alert("You DO KNOW that you can not divide by zero! Right ?");
    return clear();
  }
  if (lowerNum === "" || upperNum === "") return clear();
  lowerNum = currNumberTextEl.textContent;
  currNumberTextEl.textContent = resultRounded(
    operate(currentOperation, upperNum, lowerNum)
  );
  prevNumberTextEl.textContent = `${upperNum} ${currentOperation} ${lowerNum} =`;
  currentOperation = null;
}

function resultRounded(number) {
  return Math.round(number * 1000) / 1000;
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
