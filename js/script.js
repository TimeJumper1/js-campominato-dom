
let test = 0;


document.getElementById('play').addEventListener('click', startGame);

function startGame(){
    // funzioni reset del gioco
    const gridContainer = document.getElementById('ms_grid');
    gridContainer.innerHTML = '';
    const endGameText = document.getElementById('final-message')
    endGameText.classList.add('hidden')
    let difficoltas = document.getElementById('difficulty-selector').value;
    const bombsAmount = 16;
    // verifica scelta difficolta dell'utente
    if (difficoltas === '100'){
        test = 100
    }else if(difficoltas === '81'){
        test = 81
    }else if(difficoltas === '49'){
        test = 49
    } 
    const bombsArray =generateBombs(test, bombsAmount);
    // console.log(bombsArray) //for testing purpose
    // popolare la griglia
    for (let i = 1; i < test+1; i++){
        function generateSquareElement(quantyOfSquares){
            const newSquare = document.createElement('div');
            newSquare.classList.add(`ms_square_${quantyOfSquares}`  );

            newSquare.innerHTML = `<span>${i}</span>`;
            return newSquare;
        }
        const newGenerateSquare = generateSquareElement(difficoltas);
        newGenerateSquare.addEventListener('click', handleSquareClick);
        gridContainer.appendChild(newGenerateSquare);
    }
    // gestione click dell'utente sulla casella 
    function handleSquareClick() {
        // controllo bombe nella casella e controllo vittoria o sconfitta
        const clickedNumber = parseInt(this.querySelector('span').textContent);
        if (bombsArray.includes(clickedNumber)){
            this.classList.add('bomb')
            
            endGame('lose')
        }else{
            this.classList.add('active');
            this.style.pointerEvents = "none"
            // creazione contatore square "attivati"
            rightAttempts.push(clickedNumber);
            if(rightAttempts.length >= maxAttempt){
                endGame('win')
            }
        }
    }
    const maxAttempt = test - bombsArray.length;
    const rightAttempts =[];
    // funzione di endgame
    function endGame(winOrLose){
        // gestione messaggi vittoria e sconfitta
        if(winOrLose === 'win'){
            const winMessage = 'congratulazioni hai vinto'
            const endGameText = document.getElementById('final-message')
            endGameText.innerHTML = winMessage
            endGameText.classList.remove('hidden')
        }else{
            
            const loseMessage = 'peccato hai perso, hai azzeccato ' + rightAttempts.length + ' tentativi'
            const endGameText = document.getElementById('final-message')
            endGameText.innerHTML = loseMessage
            endGameText.classList.remove('hidden')
            
        }
        // rende non cliccabili tutti gli elementi square qualsiasi sia la difficolta scelta
        const allsquareEasy = document.getElementsByClassName('ms_square_100')
        for(let i = 0; i< allsquareEasy.length; i++) {
            const thisCell = allsquareEasy[i]
            thisCell.style.pointerEvents = "none"
            const cellNumber = parseInt(thisCell.querySelector('span').textContent);
            if(bombsArray.includes(cellNumber)){
                thisCell.classList.add('bomb')
            }
        }
        const allsquareMedium = document.getElementsByClassName('ms_square_81')
        for(let i = 0; i< allsquareMedium.length; i++) {
            const thisCell = allsquareMedium[i]
            thisCell.style.pointerEvents = "none"
            const cellNumber = parseInt(thisCell.querySelector('span').textContent);
            if(bombsArray.includes(cellNumber)){
                thisCell.classList.add('bomb')
            }
        }
        const allsquareHard = document.getElementsByClassName('ms_square_49')
        for(let i = 0; i< allsquareHard.length; i++) {
            const thisCell = allsquareHard[i]
            thisCell.style.pointerEvents = "none"
            const cellNumber = parseInt(thisCell.querySelector('span').textContent);
            if(bombsArray.includes(cellNumber)){
                thisCell.classList.add('bomb')
            }
        }
    }
}





// numero effettivo di bombe (16) = numberOfBombs
// quali numeri le bombe possono appartenere = maxRangeNumber
function generateBombs(maxRangeNumber, numberOfBombs){
    const arrayOfBombs = [];
    while (arrayOfBombs.length < numberOfBombs){
        const randomNumber = getRndInteger(1, maxRangeNumber);
        if(!arrayOfBombs.includes(randomNumber)){
            arrayOfBombs.push(randomNumber)
        }
    }
    return arrayOfBombs
}



// funzione numero casuale
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}