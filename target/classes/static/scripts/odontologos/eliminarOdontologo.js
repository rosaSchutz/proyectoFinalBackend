// Este evento se dispara cuando el documento HTML ha sido completamente cargado.
document.addEventListener('DOMContentLoaded', function () {
  // Definición de las URL de la API y obtención de la referencia a la tabla en el HTML.
  const apiUrl = 'http://localhost:8080/odontologos/';
  const urlConsultarOdontologos = `${apiUrl}getAll`;
  const tbody = document.getElementById('campos-odontologosEliminar');

  // Función principal para consultar y mostrar la lista de pacientes.
  async function consultarOdontologo() {
    try {
      // Se obtienen los datos de los pacientes desde la API.
      const odontologos = await obtenerOdontologos();
      // Se renderizan los pacientes en la tabla.
      renderizarOdontologos(odontologos);
      // Se configuran los botones de eliminación para cada paciente.
      setupDeleteButtons(odontologos);
    } catch (error) {
      // Si ocurre un error, se muestra un mensaje de error.
      mostrarError(error.message);
    }
  }

  // Función para obtener los pacientes desde la API.
  async function obtenerOdontologos() {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Se realiza la solicitud GET para obtener la lista de pacientes.
    const response = await fetch(urlConsultarOdontologos, settings);
    if (!response.ok) {
      throw new Error(`Error de HTTP: ${response.status}`);
    }
    // Se parsea la respuesta como JSON y se retorna la lista de odontologos.
    return await response.json();
  }

  // Función para renderizar la lista de odontologos en la tabla HTML.
  function renderizarOdontologos(odontologos) {
    let template = '';
    odontologos.forEach(odontologo => {
      
      // Se construye una fila de la tabla para cada odontologo.
    template += `
    <li class="px-2 py-3 m-0 border border-gray-200 rounded-sm">
    <div class="flex items-center space-x-4">
        <div class="flex-shrink-0 hidden sm:block">
            <img class="w-8 h-8 rounded-full" src="./assets/undraw_pic_profile_re_7g2h.svg" alt="profile image">
        </div>
        <div class="flex-1 min-w-0">
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                  Odontologo №:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${odontologo.id}
                </p>
            </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                    Nombre Completo:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${odontologo.nombre} ${odontologo.apellido}
                </p>
            </div>
            <div class="flex flex-row gap-2">
                <p class="text-sm text-gray-700 truncate">
                  Matricula:
                </p>
                <p class="text-sm font-medium text-gray-900 truncate">
                    ${odontologo.matricula}
                </p>
            </div>
        </div>
        <div>
            <button class="borrar border-none" data-id="${odontologo.id}" aria-label="trash" aria>
              <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
    </li>
    `;
    });
    // Se actualiza el contenido de la tabla con la lista de pacientes renderizada.
    tbody.innerHTML = template;
  }

  // Función para configurar los botones de eliminación para cada paciente.
  async function setupDeleteButtons(odontologos) {
    const deleteButtons = document.querySelectorAll('.borrar');
    console.log('Número de botones de eliminación:', deleteButtons.length);

    for (let i = 0; i < deleteButtons.length; i++) {
      const button = deleteButtons[i];
      // Se agrega un evento de click a cada botón de eliminación.
      button.addEventListener('click', async function (event) {
        try {
          // Se obtiene el ID del paciente a eliminar.
          const id = event.currentTarget.dataset.id;
          // Se muestra un mensaje de confirmación al usuario.
          const confirmado = await confirmarEliminacion();
          if (confirmado) {
            // Si se confirma, se envía una solicitud DELETE para eliminar el paciente.
            await eliminarOdontologo(id);
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
      title: 'Desea eliminar el odontologo?',
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

  // Función para enviar una solicitud DELETE para eliminar un paciente.
  async function eliminarOdontologo(id) {
    const url = `${apiUrl}${id}`;
    const settings = {
      method: 'DELETE',
    };
    // Se envía la solicitud DELETE para eliminar al paciente.
    const response = await fetch(url, settings);
    if (!response.ok) {
      throw new Error(`Error de HTTP: ${response.status}`);
    }
    // Se verifica si la respuesta indica que el paciente fue eliminado exitosamente.
    const data = await response.text();
    if (data !== "Eliminado") {
      throw new Error(`Error al eliminar odontologo: ${data}`);
    }
    // Se muestra un mensaje de éxito.
    Swal.fire('Odontologo eliminado exitosamente!', '', 'success');
  }

  // Función para eliminar la fila de la tabla correspondiente al paciente eliminado.
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

  // Se inicia el proceso de consulta de pacientes cuando el documento esté listo.
  consultarOdontologo();

});
