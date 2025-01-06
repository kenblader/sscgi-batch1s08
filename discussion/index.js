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

// declaredFunction(); //declared functions can be hoisted

// Note: In JS, hoisting is a behavior for certain variables and funtions to run or use them before declaration

// function declaredFunction() {
//   console.log("Hello world from declaredFunction!");
// }

// Function Expression
// A function can also be store in a variable. This is called a functon expression

// A function expression is an anonymous functon assigned to the variableFunction

// Anonymous function - a function wihout a name, it cannot be hoisted

// let variableFuncton = function () {
//   console.log("Hello Again!");
// };

// variableFunction();

// let constFunc = function () {
//   console.log("initialized with const");
// };

// constFunc();

// constFunc = function () {
//   console.log("re-assigned!");
// };

// constFunc();

// // Parameters and Arguments
// function printName(name) {
//   console.log("My name is " + name);
// }

// printName("Juan"); //argument

// "name" is called a parameter
// A parameter acts as a named variable/containers that exists only inside of a function
// it is used to store information that is provided to a function when it is called/invoked
// An argument is a value passed when invoking a function, and this argument is then stored as the parameters within a function

// printName("Happy");
// printName("Yui", 12);

// function argumentFunction() {
//   console.log(
//     "This function was passe as an argument before the message was printed"
//   );
// }

// function invokeFunction(argumentFunction) {
//   argumentFunction();
// }

// invokeFunction(argumentFunction);

// Object Oriented Programming (OOP)
// Programming style based on classes and objects, group of data(properties) and methods (actions)

// Class - blueprint, template for an object
// Objects - instance of a class
// Instance - refers to an object created from a class or a constructor function
// Constructor is a special method used in a class to initialize objects

// // basic instance
// // this creates an object called person
// const person = {
//   name: "Juan Dela Cruz",
//   age: 25,
//   greet: function () {
//     // 'this' refers to the current object(person)
//     console.log(
//       `Hello, my name is ${this.name} and I am ${this.age} years old.`
//     );
//   },
// };

// person.greet();

// class Person {
//   constructor(name, age) {
//     this.name = name; // Initializing the 'name' property
//     this.age = age; // Initializing the 'age' property
//   }
//   introduce() {
//     console.log(
//       `Hello, my name is ${this.name} and I am ${this.age} years old.`
//     );
//   }
// }

// // create intances using the constructor
// const person1 = new Person("Kiko", 26);
// const person2 = new Person("Jun", 17);

// person1.introduce();
// person2.introduce();

// // without ES6
// function Person1(name, age) {
//   this.name = name;
//   this.age = age;
//   this.introduce = function () {
//     console.log(
//       `Hello, my name is ${this.name} and I am ${this.age} years old.`
//     );
//   };
// }

// const person3 = new Person1("Carpo", 34);
// person3.introduce();

// class Car {
//   constructor(model) {
//     this.model = model;
//   }
//   start() {
//     console.log(`${this.model} is starting . . .`);
//   }
// }

// const car1 = new Car("Toyota");
// car1.start();

// Encapsulation - refers to the bundling of data (properties) and the methods (functions) that opperate on the data within a single unit or class
// data hiding and maintainability

// Abstraction involves simplifying the complex systems by exposing only the essential features
// very simplify

//Polymorphism is the ability of the different classes to respond to the same method call in a way that's specific to their type. It allows one interface(method) to be used for a general class of actions with each subclass implement the method in its own way
/* method overriding
        - subclasses can provide their own speficic implentation of a mathod that is already defined in the parent class
        
        method overloading
        - multiple method with the same name can be define with different parameters

        dynamic method
        - the method that gets called depends on the object's type (not the reference type), which is determined in runtime
     */

/*
    Mini-activity
    Create a fnction for recievedDamage() and heal()
    Create trainers and their pokemon to be used in battleground
*/

// Pokemon Game
class Pokemon {
  constructor(name, type, level, hp) {
    //, attack
    this.name = name;
    this.type = type;
    this.level = level;
    this.hp = hp;
    // this.attack = attack;
  }
  attack(opponent) {
    console.log(`${this.name} attack ${opponent.name}!`);
    let damage = this.level * 2;
    console.log(`${this.name} leveled up ${damage}`);
  }
  recievedDamage(damage) {
    this.hp -= damage;
    console.log(`${this.name} got damaged by ${damage}`);
    if (this.hp <= 0) {
      console.log(`${this.name} fainted`);
      this.hp = 0;
    } else console.log(`${this.name} still has ${this.hp} left`);
  }
  heal(potion) {
    let potionAmount;
    if (potion == "full potion") potionAmount = 20;
    else if (potion == "potion") potionAmount = 10;
    else {
      console.log(`${potion} is not a valid potion`);
      return;
    }

    this.hp += potionAmount;
    console.log(
      `${this.name} used potion and added ${potionAmount}! New hp is ${this.hp}`
    );
  }
  // displayAttack(){
  //   let text = "";
  //   let placeholder;

  //   this.attack.forEach((element, index) => {
  //       if (index == this.attack.length - 1) placeholder = ".";
  //       else placeholder = ", ";
  //       text += element + placeholder;
  //   });
  //   console.log(`${this.name} attacks are ${text}`)
  // }
}

class FirePokemon extends Pokemon {
    constructor(name, level, hp) {
      //calling the base class constructor
      super(name, "Fire", level, hp);
    }
    attack(opponent) {
      console.log(`${this.name} uses Ember on ${opponent.name}`);
      let damage = this.level * 3;
      opponent.recievedDamage(damage);
    }
  }

class Trainer {
  constructor(name, pokemon) {
    this.name = name;
    this.pokemon = pokemon;
  }

  introduce() {
    let text = "";
    let placeholder;
    this.pokemon.forEach((element, index) => {
      if (index == this.pokemon.length - 1) placeholder = ".";
      else placeholder = ", ";
      text += element.name + placeholder;
    });
    console.log(`${this.name} has ${text}`);
  }

  usePokeball(pokemon) {
    let flag = 0;
    this.pokemon.forEach((element) => {
      // check to see if the trainer has that pokemon
      if (element.name == pokemon.name) {
        console.log(
          `${this.name} throw pokeball and ${element.name} came out!`
        );
        flag += 1;
      }
    });
    if (flag == 0) {
      console.log(`${this.name} don't have ${pokemon.name}`);
    }
  }
}

// declare pokemons
let pikachu = new Pokemon("Pikachu", "Electric", 5, 10);
let charmander = new FirePokemon("Charmander", 5, 10);
let joeshua = new Pokemon("Joeshua", "Fighting", 25, 100);
let junjun = new Pokemon("JunJun", "Dragon", 25, 100);

// declare trainers
const ken = new Trainer("Ken", [joeshua, junjun]);
ken.introduce();
const jedd = new Trainer("Jedd", [pikachu, charmander]);
jedd.introduce();

// battle
ken.usePokeball(joeshua);
jedd.usePokeball(pikachu);

charmander.attack(pikachu);
pikachu.recievedDamage(20);
pikachu.heal("full potion");

// joeshua.displayAttack();
// junjun.displayAttack();




