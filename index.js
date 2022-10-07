const inputs = document.querySelectorAll('input');

const passwordInputs = document.querySelectorAll('input[type="password"]');
const form = document.querySelector('form');

inputs.forEach(input => {
    if (input.getAttribute('type') === 'password') {
        input.addEventListener('blur', (e) => {
            hasBeenBlurred(e.target);
            checkInputValidity(e.target);
            checkMatchingPasswords();
        })
    } else {
        input.addEventListener('blur', (e) => {
            hasBeenBlurred(e.target);
            checkInputValidity(e.target);
        })
    }
})

function checkInputValidity(inputNode) {
    const parent = inputNode.parentNode;
    if (!inputNode.validity.valid) {
        parent.classList.add('error');
    } else {
        parent.classList.remove('error');
    }
}
function hasBeenBlurred(inputNode) {
    const parent = inputNode.parentNode;
    parent.setAttribute('data-blurred', true)
}

function checkMatchingPasswords() {

    const [password, passwordConfirm] = passwordInputs;

    if (password.validity.valid && passwordConfirm.validity.valid) {
        if (password.value === passwordConfirm.value) {
            passwordInputs.forEach(input => input.parentNode.setAttribute('data-passwords-match', true))
        } else {
            passwordInputs.forEach(input => input.parentNode.setAttribute('data-passwords-match', false))
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allInputsValid = true;
    let passwordsMatch = true;

    inputs.forEach(input => {
        if (!input.validity.valid) allInputsValid = false;
    })

    const [password, passwordConfirm] = passwordInputs;
    
    if (password.value !== passwordConfirm.value) passwordsMatch = false;

    if (allInputsValid && passwordsMatch) {
        alert('form submitted succesfully');
    } else {
        alert('one or more inputs is invalid')
    }
})