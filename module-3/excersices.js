// EX 1 
// Write a function that will draw m integers from 0 to n. Pass parameters m and n and two flags to the function:

// the first determines whether the drawn numbers may be repeated;
// the second one states if the returned array of numbers should be sorted.
// Use the Set class.

// Test your solution using the following code:
function getRandomSet(m, n, uniq, sorted) {
    let retVal = uniq ? new Set() : [];
    let push = (e) => uniq ? retVal.add(e) : retVal.push(e);
    let length = () => uniq ? retVal.size : retVal.length;

    for(;length() < m;) {
        push(Math.floor(Math.random() * Math.floor(n)));
    }

    return sorted ? [...retVal].sort((n1, n2) => n1 - n2) : [...retVal];
}
console.log(getRandomSet(10, 20, false, false));
console.log(getRandomSet(10, 20, false, true));
console.log(getRandomSet(10, 20, true, false));
console.log(getRandomSet(10, 20, true, true));

// EX 2
// Declare a User class that will allow you to create objects with user information (first name, last name, email).

// The data should be passed to the constructor and stored as private properties.

// Create setters and getters to handle them. Use regular expressions to check if the data passed to the constructor or setter is in the correct format (first and last name consist of letters only, first letter upper-case, proper email address format). For simplicity, assume that an email address can only consist of letters, while strings of letters can be separated by dots.

// For example, abc.def@ghi.jk or a@abc.def.gh will be valid, while a_b@abc.def or abcd1@efg.hi.jk will be invalid.

// If data is incompatible with the format, do not save it and throw an exception (Error class) with an appropriate message.

let nameRegExp = /^[A-Z][a-z]+$/;
let emailRegExp = /^([a-zA-Z]+\.)*[a-zA-Z]+@([a-zA-Z]+\.)+[a-zA-Z]{2,3}$/;

class User {
    #name;
    #surname;
    #email;

    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    get name() {
        return this.#name;
    }
    set name(val) {
        if (typeof val === 'string' && val.match(nameRegExp)) {
            this.#name = val;
        } else {
            throw(new Error(`Incorrect name format: ${val}`));
        }
    }
    get surname() {
        return this.#surname;
    }
    set surname(val) {
        if (typeof val === 'string' && val.match(nameRegExp)) {
            this.#surname = val;
        } else {
            throw(new Error(`Incorrect surname format: ${val}`));
        }
    }
    get email() {
        return this.#email;
    }
    set email(val) {
        if (typeof val === 'string' && val.match(emailRegExp)) {
            this.#email = val;
        } else {
            throw(new Error(`Incorrect email format: ${val}`));
        }
    }
}

try {
    let user1 = new User('Aaaa', 'Bbbb', 'Aaaa@gmail.com');
    console.log(user1);
    let user2 = new User('aaaa', 'Bbbb', 'Aaaa@gmail.com'); // -> Error
    
} catch(err) {
    console.log(err.message);
}

// EX 3

// Create a Users class that will allow you to create objects containing a collection of individual users (users are created using the User class from the previous task).

// To create a collection, use a Map class (the key should be the email address, and the value should be the User object). The class should provide the following methods:

// add – add a single user, arguments are name, surname and email;
// delete - remove the user from the collection (the argument is the email)
// get - retrieve a single user from the collection (the argument is the email)
// getAll - retrieve all users from the collection (the argument is the name of the field by which the array is to be sorted: name, surname, or email
// Test your solution using the following code:

class Users {
    #users;

    constructor() {
        this.#users = new Map();
    }

    add(name, surname, email) {
        try{
            this.#users.set(email, new User(name, surname, email));
        } catch(e) {
            console.log(e.message);
        }
    }

    delete(email) {
        return this.#users.delete(email);
    }

    get(email) {
        return this.#users.get(email);
    }

    getAll(sortBy) { //name,surname,email
        return [...this.#users].sort((u1,u2) => u1[1][sortBy] > u2[1][sortBy] ? 1 : -1).map(u => u[1]);
    }
}

let users = new Users();
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Mmmm", "Ffff", "eeee@gmail.com");
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Xxxx", "Oooo", "dddd@gmail.com");
console.log(users.get("dddd@gmail.com"));
console.log(users.getAll("name").map(u => u.name));
console.log(users.getAll("surname").map(u => u.surname));
console.log(users.getAll("email").map(u => u.email));

// EX 4
// Define three classes: Point, Line, and Figure:

// The Point class should have only three properties: x and y coordinates and type (always set to 'point'). The constructor takes the x and y coordinates.
// The Line class should have the type property equal to 'line' and the points property, which is an array of Point class objects (points that form a line). The constructor of the constructor takes an array of point coordinates in the format [[x1, y1], [x2, y2], ...] (e.g. [[0, 0], [10, 20], [20, 20]]).
// The Figure class is to allow you to create an object that is a collection of points and lines (stored in separate properties). Define the following methods:
// constructor - takes an array of elements as an argument (lines and points)
// addPoint - takes the x and y coordinates of the new point to add to the collection;
// addLine - takes an array of line points in the format [[x1, y1], [x2, y2], ...] and adds it to the collection;
// toJSON - returns the saved collection (points and lines) in JSON format;
// fromJSON - takes JSON data, parses it, and adds to the collection. As an additional argument, provide a flag that specifies whether the data should be added to an existing collection or replace it;
// deleteAll - deletes all data from the collection.

class Point {
    constructor(x, y) {
        this.type = 'point';
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(points) { // [[x, y], [], [], ...]
        this.type = 'line';
        this.points = points.map(p => new Point(p[0], p[1]));
    }
}

class Figure {
    constructor(elements = []) {
        this.addElements();
    }

    addElements(elements = []) {
        this.elements = {
            points: elements.filter(e => e.type === 'point'),
            lines: elements.filter(e => e.type === 'line')
        }        
    }

    addPoint(x, y) {
            this.elements.points.push(new Point(x, y));
    }

    addLine(points=[]) { // [[x, y], [], [], ...]
        this.elements.lines.push(new Line(points));
    }

    toJSON() {
        return JSON.stringify(this.elements);
    }

    fromJSON(data="{}", add=false) {
        let obj = JSON.parse(data);
        if(add) {
            this.elements.points = this.elements.points.concat(obj.points||[]);
            this.elements.lines = this.elements.lines.concat(obj.lines||[]);
        } else {
            this.elements = obj;
        }
    }

    deleteAll() {
        this.elements.points = [];
        this.elements.lines = [];
    }
}

let f = new Figure();
f.addPoint(10,20);
f.addPoint(10,10);
f.addLine([[10,20], [30,40], [50,60]]);
let json = f.toJSON();
console.log(json);
f.fromJSON(json, true);
console.log(f.elements.points.length);
console.log(f.elements.lines.length);
f.fromJSON('{"points":[{"type":"point","x":10,"y":20},{"type":"point","x":10,"y":30},{"type":"point","x":10,"y":-30},{"type":"point","x":10,"y":20},{"type":"point","x":20,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":130,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":0,"y":20},{"type":"point","x":0,"y":-20},{"type":"point","x":0,"y":20}],"lines":[{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":-10},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]}]}');
console.log(f.elements.points.length);
console.log(f.elements.lines.length);

// EX 5
// Modify the Figure class from the previous task so that you can sort points and lines in the collection and automatically remove elements with the same values (e.g. lines composed of the same points).

class Figure {
    constructor(elements = []) {
        this.addElements();
    }

    addElements(elements = []) {
        this.elements = {
            points: elements.filter(e => e.type === 'point'),
            lines: elements.filter(e => e.type === 'line')
        }        
    }

    addPoint(x, y) {
            this.elements.points.push(new Point(x, y));
    }

    addLine(points=[]) { // [[x, y], [], [], ...]
        this.elements.lines.push(new Line(points));
    }

    toJSON() {
        return JSON.stringify(this.elements);
    }

    fromJSON(data="{}", add=false) {
        let obj = JSON.parse(data);
        if(add) {
            this.elements.points = this.elements.points.concat(obj.points||[]);
            this.elements.lines = this.elements.lines.concat(obj.lines||[]);
        } else {
            this.elements = obj;
        }
    }

    deleteAll() {
        this.elements.points = [];
        this.elements.lines = [];
    }

    static isSamePoint(point1, point2) {
        return point1 && point2 && point1.x && point1.y && point2.x && point2.y && point1.x === point2.x && point1.y === point2.y;
    }
    
    static isSameLine(line1, line2) { 
        let retVal = line1 && line2 && line1.points && line1.points && line1.points.length === line2.points.length;
        if(retVal) {
            retVal = line1.points.every((p,i) => {
                let {x, y} = line2.points[i];
                return p.x === x && p.y === y;
            })
        }
        return retVal;
    }
    
    sortPoints() {
        this.elements.points = this.elements.points.sort((p1, p2) => p2.x - p1.x == 0 ? p2.y - p1.y : p2.x - p1.x);
    }
    
    sortLines() {
        this.elements.lines = this.elements.lines.sort((l1, l2) => {
            let retVal = 0;
            for(let i=0; i<l1.points.length; i++) {
                retVal = l2.points[i].x - l1.points[i].x == 0 ? l2.points[i].y - l1.points[i].y : l2.points[i].x - l1.points[i].x;
                if(retVal) {
                    break;
                }
            };
            return retVal;
        });
    }
    
    cleanUp() {
        this.sortPoints();
        this.elements.points = this.elements.points.reduce((p,c) => Figure.isSamePoint(p[p.length - 1], c) ? p : p.push(c) && p, []);
        this.sortLines();
        this.elements.lines = this.elements.lines.reduce((p,c) => Figure.isSameLine(p[p.length - 1], c) ? p : p.push(c) && p, []);
    }
}