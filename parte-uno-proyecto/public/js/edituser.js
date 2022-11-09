window.onload = function(){

    let form = document.querySelector('form')
    form.nombre.focus()


    let nombre = document.getElementById('nombre')

    let usuario = document.getElementById('usuario')

    let password = document.getElementById('password')

    let fechadenacimiento = document.getElementById('fechadenacimiento')

    let email = document.getElementById('email')

    let celular = document.getElementById('celular')

    let categoria = document.getElementById('categoria')

    let image = document.getElementById('image')

    

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
    campCelular(celular.value, celular,errorcelular);
    campImage(image.value, image,errorImage);
    




    function campNombre(valueInput, divInput, errorDiv){
        let reNombre  = /^[a-zA-Z]{0,24}\s?[a-zA-Z]{2,24}\s?/gi
        if(reNombre.test(valueInput) == true){
            esconderError(divInput, errorDiv)
        }else{
            mostrarError(divInput, errorDiv, 'Ingrese su Nombre completo (minimo 2 caracteres)')
            e.preventDefault()
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'Asegurate de revisar los campos!',
                
            })
        }
    }

    function campCelular(valueInput, divInput, errorDiv){
        let reCelular  = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g
        if(reCelular.test(valueInput) == true){
            esconderError(divInput, errorDiv)
        }else{
            mostrarError(divInput, errorDiv, 'Ingrese su numero de celular (10 numeros)')
            e.preventDefault()
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
            mostrarError(divInput, errorDiv, 'Ingrese una contraseña (minimo 8 caracteres, letra mayúscula, numero, caracter)')
            e.preventDefault()
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
            mostrarError(divInput, errorDiv, 'Ingresar un formato de correo electrónico')
            e.preventDefault()
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
            mostrarError(divInput, errorDiv, 'Extensiones permitidas .JPG, .JPEG, .PNG, .GIF')
            e.preventDefault()
            Swal.fire({
                icon: 'Error',
                title: 'Oops...',
                text: 'Asegurate de revisar los campos!',
                
            })
        }
    }


    function campEmpty(valueInput, divInput, errorDiv, inputNombre){
        console.log(errorDiv)
        if (valueInput.length == 0){
            mostrarError(divInput, errorDiv, inputNombre)
            e.preventDefault()
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
