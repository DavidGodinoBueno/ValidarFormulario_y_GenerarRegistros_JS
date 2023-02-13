window.addEventListener("load", () => {
   var btnadduser = document.getElementById("adduser");
   var formulario = document.getElementById("formux");
   var tabla = document.getElementById("tabla");
   var mensaje_error = document.querySelector(".mensaje-error");

   /* Obtengo un array de todos los inputs del formulario */
   var losinputs = document.querySelectorAll("#formux input");

/* Objeto con expresiones regulares para validar campos */
   var regexps = {
       nombre: /^[a-zA-ZÀ-ÿ\s]{4,16}$/,
       apellidos: /^[a-zA-ZÀ-ÿ\s]{4,25}$/,
       dni: /^[0-9]{8}[A-Z]{1}$/,
       telefono: /^[0-9]{9}$/
   }

/* Función que por cada input va a llamar varias veces a una funcion cuyos parámetros
   compruban valor escrito y expresion, y muestra y oculta errores de leyenda */
   var validarCampos = (vC) => {
        switch(vC.target.id) {
           case "nombre":
               loscampos(regexps.nombre, vC.target, "Nombre");
           ;break;
           case "apellidos":
               loscampos(regexps.apellidos, vC.target, "Apellidos");
           ;break;
           case "dni":
               loscampos(regexps.dni, vC.target, "Dni");
           ;break;
           case "telefono":
               loscampos(regexps.telefono, vC.target, "Telefono");
           ;break;
        }
   }

/* Función que llamaré varias veces por cada input, y comprueba si los valores escritos
   coinciden con la expresion regular, y sino muestran error leyenda */
   var loscampos = (exp, input, error) => {
      if(!exp.test(input.value)) {
          document.getElementById(`error${error}`).classList.add("show-error");
      } else {
        document.getElementById(`error${error}`).classList.remove("show-error");
      }
   }

/* Itero por cada input para que llame a la funcion que me valida cada campo, y se ejecuta
   dicha funcion tanto si pierdo el foco, como cuando presiono una tecla */
   losinputs.forEach((i) => {
      i.addEventListener("keyup", validarCampos);
      i.addEventListener("blur", validarCampos);
   });

/* Anulo el evento de envio, y al hacer clic me genere un registro en la tabla, y esta mal escrito un error */
   btnadduser.addEventListener("click", (e) => {
       e.preventDefault();

      var valores = {
          ValNombre: document.getElementById("nombre").value,
          ValApellidos: document.getElementById("apellidos").value,
          ValDni: document.getElementById("dni").value,
          ValTelefono: document.getElementById("telefono").value
       }

       if(regexps.nombre.test(valores.ValNombre) && regexps.apellidos.test(valores.ValApellidos) &&
            regexps.dni.test(valores.ValDni) && regexps.telefono.test(valores.ValTelefono)) {
              mensaje_error.classList.remove("show-mensaje"); 
              tabla.innerHTML += "<tr><td>"+valores.ValNombre+"</td><td>"+valores.ValApellidos+"</td><td>"+valores.ValDni+"</td><td>"+valores.ValTelefono+"</td></tr>";
              formulario.reset();
       }  else {
             mensaje_error.classList.add("show-mensaje");
            setTimeout(() => {
               mensaje_error.classList.remove("show-mensaje");
            }, 5000);
       }

   });

});