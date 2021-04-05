import {Data} from './Data.js';
import {clock as newClock} from './clock.js';

/// Getting UI element

const clock = document.getElementById('clock');
const worldClock = document.getElementById('world-clock');
const time = clock.querySelector('#time');
const form = document.getElementById('form');
const list = document.getElementById('list');
let tz = clock.querySelector('#timezone').innerHTML =  Intl.DateTimeFormat().resolvedOptions().timeZone;
let worldClockList = [];
console.log(Data.indexOf({timezone: tz}) , tz);
/// Event listener
form.addEventListener('submit', addTimeZone)

/// Function

function addClock(index){
    const timezone = Data[index].timezone;
    const utctime = new Date().toLocaleString("en-US", {timeZone: timezone});
    return utctime.slice(utctime.indexOf(' '), utctime.length);
}
addClock(257);

function currentTime(){    
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    //const temp = date.getTimezoneOffset()
    //console.log(temp);
    return hour.toString()+':'+minute.toString()+':'+second.toString()
}
setInterval(() => {
    worldClockList.forEach(value=>{
        worldClock.querySelector(`#time-${value}`).innerHTML = addClock(value);
    })
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
    const index = list[list.selectedIndex].value;
    worldClockList.push(index);
    console.log(worldClockList);
    let div = newClock(index, Data[index].timezone, Data[index].UTC);
    worldClock.appendChild(div);

    console.log(worldClock);
    //console.log(newTime);
    e.preventDefault();
}