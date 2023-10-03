// Setting results to the element that holds the result ID. This is where we get our calculations.
let result = document.getElementById("result");

// Store the buttons in an array with class name math-btn
let buttons = Array.from(document.getElementsByClassName("math-btn"));

// Resources to calculate expression (I did not know what I was doing lol)
// Learning how to parse the expression: https://www.geeksforgeeks.org/expression-evaluation/

function calculateExpression(expression) {
    // We want to split the expression when we see these operators (+, -, *, and /), and then from there do the calculations. If I had paranthesis I would most likely have to rewrite this.
    const operators = ['+', '-', '*', '/'];

    // Use a custom function to split the expression
    function splitExpression(expr) {
        const result = [];    // An array to store the split components
        let current = '';     // A string to monitor the numbers being put in
    
        for (const char of expr) {
            if (operators.includes(char)) {
                // marks the end of the current component based on the operator
                // push the current component to the result array, push the operator itself, and reset 'current'.
                result.push(current);
                result.push(char);
                current = '';
            } else {
                // If the character is not an operator, it belongs to the current component.
                // So, we add it to the 'current' string.
                current += char;
            }
        }
    
        result.push(current);
    
        // Deletes any empty component.
        return result.filter((item) => item !== '');
    }
    

    const tokens = splitExpression(expression);

    // Convert operands to numbers
    const operands = tokens.filter((token) => !operators.includes(token)).map((operand) => parseFloat(operand));

    // Calculate the result based on the operator
    let result = operands[0];
    for (let i = 1; i < operands.length; i++) {
        if (operators.includes(tokens[i])) {
            if (tokens[i] === '+') {
                result += operands[i];
            } else if (tokens[i] === '-') {
                result -= operands[i];
            } else if (tokens[i] === '*') {
                result *= operands[i];
            } else if (tokens[i] === '/') {
                if (operands[i] === 0) {
                    throw new Error("Why are you dividing by 0 SMH.");
                }
                result /= operands[i];
            }
        }
    }

    return result;
}

// Check the operations of the button and do the calculations that way.
// We use the map function to iterate over all the buttons.
buttons.map((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.innerText === "C") {
            result.innerText = "";
        } else if (e.target.innerText === "=") {
            try {
                // Here is where we try to calculate the expression, this is where I would have put the eval() function but, we are making our own.
                result.innerText = calculateExpression(result.innerText);
            } catch (err) {
                result.innerText = err;
            }
        } else {
            result.innerText += e.target.innerText;
        }
    });
});

