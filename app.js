const canvas = document.getElementById("js_canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js_color");
const range = document.getElementById("js_range");
const mode = document.getElementById("js_mode");
const save = document.getElementById("js_save");

const INITIAL_COLOR = "#2C2C2C";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.6;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    startPainting();
}

function onMouseUp(event) {
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const width = event.target.value;
    ctx.lineWidth = width;
}

function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS.png";
    link.click();
}

function init() {
    if (canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM);
    }
    
    if (colors) {
        Array.from(colors).forEach(color => 
            color.addEventListener("click", handleColorClick)
        );
    }
    
    if (range) {
        range.addEventListener("input", handleRangeChange);
    }
    
    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }
    
    if (save) {
        save.addEventListener("click", handleSaveClick);
    }
}

init();