function insertionSort(){
    var array = document.getElementById("arrayInputs").value.split(",").map(Number);
    var resultStr = `${array}<br />`;
    document.getElementById("result").innerHTML = resultStr;
    for (let i = 1; i < array.length; i++) {
        let current = array[i];

        let j = i-1
        while(j >= 0 && array[j] > current){
            array[j+1] = array[j]
            j--;
            resultStr += `${array}<br />`;
        }
        array[j + 1] = current;
    }
    resultStr += `${array}<br />`;
    document.getElementById("result").innerHTML = resultStr;
}

$(document).ready(function () {
    $("#sortButton").hover(
        function () {
            // Cuando el mouse pasa sobre el botón
            $(this).css({
                backgroundColor: "darkGreen",
                color: "white",
                transform: "scale(1.1)",
            });
        },
        function () {
            //mouse sale del boton
            $(this).css({
                backgroundColor: "",
                color: "",
                transform: "scale(1)",
            });
        }
    );
    $("#sortButton").click(
        function(){
            alert("comenzando ordenamiento!")
        }
    )
});

document.getElementById("ordenar-btn").addEventListener("click", function () {
    const contenedor = document.getElementById("animales");
    const imagenes = Array.from(contenedor.children);
    let i = 1; // Iniciar desde el segundo elemento
    let interval;

    function startSorting() {
        interval = setInterval(() => {
            if (i >= imagenes.length) {
                clearInterval(interval); // Finalizar cuando todas estén ordenadas
                return;
            }

            let j = i;
            const current = imagenes[j];

            // Mover el elemento a su posición correcta
            function insert() {
                if (j > 0) {
                    const actual = parseInt(current.getAttribute("data-order"));
                    const anterior = parseInt(imagenes[j - 1].getAttribute("data-order"));

                    if (actual < anterior) {
                        animateMove(current, imagenes[j - 1], () => {
                            // Realizar el intercambio en el DOM
                            contenedor.insertBefore(current, imagenes[j - 1]);

                            // Actualizar el array
                            const temp = imagenes[j - 1];
                            imagenes[j - 1] = current;
                            imagenes[j] = temp;

                            j--;
                            insert(); // Continuar moviendo hacia atrás
                        });
                        return;
                    }
                }

                // Pasar al siguiente elemento en el ordenamiento
                i++;
            }

            insert(); // Comenzar a mover el elemento actual
        }, 1500); // Tiempo entre cada iteración principal
    }

    // Animación para mover un elemento con un trayecto de bajada, desplazamiento, y subida
    function animateMove(image1, image2, callback) {
        const rect1 = image1.getBoundingClientRect();
        const rect2 = image2.getBoundingClientRect();

        const pos1 = { x: rect1.left, y: rect1.top };
        const pos2 = { x: rect2.left, y: rect2.top };

        const verticalOffset = 50; // Distancia que baja antes de moverse
        let startTime = null;
        const duration = 1200; // Tiempo total de la animación

        function move(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;

            if (progress < 1) {
                let translateX = 0;
                let translateY = 0;

                // Fase 1: Bajada
                if (progress < 0.33) {
                    translateY = verticalOffset * (progress / 0.33);
                }
                // Fase 2: Desplazamiento horizontal
                else if (progress < 0.66) {
                    translateY = verticalOffset; // Mantenerse abajo
                    translateX = (pos2.x - pos1.x) * ((progress - 0.33) / 0.33);
                }
                // Fase 3: Subida
                else {
                    translateX = pos2.x - pos1.x; // Mantener posición horizontal final
                    translateY = verticalOffset * (1 - (progress - 0.66) / 0.34);
                }

                image1.style.transform = `translate(${translateX}px, ${translateY}px)`;
                requestAnimationFrame(move);
            } else {
                // Finalizar la animación
                image1.style.transform = '';
                callback(); // Realizar el intercambio en el DOM
            }
        }

        requestAnimationFrame(move);
    }

    startSorting(); // Iniciar el ordenamiento
});
