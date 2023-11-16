document.addEventListener('DOMContentLoaded', function () {
  const url = 'http://localhost:8080/turnos/add';
  const formulario = document.getElementById('crearTurnoForm');

  formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const fechaTurno = document.getElementById('inputFechaRegistro').value;
    const idOdontologo = document.getElementById('idOdontologo').value;
    const idPaciente = document.getElementById('idPaciente').value;

    // Validación de campos vacios
    if (!fechaTurno || !idOdontologo || !idPaciente) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos del formulario.'
      });
      return;
    }

    // Crear el objeto turno
    const nuevoTurno = {
      paciente: { id:idPaciente },
      odontologo: { id:idOdontologo },
      fechaTurno: fechaTurno,
    };


    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(nuevoTurno),
    };

    try {
      // Enviar la solicitud POST para agregar el turno
      const response = await fetch(url, settings);

      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Turno agregado exitosamente:", data);
      Swal.fire(
        'Turno agregado exitosamente!',
        '',
        'success'
      );

      formulario.reset();
    } catch (error) {
      console.error("Error al agregar el turno:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al agregar turno!'
      });
    }
  });
});

