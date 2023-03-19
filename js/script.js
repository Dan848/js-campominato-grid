const levelForm = document.getElementById("levelForm");
levelForm.addEventListener("submit", play)

function play (e) {
    e.preventDefault();
    const level = document.getElementById("levelSelect").value;
    const playBoard = document.getElementById("playBoard");
    playBoard.innerHTML = "";
    let squareSide;
    switch (level) {
        case "easy":
            squareSide = 10;
        break;
        
        case "medium":
            squareSide = 9;
        break;

        case "hard":
            squareSide = 7;
        break;
    };
    document.documentElement.style.setProperty('--squareSide', squareSide);
    let squareNumber = 1;
    for (let i=1; i <= squareSide; i++){
        for (let j=1; j <= squareSide; j++){
            playBoard.append(createSquare(i, j, squareNumber));
            squareNumber++;
        }
    }
}

function createSquare(nRow, nCol, nSquare) {
    const square = createChild ("div",["square"], nSquare);
    square.id = `${nRow}-${nCol}`;
    return square;
}

function createChild(tagName, classes, text) {
    const newElement = document.createElement(tagName);
    newElement.innerHTML = text;
    addClasses(newElement, classes);
    return newElement;
}

function addClasses (element, classes) {
    for (const _class of classes) {
        element.classList.toggle(_class);
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }