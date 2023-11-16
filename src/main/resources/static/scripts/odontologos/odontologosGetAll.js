document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/odontologos/getAll'; //odontologos
  const tbody = document.getElementById('campos-odontologos');

  // Configuración para las solicitudes fetch
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Función para consultar pacientes y renderizarlos
  async function consultarOdontologos(url, settings) {
    try {
      const response = await fetch(url, settings);

      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }

      const odontologos = await response.json();
      renderizarOdontologos(odontologos);
    } catch (error) {
      mostrarError(`Error al obtener odontologos: ${error.message}`);
    }
  }

  // Función para renderizar pacientes en la tabla
  function renderizarOdontologos(odontologos) {
    let template = '';
    odontologos.forEach(odontologo => {  //tener presente que odontologos no tiene domicilio, mirar el DTO
      
      template += `
        <tr>
        <td>${odontologo.id}</td>
          <td>${odontologo.nombre}</td> 
          <td>${odontologo.apellido}</td>
          <td>${odontologo.matricula}</td>
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

  // Evento de carga para consultar odontologos
  consultarOdontologos(url, settings);
});
