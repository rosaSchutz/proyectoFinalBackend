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
      throw new Error('No se encontraron resultados para el ID proporcionado.');
    }

    const odontologo = await response.json();
    console.log("Odontologo:");
    console.table(odontologo);
    renderizarOdontologo(odontologo);
  } catch (error) {
    console.error(error);
    mostrarError('No se pudo encontrar al paciente.');
  }
}

// Función para renderizar un paciente en pantalla
function renderizarOdontologo(odontologo) {
 
  const template = `
    <tr>
      
      <td>${odontologo.nombre}</td>
      <td>${odontologo.apellido}</td>
      <td>${odontologo.matricula}</td>
      
    </tr>
  `;

  const tbody = document.getElementById('campos-odontologos');
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
  const urlBase = 'http://localhost:8080/odontologos/';
  const buscarButton = document.getElementById('buscarOdontologo');
  const odontologoIdInput = document.getElementById('odontologoId');

  buscarButton.addEventListener('click', function () {
    const id = odontologoIdInput.value;
    if (!id) {
      mostrarError('Por favor, ingresa un ID de odontologo válido.');
      return;
    }

    const url = `${urlBase}${id}`;
    consultarOdontologo(url);
  });
});
