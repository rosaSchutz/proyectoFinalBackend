// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
  // URL base para las solicitudes al servidor
  const urlBase = 'http://localhost:8080/pacientes/';

  // Elementos del DOM
  const buscarButton = document.getElementById('buscarPaciente');
  const pacienteIdInput = document.getElementById('pacienteId');
  const formulario = document.getElementById('actualizarPacienteForm');

  // Agregar un evento al botón de búsqueda
  buscarButton.addEventListener('click', async function () {
    // Obtiene el ID del paciente ingresado por el usuario
    const id = pacienteIdInput.value;
    if (!id) {
      mostrarError('Por favor, ingresa un ID de paciente válido.');
      return;
    }
    // Construye la URL para consultar un paciente por su ID y realiza la solicitud
    const url = `${urlBase}${id}`;
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
  formulario.addEventListener('submit', async function (event) {
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
      domicilio: { calle, numero, localidad, provincia },
    } = paciente;

    const inputId = document.getElementById('inputId');
    const inputNombre = document.getElementById('inputNombre');
    const inputApellido = document.getElementById('inputApellido');
    const inputDni = document.getElementById('inputDni');
    const inputFechaRegistro = document.getElementById('inputFechaRegistro');
    const calleDomicilio = document.getElementById('calleDomicilio');
    const numeroDomicilio = document.getElementById('numeroDomicilio');
    const localidadDomicilio = document.getElementById('localidadDomicilio');
    const provinciaDomicilio = document.getElementById('provinciaDomicilio');
    //const usernameInput = document.getElementById('username');
    //const passwordInput = document.getElementById('password');

    // Asigna los valores del paciente a los campos del formulario
    inputId.value = id;
    inputNombre.value = nombre;
    inputApellido.value = apellido;
    inputDni.value = dni;
    inputFechaRegistro.value = fecha_registro;
    calleDomicilio.value = calle;
    numeroDomicilio.value = numero;
    localidadDomicilio.value = localidad;
    provinciaDomicilio.value = provincia;
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
    const inputId = document.getElementById('inputId').value;
    const inputNombre = document.getElementById('inputNombre').value;
    const inputApellido = document.getElementById('inputApellido').value;
    const inputDni = document.getElementById('inputDni').value;
    const inputFechaRegistro = document.getElementById('inputFechaRegistro').value;
    const calleDomicilio = document.getElementById('calleDomicilio').value;
    const numeroDomicilio = document.getElementById('numeroDomicilio').value;
    const localidadDomicilio = document.getElementById('localidadDomicilio').value;
    const provinciaDomicilio = document.getElementById('provinciaDomicilio').value;
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
        calle: calleDomicilio,
        numero: numeroDomicilio,
        localidad: localidadDomicilio,
        provincia: provinciaDomicilio,
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
      formulario.reset();
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      throw new Error('Error al actualizar paciente.');
    }
  }
});
