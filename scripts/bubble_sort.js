document.getElementById("ordenar-normal-btn").addEventListener("click", function () {
    const contenedor = document.getElementById("animales");
    const imagenes = Array.from(contenedor.children);

    // Función para ordenar con burbuja y animar
    bubbleSortWithAnimation(imagenes, 0);
    
    // Función de ordenamiento con animación
    function bubbleSortWithAnimation(array, i) {
        if (i >= array.length - 1) return;  // Si ya hemos recorrido todo el array, detener

        let intercambio = false;
        
        for (let j = 0; j < array.length - i - 1; j++) {
            const actual = parseInt(array[j].getAttribute("data-order"));
            const siguiente = parseInt(array[j + 1].getAttribute("data-order"));
            
            if (actual > siguiente) {
                intercambio = true;
                animateSwap(array[j], array[j + 1], () => {
                    // Después de que la animación termine, realizamos el intercambio en el DOM
                    contenedor.insertBefore(array[j + 1], array[j]);
                    // Actualizamos el array después del intercambio
                    const temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    bubbleSortWithAnimation(array, i + 1);  // Continuamos con el siguiente paso
                });
                break;  // Para asegurar que se haga un intercambio por vez
            }
        }
        
        if (!intercambio) {
            // Si no hubo intercambio, la lista ya está ordenada
            return;
        }
    }
    
    // Función para animar el intercambio entre dos imágenes
    function animateSwap(image1, image2, callback) {
        const rect1 = image1.getBoundingClientRect();
        const rect2 = image2.getBoundingClientRect();
        
        // Obtener las posiciones iniciales
        const pos1 = { x: rect1.left, y: rect1.top };
        const pos2 = { x: rect2.left, y: rect2.top };
        
        // Animación paso a paso
        let startTime = null;
        const duration = 800;  // Tiempo de la animación en ms (más lento que antes)

        function moveImages(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            
            if (progress < 1) {
                // Interpolamos el movimiento de las imágenes
                image1.style.transform = `translate(${(pos2.x - pos1.x) * progress}px, ${(pos2.y - pos1.y) * progress}px)`;
                image2.style.transform = `translate(${(pos1.x - pos2.x) * progress}px, ${(pos1.y - pos2.y) * progress}px)`;
                
                requestAnimationFrame(moveImages);
            } else {
                // Cuando la animación termina, restablecemos las posiciones
                image1.style.transform = '';
                image2.style.transform = '';
                
                // Llamamos al callback para realizar el intercambio en el DOM
                callback();
            }
        }
        
        requestAnimationFrame(moveImages);
    }
});
