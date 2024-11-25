document.getElementById("ordenar-btn").addEventListener("click", function () {
    const contenedor = document.getElementById("animales");
    const imagenes = Array.from(contenedor.children);

    // Implementación del método de burbuja
    for (let i = 0; i < imagenes.length; i++) {
        for (let j = 0; j < imagenes.length - i - 1; j++) {
            const actual = parseInt(imagenes[j].getAttribute("data-order"));
            const siguiente = parseInt(imagenes[j + 1].getAttribute("data-order"));

            if (actual > siguiente) {
                // Intercambiar elementos en el DOM
                contenedor.insertBefore(imagenes[j + 1], imagenes[j]);

                // Actualizar el array después del intercambio
                const temp = imagenes[j];
                imagenes[j] = imagenes[j + 1];
                imagenes[j + 1] = temp;
            }
        }
    }
});
