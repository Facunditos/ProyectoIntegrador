window.addEventListener('load', function(){
    
    // capturo los elementos del formulario a validar
    let form = document.querySelector('.form'); 
    // creo que no necesito validar los select (options) porque se eligen de una lista
    // y no podrian quedar vacios!
    
    // let button4 = document.querySelector('#submitbtn');
    let name = document.querySelector('#name');
    let desc = document.querySelector('#description');
    let imageProd = document.querySelector("#imageProd")

    let short_name = document.querySelector('#short_name');
    let year = document.querySelector('#year'); // Año de cosecha
    let price = document.querySelector('#price');
    let location = document.querySelector('#location');
    let varietal_comp = document.querySelector('#varietal_comp');
    let soil = document.querySelector('#soil');
    let breeding = document.querySelector('#breeding');
    let abv = document.querySelector('#abv');

    form.addEventListener('submit', function(event){
        // event.preventDefault();
        let errores = [];
        
        // obligatorio para el sprint 7

        if(name.value == ""){
            errores.push('El nombre del producto no puede estar vacío');
        } else if (name.value.length < 5) {
            errores.push('El nombre del producto debe tener al menos 5 caracteres');
        }
        
        if (desc.value == "") {
            errores.push('La descripción del producto no puede estar vacía');
        } else if (desc.value.length < 20) {
            errores.push('La descripción del producto debe tener 20 caracteres o más');
        }

        if(imageProd.value != ""){
            // uso la validacion de la extension que hizo Facu
            let extPermitidas=/(.jpg|.jpeg|.png|.gif)$/i;
            if (!extPermitidas.exec(imageProd.value)) {
                errores.push('El formato de la imagen debe ser JPG, JPEG, PNG o GIF');
            }
        }

        // ademas validamos..

        if(short_name.value == ""){
            errores.push('El nombre reducido del producto no puede estar vacío');
        } else if (short_name.value.length < 5) {
            errores.push('El nombre reducido del producto debe tener al menos 5 caracteres');
        } else if (short_name.value.length > 30) {
            errores.push('El nombre reducido del producto debe tener, como máximo, 30 caracteres');
        }

        if(year.value < 1900){
            errores.push('El año de cosecha no puede ser anterior a 1900');
            // trate de usar la funcion Date().getFullYear() pero da error
        } else if (year.value > 2022) {
            errores.push('El año de cosecha no puede ser posterior al año actual');
        }

        if(price.value <= 0){
            errores.push('El precio del producto debe ser mayor a 0');
        }

        if(location.value == ""){
            errores.push('La ubicación del viñedo no puede estar vacía');
        }

        if(varietal_comp.value == ""){
            errores.push('La composición varietal no puede estar vacía');
        }

        if(soil.value == ""){
            errores.push('La composición del suelo no puede estar vacía');
        }

        if(breeding.value == ""){
            errores.push('La crianza no puede estar vacía, aunque sea un vino joven');
        }

        if(abv.value < 0 || abv.value > 95) {
            errores.push('La graduación alcohólica debe estar entre 0 y 95%');
        }
    
        if (errores.length > 0) {
            event.preventDefault(); 
            let ulErrores = document.querySelector('div.erroresV ul');
            ulErrores.innerHTML = ''

            for(let i = 0; i<errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

        } else {
            form.submit();
        }

    });

})
