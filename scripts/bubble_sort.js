document.getElementById("ordenar-normal-btn").addEventListener("click", function () {
    const contenedor = document.getElementById("animales");
    let imagenes = Array.from(contenedor.children);

    // Función para ordenar con burbuja y animar
    function bubbleSortWithAnimation(array, i = 0, j = 0) {
        if (i >= array.length - 1) {
            console.log("Ordenamiento completo");
            return; // Finalizar si ya recorrimos todos los elementos
        }

        if (j >= array.length - i - 1) {
            // Pasar al siguiente ciclo si terminamos con la pasada actual
            bubbleSortWithAnimation(array, i + 1, 0);
            return;
        }

        const actual = parseInt(array[j].getAttribute("data-order"));
        const siguiente = parseInt(array[j + 1].getAttribute("data-order"));

        if (actual > siguiente) {
            animateSwap(array[j], array[j + 1], () => {
                // Después de la animación, realizar el intercambio
                contenedor.insertBefore(array[j + 1], array[j]);

                // Actualizar el array después del intercambio
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Continuar con el siguiente paso
                bubbleSortWithAnimation(array, i, j + 1);
            });
        } else {
            // Continuar con el siguiente elemento si no hubo intercambio
            bubbleSortWithAnimation(array, i, j + 1);
        }
    }

    // Función para animar el intercambio entre dos imágenes
    function animateSwap(image1, image2, callback) {
        const rect1 = image1.getBoundingClientRect();
        const rect2 = image2.getBoundingClientRect();

        // Posiciones iniciales
        const pos1 = { x: rect1.left, y: rect1.top };
        const pos2 = { x: rect2.left, y: rect2.top };

        let startTime = null;
        const duration = 800; // Duración de la animación en ms

        function moveImages(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;

            if (progress < 1) {
                // Interpolar las posiciones para mover las imágenes
                image1.style.transform = `translate(${(pos2.x - pos1.x) * progress}px, ${(pos2.y - pos1.y) * progress}px)`;
                image2.style.transform = `translate(${(pos1.x - pos2.x) * progress}px, ${(pos1.y - pos2.y) * progress}px)`;
                requestAnimationFrame(moveImages);
            } else {
                // Finalizar la animación y restablecer posiciones
                image1.style.transform = '';
                image2.style.transform = '';
                callback(); // Ejecutar la lógica de intercambio
            }
        }

        requestAnimationFrame(moveImages);
    }

    bubbleSortWithAnimation(imagenes); // Iniciar el ordenamiento con animación
});

document.addEventListener("DOMContentLoaded", function () {
    const contenedor = document.getElementById("animalesMejorado");
    const boton = document.getElementById("ordenar-mejorada-btn");

    boton.addEventListener("click", function () {
        const imagenes = Array.from(contenedor.children);

        let n = imagenes.length;
        let swapped;

        function bubbleSortStep() {
            swapped = false;
            let i = 0;

            function compareAndSwap() {
                if (i < n - 1) {
                    const actual = parseInt(imagenes[i].getAttribute("data-order"));
                    const siguiente = parseInt(imagenes[i + 1].getAttribute("data-order"));

                    if (actual > siguiente) {
                        // Animar y luego intercambiar en el DOM y el array
                        animateSwap(imagenes[i], imagenes[i + 1], () => {
                            contenedor.insertBefore(imagenes[i + 1], imagenes[i]);
                            const temp = imagenes[i];
                            imagenes[i] = imagenes[i + 1];
                            imagenes[i + 1] = temp;

                            swapped = true;
                            i++;
                            compareAndSwap(); // Llamada recursiva para continuar
                        });
                    } else {
                        i++;
                        compareAndSwap(); // Continuar sin intercambio
                    }
                } else {
                    n--; // Reducir el rango de comparación
                    if (swapped) {
                        bubbleSortStep(); // Continuar el proceso
                    }
                }
            }

            compareAndSwap(); // Comenzar la comparación
        }

        bubbleSortStep(); // Iniciar el proceso de ordenamiento
    });

    function animateSwap(image1, image2, callback) {
        const rect1 = image1.getBoundingClientRect();
        const rect2 = image2.getBoundingClientRect();

        const deltaX = rect2.left - rect1.left;
        const deltaY = rect2.top - rect1.top;

        image1.style.transition = "transform 0.8s";
        image2.style.transition = "transform 0.8s";

        image1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        image2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;

        setTimeout(() => {
            image1.style.transition = "";
            image2.style.transition = "";
            image1.style.transform = "";
            image2.style.transform = "";

            callback(); // Llamar al callback después de la animación
        }, 800);
    }
});


