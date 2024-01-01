let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let score;

let h2 = document.querySelector("h2");

let highScore = 0;

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is Started.");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameFlash");

    setTimeout(function(){
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}<br> Highest Score :- ${highScore}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`)

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(`gameSeq is :- ${gameSeq}`);

    //After game chooses random button then, btn will be flashed.
    gameFlash(randBtn);

    // if(level > 10){
    //     h2.innerText("Congratulations !! You won the game.");
    //     return;
    // }This part is wrong.

    // for(let i=0; i<score; i++){
    //     if(score[i] > highScore){
    //         highScore = score[i];
    //     }
    // }This part is also wrong.
}

//To know, level in which we are.
function checkAns(idx){
    // console.log("curr. level :- ", level);//To print current level in which we are present.
    // let idx = level - 1;
    
    if(userSeq[idx] === gameSeq[idx]){
        // console.log("Same Value.");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        score = level * 10;
        h2.innerHTML = `Game Over ! <br> Your score was <b>${score}</b>. <br> Press any key to start again.`;//${<b>${level * 10}</b>} ${<br></br>}.
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

//Now, we are involving user.
function btnPress(){
    // console.log(`${this.classList} was pressed.`);

    let b1 = this;
    userFlash(b1);

    userColor = b1.getAttribute("id");
    userSeq.push(userColor);
    // console.log(`userColor is :- ${userColor}`);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(b of allBtns){
    b.addEventListener("click", btnPress);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}