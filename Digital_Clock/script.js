/// Getting UI element
import {Data} from './Data.js';
const clock = document.getElementById('clock');
const time = clock.querySelector('#time');
const form = document.getElementById('form');
const list = document.getElementById('list')

/// Event listener
form.addEventListener('submit', addTimeZone)

/// Function

function currentTime(){
    
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const temp = date.getTimezoneOffset()
    //console.log(temp);
    return hour.toString()+':'+minute.toString()+':'+second.toString()
}
setInterval(() => {
    time.innerText = currentTime();
}, 1000);


Data.forEach( (item, index) => addOption(item,index) )
function addOption(time, index){
    let temp = (index+1).toString() +'. '+ time.timezone + '  (UTC  '+ time.UTC+')';
    let option = document.createElement('option');
    option.setAttribute('value', `${index}`)
    option.innerHTML = temp;
    //console.log(option);
    list.appendChild(option);
}

function addTimeZone(e){
    console.log(list[list.selectedIndex].value);
    e.preventDefault();
}

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
//const utctime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
//console.log(utctime);
