// Getting UI element
let form = document.querySelector('#expression_form');

// Event listener
form.addEventListener('submit', checkExpression);

// Functions
function checkExpression(e){
    let expression = form.querySelector('#expression').value;
    let expression_type = form.querySelector('#expression_type').value;

    if(expression_type!='empty'){
        if(expression!=''){
            if(verify(expression, expression_type)){
                showAlert(`Valid ${expression_type}`, 'success');
            }
            else{
                showAlert(`Wrong ${expression_type}`, 'danger');
            }
        }
        else{
            showAlert('Expression is empty', 'danger');
        }
    }
    else{
        showAlert('Please select an expression type', 'danger');
    }

    e.preventDefault();
}

function verify(expression, expression_type){
    let postal = /^[0-9]{4}$/;
    let phone = /^(\+88)?(88)?01[0-9]{9}$/
    let email = /^[a-zA-Z0-9]+([\.\-\_]?[a-zA-Z0-9]+)*@[a-zA-Z]+(\.[a-zA-Z]+)+$/i;

    switch (expression_type) {
        case 'PostCode':
            return(postal.test(expression));
            break;
                    
        case 'Number':
            return(phone.test(expression));
            break;

            case 'Email':
            return(email.test(expression));
            break;

        default:
            return false;
            break;
    }
}

function showAlert(message, alert){
    if(document.querySelector(`.r`))
        document.querySelector(`.r`).remove()
    let div = document.querySelector('.container');
    let alert_div = document.createElement('div');
    alert_div.classList = `r text-center bg-${alert} rounded font-weight-bold text-white`;
    alert_div.innerHTML = message;
    div.insertBefore(alert_div, div.children[0]);
    
    setTimeout(()=>{
        document.querySelector(`.r`).remove()
    },3000);
}