// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
  // URL base para las solicitudes al servidor
  const urlBase = 'http://localhost:8080/odontologos/';

  // Elementos del DOM
  const buscarButton = document.getElementById('buscarOdontologos');
  const odontologoIdInput = document.getElementById('odontologoId');
  const formulario = document.getElementById('actualizarOdontologoForm');

  // Agregar un evento al botón de búsqueda
  buscarButton.addEventListener('click', async function () {
    // Obtiene el ID del paciente ingresado por el usuario
    const id = odontologoIdInput.value;
    if (!id) {
      mostrarError('Por favor, ingresa un ID de odontologo válido.');
      return;
    }
    // Construye la URL para consultar un paciente por su ID y realiza la solicitud
    const url = `${urlBase}${id}`;
    try {
      // Consulta al paciente y espera la respuesta
      const odontologo = await consultarOdontologo(url);
      if (odontologo) {
        llenarFormularioActualizacion(odontologo);
      }
    } catch (error) {
      mostrarError('No se pudo encontrar al odontologo.');
    }
  });

  // Agregar un evento al envío del formulario de actualización
  formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtiene el ID del paciente y los datos del formulario
    const odontologoId = odontologoIdInput.value;
    const odontologoActualizado = obtenerDatosDelFormulario();

    if (!odontologoId) {
      mostrarError('El ID del odontologo es necesario para actualizar.');
      return;
    }

    // Construye la URL y las configuraciones para actualizar un paciente
    const url = `${urlBase}update`;
    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(odontologoActualizado),
    };

    try {
      // Actualiza al paciente y espera la respuesta
      await actualizarOdontologo(url, settings);
    } catch (error) {
      mostrarError('Error al actualizar odontologo.');
    }
  });

  // Función para consultar un paciente por su ID
  async function consultarOdontologo(url) {
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log("Consultando odontologo...");
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
      throw new Error('No se pudo encontrar al odontologo.');
    }
  }

  // Función para llenar el formulario de actualización con los datos del paciente
  function llenarFormularioActualizacion(odontologo) {

    // Extrae los datos del paciente y los asigna a los elementos del formulario
    const {
      id,
      nombre,
      apellido,
      matricula,
      //usuario: { username, password },
    } = odontologo;




    const inputId = document.getElementById('inputId');
    const inputNombre = document.getElementById('inputNombre');
    const inputApellido = document.getElementById('inputApellido');
    const inputMatricula = document.getElementById('inputMatricula');
    //const usernameInput = document.getElementById('username');
    //const passwordInput = document.getElementById('password');

    // Asigna los valores del paciente a los campos del formulario
    inputId.value = id;
    inputNombre.value = nombre;
    inputApellido.value = apellido;
    inputMatricula.value = matricula;
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
    const inputMatricula = document.getElementById('inputMatricula').value;
    //const usernameInput = document.getElementById('username').value;
    //const passwordInput = document.getElementById('password').value;

    // Retorna un objeto con los datos del formulario
    return {
      id: inputId,
      nombre: inputNombre,
      apellido: inputApellido,
      matricula: inputMatricula,
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
  async function actualizarOdontologo(url, settings) {
    try {
      // Realiza la solicitud PUT al servidor y espera la respuesta
      const response = await fetch(url, settings);
      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }
      // Parsea la respuesta como JSON y muestra un mensaje de éxito
      const data = await response.json();
      console.log("Odontologo actualizado exitosamente:", data);
      Swal.fire('Odontologo actualizado exitosamente!', '', 'success');
      formulario.reset();
    } catch (error) {
      console.error("Error al actualizar Odontologo:", error);
      throw new Error('Error al actualizar Odontologo.');
    }
  }
});
