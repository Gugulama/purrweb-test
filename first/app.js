const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal__close');
const submitButton = document.querySelector('.modal__dialog .button');
const form = document.querySelector('.modal__form');
const inputs = document.querySelectorAll('.modal__form-input');
const dialog = document.querySelector('.modal__dialog');
const success = document.querySelector('.modal__success');

closeButton.onclick = closeModal;
inputs.forEach(i => i.oninput = validateInputs)
form.onsubmit = (e) => {
    e.preventDefault();
    return false;
}

submitButton.onclick = showSuccess;

function showMessage() {
    const message = document.querySelector('.modal__form-message');
    message.style.display = "flex";
}

function closeMessage() {
    const message = document.querySelector('.modal__form-message');
    message.style.display = "none";
}

function openModal() {
    modal.classList.add('modal--show');
    form.reset();
    dialog.style.display = "flex";
    success.style.display = "none";
}

function closeModal() {
    modal.classList.remove('modal--show')
}

function validateInput(input) {
    const isValid = input.checkValidity();
    if(isValid)
        input.parentElement.classList.remove('modal__form-input-container--invalid');
    else {
        input.parentElement.classList.add('modal__form-input-container--invalid');
    }

    return isValid;
}

function validateInputs() {
    inputs.forEach(i => validateInput(i));
    const isValid = Array.from(inputs).every(i => validateInput(i));

    if(isValid){
        closeMessage();
        submitButton.removeAttribute('disabled')
    } 
    else{
        submitButton.setAttribute('disabled', '');
        showMessage();
    }

    return isValid;
}

function showSuccess(){
    dialog.style.display = "none";
    success.style.display = "flex";
}