// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
  // URL base para las solicitudes al servidor
  const urlBase = 'http://localhost:8080/turnos/';
  const botonActualizarTurno = document.getElementById('botonActualizarTurno');

  // Elementos del DOM
  const buscarButton = document.getElementById('buscarTurnoActualizar');
  const turnoIdInput = document.getElementById('turnoIdActualizar');
  const formulario = document.getElementById('actualizarTurnoForm');

  // Agregar un evento al botón de búsqueda
  buscarButton.addEventListener('click', async function () {
    // Obtiene el ID del turno ingresado por el usuario
    const id = turnoIdInput.value;
    if (!id) {
      mostrarError('Por favor, ingresa un número de turno válido.');
      return;
    }
    // Construye la URL para consultar un turno por su ID y realiza la solicitud
    const url = `${urlBase}${id}`;
    try {
      // Consulta al turno y espera la respuesta
      const turno = await consultarTurno(url);
      if (turno) {
        llenarFormularioActualizacion(turno);
      }
    } catch (error) {
      mostrarError('No se pudo encontrar el turno.');
    }
  });

  // Agregar un evento al envío del formulario de actualización
  botonActualizarTurno.addEventListener('click', async function (event) {
    event.preventDefault();

    // Obtiene el ID del turno y los datos del formulario
    const turnoId = turnoIdInput.value;
    const turnoActualizado = obtenerDatosDelFormulario();

    if (!turnoId) {
      mostrarError('El número del turno es necesario para actualizar.');
      return;
    }

    // Construye la URL y las configuraciones para actualizar un turno
    const url = `${urlBase}update`;
    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(turnoActualizado),
    };

    try {
      // Actualiza al turno y espera la respuesta
      await actualizarTurno(url, settings);
    } catch (error) {
      mostrarError('Error al actualizar turno.');
    }
  });

  // Función para consultar un turno por su ID
  async function consultarTurno(url) {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log("Consultando turno...");
      // Realiza la solicitud GET al servidor y espera la respuesta
      const response = await fetch(url, settings);
      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }
      if (response.status === 204) {
        mostrarError('No se encontraron resultados para el número proporcionado.');
        return null;
      }
      // Parsea la respuesta como JSON y la devuelve
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('No se pudo encontrar al turno.');
    }
  }


  // Función para llenar el formulario de actualización con los datos del turno
  function llenarFormularioActualizacion(turno) {
    // Extrae los datos del turno y los asigna a los elementos del formulario
    const {
      id,
      paciente: { id: idP, nombre: nombreP, apellido: apellidoP },
      odontologo: { id: idO, nombre: nombreO, apellido: apellidoO },
      fechaTurno,
      horaTurno
    } = turno;

    const inputId = document.getElementById('inputIdActualizar');
    const idPaciente = document.getElementById('idPacienteActualizar');
    const nombrePaciente = document.getElementById('nombrePacienteActualizar');
    const apellidoPaciente = document.getElementById('apellidoPacienteActualizar');
    const idOdontologo = document.getElementById('idOdontologoActualizar');
    const nombreOdontologo = document.getElementById('nombreOdontologoActualizar');
    const apellidoOdontologo = document.getElementById('apellidoOdontologoActualizar');
    const inputFechaRegistro = document.getElementById('inputFechaRegistroActualizar');
    const inputhoraTurno = document.getElementById('inputHoraActualizar');

    // Asigna los valores del turno a los campos del formulario
    inputId.value = id;
    idPaciente.value = idP;
    nombrePaciente.value = nombreP;
    apellidoPaciente.value = apellidoP;
    idOdontologo.value = idO;
    nombreOdontologo.value = nombreO;
    apellidoOdontologo.value = apellidoO;
    inputFechaRegistro.value = fechaTurno;
    inputhoraTurno.value = horaTurno;
  }

  // Función para mostrar un mensaje de error
  function mostrarError(mensaje) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  // Función para obtener los datos del formulario
  function obtenerDatosDelFormulario() {
    // Obtiene los valores de los campos del formulario
    const inputId = document.getElementById('inputIdActualizar').value;
    const idPaciente = document.getElementById('idPacienteActualizar').value;
    const nombrePaciente = document.getElementById('nombrePacienteActualizar').value;
    const apellidoPaciente = document.getElementById('apellidoPacienteActualizar').value;
    const idOdontologo = document.getElementById('idOdontologoActualizar').value;
    const nombreOdontologo = document.getElementById('nombreOdontologoActualizar').value;
    const apellidoOdontologo = document.getElementById('apellidoOdontologoActualizar').value;
    const inputFechaRegistro = document.getElementById('inputFechaRegistroActualizar').value;
    const horaTurno = document.getElementById('inputHoraActualizar').value;

    // Retorna un objeto con los datos del formulario
    return {
      id: inputId,
      paciente: {
        id: idPaciente,
      },
      odontologo: {
        id: idOdontologo,
      },
      fechaTurno: inputFechaRegistro,
      horaTurno: horaTurno,
    };
  }

  // Función para actualizar un turno en el servidor
  async function actualizarTurno(url, settings) {
    try {
      // Realiza la solicitud PUT al servidor y espera la respuesta
      const response = await fetch(url, settings);
      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }
      // Parsea la respuesta como JSON y muestra un mensaje de éxito
      const data = await response.json();
      console.log("Turno actualizado exitosamente:", data);
      Swal.fire('Turno actualizado exitosamente!', '', 'success');
      formulario.reset();
    } catch (error) {
      console.error("Error al actualizar turno:", error);
      throw new Error('Error al actualizar turno.');
    }
  }
});
