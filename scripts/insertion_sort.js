array = [7,8,2,10,3,0]
insertionSort(array)
console.log(array)

function insertionSort(array){
    for (let i = 1; i < array.length; i++) {
        let current = array[i];

        let j = i-1
        while(j >= 0 && array[j] > current){
            array[j+1] = array[j]
            j--;
        }
        array[j + 1] = current;
    }
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