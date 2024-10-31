console.log(typeof 2.5); // -> number
console.log(typeof "one two three"); // -> string
console.log(typeof false); // -> boolean

let nr = 2.5; 
nr = nr / 2;
console.log(typeof nr); // -> number

let a = [10, 20, "en to tre", true, 50];
a[4] = a[4] * 2;
console.log(a[0]);    // -> 10
console.log(a[2]);    // -> en to tre
console.log(a[4]);    // -> 100

let sampleObject = {
    id: 10, 
    delay: 20,
    name: "en to tre",
    isPresent: true,
    delay: 50
};
sampleObject.delay = sampleObject.delay * 2;
console.log(sampleObject.id);    // -> 10
console.log(sampleObject.name);    // -> en to tre
console.log(sampleObject.delay);    // -> 100


let contact = {};
contact.tel = "207-662-5412";
console.log(contact);
console.log(contact.tel);

let contact = {
    tel: "207-662-5412",
    email: "RonaldSMurphy@freepost.org"
};
console.log(contact);
console.log(contact.tel);


nr = 10; 
let b = false; 
let str = "uno dos tres"; 
let arr = [10, 20, 30]; 
let obj = {
    x: 10, 
    y: 20
}; 
let fn = function(arg) {
    console.log(arg)
}; 
fn(123); //-> 123

let test = {
    nr: 10, 
    b: false, 
    str: "uno dos tres", 
    arr: [10, 20, 30], 
    obj: {
        x: 10, 
        y: 20
    }, 
fn: function(arg) {console.log(arg)} 
};
test.fn(123);

console.log(test.obj.x);
test.obj.y = 40;

let point = {
    x: 0,
    y: 0,
    moveHorizontally: function(distance) {
        this.x = this.x + distance;
    },
    moveVertically: function(distance) {
        this.y = this.y + distance;
    }
}
console.log(point.x);    // -> 0
point.moveHorizontally(30);
console.log(point.x);    // -> 30

let contact = {
    tel: "207-662-5412",
    email: "RonaldSMurphy@freepost.org"
};
contact.firstName = "Ronald";
contact.lastName = "Murphy";
console.log(contact.tel);   // -> 207-662-5412
console.log(contact.firstName);     // -> Ronald
console.log(contact.notes);

let contact = {
    tel: "207-662-5412",
    email: "RonaldSMurphy@freepost.org"
};
contact.email = ["RonaldSMurphy@freepost.org", "rsmurphy@briazz.com" ];
contact.email = {
    private: "RonaldSMurphy@freepost.org",
    work: "rsmurphy@briazz.com" 
};
console.log(contact.email.work);

//NUEVO - DELETE OBJECT PROPERTY
delete contact.email.work;
console.log(contact.email.work);
console.log(contact.email.private);

//NUEVO - BRACKET NOTATION
contact.tel === contact["tel"];
contact.email.work === contact["email"]["work"]

let contact = {
    "first name": "Ronald"
};
contact["first name"] = "Tim";
contact.first name = "Tim";    // SyntaxError: Unexpected identifier
contact."first name" = "Tim";    // SyntaxError: Unexpected string

//NUEVO - ACCESS TO CALCULATED OBJECT PROPERTY NAME
let contact = {
    email_1: "RonaldSMurphy@freepost.org",
    email_2: "rsmurphy@briazz.com"
};
for(i=1; i<=2; i++) {
    let key = "email_" + i;
    console.log(key);
    console.log(contact[key]);
}
for(i=1; i<=2; i++) {
    let key = "email_" + i;
    console.log(`${key}: ${contact[key]}`);
}

//NUEVO - CHECK WHETER A PROPERTY EXISTS OR NOT
/* NOT ALWAYS THE BEST CHOICE */
if(contact && contact.email) {
    console.log(contact.email.private);
}
/* MORE unambiguous USING IN */
if("notes" in contact) { // if true
    console.log(contact.notes);
}


//NUEVO - && OPERATOR
contact && contact.email && console.log(contact.email.private);

//NUEVO - ITERATE OVER OBJECT PROPERTIES
let contact = {
    tel: "207-662-5412",
    email: "RonaldSMurphy@freepost.org"
};
for(x in contact) {
    // print property name
    console.log(x);
}

//NUEVO - ITERATE OVER OBJECT PROPERTIES VALUES USING BRACKET NOTATION
for(x in contact) {
    // print property value 
    console.log(contact[x]);
}

//NUEVO - GET ALL OBJECT KEYS
let keys = Object.keys(contact);

var point1 = {x: 10, y: 20};
var point2 = {x: 10, y: 20};
console.log(point1 === point2);   

var point1 = {x: 10, y: 20};
var point2 = {x: 10, y: 20};
console.log(point1 === point2);    

let point3 = point1;
console.log(point1 === point3); 

point3.z = 40;
console.log(point3.z);    // 40
console.log(point1.z);    // 40
console.log(point2.z);    // undefined


//NUEVO - CLONNING
let point0 = {x:10, y: 20 };
let point2 = Object.assign({}, point0);
let point3 = Object.assign({}, point0, {z: 100});

// SPREAD OPERATOR
let point4 = { ...point3, ...{z: 200, color: "red"}};
let pointA = { ...point3, z: 200, color: "red"};

//NUEVO - RECURSIVE FUNCTION TO DEEPLY CLONE AN OBJECT WITH NESTED OBJECTS
let deepClone = function(obj) {
    let newObj = {...obj};
    for(property in newObj) {
        if(typeof newObj[property] === "object") {
            newObj[property] = deepClone(newObj[property]);
        }
    }
    return newObj;
}

//NUEVO - SINTAXIS SETTER Y GETTER
let contact = {
    _tel: "207-662-5412",
    get tel() {return this._tel;},
    set tel(t) { this._tel = t;}
};
console.log(contact.tel);
contact.tel = "100-100-1000";
console.log(contact.tel);

// NUEVO - DEFINE PROPERTIES WHITH AN OBJECT CLASS METHOD
let contact = {};
Object.defineProperty(contact, "_age", {
    value: 36,
    writable: true,
    enumerable: false,
    configurable: true
});
Object.keys(contact);
console.log(contact._age);

// NUEVO - CREATE PROTOTYPE FROM CONSTRUCTORS ON CLASSLESS OBJECTS
figure = {
    getType: function() {
        return this.type ? this.type : "unknown";
    }
};
let circle = {
    type: "circle",
    center: {x:0, y:0},
    radius: 100
};


let Circle = function(center, radius){
    this.type = "circle";
    this.center = center;
    this.radius = radius;
};
Circle.prototype = figure;
//In the next step, we define the Circle constructor and, more importantly, we bind the figure object to it 
// as a prototype. Note that until now the prototype has been connected directly to the object. 
// This time it’s different – we bind it to a function that will create objects.

//Each time we call the Circle constructor (using new, of course) it will create a new object with type,
//center, and radius fields. The prototype for each object will be a figure.
let circle1 = new Circle({x:0, y:0}, 10);
let circle2 = new Circle({x:100, y:100}, 100);

// NUEVO - ADDING PROPERTIES TO ALREADY DEFINED PROTOTYPES, STRING IN THE EXAMPLE
String.prototype.hi = function(){console.log("Hi!")};
console(string.hi());