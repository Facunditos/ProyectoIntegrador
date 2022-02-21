
window.addEventListener("load", function () {
    alert("El único campo que no es obligatorio completar es el de Imagen")


    //comentarios
    //capturo tanto el div que contendrá los campos completados incorrectamente
    const campoErrorres = document.getElementById("campoErrores")

    //capturo tanto el formulario
    const form = document.querySelector("#form")

    //capturo tanto el input como el div respectivo al campo first_name 
    const first_name = document.querySelector("#first_name")
    const campoFirst_name = document.querySelector("#campoFirst_name")

    //capturo tanto el input como el div respectivo al campo last_name 
    const last_name = document.querySelector("#last_name")
    const campoLast_name = document.querySelector("#campoLast_name")

    //capturo tanto el input como el div respectivo al campo email
    const email = document.querySelector("#email")
    const campoEmail = document.querySelector("#campoEmail")

    //capturo tanto el input como el div respectivo al campo password
    const password = document.querySelector("#password")
    const campoPassword = document.querySelector("#campoPassword")

    //capturo tanto el input como el div respectivo al campo category
    const category = document.querySelector("#category")
    const campoCategory = document.querySelector("#campoCategory")

    //capturo tanto el input como el div respectivo al campo imageUser
    const imageUser = document.querySelector("#imageUser")
    const campoImageUser = document.querySelector("#campoImageUser")

    //creo los elemento que contiene los respectivos mensajes de error
    const first_nameError = document.createElement("p")
    first_nameError.setAttribute("id", "first_nameError")
    first_nameError.textContent = "El nombre ingresado debe comenzar con una mayuscula y contener dos caracteres como mínimo"
    first_nameError.classList = "texto-error"

    const last_nameError = document.createElement("p")
    last_nameError.setAttribute("id", "last_nameError")
    last_nameError.textContent = "El apellido ingresado debe comenzar con una mayuscula y contener dos caracteres como mínimo"
    last_nameError.classList = "texto-error"

    const emailRegistrado = document.createElement("p")
    emailRegistrado.setAttribute("id", "emailRegistrado")
    emailRegistrado.textContent = "Ya existe una cuenta con este correo electrónico, iniciá sesión con su correo y la contraseña ingresada oportunamente"
    emailRegistrado.classList = "texto-error"

    const emailError = document.createElement("p")
    emailError.setAttribute("id", "emailError")
    emailError.textContent = "Debe ingresar un email válido"
    emailError.classList = "texto-error"

    const passwordError = document.createElement("p")
    passwordError.setAttribute("id", "passwordError")
    passwordError.textContent = "Debe ingresar una contraseña que contenga al menos ocho caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial (símbolo)"
    passwordError.classList = "texto-error"

    const categoryError = document.createElement("p")
    categoryError.setAttribute("id", "categoryError")
    categoryError.textContent = "Debe ingresar una categoría"
    categoryError.classList = "texto-error"

    //según la validación del campo, el borde se va a pintar de un color o de otro
    const bordeRojo = "2px solid red";
    const bordeVerde = "2px solid limegreen"

    //declaración de función utilizada a ejecutarse ante el evento "blur"

    function validar(div, input, mensajeError) {
        const valorIngresado = input.value
        const extensionCorrecta = validator.isLength(valorIngresado, { min: 2 })
        const usoMayuscula = validator.isStrongPassword(valorIngresado, { minLength: 0, minLowercase: 0, minUppercase: 1, minNumbers: 0, minSymbols: 0 })
        if (!(extensionCorrecta && usoMayuscula)) {
            div.appendChild(mensajeError)
            return input.style.border = bordeRojo
        } else {
            return input.style.border = bordeVerde
        }
    }


    //para todos los campos aplico la misma lógica, una vez que el mismo es completado, se corroba si el valor ingresado pasa las restricciones establecisas, si no lo hace, se informa las restricciones que deben contemplarse y el borde se pinta de rojo, si lo hace, el borde se pinta de verde 
    first_name.addEventListener("blur", (evento) => {
        validar(campoFirst_name, first_name, first_nameError)
    })


    last_name.addEventListener("blur", (evento) => {
        validar(campoLast_name, last_name, last_nameError)
    })


    email.addEventListener("blur", (evento) => {
        fetch("http://localhost:3030/api/users")
            .then(resultado => {
                return resultado.json()
            })
            .then(informacion => {
                const arrayUusuarios = informacion.data
                const valorIngresado = email.value
                const emailCorrecto = validator.isEmail(valorIngresado)
                const usuarioRegistrado = arrayUusuarios.find(usuario => usuario.email == valorIngresado)
                if (usuarioRegistrado) {
                    campoEmail.appendChild(emailRegistrado)
                    email.style.border = bordeRojo
                } else if (!emailCorrecto) {
                    campoEmail.appendChild(emailError)
                    email.style.border = bordeRojo
                } else {
                    email.style.border = bordeVerde
                }
            })
            .catch(error => console.log(error))

    })

    password.addEventListener("blur", (evento) => {
        const valorIngresado = password.value
        const passwordCorrecta = validator.isStrongPassword(valorIngresado, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        if (!passwordCorrecta) {
            campoPassword.appendChild(passwordError)
            password.style.border = bordeRojo
        } else {
            password.style.border = bordeVerde
        }
    })

    category.addEventListener("blur", (evento) => {
        const valorIngresado = category.value
        const categoryUser = validator.equals(valorIngresado, "User")
        const categoryAdmin = validator.equals(valorIngresado, "Admin")
        if (!(categoryUser || categoryAdmin)) {
            campoCategory.appendChild(categoryError)
            category.style.border = bordeRojo
        } else {
            category.style.border = bordeVerde
        }
        
    })

    //cuando se quiere enviar el formulario, se corrobora el color de los campos, en caso que existan campos en rojo, el formulario no se envía, informándose el campo que debe revisarse
    form.addEventListener("submit",(evento)=>{
        let errores=[]
        if (first_name.style.border!=bordeVerde) {errores.push("Nombre")} 
        if (last_name.style.border!=bordeVerde) {errores.push("Apellido")}
        if (email.style.border!=bordeVerde) {errores.push("Email")}
        if (password.style.border!=bordeVerde) {errores.push("Contraseña")}
        if (category.style.border!=bordeVerde) {errores.push("Categoría")}
        if (imageUser.style.border==bordeRojo) {errores.push("Imagen")}
        
        if (errores.length>0) {
            
            evento.preventDefault() 
            campoErrorres.innerHTML=""
            const mensajeError=document.createElement("p")
            mensajeError.textContent="Para craer exitosamente la cuenta corregí previamente estos campos"
            campoErrorres.appendChild(mensajeError)
            const listaErrores = document.createElement("ul")
            listaErrores.style.listStyle = "none"
            errores.forEach(error => listaErrores.innerHTML += "<li class=elementoLista >" + error + "</li>")
            campoErrorres.appendChild(listaErrores)
            if (first_name.style.border == bordeVerde && document.getElementById("first_nameError")) {
                first_nameError.innerHTML = ""
            }
            if (last_name.style.border == bordeVerde && document.getElementById("last_nameError")) {
                last_nameError.innerHTML = ""
            }
            if (email.style.border == bordeVerde && document.getElementById("emailError")) {
                emailError.innerHTML = ""
            }
            if (email.style.border == bordeVerde && document.getElementById("emailRegistrado")) {
                emailRegistrado.innerHTML = ""
            }
            if (password.style.border == bordeVerde && document.getElementById("passwordError")) {
                passwordError.innerHTML = ""
            }
            if (category.style.border == bordeVerde && document.getElementById("categoryError")) {
                categoryError.innerHTML = ""
            }
            if (imageUser.style.border == bordeVerde && document.getElementById("imageUserError")) {
                imageUserError.innerHTML = ""
            }


        }




    })




})