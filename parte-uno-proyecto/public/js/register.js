window.onload = function(){

    let form = document.querySelector('form')
    form.nombre.focus()


    let nombre = document.querySelector('#nombre')

    let usuario = document.querySelector('#usuario')

    let password = document.querySelector('#password')

    let fechadenacimiento = document.querySelector('#fechadenacimiento')

    let email = document.querySelector('#email')

    let celular = document.querySelector('#celular')

    let categoria = document.querySelector('#categoria')

    let image = document.querySelector('#image')

    

    let errorNombre = document.querySelector('#errorNombre')
    let errorUsuario = document.querySelector('#errorUsuario')
    let errorPassword = document.querySelector('#errorPassword')
    let errorFecha = document.querySelector('#errorFecha')
    let erroremail = document.querySelector('#erroremail')
    let errorcelular = document.querySelector('#errorcelular')
    let errorCategoria = document.querySelector('#errorCategoria')
    let errorImage = document.querySelector('#errorImage')




    form.addEventListener('submit', function(e){
    /*e.preventDefault()*/

    campNombre(nombre.value, nombre,errorNombre);
    campEmpty(usuario.value, usuario,errorUsuario, 'Ingrese un usuario');
    campPassword(password.value, password,errorPassword);
    campEmpty(fechadenacimiento.value, fechadenacimiento,errorFecha, 'Ingrese su fecha de nacimiento');
    campEmail(email.value, email,erroremail);
    campEmpty(celular.value, celular,errorcelular, 'Ingrese un numero de celular');
    campEmpty(categoria.value, categoria,errorCategoria, 'Ingrese una categoria');
    campImage(image.value, image,errorImage);
    

///(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{2,24}$/gm //

    function campNombre(valueInput, divInput, errorDiv){
        let reNombre  = /^[a-zA-Z]{0,24}\s?[a-zA-Z]{2,24}\s?/gi
        if(reNombre.test(valueInput) == true){
            esconderError(divInput, errorDiv)
        }else{
            e.preventDefault()
            mostrarError(divInput, errorDiv, 'Ingrese su Nombre completo (minimo 2 caracteres)')
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'Asegurate de revisar los campos!',
                
            })
        }
    }

    function campPassword(valueInput, divInput, errorDiv){
        let rePassword  = /(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/gm    /* -al menos 8 caracteres,una letra mayúscula,un número,cualquier tipo de carácter,sin límite */
        if(rePassword.test(valueInput) == true){
            esconderError(divInput, errorDiv)
        }else{
            e.preventDefault()
            mostrarError(divInput, errorDiv, 'Ingrese una contraseña (minimo 8 caracteres, letra mayúscula, numero, caracter)')
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'Asegurate de revisar los campos!',
                
            })
        }
    }


    function campEmail(valueInput, divInput, errorDiv){
        let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(reEmail.test(valueInput) == true){
            esconderError(divInput, errorDiv)
        }else{
            e.preventDefault()
            mostrarError(divInput, errorDiv, 'Ingresar un formato de correo electrónico')
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'Asegurate de revisar los campos!',
                
            })
        }
    }

    function campImage(valueInput, divInput, errorDiv){
        let reImage  = /[.](jpeg)|(jpg)|(gif)|(png)$/
        if(reImage.test(valueInput) == true){
            esconderError(divInput, errorDiv)
        }else{
            e.preventDefault()
            mostrarError(divInput, errorDiv, 'Extensiones permitidas .JPG, .JPEG, .PNG, .GIF')
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'Asegurate de revisar los campos!',
                
            })
        }
    }


    function campEmpty(valueInput, divInput, errorDiv, inputNombre){
        if (valueInput.length == 0){
            e.preventDefault()
            mostrarError(divInput, errorDiv, inputNombre)
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'Asegurate de revisar los campos!',
                
            })
        }else{
            esconderError(divInput, errorDiv)
            Swal.fire(
                'Excelente!',
                'Todo parece estar bien!,sigamos',
                'success'
            )
        }
    }




    function mostrarError(divInput, errorDiv, errores){
        divInput.style.border = '1.5px solid rgb(248, 89, 89)';
        errorDiv.innerHTML = `<p class = "mensaje-alerta">${errores}</p>`
    }
    function esconderError(divInput, errorDiv){
        divInput.style.border = '1.5px solid rgb(19, 204, 2)'
        errorDiv.innerHTML = ''
    }

    })

    

}




/*
        let errors = []

        let nombre = document.querySelector('#nombre')

        let usuario = document.querySelector('#usuario')

        let password = document.querySelector('#password')

        let fechadenacimiento = document.querySelector('#fechadenacimiento')

        let email = document.querySelector('#email')

        let celular = document.querySelector('#celular')

        let categoria = document.querySelector('#categoria')

        let image = document.querySelector('#image')


        if(nombre.value == ''){
            errors.push('Ingrese su Nombre completo')
            nombre.classList.add('campos-invalidos')
        }else{
            nombre.classList.add('campos-validos')
            nombre.classList.remove('campos-invalidos')
        }

        if(usuario.value == ''){
            errors.push('Ingrese un Usuario')
            usuario.classList.add('campos-invalidos')
        }else{
            usuario.classList.add('campos-validos')
            usuario.classList.remove('campos-invalidos')
        }

        if(password.value == ''){
            errors.push('Ingrese una contraseña')
            password.classList.add('campos-invalidos')
        }else{
            password.classList.add('campos-validos')
            password.classList.remove('campos-invalidos')
        }

        if(fechadenacimiento.value == ''){
            errors.push('Ingrese su Fecha de nacimiento')
            fechadenacimiento.classList.add('campos-invalidos')
        }else{
            fechadenacimiento.classList.add('campos-validos')
            fechadenacimiento.classList.remove('campos-invalidos')
        }

        if(email.value == ''){
            errors.push('Ingrese un Email')
            email.classList.add('campos-invalidos')
        }else{
            email.classList.add('campos-validos')
            email.classList.remove('campos-invalidos')
        }

        if(celular.value == ''){
            errors.push('Ingrese un numero de Celular')
            celular.classList.add('campos-invalidos')
        }else{
            celular.classList.add('campos-validos')
            celular.classList.remove('campos-invalidos')
        }

        if(categoria.value == ''){
            errors.push('Ingrese su categoria')
            categoria.classList.add('campos-invalidos')
        }else{
            categoria.classList.add('campos-validos')
            categoria.classList.remove('campos-invalidos')
        }

        if(image.value == ''){
            errors.push('Ingrese una imagen')
            image.classList.add('campos-invalidos')
        }else{
            image.classList.add('campos-validos')
            image.classList.remove('campos-invalidos')
        }



        let campError= document.querySelector('.errorescamp');
        campError.classList.add('mensaje-alerta')
        campError.innerHTML='';
        if(errors.length > 0){
            for(let i = 0; i < errors.length;  i ++){
                campError.innerHTML += `<li> ${errors[i]} </li>`
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Asegurate de completar los campos!',
                    
                })
            }
        }else{
            Swal.fire(
                'Excelente!',
                'Tu registro fue realizado con exito!',
                'success'
            )
        }

*/