// Este evento se dispara cuando el documento HTML ha sido completamente cargado.
document.addEventListener('DOMContentLoaded', function () {
  // Definición de las URL de la API y obtención de la referencia a la tabla en el HTML.
  const apiUrl = 'http://localhost:8080/turnos/';
  const urlConsultarTurnos = `${apiUrl}getAll`;
  const tbody = document.getElementById('campos-turnosEliminar');

  // Función principal para consultar y mostrar la lista de turnos.
  async function consultarTurnos() {
    try {
      // Se obtienen los datos de los turnos desde la API.
      const turnos = await obtenerTurnos();
      // Se renderizan los turnos en la tabla.
      renderizarTurnos(turnos);
      // Se configuran los botones de eliminación para cada turno.
      setupDeleteButtons(turnos);
    } catch (error) {
      // Si ocurre un error, se muestra un mensaje de error.
      mostrarError(error.message);
    }
  }

  // Función para obtener los turnos desde la API.
  async function obtenerTurnos() {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Se realiza la solicitud GET para obtener la lista de turnos.
    const response = await fetch(urlConsultarTurnos, settings);
    if (!response.ok) {
      throw new Error(`Error de HTTP: ${response.status}`);
    }
    // Se parsea la respuesta como JSON y se retorna la lista de turnos.
    return await response.json();
  }

  // Función para renderizar turnos en la tabla
  function renderizarTurnos(turnos) {
    let template = '';
    turnos.forEach(turno => {
      // Acceder a los campos del odontologo
      const odontologo = turno.odontologo;
      const idO = odontologo.id;
      const nombreOdontologo = odontologo.nombre;
      const apellidoOdontologo = odontologo.apellido;
      // Acceder a los campos del paciente
      const paciente = turno.paciente;
      const idP = paciente.id;
      const nombrePaciente = paciente.nombre;
      const apellidoPaciente = paciente.apellido;

      template += `
    <li class="px-2 py-3 m-0 border border-gray-200 rounded-sm">
    <div class="flex items-center space-x-4">
        <div class="flex-shrink-0 hidden sm:block">
            <img class="w-8 h-8 rounded-full" src="./assets/undraw_pic_profile_re_7g2h.svg" alt="profile image">
        </div>
        <div class="flex-1 min-w-0">
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                  Turno №:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${turno.id}
                </p>
            </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                    Datos paciente:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                  número paciente:${idP} nombres y apellidos:${nombrePaciente} ${apellidoPaciente}
                </p>
            </div>
            <div class="flex flex-row gap-2">
            <p class="text-sm text-gray-700 truncate">
                Datos odontologo:
            </p>
            <p class="text-sm font-medium text-gray-900 truncate">
                  número odontologo:${idO} nombres y apellidos:${nombreOdontologo} ${apellidoOdontologo}
            </p>
        </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                  Fecha turno:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${turno.fechaTurno}
                </p>
            </div>
            <div class="flex flex-row gap-2">
            <p class="text-sm text-gray-700 truncate">
              Fecha turno:
            </p>
            <p class="text-sm font-medium text-gray-900 truncate">
                ${turno.horaTurno}
            </p>
        </div>
        </div>
        <div>
            <button class="borrar border-none" data-id="${turno.id}" aria-label="trash" aria>
              <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
    </li>
    `;


    });
    tbody.innerHTML = template;
  }

  // Función para configurar los botones de eliminación para cada turno.
  async function setupDeleteButtons(turnos) {
    const deleteButtons = document.querySelectorAll('.borrar');
    console.log('Número de botones de eliminación:', deleteButtons.length);

    for (let i = 0; i < deleteButtons.length; i++) {
      const button = deleteButtons[i];
      // Se agrega un evento de click a cada botón de eliminación.
      button.addEventListener('click', async function (event) {
        try {
          // Se obtiene el ID del turno a eliminar.
          const id = event.currentTarget.dataset.id;
          // Se muestra un mensaje de confirmación al usuario.
          const confirmado = await confirmarEliminacion();
          if (confirmado) {
            // Si se confirma, se envía una solicitud DELETE para eliminar el turno.
            await eliminarTurno(id);
            // Se elimina la fila correspondiente en la tabla.
            eliminarFilaDeTabla(event);
          }
        } catch (error) {
          // Si ocurre un error, se muestra un mensaje de error.
          mostrarError(error.message);
        }
      });
    }
  }

  // Función para mostrar un mensaje de confirmación al usuario.
  async function confirmarEliminacion() {
    const result = await Swal.fire({
      title: 'Desea eliminar el turno?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3AA6B9',
      cancelButtonColor: '#BB3E81',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    });
    // Se retorna `true` si el usuario confirmó la eliminación, de lo contrario, `false`.
    return result.isConfirmed;
  }

  // Función para enviar una solicitud DELETE para eliminar un turno.
  async function eliminarTurno(id) {
    const url = `${apiUrl}${id}`;
    const settings = {
      method: 'DELETE',
    };
    // Se envía la solicitud DELETE para eliminar al turno.
    const response = await fetch(url, settings);
    if (!response.ok) {
      throw new Error(`Error de HTTP: ${response.status}`);
    }
    // Se verifica si la respuesta indica que el turno fue eliminado exitosamente.
    const data = await response.text();
    if (data !== "Eliminado") {
      throw new Error(`Error al eliminar turno: ${data}`);
    }
    // Se muestra un mensaje de éxito.
    Swal.fire('Turno eliminado exitosamente!', '', 'success');
  }

  // Función para eliminar la fila de la tabla correspondiente al turno eliminado.
  function eliminarFilaDeTabla(event) {
    const rowToDelete = event.target.closest('li');
    rowToDelete.remove();
  }

  // Función para mostrar un mensaje de error utilizando SweetAlert.
  function mostrarError(mensaje) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  // Se inicia el proceso de consulta de turnos cuando el documento esté listo.
  consultarTurnos();

});
