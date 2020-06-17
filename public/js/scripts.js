var signUpButton;
var signInButton;
var container;

document.addEventListener("DOMContentLoaded", function(event) { 
    signUpButton = document.getElementById('signUp');
    signInButton = document.getElementById('signIn');
    container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        console.log("CLICKED SIGN UP");
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        console.log("CLICKED SIGN IN");
    });
  });