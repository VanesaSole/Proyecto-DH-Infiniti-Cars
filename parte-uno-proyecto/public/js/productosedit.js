
image.onchange = evt => {
    console.log(1)
    const [file] = image.files
    if (file) {
        
    blah.src = URL.createObjectURL(file)
    }
}
image2.onchange = evt => {
    const [file] = image2.files
    if (file) {
        console.log(blah2.src)
    blah2.src = URL.createObjectURL(file)
    }
}
image3.onchange = evt => {
    const [file] = image3.files
    if (file) {
    blah3.src = URL.createObjectURL(file)
    }
}
image4.onchange = evt => {
    const [file] = image4.files
    if (file) {
    blah4.src = URL.createObjectURL(file)
    }
}
image5.onchange = evt => {
    const [file] = image5.files
    if (file) {
    blah5.src = URL.createObjectURL(file)
    }
}





function empty (){
    document.getElementById('modelo').value=0
    document.getElementById('modelo').innerHTML="Seleccione una opcion";

}


function filterModel(){
    console.log(document.getElementById('marca').value);
    fetch("http://localhost:3050/modelosApi")
    .then(function(respuesta){
        return respuesta.json();
    })
    .then(function(informacion){
        let select = document.getElementById('modelo');
        let filter = document.getElementById('marca').value;
        for (let i=0; i< informacion.data.length ;i++){
            if (informacion.data[i].brand_id==filter){
                var opt = document.createElement('option');
                opt.value = informacion.data[i].id;
                opt.innerHTML = informacion.data[i].model;
                select.appendChild(opt);
            }
        }
    })

}





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
    form.marca.focus()

    form.addEventListener('submit', function(e){


        let errors = []

        let marca = document.querySelector('#marca')

        let modelo = document.querySelector('#modelo')

        let kilometraje = document.querySelector('#kilometraje')

        let precio = document.querySelector('#precio')

        let color = document.querySelector('#color')

        let year = document.querySelector('#year')

        let combustible = document.querySelector('#combustible')

        let transmision = document.querySelector('#transmision')

        let condicion = document.querySelector('#condicion')

        let categoria = document.querySelector('#categoria')

        let image = document.querySelector('#image')
        console.log(marca );
        console.log(modelo);
        console.log(kilometraje);
        console.log(precio );
        console.log(color);
        console.log(year);
        console.log(combustible );
        console.log( transmision  );
        console.log(condicion );
        console.log(categoria );
        console.log(image ); 

        if(marca.value == ''){
            e.preventDefault()
            errors.push('Debe ingresar la marca del vehiculo')
            marca.classList.add('campos-invalidos')
        }else{
            marca.classList.add('campos-validos')
            marca.classList.remove('campos-invalidos')
        }

        if(modelo.value == ''){
            e.preventDefault()
            errors.push('Debe ingresar el modelo del vehiculo')
            modelo.classList.add('campos-invalidos')
        }else{
            modelo.classList.add('campos-validos')
            modelo.classList.remove('campos-invalidos')
        }

        if(kilometraje.value == ''){
            e.preventDefault()
            errors.push('Debe ingresar el kilometraje del vehiculo')
            kilometraje.classList.add('campos-invalidos')
        }else{
            kilometraje.classList.add('campos-validos')
            kilometraje.classList.remove('campos-invalidos')
        }

        if(precio.value == '' || precio.value == 0){
            e.preventDefault()
            errors.push('Debe ingresar el precio del vehiculo')
            precio.classList.add('campos-invalidos')
        }else{
            precio.classList.add('campos-validos')
            precio.classList.remove('campos-invalidos')
        }

        if(color.value == ''){
            e.preventDefault()
            errors.push('Debe ingresar el color del vehiculo')
            color.classList.add('campos-invalidos')
        }else{
            color.classList.add('campos-validos')
            color.classList.remove('campos-invalidos')
        }

        if(year.value == ''){
            e.preventDefault()
            errors.push('Debe ingresar el año de frabricación del vehiculo')
            year.classList.add('campos-invalidos')
        }else{
            year.classList.add('campos-validos')
            year.classList.remove('campos-invalidos')
        }

        if(combustible.value == ''){
            e.preventDefault()
            errors.push('Debe ingresar el tipo de combustible que usa su vehiculo')
            combustible.classList.add('campos-invalidos')
        }else{
            combustible.classList.add('campos-validos')
            combustible.classList.remove('campos-invalidos')
        }

        if(transmision.value == ''){
            e.preventDefault()
            errors.push('Debe ingresar el tipo de transmisión que usa su vehiculo')
            transmision.classList.add('campos-invalidos')
        }else{
            transmision.classList.add('campos-validos')
            transmision.classList.remove('campos-invalidos')
        }


        if(condicion.value == ''){
            e.preventDefault()
            errors.push('Ingrese en que condicion se encuentra su vehiculo')
            condicion.classList.add('campos-invalidos')
        }else{
            condicion.classList.add('campos-validos')
            condicion.classList.remove('campos-invalidos')
        }

        if(categoria.value == ''){
            e.preventDefault()
            errors.push('Ingrese la categoria a la que pertenece su vehiculo')
            condicion.classList.add('campos-invalidos')
        }else{
            categoria.classList.add('campos-validos')
            categoria.classList.remove('campos-invalidos')
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
                    
                }
                )
                
            }
        }else{
            Swal.fire(
                'Excelente!',
                'Todo parece estar bien!Sigamos!',
                'success'
            )
        }



    })
 
}