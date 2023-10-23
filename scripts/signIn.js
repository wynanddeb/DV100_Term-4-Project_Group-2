const form = document.querySelector('#signUpForm');
const usernameInput = document.querySelector('username'); 
const emailInput = document.querySelector('email'); 
const passwordInput = document.querySelector('password'); 
const confirmPasswordInput = document.querySelector('confirm-password'); 

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    validateForm();

});

function validateForm() {
    //Username 
    if(usernameInput.ariaValueMax.trim() == ''){
        setError(usernameInput, "Name is required");
    }else if(usernameInput.ariaValueMax.trim().length <5){
        setError(usernameInput, 'Name needs a minimun of 5 characters'); 
    }else{
        setSuccess(usernameInput); 
    }
    //Email 
    if(emailInput.value.trim() == ''){
        setError(emailInput, "Provide email address");
    }else if(isEmailValid(emailInput.value)){
        setSuccess(emailInput);
    }else {
        setError(emailInput, 'Provide a valid email address');
    }
    //Password
    if(passwordInput.value.trim() == ''){
        setError(passwordInput, 'Please enter a password');
    }else if (passwordInput.value.trim().length <5){
        setError(passwordInput, 'Password must be longer than 5 characters');
    }else {
        setSuccess(passwordInput);
    }
    //Confirm Password 
    if(confirmPasswordInput.value.trim() == ''){
        setError(passwordInput, 'Please enter a password');
    }else if (confirmPasswordInput.value !== passwordInput.value){
        setError(confirmPasswordInput, 'Password does not match'); 
    }else {
        setSuccess(confirmPasswordInput);
    }
}

function setError(element, errorMessage){
    const parent = element.parentElement; 
    if(parent.classList.conatains('success')){
        parent.classList.remove('success');
    }
    parent.classList.add('error');
}

function setSuccess(element){
    const parent = element.parentElement;
    if(parent.classList.contains('error')){
        parent.classlist.remove('error'); 
    }
    parent.classList.add('success');
}

function isEmailValid(element){
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
}

//local storage 
let validateForm_serialized = JSON.stringify(validateForm);

localStorage.setItem("validateForm", validateForm_serialized);

let validateForm_deserialized = JSON.parse(localStorage.getItem("validatedForm"));

$(document).ready(function() {
    loadData();
});