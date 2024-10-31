//NUEVO - CLASSES ARE FIRST-CLASS CITIZENS, WHICH MEANS THEY COUL BE ASSIGNED TO A VARIABLE
let AlmostEmptyClass = class {
    constructor(sth) {
        console.log(sth);
    };
    sayHi() {
        console.log("Hi!")
    };
};
let almostEmptyObject = new AlmostEmptyClass(120); // 120
almostEmptyObject.sayHi(); // -> Hi!

//NUEVO - CHECK CLASS NAME OF AN OBJECT
// IF YOU DON'T KNOW THE NAME
console.log(almostEmptyObject.constructor.name); // -> "AlmostEmptyClass"
// IF YOU WANT TO CHECK WHETHER IT IS OR NOT A CERTAIN CLASS
console.log(almostEmptyObject instanceof AlmostEmptyClass); // -> true
console.log(almostEmptyObject instanceof String); // -> false
let str = new String("test me");
console.log(str instanceof String); // -> true

