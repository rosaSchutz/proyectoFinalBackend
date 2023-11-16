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
          <td>${turno.id}</td>
          <td>${nombrePaciente} ${apellidoPaciente}</td>
          <td>${nombreOdontologo} ${apellidoOdontologo}</td>
          <td>${turno.fechaTurno}</td>
          <td>${turno.horaTurno}</td>
        </tr>
      `;
  const tbody = document.getElementById('campos-turnos');
  tbody.innerHTML = template;
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
  const buscarButton = document.getElementById('buscarTurno');
  const turnoIdInput = document.getElementById('turnoId');

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
