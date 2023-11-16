/*
document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/turnos/getAll';
  const tbody = document.getElementById('campos-turnosGetAll');

  // Configuración para las solicitudes fetch
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Función para consultar turnos y renderizarlos
  async function consultarTurnos(url, settings) {
    try {
      const response = await fetch(url, settings);

      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }

      const turnos = await response.json();
      renderizarTurnos(turnos);
    } catch (error) {
      mostrarError(`Error al obtener turnos: ${error.message}`);
    }
  }

  // Función para renderizar turnos en la tabla
  function renderizarTurnos(turnos) {
    let template = '';
    turnos.forEach(turno => {
      // Acceder a los campos del odontologo
      const odontologo = turno.odontologo;
      const registroOdontologo = odontologo.id;
      const nombreOdontologo = odontologo.nombre;
      const apellidoOdontologo = odontologo.apellido;
      // Acceder a los campos del paciente
      const paciente = turno.paciente;
      const registroPaciente = paciente.id;
      const nombrePaciente = paciente.nombre;
      const apellidoPaciente = paciente.apellido;
      template += `
      <tr>
        <td
            class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center"
            id="id-paciente">
            <h2 class="font-normal text-gray-800 dark:text-gray-700">
            ${turno.id}</h2>
        </td>
        <td
        class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">
        ${registroPaciente}
        </td>
        <td
            class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">
            ${nombrePaciente} ${apellidoPaciente}
        </td>
        <td
        class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">
        ${registroOdontologo}
        </td>
        <td
            class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-center">
            ${nombreOdontologo} ${apellidoOdontologo}</td>
        <td
            class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-center">
            ${turno.fechaTurno}</td>
        <td
            class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-center">
            ${turno.horaTurno}
        </td>
      </tr>
    `;
    });
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

  // Evento de carga para consultar turnos
  consultarTurnos(url, settings);
});
*/