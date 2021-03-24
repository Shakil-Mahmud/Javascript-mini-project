const clock = document.getElementById('clock');
const time = clock.querySelector('#time');

function currentTime(){
    
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    
    return hour.toString()+':'+minute.toString()+':'+second.toString()
}

setInterval(() => {
    current_time = currentTime();
    time.innerText = current_time;
}, 1000);