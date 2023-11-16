// Función para consultar un turno por ID
async function consultarTurno(url) {
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log("Consultando turno...");
    const response = await fetch(url, settings);

    if (!response.ok) {
      throw new Error(`Error de HTTP: ${response.status}`);
    }

    // Verifica si la respuesta no está vacía antes de intentar analizarla como JSON
    if (response.status === 204) {
      throw new Error('No se encontraron resultados para el número proporcionado.');
    }

    const turno = await response.json();
    console.log("turno:");
    console.table(turno);
    renderizarTurno(turno);
  } catch (error) {
    console.error(error);
    mostrarError('No se pudo encontrar al turno.');
  }
}

/*
// Función para renderizar un turno en pantalla
function renderizarTurno(turno) {
  // Acceder a los campos del odontologo
  const odontologo = turno.odontologo;
  const nombreOdontologo = odontologo.nombre;
  const apellidoOdontologo = odontologo.apellido;
  // Acceder a los campos del paciente
  const paciente = turno.paciente;
  const nombrePaciente = paciente.nombre;
  const apellidoPaciente = paciente.apellido;
  
    const template = `
    <tr>
    <td
        class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center"
        id="id-paciente">
        <h2 class="font-normal text-gray-800 dark:text-gray-700">
        ${turno.id}</h2>
    </td>
    <td
        class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-left">
        ${nombrePaciente} ${apellidoPaciente}
    </td>
    <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-left">
        ${nombreOdontologo} ${apellidoOdontologo}
    </td>
    <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-left">
        ${turno.fechaTurno}</td>
    <td
        class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-left">
        ${turno.horaTurno}
    </td>
  </tr>
  `;
  
  const tbody = document.getElementById('campos-turnosId');
  tbody.innerHTML = template;
}
*/

function renderizarTurno(turno) {
  const {
    id,
    paciente: { id: idPaciente, nombre: nombrePaciente, apellido: apellidoPaciente },
    odontologo: { id: idOdontologo, nombre: nombreOdontologo, apellido: apellidoOdontologo },
    fechaTurno,
    horaTurno,
  } = turno;

  const idturno = document.getElementById('inputIdBuscar');
  const datosPaciente = document.getElementById('inputPacienteBuscar');
  const datosOdontologo = document.getElementById('inputOdontologoBuscar');
  const inputFechaTurno = document.getElementById('inputFechaBuscar');
  const inputHoraTurno = document.getElementById('inputHoraBuscar');

  idturno.value = id;
  datosPaciente.value = `${idPaciente} ${nombrePaciente} ${apellidoPaciente}`;
  datosOdontologo.value = `${idOdontologo} ${nombreOdontologo} ${apellidoOdontologo}`;
  inputFechaTurno.value = fechaTurno;
  inputHoraTurno.value = horaTurno;
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
  const urlBase = 'http://localhost:8080/turnos/';
  const buscarButton = document.getElementById('buscarTurnoIdButton');
  const turnoIdInput = document.getElementById('buscarTurnoId');

  buscarButton.addEventListener('click', function () {
    const id = turnoIdInput.value;
    if (!id) {
      mostrarError('Por favor, ingresa un número de turno válido.');
      return;
    }

    const url = `${urlBase}${id}`;
    consultarTurno(url);
  });
});
