document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/pacientes/getAll';
  const tbody = document.getElementById('campos-pacientes');

  // Configuración para las solicitudes fetch
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Función para consultar pacientes y renderizarlos
  async function consultarPacientes(url, settings) {
    try {
      const response = await fetch(url, settings);

      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }

      const pacientes = await response.json();
      renderizarPacientes(pacientes);
    } catch (error) {
      mostrarError(`Error al obtener pacientes: ${error.message}`);
    }
  }

  // Función para renderizar pacientes en la tabla
  function renderizarPacientes(pacientes) {
    let template = '';
    pacientes.forEach(paciente => {
      const domicilio = paciente.domicilio;
      const { calle, numero, localidad, provincia } = domicilio;
      template += `
        <tr>
          <td>${paciente.id}</td>
          <td>${paciente.nombre}</td>
          <td>${paciente.apellido}</td>
          <td>${paciente.dni}</td>
          <td>${paciente.fecha_registro}</td>
          <td>${calle}, ${numero}, ${localidad}, ${provincia}</td>
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

  // Evento de carga para consultar pacientes
  consultarPacientes(url, settings);
});