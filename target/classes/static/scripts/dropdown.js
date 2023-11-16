// Obtener todos los botones y menús desplegables
const dropdownButtons = document.querySelectorAll('.dropdownAvatarNameButton');
const dropdownMenus = document.querySelectorAll('.dropdownAvatarName');

// Agregar un controlador de eventos para el clic en cada botón
dropdownButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que se cierre automáticamente al hacer clic
        dropdownMenus[index].classList.toggle('hidden'); // Alternar la clase "hidden" en el menú correspondiente
    });
});

// Cerrar el menú desplegable cuando se hace clic en cualquier parte fuera de él
document.addEventListener('click', (event) => {
    dropdownMenus.forEach((menu) => {
        if (!menu.contains(event.target)) {
            menu.classList.add('hidden');
        }
    });
});