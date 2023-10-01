// Setting results to the element that holds the result ID. This is where we get our calculations.
let result = document.getElementById("result");

// Store the buttons in an array with class name math-btn
let buttons = Array.from(document.getElementsByClassName("math-btn"));

// Check the operations of the button and do the calculations that way.
// We use the map function to iterate over all the buttons.
buttons.map((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.innerText === "AC") {
            result.innerText = "";
        } else if (e.target.innerText === "=") {
            try {
                result.innerText = eval(result.innerText);
            } catch {
                result.innerText = "There was an error with the calculation. Please try again.";
            }
        } else {
            result.innerText += e.target.innerText;
        }
    });
});