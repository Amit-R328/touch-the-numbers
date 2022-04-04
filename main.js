var gBoard;
var gClickedNums = [];
var gEltimer= document.querySelector('.timer')
var timer = false;;
var time;


function initHard(){
    gBoard = createBoard(25);
    renderBoard(gBoard,5)
}

function initExtreme(){
    gBoard = createBoard(36);
    renderBoard(gBoard,6)
}

function init() {
    gBoard = createBoard(16);
    renderBoard(gBoard,4)
}

function createBoard(num) {
    var board = [];
    for (var i = 0; i < num; i++) {
        board[i] = i + 1
    }
    return shuffle(board)
}

function renderBoard(board, num) {
    var strHTML = '';
    for (var i = 0; i < num; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < num; j++) {
            var size = board.length 
            var number = board.pop();
            strHTML += `<td onclick="cellClicked(this, ${number}, ${size})">${number}</td>`;
        }
        strHTML += `</tr>`;
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}

function cellClicked(clickedNum, numOfCell, size) {
    if(numOfCell === 1) startTimer();
    if(numOfCell === size-1) stopTimer();
    if (checkNumber(numOfCell) === true) clickedNum.style.backgroundColor = `${getRandomColor()}`
}

function checkNumber(num) {
    
    if (gClickedNums.length === 0 && num === 1) {
        gClickedNums.push(num)
        return true
    } 

    if (num - gClickedNums[gClickedNums.length - 1] === 1) {
        gClickedNums.push(num);
        return true
    }
    return false

}
var startTime = Date.now();
var endTime = Date.now-startTime;
function startTimer(){
    
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    timer = true;
    time = setInterval(() => {
        seconds++
        if(seconds === 60){
            minutes++;
            seconds = 0;
        }
        if(minutes === 60){
            hours++
            minutes = 0;
            seconds = 0;
        }
        gEltimer.innerHTML=`<h4>Timer: ${hours}:${minutes}:${seconds}</h4>`
    }, 1000)
}

function stopTimer(){
    timer = false
    clearInterval(time);
    hours = 0;
    minutes = 0;
    seconds = 0;
}

function shuffle(array) {
    var currentIndex = array.length;
    var randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}