//EX 1
// You have started to organize the paintings you keep at home, and have decided to make an inventory of some of the most important ones. Declare an array of objects that will correspond to the following images: Mona Lisa (Leonardo da Vinci, 1503), The Last Supper (Leonardo da Vinci, 1495), Starry Night (Vincent van Gogh, 1889), The Scream (Edvard Munch, 1893), Guernica (Pablo Picasso, 1937), The Kiss (Gustav Klimt, 1907), Girl With a Pearl Earring (Johannes Vermeer, 1665), The Birth of Venus (Sandro Botticelli, 1485), Las Meninas (Diego Velázquez, 1656), The Creation of Adam (Michelangelo, 1512).

// Display all the images in the list in the console (full information: title, artist and date of creation).

let Painting = function(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

let paintings = [
    new Painting("Mona Lisa", "Leonardo da Vinci", "1503"),
    new Painting("The Last Supper", "Leonardo da Vinci", "1495"),
    new Painting("Starry Night", "Vincent van Gogh", "1889"),
    new Painting("The Scream", "Edvard Munch", "1893"),
    new Painting("Guernica", "Pablo Picasso", "1937"),
    new Painting("The Kiss", "Gustav Klimt", "1907"),
    new Painting("Girl With a Pearl Earring", "Johannes Vermeer", "1665"),
    new Painting("The Birth of Venus", "Sandro Botticelli", "1485"),
    new Painting("Las Meninas", "Diego Velázquez", "1656"),
    new Painting("The Creation of Adam", "Michelangelo", "1512"),
]

paintings.forEach(painting => {
    console.log(`{\n\tpainting: "${painting.title}",\n\tartist: "${painting.artist}",\n\tdate: "${painting.date}"\n},`);
});

//EX 2
// Write two functions, Image and getImage, that will return a new image object based on three given arguments: title, artist, and date.

// The Image function is the constructor, and getImage is the factory. Using the images data array from the previous task, create a new array, images1, using the Image constructor (don't copy the objects, but just create new ones based on the properties read).

// Similarly, from images1 create a new array, images2, using getImage.

// Display the contents of images2.

let getImage = (title, artist, date) => {
    return {
        title,
        artist,
        date
    }
}

let Image = function(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

let images1 = [];
let images2 = [];

paintings.forEach((paint) => {
    images1.push(new Image(paint.title, paint.artist, paint.date));
    images2.push(getImage(paint.title, paint.artist, paint.date));
});

images2.forEach(painting => {
    console.log(`{\n\tpainting: "${painting.title}",\n\tartist: "${painting.artist}",\n\tdate: "${painting.date}"\n},`);
});

//EX 3
// Create an images object that will be used to store the images. The object should have a list property, which will be an array of image objects and methods:

// contains - which takes as its argument the title of the image and returns true if the image is already placed in the list (otherwise it returns false)
// add – which takes three arguments (title, artist, and date) and creates a new object based on them and adds it to the list (if it has not already been added)
// show - which displays all images on the list;
// clear – which removes all objects from the list.
// While creating an object, use the Image constructor prepared in the earlier task.

// Test the script by calling the sequence:

let imagesObj = function(){
    this.list = [];
    this.contains = (title) => {
        let found = this.list.find(picture => picture.title == title);
        return found ? true : false;
    }
    this.add = (title, artist, date) => {
        if(!this.contains(title)){
            this.list.push(new Image(title, artist, date));
        }
    }
    this.show = () => {
        this.list.forEach(painting => console.log(`{\n\tpainting: "${painting.title}",\n\tartist: "${painting.artist}",\n\tdate: "${painting.date}"\n},`));
    }
    this.clear = () => {
        this.list = [];
    }
}

let images = new imagesObj();
console.log("Ejercicio N°3");
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.show();
// -> Mona Lisa (Leonardo da Vinci, 1503)
// -> Last Supper (Leonardo da Vinci, 1495)
// -> The Starry Night (Vincent van Gogh, 1889)
images.clear();
images.show();

//EX4
// Complement the images object from the previous task with two new methods (without rewriting the whole object):

// edit - which takes three arguments (title, artist, and date) and if it finds an image with the given title in the list, it changes its artist and date properties;
// delete - which takes the title argument and if it finds a picture with this title in the list, it deletes it (to delete a list element, use the splice method)
// Additionally, add a show method to the Image constructor, which will display information about this one image. Do not rewrite the constructor. Use prototypes for this purpose. Then modify the show method of the images object so that it uses the newly created single image show method to display the information.

// Test the script by calling the sequence:
imagesObj.prototype.edit = function(title, artist, date){
    this.list.forEach(picture => {
        if(picture.title == title){
            picture.artist = artist;
            picture.date = date;
        }
    });
}

imagesObj.prototype.delete = function(title){
    this.list.forEach((picture, idx) => {
        if(picture.title == title){
            this.list.splice(idx, 1);
        }
    });
}

Image.prototype.show = function(){
    return `{\n\tpainting: "${this.title}",\n\tartist: "${this.artist}",\n\tdate: "${this.date}"\n}`;
}

imagesObj.prototype.show = function(){
    this.list.forEach(painting => console.log(`${painting.show()},`));
}

console.log("Ejercicio N°4");
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.edit('Mona Lisa', 'Leonardo da Vinci', 1504);
images.delete('The Last Supper');
images.show();
// -> Mona Lisa (Leonardo da Vinci, 1504)
// -> The Starry Night (Vincent van Gogh, 1889)

//EX 5
// Write a function, deepComp, that will compare two objects given as arguments (deep comparison). Compare only properties (ignore methods), and consider the possibility of nesting (any number of levels).

// Properties can also be objects and arrays. We are interested in the properties available during the usual enumeration.

// For testing, use the following piece of code:

let deepComp = function(src, trg) {
    let retVal = Object.keys(src).length === Object.keys(trg).length;
    if(retVal) {
        for(property in src) {
            if(typeof(src[property]) === typeof(trg[property])) { 
                retVal = typeof(src[property]) === 'object' ? deepComp(src[property], trg[property]) : src[property] === trg[property]
            } else {
                retVal =false;
            }
            if(!retVal) break;
        }
    }
    return retVal;
}