const person = {
    firstName: 'Mario',
    age: 21,
    location: {
        city: 'Zagreb',
        temp: 15
    }
};

const { firstName, age } = person;

/* const firstName = person.firstName;
const age = person.age; */

console.log(`${firstName} is ${age}.`);

const { temp: renamedTemperature = 8, city: inCity } = person.location;

console.log(`It's ${renamedTemperature} in ${inCity}`);

const book = {
    title: 'Atomic Habits',
    author: 'Ryan Gosling',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher; 

console.log(publisherName);

// STRUCTURING 
const address = ['1299 S. Juniper Street', 'NewYork', 'Georgia', '19147'];

const [, city, state = 'Missisippi'] = address;

console.log(`You are in ${city} ${state}.`)

const item = ['Coffe (hot)', '€2.00', '€2.50', '€2.75'];

const [menuItem, , mediumPrice] = item;

console.log(`A medium ${menuItem} costs ${mediumPrice}`);

