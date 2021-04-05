export function clock(index, timezone, UTC){

    let div  = document.createElement('div');
    div.classList = "card m-2";
    div.id = `clock-${index}`;
    div.innerHTML = 
        `<div class="card-body row day">
            <div class="col-sm-6 align-items-center">
                <span class="h1" id="timezone-${index}">${timezone}</span>
                <span>${UTC}</span>
            </div>
            <div class="w-25 text-center m-2 border-circle dayIn col-sm-6 p-1 rounded">
                <h1 id="time-${index}">hh:mm:ss</h1>
            </div>
        </div>`
    return div;
}