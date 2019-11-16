const canvas = document.querySelector(".jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector(".jsRange");
const lineValue = document.querySelector(".line-width__current");
const colors = document.getElementsByClassName("jsColor");
const fillBtn = document.querySelector(".jsMode");
const saveBtn = document.querySelector(".jsSave");
const clearBtn = document.querySelector(".jsClear");

const CANVAS_INITIAL = 600;
const FILL_INITIAL = "white";

canvas.width = CANVAS_INITIAL;
canvas.height = CANVAS_INITIAL;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_INITIAL, CANVAS_INITIAL);
ctx.strokeStyle = "black";
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function mouseMoveEvent(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (painting && !filling) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function getRangeValue(event) {
  const lineWidth = event.target.value;
  ctx.lineWidth = lineWidth;
  lineValue.innerHTML = lineWidth;
}

function fillMode() {
  if (filling === false) {
    fillBtn.innerHTML = "paint";
    filling = true;
  } else {
    fillBtn.innerHTML = "fill";
    filling = false;
  }
}

function getColors(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function fillCanvas() {
  if (filling === false) {
    ctx.stroke();
  } else {
    ctx.fillRect(0, 0, CANVAS_INITIAL, CANVAS_INITIAL);
  }
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_INITIAL, CANVAS_INITIAL);
}

function saveCanvas() {
  const saveUrl = canvas.toDataURL("image/png");
  const test = document.createElement("a");
  test.href = saveUrl;
  test.download = "test";
  test.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", mouseMoveEvent);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillCanvas);
}

if (range) {
  range.addEventListener("input", getRangeValue);
}

if (fillBtn) {
  fillBtn.addEventListener("click", fillMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveCanvas);
}

if (clearBtn) {
  clearBtn.addEventListener("click", clearCanvas);
}

Array.from(colors).forEach(color => color.addEventListener("click", getColors));
