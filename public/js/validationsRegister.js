let formularioRegistro = document.getElementById("formularioRegistro")
let email = document.getElementById("email");
let password = document.getElementById("password");
let nombre = document.getElementById("name");
let apellido = document.getElementById("apellido")
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


nombre.addEventListener("blur", function () {
    let error = document.getElementById("error-" + "nombre")

    if (nombre.value === "" || nombre.value === null) {
        err.nombre = "Ingresa un nombre valido"
        error.innerText = err.nombre
        nombre.style.borderColor = "red"
    } else if (nombre.value.length < 2) {
        err.nombre2 = "Debe de contener mas de 2 caracteres"
        error.innerText = err.nombre2
        nombre.style.borderColor = "red"
    } else {
        error.innerText = ""
        delete err.nombre
        delete err.nombre2
        nombre.style.borderColor = "green"
    }
})

apellido.addEventListener("blur", function () {
    let error = document.getElementById("error-" + "apellido")

    if (apellido.value === "" || apellido.value === null) {
        err.apellido = "Ingresa un apellido valido"
        error.innerText = err.apellido
        apellido.style.borderColor = "red"
    } else if (apellido.value.length < 2) {
        err.apellido2 = "Debe de contener mas de 2 caracteres"
        error.innerText = err.apellido2
        apellido.style.borderColor = "red"
    } else {
        error.innerText = ""
        delete err.apellido
        delete err.apellido2
        apellido.style.borderColor = "green"
    }
})




formularioRegistro.addEventListener("submit", function (event) {

    for (const [key, value] of Object.entries(err)) {
        console.log(`${key}: ${value}`);
    }


    if (Object.entries(err).length > 0) {
        event.preventDefault()
    }



})








