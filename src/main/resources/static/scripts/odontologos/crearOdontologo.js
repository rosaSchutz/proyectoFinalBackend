document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/odontologos/add';
  const formulario = document.getElementById('crearOdontologoForm');
  const botonCrearOdontologo = document.getElementById('botonCrearOdontologo');
 
  

  botonCrearOdontologo.addEventListener('click', async function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('inputNombreCrear').value;
    const apellido = document.getElementById('inputApellidoCrear').value;
    const matricula = document.getElementById('inputMatriculaCrear').value;
    //const username = document.getElementById('username').value;
    //const password = document.getElementById('password').value;

    // Validación de campos vacios
    if (!nombre || !apellido || !matricula) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos del formulario.'
      });
      return;
    }

    // Crear el objeto paciente
    const nuevoOdontologo= {
      nombre,
      apellido,
      matricula,
      /*
      usuario: {
        username,
        password,
        rol: 'ADMIN',
      },
      */
    };

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(nuevoOdontologo),
    };

    try {
      // Enviar la solicitud POST para agregar el paciente
      const response = await fetch(url, settings);

      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Odontologo agregado exitosamente:", data);
      Swal.fire(
        'Odontologo agregado exitosamente!',
        '',
        'success'
      );

      // Puedes actualizar la lista de pacientes u realizar otras acciones aquí

      formulario.reset();
    } catch (error) {
      console.error("Error al agregar odontologo:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al agregar odontologo!'
      });
    }
  });
});

