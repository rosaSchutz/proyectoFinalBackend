// Función para consultar un paciente por ID
async function consultarPaciente(url) {
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log("Consultando paciente...");
    const response = await fetch(url, settings);

    if (!response.ok) {
      throw new Error(`Error de HTTP: ${response.status}`);
    }

    // Verifica si la respuesta no está vacía antes de intentar analizarla como JSON
    if (response.status === 204) {
      throw new Error('No se encontraron resultados para el ID proporcionado.');
    }

    const paciente = await response.json();
    console.log("Paciente:");
    console.table(paciente);
    renderizarPaciente(paciente);
  } catch (error) {
    console.error(error);
    mostrarError('No se pudo encontrar al paciente.');
  }
}

// Función para renderizar un paciente en pantalla
function renderizarPaciente(paciente) {
  // Acceder a los campos del domicilio
  const domicilio = paciente.domicilio;
  const calle = domicilio.calle;
  const numero = domicilio.numero;
  const localidad = domicilio.localidad;
  const provincia = domicilio.provincia;

  const template = `
    <tr>
      <td>${paciente.nombre}</td>
      <td>${paciente.apellido}</td>
      <td>${paciente.dni}</td>
      <td>${paciente.fecha_registro}</td>
      <td>${calle}, ${numero}, ${localidad}, ${provincia}</td>
    </tr>
  `;

  const tbody = document.getElementById('campos-pacientes');
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
  const urlBase = 'http://localhost:8080/pacientes/buscarDni/';
  const buscarButton = document.getElementById('buscarPaciente');
  const pacienteIdInput = document.getElementById('pacienteId');

  buscarButton.addEventListener('click', function () {
    const dni = pacienteIdInput.value;
    if (!dni) {
      mostrarError('Por favor, ingresa un dni de paciente válido.');
      return;
    }

    const url = `${urlBase}${dni}`;
    consultarPaciente(url);
  });
});
