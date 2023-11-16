document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/pacientes/add';
  const formulario = document.getElementById('crearPacienteForm');
  const botonCrearPaciente = document.getElementById('botonCrearPaciente');

  //Manejo de la fecha
  const fechaInput = document.getElementById('inputFechaRegistroCrear');
  const fechaActual = new Date();
  const fechaActualFormat = fechaActual.toISOString().split('T')[0]; // Obtenemos la fecha en formato YYYY-MM-DD
  fechaInput.value = fechaActualFormat;

  botonCrearPaciente.addEventListener('click', async function (event) {
    event.preventDefault();
  //formulario.addEventListener('submit', async function (event) {
    // Obtener los valores del formulario
    const nombre = document.getElementById('inputNombreCrear').value;
    const apellido = document.getElementById('inputApellidoCrear').value;
    const dni = document.getElementById('inputDniCrear').value;
    const domicilio = document.getElementById('inputDireccionCrear').value;
    //const username = document.getElementById('username').value;
    //const password = document.getElementById('password').value;

    // Validación de campos vacios
    if (!nombre || !apellido || !dni || !domicilio) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos del formulario.'
      });
      return;
    }

    // Crear el objeto paciente
    const nuevoPaciente = {
      nombre,
      apellido,
      dni,
      fecha_registro: fechaActualFormat,
      domicilio: {
        domicilio,
      },
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
      body: JSON.stringify(nuevoPaciente),
    };

    try {
      // Enviar la solicitud POST para agregar el paciente
      const response = await fetch(url, settings);

      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Paciente agregado exitosamente:", data);
      Swal.fire(
        'Paciente agregado exitosamente!',
        '',
        'success'
      );

      // Puedes actualizar la lista de pacientes u realizar otras acciones aquí

      formulario.reset();
    } catch (error) {
      console.error("Error al agregar paciente:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al agregar paciente!'
      });
    }
  });
});


