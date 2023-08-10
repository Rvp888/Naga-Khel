// Game constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/Bg-music.mp3");
let speed = 10;
let score = 0;
let hiscoreval = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
let food = {x: 6, y: 7}

let hiscore = JSON.parse(localStorage.getItem("hiscore")) || 0;
hiscoreSpan.innerHTML = hiscore;

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }  
    // If you bump into the wall  
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    
    return false;   
}

function gameEngine() {
    // musicSound.play();
// Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        message.style.display = 'flex';
        snakeArr = [{x: 13, y: 15}];
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscore){
            hiscore = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscore));
            console.log("inside if", hiscore);
            hiscoreSpan.innerHTML = hiscore;
        }
        scoreSpan.innerHTML = score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 4;
        let b = 14;
        let c = 4;
        let d = 14;
        food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(c + (d - c)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Disply the snake and food

    // Disply the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;       
        if(index === 0){
            snakeElement.classList.add('snakeHead');
        }else if(index === snakeArr.length-1) {
            snakeElement.classList.add('snakeTail');
        }else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    })

    // Disply the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    if(message.style.display === 'flex'){
        if(e.key === 'Enter'){
            message.style.display = 'none';
            scoreSpan.innerHTML = score;
            return;
        }
        return;
    }
    inputDir = {x: 0, y: -1} // Start the game (move the snake)
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});



// on-screen game controls

window.addEventListener('click', e => {
    if(message.style.display === 'flex'){
        if(e.target.id === 'playAgainBtn'){
            message.style.display = 'none';
            scoreSpan.innerHTML = score;
        }
    }
    else {
        inputDir = {x: 0, y: -1} // Start the game
        musicSound.play();
        moveSound.play();
        switch (e.target.id) {
            case "up-key":
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "down-key":
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "left-key":
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "right-key":
                inputDir.x = 1;
                inputDir.y = 0;
                break;

            default:
                break;
        }
    }
});

