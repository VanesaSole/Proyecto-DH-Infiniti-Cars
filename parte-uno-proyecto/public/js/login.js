
window.onload = function(){
    let menuHam = document.querySelector('.burger-menu')
    
    menuHam.addEventListener('click', function(){

        document.getElementById('menu-hamb').classList.toggle('burger-mostrar')
    })

    let burgerToggle = document.querySelector('#menu-hamb')
    burgerToggle.addEventListener('click', function(){
        document.getElementById('menu-hamb').classList.toggle('burger-mostrar')
    })

    let form = document.querySelector('form')
    form.email.focus()

    let email = document.querySelector('#email')
    let password = document.querySelector('#password')



    let errorEmail = document.querySelector('#errorEmail')
    let errorPassword = document.querySelector('#errorPassword')

    form.addEventListener('submit', function(e){
        /*e.preventDefault()*/


        campEmail(email.value, email, errorEmail);
        campPassword(password.value, password,errorPassword);


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