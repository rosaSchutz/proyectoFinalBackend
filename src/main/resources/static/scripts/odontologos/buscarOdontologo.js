// Función para consultar un paciente por ID
async function consultarOdontologo(url) {
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log("Consultando odontologo...");
    const response = await fetch(url, settings);

    if (!response.ok) {
      throw new Error(`Error de HTTP: ${response.status}`);
    }

    // Verifica si la respuesta no está vacía antes de intentar analizarla como JSON
    if (response.status === 204) {
      throw new Error('No se encontraron resultados para la matricula proporcionada.');
    }

    const odontologo = await response.json();
    console.log("Odontologo:");
    console.table(odontologo);
    renderizarOdontologo(odontologo);
  } catch (error) {
    console.error(error);
    mostrarError('No se pudo encontrar al odontologo.');
  }
}

/*
// Función para renderizar un paciente en pantalla
function renderizarOdontologo(odontologo) {
  // Acceder a los campos del domicilio
  
  const template = `
  <tr>
    <td
        class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-left">
        ${odontologo.nombre}
    </td>
    <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-left">
        ${odontologo.apellido}</td>
    <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-left">
        ${odontologo.matricula}</td>
  </tr>
  `;

  const tbody = document.getElementById('campos-odontologosMatricula');
  tbody.innerHTML = template;
}
*/

function renderizarOdontologo(odontologo) {
  // Extrae los datos del paciente y los asigna a los elementos del formulario
  const {
      id,
      nombre,
      apellido,
      matricula,
  } = odontologo;

  const inputId = document.getElementById('inputIdBuscar');
  const inputNombre = document.getElementById('inputNombreBuscar');
  const inputApellido = document.getElementById('inputApellidoBuscar');
  const inputMatricula = document.getElementById('inputMatriculaBuscar');
  //const usernameInput = document.getElementById('username');
  //const passwordInput = document.getElementById('password');

  // Asigna los valores del paciente a los campos del formulario
  inputId.value = id;
  inputNombre.value = nombre;
  inputApellido.value = apellido;
  inputMatricula.value = matricula;

  //usernameInput.value = username;
  //passwordInput.value = password;
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: mensaje,
  });
}

// Manejo del evento de clic en el botón "Buscar"
document.addEventListener('DOMContentLoaded', function () {
  const urlBase = 'http://localhost:8080/odontologos/buscarMatricula/';
  const buscarButton = document.getElementById('buscarOdontologoMatricula');
  const odontologoMatriculaInput = document.getElementById('odontologoIdMatricula');

  buscarButton.addEventListener('click', function () {
    const matricula = odontologoMatriculaInput.value;
    if (!matricula) {
      mostrarError('Por favor, ingresa una matricula válida.');
      return;
    }

    const url = `${urlBase}${matricula}`;
    consultarOdontologo(url);
  });
});
