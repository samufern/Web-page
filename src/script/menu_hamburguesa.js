function abrirMenu() {
    var menu = document.getElementById("mobileMenu");
    if (menu.classList.contains("abierto")) {
        menu.classList.remove("abierto");
    } else {
        menu.classList.add("abierto");
    }
}

function cerrarMenu() {
    var menu = document.getElementById("mobileMenu");
    menu.classList.remove("abierto");
}
