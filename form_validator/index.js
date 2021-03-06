'use strict';

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const elementArr = [username, email, password, password2];
const pwdMinLength = 8;
const pwdMaxLength = 25;
const userNameMinLength = 3;
const userNameMaxLength = 15;

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

const checkEmail = (input) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}


const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const checkRequired = (inputArr) => {
  inputArr.forEach(function(input){
    if (input.value.trim() === ''){
      showError(input, `${getFieldName(input)} is required`);
    }else {
      showSuccess(input);
    }
  });
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max){
    showError(input, `${getFieldName(input)} must be less then ${max} characters`)
  } else {
    showSuccess(input);
  }
}

const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value){
    showError(input2, `Passwords do not match`);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired(elementArr);
  checkLength(username, userNameMinLength, userNameMaxLength);
  checkLength(password, pwdMinLength, pwdMaxLength);
  checkLength(password2, pwdMinLength, pwdMaxLength);
  checkEmail(email);
  checkPasswordMatch(password, password2);
})