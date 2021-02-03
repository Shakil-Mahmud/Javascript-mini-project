// Getting UI element
let form  = document.getElementById('input');
let input = form.querySelector('#guess_number')
let hint = document.getElementById('hint');
let button  = form.querySelector('.btn');
let life_remain = document.getElementById('life');

// Event listener
form.addEventListener('submit', inputNum);


let low = 1, high = 10;
let life = 3;
let guessed_number = '';
const correcr_ans = Math.floor(Math.random()*high+low)
hint.innerHTML = `Hint: The numer is between ${low} and ${high}`;
life_remain.innerHTML = `Life remain: ${life}`;

function inputNum(e){
    console.log(e.target.children[1].innerHTML);
    let type = e.target.children[1].innerHTML;
    
    if(type==='Submit'){
        const number = parseInt(document.querySelector('#guess_number').value);
        form.reset();
        guessed_number = number
        console.log(number);
        const answer = checkAnswer();
        if(life<=0){
            result(answer);
            playAgain();
        }
    }
    else if(type==='Play again'){
        if(document.querySelector(`.re`))
            document.querySelector(`.re`).remove();
        button.innerHTML = 'Submit';
        document.querySelector('#guess_number').removeAttribute('disabled');
        life = 3;
        correcr_ans = Math.floor(Math.random()*high+low)
    }
    e.preventDefault();
}


function checkAnswer(){
    if(guessed_number>correcr_ans){
        life--;
        response('Hint: Correct answer is smaller', 'danger');
        return 'danger'
    }
    else if(guessed_number<correcr_ans){
        life--;
        response('Hint: Correct answer is bigger', 'danger');
        return 'danger'
    }
    else if(guessed_number===correcr_ans){
        response('', 'success');
        life = 0;
        playAgain();
        return 'success';
    }
}

function result(alert){
    const message = {"danger": "You lose", "success": "You Win"};
    if(document.querySelector(`.re`))
        document.querySelector(`.re`).remove();
    let div = document.querySelector('.container');
    let alert_div = document.createElement('div');
    alert_div.classList = `re text-center bg-${alert} rounded font-weight-bold text-white`;
    alert_div.innerHTML = message[alert];
    div.appendChild(alert_div)
}

function response(_hint, alert){
    hint.innerHTML= _hint;
    showAlert(alert);
    life_remain.innerHTML= `Life remain: ${life}`;
}

function showAlert(alert){
    const message = {"danger": "Wrong answer", "success": "Correct answer"};
    if(document.querySelector(`.r`))
        document.querySelector(`.r`).remove()
    let div = document.querySelector('.container');
    let alert_div = document.createElement('div');
    alert_div.classList = `r text-center bg-${alert} rounded font-weight-bold text-white`;
    alert_div.innerHTML = message[alert];
    div.insertBefore(alert_div, div.children[0]);
    setTimeout(()=>{
        document.querySelector(`.r`).remove();
    },3000);
}

function playAgain(){
    document.querySelector('#guess_number').setAttribute('disabled', 'disabled')
    button.innerHTML = 'Play again';
    hint.innerHTML = `Hint: The numer is between ${low} and ${high}`;
    life_remain.innerHTML = `Life remain: ${life}`;
}
