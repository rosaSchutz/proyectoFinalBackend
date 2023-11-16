// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
  // URL base para las solicitudes al servidor
  const urlBase = 'http://localhost:8080/pacientes/';
  const botonActualizarPaciente = document.getElementById('botonActualizarPaciente');

  // Elementos del DOM
  const buscarButton = document.getElementById('buscarPacienteActualizar');
  const pacienteIdInput = document.getElementById('pacienteIdActualizar');
  const formulario = document.getElementById('actualizarPacienteForm');

  // Agregar un evento al botón de búsqueda
  buscarButton.addEventListener('click', async function () {
    // Obtiene el ID del paciente ingresado por el usuario
    const dni = pacienteIdInput.value;
    if (!dni) {
      mostrarError('Por favor, ingresa un ID de paciente válido.');
      return;
    }
    // Construye la URL para consultar un paciente por su ID y realiza la solicitud
    const url = `${urlBase}buscarDni/${dni}`;
    try {
      // Consulta al paciente y espera la respuesta
      const paciente = await consultarPaciente(url);
      if (paciente) {
        llenarFormularioActualizacion(paciente);
      }
    } catch (error) {
      mostrarError('No se pudo encontrar al paciente.');
    }
  });

  // Agregar un evento al envío del formulario de actualización
  botonActualizarPaciente.addEventListener('click', async function (event) {
    event.preventDefault();

    // Obtiene el ID del paciente y los datos del formulario
    const pacienteId = pacienteIdInput.value;
    const pacienteActualizado = obtenerDatosDelFormulario();

    if (!pacienteId) {
      mostrarError('El ID del paciente es necesario para actualizar.');
      return;
    }

    // Construye la URL y las configuraciones para actualizar un paciente
    const url = `${urlBase}update`;
    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(pacienteActualizado),
    };

    try {
      // Actualiza al paciente y espera la respuesta
      await actualizarPaciente(url, settings);
      formulario.reset();
    } catch (error) {
      mostrarError('Error al actualizar paciente.');
    }
  });

  // Función para consultar un paciente por su ID
  async function consultarPaciente(url) {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log("Consultando paciente...");
      // Realiza la solicitud GET al servidor y espera la respuesta
      const response = await fetch(url, settings);
      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }
      if (response.status === 204) {
        mostrarError('No se encontraron resultados para el ID proporcionado.');
        return null;
      }
      // Parsea la respuesta como JSON y la devuelve
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('No se pudo encontrar al paciente.');
    }
  }

  // Función para llenar el formulario de actualización con los datos del paciente
  function llenarFormularioActualizacion(paciente) {
    // Extrae los datos del paciente y los asigna a los elementos del formulario
    const {
      id,
      nombre,
      apellido,
      dni,
      fecha_registro,
      domicilio: {
        domicilio,
      },
    } = paciente;

    const inputId = document.getElementById('inputIdActualizar');
    const inputNombre = document.getElementById('inputNombreActualizar');
    const inputApellido = document.getElementById('inputApellidoActualizar');
    const inputDni = document.getElementById('inputDniActualizar');
    const inputFechaRegistro = document.getElementById('inputFechaRegistroActualizar');
    const inputDireccion = document.getElementById('inputDireccionActualizar');
    //const usernameInput = document.getElementById('username');
    //const passwordInput = document.getElementById('password');

    // Asigna los valores del paciente a los campos del formulario
    inputId.value = id;
    inputNombre.value = nombre;
    inputApellido.value = apellido;
    inputDni.value = dni;
    inputFechaRegistro.value = fecha_registro;
    inputDireccion.value = domicilio;
    //usernameInput.value = username;
    //passwordInput.value = password;
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
    const inputNombre = document.getElementById('inputNombreActualizar').value;
    const inputApellido = document.getElementById('inputApellidoActualizar').value;
    const inputDni = document.getElementById('inputDniActualizar').value;
    const inputFechaRegistro = document.getElementById('inputFechaRegistroActualizar').value;
    const inputDireccion = document.getElementById('inputDireccionActualizar').value;
    //const usernameInput = document.getElementById('username').value;
    //const passwordInput = document.getElementById('password').value;

    // Retorna un objeto con los datos del formulario
    return {
      id: inputId,
      nombre: inputNombre,
      apellido: inputApellido,
      dni: inputDni,
      fecha_registro: inputFechaRegistro,
      domicilio: {
        domicilio: inputDireccion,
      },
      /*
      usuario: {
        username: usernameInput,
        password: passwordInput,
        rol: 'ADMIN',
      },
      */
    };
  }

  // Función para actualizar un paciente en el servidor
  async function actualizarPaciente(url, settings) {
    try {
      // Realiza la solicitud PUT al servidor y espera la respuesta
      const response = await fetch(url, settings);
      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }
      // Parsea la respuesta como JSON y muestra un mensaje de éxito
      const data = await response.json();
      console.log("Paciente actualizado exitosamente:", data);
      Swal.fire('Paciente actualizado exitosamente!', '', 'success');
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      throw new Error('Error al actualizar paciente.');
    }
  }
});
