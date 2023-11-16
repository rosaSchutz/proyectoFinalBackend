document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/turnos/getAll';
  const tbody = document.getElementById('campos-turnos');

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
          <td>${turno.id}</td>
          <td>${registroPaciente}</td>
          <td>${nombrePaciente} ${apellidoPaciente}</td>
          <td>${registroOdontologo}</td>
          <td>${nombreOdontologo} ${apellidoOdontologo}</td>
          <td>${turno.fechaTurno}</td>
          <td>${turno.horaTurno}</td>
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
