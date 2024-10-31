//NUEVO
//toExponential
let a = 12345;
console.log(a.toExponential());   // -> 1.2345e+4
console.log(a.toExponential(1));  // -> 1.2e+4
// toFixed TO ROUND NUMBERS
// remember there could be imprecise results
let nr1 = 10.55;
console.log(nr1.toFixed(1)); // -> 10.6
console.log(nr1.toFixed(0)); // -> 11
console.log(nr1.toFixed(3)); // -> 10.550
// toLocalString
// TO CONVERT NUMBER TO STRING FORMAT AND REPRESENT IT ACCORDING TO COUNTRY REPRESENTATION
// IF NOT SPECIFIED IT WILL USE SYSTEM CONFIGURATION
// THERE COULD BE OPTIONAL ARGUMENTS
let nr = 123456.789;
console.log(nr.toLocaleString("en-GB")); //-> 123,456.789
console.log(nr.toLocaleString("fr-FR")); //-> 123·456,789
console.log(nr.toLocaleString("de-DE")); //-> 123.456,789
console.log(nr.toLocaleString("ar-EG")); //-> ١٢٣٬٤٥٦٫٧٨٩
console.log(nr.toLocaleString("es-ES",{
    style: "currency",
    currency: "EUR"
})); //-> 123.456,79 €
console.log(nr.toLocaleString());

//NUEVO
//GET CHAR AT CERTAIN INDEX OF A STRING
let title = "Alien 10";
console.log(title[0]); // -> A
console.log(title.charAt(0)); // -> A

//REPLACE STRING MATCHES
// string.replace() -> JUST FOR THE FIRST MATCH
let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam.";
let words = text.toLowerCase().replaceAll('.','').replaceAll(',','').split(' ');
console.log(words.length); // -> 30

// FILLING TO HAVE A MINIMUM STRING SIZE
let numbers = [100, 5, 66];
for(let i=0; i< numbers.length; i++) {
    console.log(String(numbers[i]).padStart(10, '0'));
    console.log(String(numbers[i]).padStart(10, 'abc'));
    console.log(String(numbers[i]).padStart(10));
}

//TRIM
let city = " Bergen  ";
let street = " Dokkeboder";
console.log(city.trimStart().length); // -> 8 -> "Bergen  "
console.log(city.trimEnd().length); // -> 7 -> " Bergen"
console.log(city.trim().length); // -> 6 -> "Berge"
console.log(street.trim().length); // -> 10 -> "Dokkeboder"

// DATES
date3 = new Date("2020-02-02T20:20:00.000");
date4 = new Date("2020-02-02T20:20:00.000Z");
console.log(date3.toLocaleString()); // -> 02/02/2020, 20:20:00
console.log(date3.toISOString()); // -> 2020-02-02T19:20:00.000Z
console.log(date3.toUTCString()); // -> Sun, 02 Feb 2020 19:20:00 GMT
console.log(date4.toLocaleString()); // -> 02/02/2020, 21:20:00
console.log(date4.toISOString()); // -> 2020-02-02T20:20:00.000Z
console.log(date4.toUTCString()); // -> Sun, 02 Feb 2020 20:20:00 GMT
console.log(date3.getTime()); // -> 1580671200000
console.log(date4.getTime()); // -> 1580674800000
console.log(date4.getTime() - date3.getTime()); // -> 3600000

//USING DATE.NOW()
// THIS RETURNS A TIMESTAMP WHICH CONTAINS NUMBER OF MILISECONDS FROM ZERO POINT 'TIL NOW
let now = Date.now(); // timestamp
let nowObj = new Date(now);

// GIVING PARTS ON DE CONSTRUCTOR
date1 = new Date(2020, 6);
date2 = new Date(2020, 6, 8);
date3 = new Date(2020, 6, 8, 10);
date4 = new Date(2020, 6, 8, 10, 20, 45);
console.log(date1.toLocaleString()); // -> 01/07/2020, 00:00:00
console.log(date2.toLocaleString()); // -> 08/07/2020, 00:00:00
console.log(date3.toLocaleString()); // -> 08/07/2020, 10:00:00
console.log(date4.toLocaleString()); // -> 08/07/2020, 10:20:45

//USING STRING
// TRY ALWAYS TO USE  ISO 8601 FORMAT AS SHOWN BELOW
let date1 = new Date("2020-07-08");
let date2 = new Date("2020-07-08T10:20:00");
let date3 = new Date("2020-07-08T10:20:00Z");

//GETTING DATE PARTS
// year: getFullYear,
// month: getMonth (remember that the months are counted from 0 in JavaScript)
// day of the month: getDate,
// day of the week: getDay (days of the week are counted from 0 – the first day is Sunday)
// hour: getHours,
// minutes: getMinutes,
// seconds: getSeconds,
// milliseconds: getMilliseconds.
// MOST USEFUL
console.log(date.toLocaleDateString()); // -> 08/07/2020
console.log(date.toLocaleTimeString()); // -> 10:20:00

//REGULAR EXPRESSIONS

let re1 = /o*ps/;
console.log(re1.exec("ps")); // -> ["ps", index: 0, input: "ps", groups: undefined]
console.log(re1.exec("ops")); // -> ["ops", index: 0, input: "ops", groups: undefined]
console.log(re1.exec("He said: ooops!")); // -> ["ooops", index: 9, input: "He said: ooops!", groups: undefined]
let re2 = /o+ps/;
console.log(re2.exec("ps")); // -> null
console.log(re2.exec("ops")); // -> ["ops", index: 0, input: "ops", groups: undefined]
console.log(re2.exec("He said: ooops!")); // -> ["ooops", index: 9, input: "He said: ooops!", groups: undefined]
let re3 = /o?ps/;  /// strange, isnt it?
console.log(re3.exec("ps")); // -> ["ps", index: 0, input: "ps", groups: undefined]
console.log(re3.exec("ops")); // -> ["ops", index: 0, input: "ops", groups: undefined]
console.log(re3.exec("He said: ooops!")); // -> ["ooops", index: 9, input: "He said: ooops!", groups: undefined]
