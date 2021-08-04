/**
 * Create grids on page using specified rows and cols
 * make them inside a container div
 * using css grid
 */

const container = document.getElementById('grid');
const slider = document.getElementById('slider');
const displaySize = document.getElementById('display');
const picker = document.getElementById('picker');

const randomBtn = document.getElementById('randomBtn');
const colorBtn = document.getElementById('colorBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');

const DEFAULT_VAL = 16; //as the rows and columns are of same number
const DEFAULT_MODE = 'randomized';
const DEFAULT_COLOR = '#ffcccc';

let currentSize = DEFAULT_VAL;
let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;

function resetGrid() {
    container.innerHTML = ''
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

function setCurrentMode(newMode) {
    changeMode(newMode);
    currentMode = newMode;
}

function reloadGrid() {
    resetGrid();
    makeGrid(currentSize);
}

function changeDisplaySize(outputSize) {
    displaySize.innerText = `${outputSize} x ${outputSize}`;
}

function changeCurrentColor(newColor) {
    currentColor = newColor;
}

function changeSize(value) {
    setCurrentSize(value);
    changeDisplaySize(value);
    reloadGrid();
}

slider.onchange = (e) => changeSize(e.target.value);
slider.onmousemove = (e) => changeDisplaySize(e.target.value);

picker.onchange = (e) => changeCurrentColor(e.target.value);

randomBtn.onclick = () => setCurrentMode('randomized');
colorBtn.onclick = () => setCurrentMode('color');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();

function makeGrid(size) {
    container.style.setProperty('--grid-rows', size);
    container.style.setProperty('--grid-cols', size);

    for (let c = 0; c < (size * size); c++) {
        let cell = document.createElement('div');
        cell.addEventListener('mouseover', changeColor);
        container.appendChild(cell)
    }
}

function changeColor(e) {

    if ( currentMode === 'randomized') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`
    } else if ( currentMode === 'color' ) {
        e.target.style.backgroundColor = currentColor;
    } else if ( currentMode === 'eraser' ) {
        e.target.style.backgroundColor = '#fff'
    }
}

function changeMode(newMode) {
    if ( currentMode === 'randomized' ) {
        randomBtn.classList.remove('active');
    } else if ( currentMode === 'color' ) {
        colorBtn.classList.remove('active');
    } else if ( currentMode === 'eraser' ) {
        eraserBtn.classList.remove('active');
    }

    if( newMode === 'randomized' ) {
        randomBtn.classList.add('active');
    } else if ( newMode === 'color' ) {
        colorBtn.classList.add('active');
    } else if ( newMode === 'eraser' ) {
        eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    makeGrid(DEFAULT_VAL);
    changeMode(DEFAULT_MODE)
}