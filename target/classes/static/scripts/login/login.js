window.addEventListener("load", function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.getElementById("loginForm");
    const username = document.getElementById('inputUsername');
    const password = document.getElementById('inputPassword');
    const usuarioRol = "ADMIN";
    const url = 'http://localhost:8080/authenticate';

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const payload = {
            username: username.value,
            password: password.value,
            //usuarioRol: usuarioRol,
        };

        const settings = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };
        realizarLogin(settings);
        form.reset();
    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    async function realizarLogin(settings) {
        try {
            // Realiza la solicitud PUT al servidor y espera la respuesta
            const response = await fetch(url, settings);
            if (!response.ok) {
                throw new Error(`Error de HTTP: ${response.status}`);
            }
            // Parsea la respuesta como JSON y muestra un mensaje de éxito
            const data = await response.json();
            console.log("Promesa Cumplida - Login:", data);
            if (data.jwt) {
                localStorage.setItem("jwt", JSON.stringify(data.jwt));

                const jwt = localStorage.getItem("jwt");
                console.log(jwt);

                const headers = {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-type': 'application/json'
                };

                const dashboardSettings = {
                    method: 'GET',
                    headers: headers
                };

                // Realizar la solicitud con el encabezado que incluye el token JWT
                const dashboardResponse = await fetch('http://localhost:8080/dashboard.html', dashboardSettings);
                if (!dashboardResponse.ok) {
                    throw new Error(`Error de HTTP: ${dashboardResponse.status}`);
                }

                // Puedes manejar la respuesta del servidor aquí si es necesario

                // Redirige a la página del dashboard
                location.replace("http://localhost:8080/dashboard.html");
                console.log("Autenticación exitosa");

            }
        } catch (error) {
            console.error("Error en el login:", error);
            throw new Error("Error al intentar iniciar sesión");
        }
    }

});