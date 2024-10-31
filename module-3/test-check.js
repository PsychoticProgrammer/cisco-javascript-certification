let points = [{x: 10, y: 20}, {x: 0, y: 30}, {x: 20, y: 100}];
let result = points.sort((p1, p2) => p2.y - p1.y);
console.log(result);

let x = ['a', 'b', 'c', 'd', 'e'];
let y = x.slice(1,-1);
console.log(y);

x = ['a', 'b', 'c', 'd', 'e'];
x.splice(2, 2);
x.splice(2, 0, 'x', 'y');
console.log(x);