// Getting the element with ID "result" where the calculations will be displayed.
let res = document.getElementById("result");

// Getting all buttons with the class name "math-btn".
let btns = Array.from(document.getElementsByClassName("math-btn"));

// Function to calculate the expression. Honestly, I found a cool resource that helped a lot: https://www.geeksforgeeks.org/expression-evaluation/
function calcExpr(expr) {
    const ops = ['+', '-', '*', '/'];  // These are the operators I can handle for now.

    // This function splits the expression into numbers and operators, it's kinda cool.
    function splitExpr(e) {
        let result = [];  
        let current = '';  
    
        for (let c of e) {
            if (ops.includes(c)) {
                result.push(current, c);
                current = '';
            } else {
                current += c;
            }
        }
    
        result.push(current);
        return result.filter((item) => item !== '');  // Getting rid of the empty stuff.
    }
    

    let tokens = splitExpr(expr);

    // Turning the string numbers into actual numbers.
    let nums = tokens.filter((t) => !ops.includes(t)).map((num) => parseFloat(num));

    // Okay, let's calculate this!
    let total = nums[0];
    for (let i = 1; i < nums.length; i++) {
        switch(tokens[i]) {
            case '+':
                total += nums[i];
                break;
            case '-':
                total -= nums[i];
                break;
            case '*':
                total *= nums[i];
                break;
            case '/':
                if (nums[i] === 0) {
                    throw "You can't divide by zero, silly!";
                }
                total /= nums[i];
                break;
        }
    }

    return total;
}

// Looping through all the buttons to see what they do when clicked.
btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let text = e.target.innerText;
        
        if (text === "C") {
            res.innerText = "";
        } else if (text === "=") {
            try {
                res.innerText = calcExpr(res.innerText);
            } catch (err) {
                res.innerText = "Error: " + err;
            }
        } else {
            res.innerText += text;
        }
    });
});
