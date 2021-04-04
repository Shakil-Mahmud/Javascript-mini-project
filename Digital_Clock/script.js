const clock = document.getElementById('clock');
const time = clock.querySelector('#time');

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


// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
const utctime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
const sec  = /(\d+(?= PM))|(\d+(?= AM))/g;
const hmin = /(\d+(?=:))/;
const h = /(\d+(?=:))/;
const min = /(\d+(?=:))/;
//console.log(utctime.matchAll(hmin));

// function changeTimezone(date, ianatz) {

//     // suppose the date is 12:00 UTC
//     var invdate = new Date(date.toLocaleString('en-US', {
//       timeZone: ianatz
//     }));
  
//     // then invdate will be 07:00 in Toronto
//     // and the diff is 5 hours
//     var diff = date.getTime() - invdate.getTime();
  
//     // so 12:00 in Toronto is 17:00 UTC
//     return new Date(date.getTime() - diff); // needs to substract
  
//   }
  
//   // E.g.
//   var here = new Date();
//   var there = changeTimezone(here, "America/Toronto");
  
//   console.log(`Here: ${here.toString()}\nToronto: ${there.toString()}`);