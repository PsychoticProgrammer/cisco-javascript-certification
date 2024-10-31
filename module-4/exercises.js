// EX 1
// Write a class called MyIterable that will allow you to create an iterable object with the following properties:

// it will be possible to add arbitrary elements to it (add method)
// an attempt to add an element that is already in the object will be ignored;
// it will be possible to check whether an element is present in the object (has method)
// it will be possible to delete an element (del method)
// it will be possible to check the number of elements (length property)
// it will be possible to use any technique for passing elements of an iterable object (spread operator, for ... of, iterators), and an appropriate generator should be used in the implementation.
// Test the class using the following example:

class MyIterable {
    constructor() {
        this.data = [];
    }

    get length() {
        return this.data.length;
    }

    has(n) {
        return this.data.includes(n);
    }

    add(n) {
        if(!this.has(n)) {
            this.data.push(n);
        }
    }

    del(n) {
        let index = this.data.indexOf(n);
        if(index !== -1) {
            this.data.splice(index, 1);
        }
    }

    [Symbol.iterator] = function* (){
        for(let index = 0; index<this.length; index++) {
            yield this.data[index];
        }
    }
}

let iterable = new MyIterable();
iterable.add(2);
iterable.add(5);
iterable.add(3);
iterable.add(2);
iterable.del(3);


console.log(iterable.length); // -> 2
console.log(iterable.has(2)); // -> true
console.log(iterable.has(3)); // -> false
console.log(...iterable); // -> 2 5

// EX 2
// Write a decorator named myDecorator that will store the arguments of the decorated function call.

// If the function has already been called with these arguments, an appropriate message should appear in the console containing, among other things, the values of those arguments.

// Note – the function can be called with any number of arguments, so use rest arguments for this purpose.

// Test the decorator using the following code:

let myDecorator = function(fn) {
    let cache = new Set();
    let included = function(...args) {
        let found = false;
        for(let e of cache) {
            let index = 0;
            console.log(`${e}`)
            found = true;
            for(let arg of args) {
                console.log(`   ${arg}`);
                if(arg !== e[index++]) {
                    found = false;
                    break;
                }
            }
            if(found) {
                break;
            }
        }
        return found;
    }
    return function(...args) {
        if(included(...args)) {
            console.log(`arguments already used: ${args}`);
        } else {
            cache.add(args);
        }
        fn(...args);

    }
}

let sum = function(...args) {
    let retVal = 0;
    for(let arg of args) {
        retVal += arg;
    }
    return retVal;
}
let dfn = myDecorator(sum);
dfn(2, 3, 4);
dfn(4, 5);
dfn(2, 3, 4); // -> arguments already used: 2,3,4
dfn(4, 5); // -> arguments already used: 4,5

// EX 3
// Write a getPromiseArray function that will take an array of any length as an argument.

// The function should return an array of promises (one promise for each element of the array passed as an argument) according to the following scheme:

// if the array element is a positive integer, then the promise should be fulfilled after a time equal to this number and return the same number as its value;
// otherwise the promise should be rejected immediately (generate a corresponding error using the Error object>
// Test the function using the following code:

let getPromiseArray = function(args) {
    let promises = args.map(arg => new Promise(function(resolve, reject){
        if(Number.isInteger(arg) && arg > 0) {
            let rnd = Math.random();
            setTimeout(resolve(arg), arg);
        } else {
            reject(new Error(`${arg} is not a positive integer`))
        }
    }));
    return promises;
}

let promises1 = getPromiseArray([10, 30, 5, 20, 'a']);
Promise.all(promises1).then(a => console.log(`all: ${a}`))
.catch(e => console.log(`all: ${e.message}`)); // -> any: 10 
Promise.any(promises1).then(a => console.log(`any: ${a}`)).
catch(e => console.log(`any: ${e.message}`)); // -> all: a is not a positive integer

// EX 4
// Write a getWeather function that will retrieve weather information from the server. The function takes two arguments:

// the name of the city or cities (if you are interested in one city, it is just the name, if several, it is an array of names)
// the type of information ('wind' etc.), and if no argument is given or 'all' is given, then all data is returned.
// The retrieved data should be displayed in the console in a user readable form. Additionally, in the event that the wind speed is higher than 15 m/s or the temperature is lower than -20ºC, an appropriate warning should appear in the console.

// Use promises and the fetch method in the implementation.

let getWeather = function(location, info) {
    let cities;
    let url = "http://localhost:3000/weather";
    const maxWindSpeed = 15;
    const minTemp = -20; 

    let showWindInfo = function(weather){
        console.log(`WIND: ${weather.wind.speed} m/s, ${weather.wind.deg} deg`);
        if(weather.wind.speed > maxWindSpeed) {
            console.log(`WARNING! Wind speed over ${maxWindSpeed} m/s`);
        }
    };

    let showInfo = function(weather, type){
        console.log(`${type.toUpperCase()}: ${weather[type]} ${type === 'temp' ? 'C' : '%'}`);
        if(type === 'temp' && Number(weather.temp) < minTemp) {
            console.log(`WARNING! Temperature below ${minTemp} degrees`);
        }
    };

    if(!Array.isArray(location)) {
        cities = [location]
    } else {
        cities = location;
    }
    let infoQuery = '&info=';
    let promises = cities.map(city => fetch(`${url}?city=${city}${info && info !== 'all'?infoQuery + info:''}`));
    Promise.all(promises)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            for(let city of data) {
                console.log('');
                console.log(`CITY: ${city.city}`);
                for(let key in city.weather) {
                    if(key === 'wind') {
                        showWindInfo(city.weather);
                    } else {
                        showInfo(city.weather, key);
                    }
                }
            }
        })
        .catch(e => console.log(e.message));
}

let weather1 = getWeather('Berlin', 'wind');
// CITY: Berlin
// WIND: 16 m/s, 117 deg
// WARNING! Wind speed over 15 m/s

let weather2 = getWeather(['Oslo', 'Yakutsk'], 'all');
// CITY: Oslo
// WIND: 8 m/s, 170 deg
// CLOUDS: 0 %
// TEMP: 0 C
// PRECIPITATION: 0 %
//
// CITY: Yakutsk
// WIND: 0 m/s, 0 deg
// CLOUDS: 0 %
// TEMP: -40 C
// WARNING! Temperature below -20 degrees
// PRECIPITATION: 0 %

// EX 5
// Modify the getWeather function from the previous task using the async/await statement.

// The result of the function should be identical to the previous one.

// Don’t forget about error handling.

getWeather = async function(location, info) {
    let cities;
    let url = "http://localhost:3000/weather";
    const maxWindSpeed = 15;
    const minTemp = -20; 

    let showWindInfo = function(weather){
        console.log(`WIND: ${weather.wind.speed} m/s, ${weather.wind.deg} deg`);
        if(weather.wind.speed > maxWindSpeed) {
            console.log(`WARNING! Wind speed over ${maxWindSpeed} m/s`);
        }
    };

    let showInfo = function(weather, type){
        console.log(`${type.toUpperCase()}: ${weather[type]} ${type === 'temp' ? 'C' : '%'}`);
        if(type === 'temp' && Number(weather.temp) < minTemp) {
            console.log(`WARNING! Temperature below ${minTemp} degrees`);
        }
    };

    if(!Array.isArray(location)) {
        cities = [location]
    } else {
        cities = location;
    }
    let infoQuery = '&info=';
    let promises = cities.map(city => fetch(`${url}?city=${city}${info && info !== 'all'?infoQuery + info:''}`));
    try {
        let responses = await Promise.all(promises);
        let data = await Promise.all(responses.map(response => response.json()));
        for(let city of data) {
            console.log('');
            console.log(`CITY: ${city.city}`);
            if(city.weather) {
                for(let key in city.weather) {
                    if(key === 'wind') {
                        showWindInfo(city.weather);
                    } else {
                        showInfo(city.weather, key);
                    }
                }
            } else {
                console.log('weather unknown');
            }
        }
    } catch(e) {
        console.log(e.message);
    }
}