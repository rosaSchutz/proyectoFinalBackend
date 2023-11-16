document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('crearTurnoForm'); // Agrega la referencia al formulario
    const botonCrearTurno = document.getElementById('botonCrearTurno');
    /*
    const urlObtenerOdontologos = 'http://localhost:8080/odontologos/getAll';
    const selectOdontologos = document.getElementById('odontologos');
    const formulario = document.getElementById('crearTurnoForm'); // Agrega la referencia al formulario

    // Configuración para las solicitudes fetch
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Función para consultar odontologos y llenar el select
    async function consultarOdontologos(url, settings) {
        try {
            const response = await fetch(url, settings);

            if (!response.ok) {
                throw new Error(`Error de HTTP: ${response.status}`);
            }

            const odontologos = await response.json();
            llenarSelectOdontologos(odontologos);
        } catch (error) {
            mostrarError(`Error al obtener odontologos: ${error.message}`);
        }
    }

    // Función para llenar el select con las opciones de odontologos
    function llenarSelectOdontologos(odontologo) {
        odontologos.forEach(odontologo => {
            const option = document.createElement('option');
            option.value = odontologo.id;
            option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
            selectOdontologos.appendChild(option);
        });
    }

    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    }

    

    // Evento de carga para consultar odontologos y llenar el select
    consultarOdontologos(urlObtenerOdontologos, settings);
    */

    // Evento 'submit' del formulario
    botonCrearTurno.addEventListener('click', async function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        //const selectedOdontologoId = selectOdontologos.value;
        const idPaciente = document.getElementById('idPacienteCrear').value;
        const idOdontologo = document.getElementById('idOdontologoCrear').value;
        const fechaTurno = document.getElementById('inputFechaCrear').value;
        const horaTurno = document.getElementById('inputHoraCrear').value;

        // Crear el objeto turno
        const nuevoTurno = {
            paciente: { id: idPaciente },
            odontologo: { id: idOdontologo },
            fechaTurno: fechaTurno,
            horaTurno: horaTurno,
        };

        const url = 'http://localhost:8080/turnos/add';

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
