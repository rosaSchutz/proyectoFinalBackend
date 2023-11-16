/*
document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/pacientes/getAll';
  const tbody = document.getElementById('campos-pacientesGetAll');

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
      const direccion = domicilio.domicilio;
      template += `
        <tr>
          <td
              class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap text-center">
              <h2 class="font-normal text-gray-800 dark:text-gray-700">
              ${paciente.id}</h2>
          </td>
          <td
              class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">
              ${paciente.nombre}
          </td>
          <td
              class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-center">
              ${paciente.apellido}</td>
          <td
              class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-center">
              ${paciente.dni}</td>
          <td
              class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-center">
              ${paciente.fecha_registro}</td>
          <td
              class="px-4 py-4 text-sm text-gray-500 dark:text-gray-700 whitespace-nowrap text-center">
              ${direccion}
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

  // Evento de carga para consultar pacientes
  consultarPacientes(url, settings);
});
*/