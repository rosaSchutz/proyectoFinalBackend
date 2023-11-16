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
  const direccion = domicilio.domicilio;
  const template = `
    <li class="px-2 m-0 border border-gray-200 rounded-sm">
    <div class="flex items-center space-x-4">
        <div class="flex-1 min-w-0">
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                    Fecha de registro:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${paciente.fecha_registro}
                </p>
            </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                    Paciente №:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${paciente.id}
                </p>
            </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                    Nombre Completo:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${paciente.nombre} ${paciente.apellido}
                </p>
            </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                    DNI:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${paciente.dni}
                </p>
            </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                    Direccción:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${direccion}
                </p>
            </div>
        </div>
    </div>
    </li>
  `;

  const tbody = document.getElementById('campos-pacientesDni');
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
  const urlBase = 'http://localhost:8080/pacientes/';
  const buscarButton = document.getElementById('buscarPacienteDni');
  const pacienteIdInput = document.getElementById('pacienteIdDni');

  buscarButton.addEventListener('click', function () {
    const id = pacienteIdInput.value;
    if (!id) {
      mostrarError('Por favor, ingresa un ID de paciente válido.');
      return;
    }

    const url = `${urlBase}${id}`;
    consultarPaciente(url);
  });
});
