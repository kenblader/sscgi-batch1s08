// console.log("hi");
// Functions
// Functions in javascript are lines/block of codes that tells our device/application to perform a certain task when called/invoked
// Function declarations
// (function statement) defines a function with the specified parameters
// parameters - are placeholders listed in a function declaration or expresson. They represent values that are passed into a function when it is called/invoked (used data into functions)
// variables are named containers for storing data values (used to store and manipulate data)

/*
    Syntax (how should ones code to be written):
        function functionName(){
            code block (statement(is the block of codes inside a function or outside the function))
        }

        function keyword - used to define a javascript functions
        functionName - function name
*/

// function printName() {
//   console.log("My name is Juan.");
// }

// invoked/called - call a function
// printName();

//declaredFunction(); it results in an error, much like variables, we cannot invoke a function we have not yet defined

// Function declaration vs expression

// function declarations can be created through function declaration by using the function keyword and adding a function name

// declared function are not executed immediately. They are "save for later use", and will be executed later when they are invoked (called upon)

declaredFunction(); //declared functions can be hoisted

// Note: In JS, hoisting is a behavior for certain variables and funtions to run or use them before declaration

function declaredFunction() {
  console.log("Hello world from declaredFunction!");
}

// Function Expression
// A function can also be store in a variable. This is called a functon expression

// A function expression is an anonymous functon assigned to the variableFunction

// Anonymous function - a function wihout a name, it cannot be hoisted

let variableFuncton = function () {
  console.log("Hello Again!");
};

variableFunction();

let constFunc = function () {
  console.log("initialized with const");
};

constFunc();

constFunc = function () {
  console.log("re-assigned!");
};

constFunc();

// Parameters and Arguments
function printName(name) {
  console.log("My name is " + name);
}

printName("Juan"); //argument

// "name" is called a parameter
// A parameter acts as a named variable/containers that exists only inside of a function
// it is used to store information that is provided to a function when it is called/invoked
// An argument is a value passed when invoking a function, and this argument is then stored as the parameters within a function

printName("Happy");
printName("Yui", 12);

function argumentFunction() {
  console.log(
    "This function was passe as an argument before the message was printed"
  );
}

function invokeFunction(argumentFunction) {
  argumentFunction();
}

invokeFunction(argumentFunction);
