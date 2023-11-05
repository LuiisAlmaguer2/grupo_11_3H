let formularioProducto = document.getElementById("form-Product");
let nombre = document.getElementById("nombre");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen")

let err = {}




nombre.addEventListener("blur", (e) => {
    let error = document.getElementById("error-" + "nombre")

    if (nombre.value === "" || nombre.value === null) {
        err.nombre = "Tienes que colocar un nombre al producto"
        error.innerText = err.nombre
    } else {
        delete err.nombre
        error.innerText = ""
    }

})

descripcion.addEventListener("blur", (e) => {
    let error = document.getElementById("error-" + "descripcion")

    if (descripcion.value === "" || descripcion.value === null) {
        err.nombre = "Tienes que colocar una descripcion al producto"
        error.innerText = err.nombre
    } else if (descripcion.value.length < 20) {
        err.nombre2 = "Debe de contener mas de 20 caracteres"
        error.innerText = err.nombre2
    }
    else {
        delete err.nombre
        delete err.nombre2
        error.innerText = ""
    }

})



