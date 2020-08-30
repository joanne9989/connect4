var changeTurns = document.getElementById("changeTurns");
var gameBoard = document.getElementById("gameBoard");
var resetButton = document.getElementById("resetButton");
var currentPlayer = randomNumber(1,2);
var bottom = [5, 5, 5, 5, 5, 5, 5];
var player1Circles = [];
var player2Circles = [];
var arrayToCheck = [];
var winnerDiv = document.getElementById("winnerDiv");


function createGameBoard(){
    for (i = 0; i < 6; i++){
        var row = "";
        
        var beforeRow = "<div class = 'row'>";
        row = row + beforeRow;
        var allColumns = "";
        for (j = 0; j < 7; j++){
            var beforeColumn = "<div class = 'col-sm'>";
            var column = `<div id = 'r${i}c${j}' class = 'circle'></div>`; 
            var afterColumn = "</div>";
            allColumns = allColumns + beforeColumn + column + afterColumn;
        }
        row = row + allColumns;
        var afterRow = "</div>";
        row = row + afterRow;
        
        gameBoard.innerHTML  = gameBoard.innerHTML + row; // keeps what you had previously
        }
}

function resetGameBoard(){
    while (gameBoard.hasChildNodes()){
        gameBoard.removeChild(gameBoard.lastChild);
    }
    createGameBoard();
    currentPlayer = randomNumber(1,2);
    bottom = [5, 5, 5, 5, 5, 5, 5];
    player1Circles = [];
    player2Circles = [];
    
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

function fillCircle(id){
    // id = "r0c0";
    
    var clickedColumn = id[3]; // 0
    var clickedRow = id[1]; // 0
    // bottom = [5, 5, 5, 5, 5, 5, 5]; index is the column and the value is the row
    var emptyCircleRow = bottom[clickedColumn]; // 5
    if (emptyCircleRow >= 0){
    bottom[clickedColumn] = bottom[clickedColumn] - 1; 
    
    var bottomCircleId = "r" + emptyCircleRow + "c" + clickedColumn; // r5c0 in the click function it will find out what the id is. When you call it, you will have to specify the id.
    var circle = document.getElementById(bottomCircleId);
    if (currentPlayer == 1) {
        circle.classList.remove("player2Colour");
        circle.classList.add("player1Colour");
        player1Circles.push(bottomCircleId);
        arrayToCheck = player1Circles;
        console.log("Player 1 circles arrayToCheck: " + arrayToCheck);
    } else {
        circle.classList.remove("player1Colour");
        circle.classList.add("player2Colour");
        player2Circles.push(bottomCircleId);
        arrayToCheck = player2Circles;
        console.log("Player 2 circles arrayToCheck: " + arrayToCheck);
    } 
    checkConnections();
} // if emptyCircleRow > 0    
}

function checkConnections(){
    if (isVerticallyConnected()){
        winnerDiv.innerHTML = `<div class = 'won myHeadings'>Player ${currentPlayer} has won!</div>`
        resetGameBoard();
    }

    if (isHorizontallyConnected()){
        winnerDiv.innerHTML = `<div class = 'won myHeadings'>Player ${currentPlayer} has won!</div>`
    }

    if (isDownDiagonal()){
        winnerDiv.innerHTML = `<div class = 'won myHeadings'>Player ${currentPlayer} has won!</div>`
    }

    if (isUpDiagonal()){
        winnerDiv.innerHTML = `<div class = 'won myHeadings'>Player ${currentPlayer} has won!</div>`
    }
}

function isVerticallyConnected(){
    for (i = 0; i < arrayToCheck.length; i++){
        if (i+1 != arrayToCheck.length){  
            var rowNumber = parseInt(arrayToCheck[i][1]);
            var colNumber = parseInt(arrayToCheck[i][3]); 
            var nextRowNumber = (rowNumber - 1); 
            var nextRowNumber2 = (nextRowNumber - 1); 
            var nextRowNumber3 = (nextRowNumber2 - 1);  
            var connectingCircle1 = "r" + nextRowNumber + "c" + colNumber;
            var connectingCircle2 = "r" + nextRowNumber2 + "c" + colNumber; 
            var connectingCircle3 = "r" + nextRowNumber3 + "c" + colNumber; 
            if (arrayToCheck.includes(connectingCircle1) && arrayToCheck.includes(connectingCircle2) && arrayToCheck.includes(connectingCircle3)){
                return true;                                
            }
        }
    } 
    return false;
} // function isVerticallyConnected

function isHorizontallyConnected(){
    for (i = 0; i < arrayToCheck.length; i++){

        var rowNumber = parseInt(arrayToCheck[i][1]);       // 
        var colNumber = parseInt(arrayToCheck[i][3]);       // 

                var nextColNumber = (colNumber + 1);        // 
                var nextColNumber2 = (nextColNumber + 1);   // 
                var nextColNumber3 = (nextColNumber2 + 1);  // 

                var fwConnectingCircle1 = "r" + rowNumber + "c" + nextColNumber;    //  
                var fwConnectingCircle2 = "r" + rowNumber + "c" + nextColNumber2;   //  
                var fwConnectingCircle3 = "r" + rowNumber + "c" + nextColNumber3;   //  

                if (arrayToCheck.includes(fwConnectingCircle1) && arrayToCheck.includes(fwConnectingCircle2) && arrayToCheck.includes(fwConnectingCircle3)){
                    return true;                                
                }       
        }
        return false;
    } // function isHorizontallyConnected


function isDownDiagonal(){

    for (i = 0; i < arrayToCheck.length; i++){

        var rowNumber = parseInt(arrayToCheck[i][1]);       // 
        var colNumber = parseInt(arrayToCheck[i][3]);       // 

                var nextColNumber = (colNumber + 1);        // c4    
                var nextColNumber2 = (nextColNumber + 1);   // c5 
                var nextColNumber3 = (nextColNumber2 + 1);  // c6

                var nextRowNumber = (rowNumber + 1);        // r4    
                var nextRowNumber2 = (nextRowNumber + 1);   // r5 
                var nextRowNumber3 = (nextRowNumber2 + 1);  // r6

                var connectingCircle1 = "r" + nextRowNumber + "c" + nextColNumber;    //  r1c1
                var connectingCircle2 = "r" + nextRowNumber2 + "c" + nextColNumber2;   //  r2c2
                var connectingCircle3 = "r" + nextRowNumber3 + "c" + nextColNumber3;   //  r3c3

                if (arrayToCheck.includes(connectingCircle1) && arrayToCheck.includes(connectingCircle2) && arrayToCheck.includes(connectingCircle3)){
                    return true;                                
                }       
        }
        return false;
    } // function isDownDiagonal

function isUpDiagonal(){

    for (i = 0; i < arrayToCheck.length; i++){

        var rowNumber = parseInt(arrayToCheck[i][1]);       // 
        var colNumber = parseInt(arrayToCheck[i][3]);       // 

            var nextRowNumber = (rowNumber - 1);        //    
            var nextRowNumber2 = (nextRowNumber - 1);   // 
            var nextRowNumber3 = (nextRowNumber2 - 1);  // 

            var nextColNumber = (colNumber + 1);        //     
            var nextColNumber2 = (nextColNumber + 1);   //  
            var nextColNumber3 = (nextColNumber2 + 1);  // 

            var connectingCircle1 = "r" + nextRowNumber + "c" + nextColNumber;    //  
            var connectingCircle2 = "r" + nextRowNumber2 + "c" + nextColNumber2;   //  
            var connectingCircle3 = "r" + nextRowNumber3 + "c" + nextColNumber3;   //  

            if (arrayToCheck.includes(connectingCircle1) && arrayToCheck.includes(connectingCircle2) && arrayToCheck.includes(connectingCircle3)){
                return true;                                
            }    
        } 
        return false;
    } // function isUpDiagonal


function changePlayersTurn(){ //
    if (currentPlayer == 1){    
        currentPlayer = 2;
        changeTurns.classList.remove("player1Colour");
        changeTurns.classList.add("player2Colour");
        changeTurns.innerHTML = "Player 2's Turn";

    } else {
        currentPlayer = 1;
        changeTurns.classList.remove("player2Colour");
        changeTurns.classList.add("player1Colour"); 
        changeTurns.innerHTML = "Player 1's Turn";

    }

}

//this says to the document, listen for click events on the document i.e. body of html, and when click event happens, call the function passed here:
//argument1 should be a string (name of the event) in this case "click"
//the only rule is that that function shall receive the event "e"
//argument2 should be the function which is to be called when that event happens. this function itself has 1 parameter "e" as in "event" 

document.addEventListener("click", function (e) {
var clickedArea = e.target;
if (clickedArea.className == "circle"){
    fillCircle(clickedArea.id);

    changePlayersTurn();
    // alert("Circle was clicked");
    // alert(clickedArea.id);
    
    // change colour of clickedArea to the player 1 or 2 colour
}
// } else {
//     alert(clickedArea.className);
// }
});

createGameBoard();
changePlayersTurn();

