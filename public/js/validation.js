function validateArticle() {
    
    let condition = true;

    let title = document.getElementById('title');
    let body = document.getElementById('body');

    let inputs = [title, body];

    inputs.forEach(input => {
        if(input.value.trim() === '') {
            condition = false;
        }
    });

    if(condition === false) {
        paintError('All fields are required !');
    }

    return condition;
}

function validateUserRegister() {

    let condition = true;

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordc = document.getElementById('passwordc');
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');

    let inputs = [email, password, passwordc, firstName, lastName];

    inputs.forEach(input => {
        if(input.value.trim() === '') {
            condition = false;
        }
    });

    if(password.value.trim() !== passwordc.value.trim()) {
        condition = false;
    }

    if(condition === false) {
        paintError('All fields are required and passwords must match !');
    }

    return condition;
}

function paintError(msg) {

    err = document.createElement('p');
    err.className = "alert alert-danger";
    err.textContent = msg;

    var feedback = document.querySelector('.feedback');

    feedback.appendChild(err);

    clearError();

}

function clearError() {
    setTimeout(function() {
        err.remove();
    }, 3000);
}