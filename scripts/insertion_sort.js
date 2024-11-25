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