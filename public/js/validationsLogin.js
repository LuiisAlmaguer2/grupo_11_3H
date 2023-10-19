let formularioLogin = document.getElementById("formularioLogin")
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnCreacion = document.getElementById("btnCreacion")

let err = {};


email.addEventListener("blur", function (e) {
    let error = document.getElementById("error-" + "email");

    if (!email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        err.email = "Ingresa un email valido"
        error.innerText = err.email
        email.style.borderColor = "red"
    } else {
        error.innerText = ""
        delete err.email
        email.style.borderColor = "green"
    }
})

password.addEventListener("blur", function () {
    let error = document.getElementById("error-" + "password")

    if (password.value === "" || password.value === null) {
        err.password = "Ingresa una contraseña valida"
        error.innerText = err.password
        password.style.borderColor = "red"
    } else if (password.value.length < 8) {
        err.password2 = "Debe de contener mas de 8 caracteres"
        error.innerText = err.password2
        password.style.borderColor = "red"
    } else {
        error.innerText = ""
        delete err.password
        delete err.password2
        password.style.borderColor = "green"
    }
})

formularioLogin.addEventListener("submit", function (event) {

    for (const [key, value] of Object.entries(err)) {
        console.log(`${key}: ${value}`);
    }


    if (Object.entries(err).length > 0) {
        event.preventDefault()
    }



})