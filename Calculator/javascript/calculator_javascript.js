//creates an objject to keep track of values
const Calculator = {
    //this will display 0 on the calculator screen
    Display_Value: "0",
    //this will hold the first operand for any expressions, we set it to null for now.
    First_Operand: null,
    //this checks whether or not the second operand has been inputted by the user.
    Wait_Second_Operand: false,
    //this will hold the operator we set it to null for now.
    operator: null,
};

//This modifies values each time a button is clicked o.
function Input_Digit(digit) {
    const {Display_Value,Wait_Second_Operand}=Calculator;
    //This checks if the wait seccond operand is true and sets display value
    //to the key that was clicked on.
    if(Wait_Second_Operand===true) {
        Calculator.Display_Value=digit;
        Calculator.Wait_Second_Operand=false;
    }else{
        //this overwrites display value if the =current value is 0
        //otherwise it adds onto it.
        Calculator.Display_Value=Display_Value==="0" ? digit:Display_Value+digit;
    }
}

//This section handles decimal points.
function Input_Decimal(dot) {
    //this ensures that accidental clicking of the decimal point doesnt 
    //cause bugs in the operation.
    if (Calculator.Wait_Second_Operand===true) return;
    if(! Calculator.Display_Value.includes(dot)) {
        //we are saying that if the display_value does not contain a decimal point
        //we want to add a decimal point.
        Calculator.Display_Value +=dot;
    }
}

//This section handles operands
function Handle_Operators(Next_Operator) {
    const {First_Operand,Display_Value,operator} =Calculator;
    //when an operator key is pressed we convert the current number
    //displayed on the screento a number and then stored the reult in
    //Calculator.first_operand if it doesnt already exist
    const Value_of_Input =parseFloat(Display_Value);
    //checks if an operator already exists and if wait a sec is true,
    //then updates the operator an exits from the function.
    if(operator&&Calculator.Wait_Second_Operand) {
        Calculator.operator=Next_Operator;
        return;
    }
    if(First_Operand==null) {
        Calculator.First_Operand=Value_of_Input;
    }else if (operator) {//checks if an operator already exist
        const Value_Now=First_Operand||0;
        //If operator exists, property lookup is performed for the operator
        //in the perform_calculation object and the function that matches the 
        //operator is executed
    }
}