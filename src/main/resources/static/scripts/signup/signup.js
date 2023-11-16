document.addEventListener('DOMContentLoaded', function () {
    const url = 'http://localhost:8080/usuarios/add';
    const formulario = document.getElementById('signupForm');

    formulario.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const username = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        const usuarioRol = document.getElementById('inputRol').value;

        // Validación de campos vacios
        if (!username || !password || !usuarioRol) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos del formulario.'
            });
            return;
        }

        // Crear el objeto paciente
        const nuevoUsuario = {
            username,
            password,
            usuarioRol
        };

        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(nuevoUsuario),
        };

        try {
            // Enviar la solicitud POST para agregar el paciente
            const response = await fetch(url, settings);

            if (!response.ok) {
                throw new Error(`Error de HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log("Usuario agregado exitosamente:", data);
            Swal.fire(
                'Usuario agregado exitosamente!',
                '',
                'success'
            );

            setTimeout(function() {
                location.replace('http://localhost:8080/login.html');
            }, 10000); // Redirigir después de 1 segundo (1000 milisegundos)
            
            // Puedes actualizar la lista de pacientes u realizar otras acciones aquí

            formulario.reset();
        } catch (error) {
            console.error("Error al agregar usuario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar usuario!'
            });
        }
    });
});
