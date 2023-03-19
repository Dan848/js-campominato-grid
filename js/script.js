const levelForm = document.getElementById("levelForm");
levelForm.addEventListener("submit", play);


//Funzione per creare un tag HTML, assegnargli un array di classi e stampare al suo interno del testo
function createChild(tagName, classes, text) {
    const newElement = document.createElement(tagName);
    newElement.innerHTML = text;
    addClasses(newElement, classes);
    return newElement;
}

//Funzione per aggiungere un array di classi
function addClasses (element, classes) {
    for (const _class of classes) {
        element.classList.toggle(_class);
    }
}

//Funzione per generare un numero randomico tra min (compreso) e max (non compreso)
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Funzione per creare il quadrato e associare un ID in base alla riga e colonna
function createSquare(nRow, nCol, nSquare) {
    const square = createChild ("div",["square", "hide"], nSquare);
    square.id = `${nRow}-${nCol}`;
    return square;
}

//Funzione per creare le bombe in modo casuale 
function createBombs(nBomb, nSquares){
    const bombs = [];
    while (bombs.length < nBomb) {
        const bomb = getRndInteger(0, nSquares);
        if (!bombs.includes(bomb)) {
        bombs.push(bomb);
        }
    }
    return bombs;
}

function checkAround(n1, n2){
    const squareAround = [
    document.getElementById(`${n1-1}-${n2-1}`),
    document.getElementById(`${n1-1}-${n2}`),
    document.getElementById(`${n1-1}-${n2+1}`),
    document.getElementById(`${n1}-${n2-1}`),
    document.getElementById(`${n1}-${n2+1}`),
    document.getElementById(`${n1+1}-${n2-1}`),
    document.getElementById(`${n1+1}-${n2}`),
    document.getElementById(`${n1+1}-${n2+1}`)
    ]
    return squareAround;
}

function play (e) {
    e.preventDefault();
    //Prendo il valore del livello selezionato
    const level = document.getElementById("levelSelect").value;
    //Numero di bombe
    const numBombs = 16;
    //Aggancio l'elemento del DOM #playBoard...
    const playBoard = document.getElementById("playBoard");
    //...lo svuoto prima di inserire altri elementi
    playBoard.innerHTML = "";
    let squareSide;
    //Imposto quanti quadrati per lato in base al livello
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

    //Associo a una variabile CSS il numero di quadrati per lato, così da poterli dimensionare correttamente
    document.documentElement.style.setProperty('--squareSide', squareSide);
    let squareNumber = "";
    for (let i = 1; i <= squareSide; i++){
        for (let j=1; j <= squareSide; j++){
            playBoard.append(createSquare(i, j, squareNumber));
            // squareNumber++;
        }
    }

    //Creo un array per le bombe e per i quadrati
    const allBombs = createBombs(numBombs, squareSide*squareSide);
    const allSquares = Array.from(document.querySelectorAll(".square"));
    console.log(allBombs);

    //Posiziono le bombe
    for (let i = 0; i < allSquares.length; i++) {
        if (allBombs.includes(i)) {
            const cellBomb = allSquares[i];
            cellBomb.classList.add("bomb");
            cellBomb.innerHTML = `<i class="fa-solid fa-bomb"></i>`     
        }
        allSquares[i].addEventListener("click", function(){
            allSquares[i].classList.remove("hide")
        })
    }

    //Ottengo l'array con la posizone di tutte le bombe
    const bombsDone = Array.from(document.querySelectorAll(".bomb"));
    console.log(bombsDone);
    //Piazzo attorno ad ogni bomba un numero che indica quante bombe ho vicine
    for(let i = 0; i < bombsDone.length; i++){
    const x = parseInt(bombsDone[i].id.split("-")[0]);
    const y = parseInt(bombsDone[i].id.split("-")[1]);
    const around = checkAround(x, y);
    console.log(around);
        for(let j = 0; j < around.length; j++){
        if(around[j] && !around[j].classList.contains("bomb")) {
            around[j].classList.add("num")
            if (around[j].textContent == 1){
                around[j].textContent = 2;
            }
            else if (around[j].textContent == 2){
                around[j].textContent = 3;
            }
            else if (around[j].textContent == 3){
                around[j].textContent = 4;
            }
            else if (around[j].textContent == 4){
                around[j].textContent = 5;
            }
            else if (around[j].textContent == 5){
                around[j].textContent = 6;
            }
            else if (around[j].textContent == 6){
                around[j].textContent = 7;
            }
            else if (around[j].textContent == 7){
                around[j].textContent = 8;
            }
            else {
                around[j].textContent = 1;
            }
        }
        }
    }
}