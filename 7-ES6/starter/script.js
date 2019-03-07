// Variables let and const
/****
//ES5
var name5 = 'Jane Smith';
var yearOfBirth5 = 1990;
name5 = 'Jane Miller';
console.log(name5);

//ES6
let name6 = 'Jane Smith';
const yearOfBirth6 = 1990;
//yearOfBirth+=1   Error
name6 = 'Jane Miller';
console.log(name6);


//ES5
function driverLicense5(bool) {
	if(bool) {
		var firstName = 'John';
		var yearOfBirth = 1990;

		console.log(firstName + ' - ' + yearOfBirth);
	}
	
	console.log(firstName + ' - ' + yearOfBirth);
}


//ES6
function driverLicense6(bool) {
	if(bool) {
		let firstName = 'John';
		const yearOfBirth = 1990;

		console.log(firstName + ' - ' + yearOfBirth);
	}
	
	//console.log(firstName + ' - ' + yearOfBirth);  //RefernceError not defined firstName and yearOfBirth
}

// let and const - block scope variables
// var - function scope variable
****/

/////////////////////////////////////////////////////////////////////
//Lectiure: Block and IIFEs
/****
//Blocks

{
	let age = 18;
	const year = 2019;
	var firstName = 'Komil';
}
//console.log(age);  //ReferenceError
//console.log(year);  //ReferenceError
console.log(firstName);

//ES5
(function() {
	console.log('IIFE on ES5');
})();

//ES6
(()=> {
	console.log('IIFE on ES6');
})();
****/

///////////////////////////////////////////////////////////////////////
//Lecture: String on ES6
/****
var firstName = 'John';
var yearOfBirth = 1990;

var calcAge = function(yearOfBirth) {
	return 2019 - yearOfBirth;
}

//ES5
console.log('His name is ' + firstName + '. He was born in ' + yearOfBirth + '. Now he is ' + calcAge(yearOfBirth) + ' years old');

//ES6
console.log(`His name is ${firstName}. He was born in ${yearOfBirth}. Now he is ${calcAge(yearOfBirth)} years old`);

let testing = `${firstName} vs ${firstName}`;

console.log(testing.startsWith('J'));
console.log(testing.endsWith('n'));
console.log(testing.includes('vs'));
console.log(`${firstName} `.repeat(3));
****/


/////////////////////////////////////////////////////////////////////////
// Lecture: Arrow functions
/****
const years = [1992, 1998, 1987, 2000, 1999];

//ES5
var ages = years.map(function(el, index) {
	return 2019 - el;
});
console.log(ages);

//ES6
let ages6_1 = years.map(el => 2019 - el);

let ages6_2 = years.map((el, index) => `Age of element ${index + 1}: ${2019 - el}`);

let ages6_3 = years.map((el, index) => {
	const now = new Date();
	let month = now.getMonth();
	let year = now.getFullYear();
	return `Element ${index + 1}: ${year - el}`;
});

console.log(ages6_1);
console.log(ages6_2);
console.log(ages6_3); ****/



////////////////////////////////////////////////////////////////////
// Arrow function 2
/****
// ES5
var box5 = {
	color: 'green',
	position: 1,
	clickMe: function() {

		var self = this;

		document.querySelector('.green').addEventListener('click', function() {

			//var str = 'It is box number ' + this.position + ' and it is ' + this.color;
			//Error as `this` refere to object window now

			var str = 'It is box number ' + self.position + ' and it is ' + self.color;

			alert(str);

		})
	}
}

box5.clickMe();


// ES6
var box6 = {
	color: 'blue',
	position: 2,
	clickMe: function() {

		document.querySelector('.blue').addEventListener('click', () => {

			//var str = 'It is box number ' + this.position + ' and it is ' + this.color;
			//Error as `this` refere to object window now

			var str = 'It is box number ' + this.position + ' and it is ' + this.color;

			alert(str);

		})
	}
}

box6.clickMe();
/* Here we didn't store object in new variable to use it in callback,
 because the ARROW FUNCTIONS remember their lexical surrounding */
/****
 // ES5
 var Person5 = function(name) {
	 this.name = name;
 }

 Person5.prototype.friends5 = function(friends) {

	var arr = friends.map(function(el) {
		return this.name + ' and ' + el + ' is a friend';
	}.bind(this));

	console.log(arr);
 }

 var friends = ['Michael', 'Jane', 'Kate'];

 new Person5('John').friends5(friends);


 // ES6
 var Person6 = function(name) {
	this.name = name;
}

Person6.prototype.friends6 = function(friends) {

   var arr = friends.map(el => `${this.name} and ${el} is a friend`);

   console.log(arr);
}

new Person6('Mike').friends6(friends);
****/


//////////////////////////////////////////////////////////////////
// Lecture: Descruturing
/****
// ES5
var john = ['John', 'Smith'];
var firstName1 = john[0];
var lastName1 = john[1];

console.log(firstName1, lastName1);

// ES6
var jane = ['John', 'Smith'];
var [janeName, janeLastName] = jane;

console.log(janeName, janeLastName);

var obj = {
	firstName: 'Mark',
	lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName, lastName);

const {firstName: a, lastName: b} = obj;
console.log(a, b);


function calAgeRetirement(year) {
	var now = new Date();
	var age = now.getFullYear() - year;
	return [age, 65 - age];
}

var [age, retirement] = calAgeRetirement(1990);
console.log(age, retirement);
****/


////////////////////////////////////////////////////////////////////////
// Lecture: Arrays on ES6
/****
//ES5
var boxes = document.querySelectorAll('.box');
var boxArr5 = Array.prototype.slice.call(boxes);

boxArr5.forEach(function(cur) {
	cur.style.backgroundColor = 'dodgerblue';
}); 

//ES6
var boxArr6 = Array.from(boxes);
boxArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');


//ES5
for(var i = 0; i < boxArr5.length; i++) {
	if(boxArr5[i].className === 'box blue') {
		continue;
	}

	boxArr5[i].textContent = 'I changed to blue';
}


//ES6
for(const cur of boxArr6) {
	if(cur.className === 'box blue') {
		continue;
	}

	cur.textContent = 'I changed to blue';
}


//ES5
var ages = [12,16,14,19,20];

var full = ages.map(function(cur) {
	return cur >= 18;
});

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

//ES6

console.log(ages.findIndex(cur => cur >= 18)); //findIndex: parameter -> callback
console.log(ages.find(cur => cur >= 18));
****/

////////////////////////////////////////////////////////////////////
//Lecture: Spread operator
/****
function sumFourAges(a, b, c, d) {
	return a + b + c + d;
}

var sum = sumFourAges(12, 18, 40, 13);
console.log(sum);

//ES5
var ages = [13, 17, 21, 20];
var sum5 = sumFourAges.apply(null, ages);
console.log(sum5);

//ES6
var sum6 = sumFourAges(...ages);
console.log(sum6);


const familySmith = ['Jane', 'John', 'Mark'];
const familyMiller = ['Mike', 'Ann', 'Bob'];

const bigFamily = [...familyMiller, 'Lili', ...familySmith];
console.log(bigFamily);


//for nodesArray
const h1 = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h1, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'red');
****/

//////////////////////////////////////////////////////////////////////////
// Lecture: Rest parameters
/*
//ES5
function isFullAge5() {
	var arrArgs = Array.prototype.slice.call(arguments);
	arrArgs.forEach(function(cur) {
		console.log(2019 - cur >= 18);
	});
}

isFullAge5(1990, 1993, 2003, 1999, 2011);

//ES6
function isFullAge6(...years) {
	years.forEach(cur => console.log(2019 - cur >= 18));
}

isFullAge6(1190, 1999, 2003);
*/
/****
//ES5
function isFullAge5(limit) {
	var arrArgs = Array.prototype.slice.call(arguments, 1);
	arrArgs.forEach(function(cur) {
		console.log(2019 - cur >= limit);
	});
}

isFullAge5(20, 1990, 1993, 2003, 1999, 2011);

//ES6
function isFullAge6(limit,...years) {
	years.forEach(cur => console.log(2019 - cur >= limit));
}

isFullAge6(19, 1190, 1999, 2003);
****/


////////////////////////////////////////////////////////////////////
// Lecture: Default parameters

//ES5
/*
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

	lastName = lastName === undefined ? 'Smith' : lastName;
	nationality = nationality === undefined ? 'american' : nationality;

	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality;
}*/
/*
//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {

	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
var jane = new SmithPerson('Jane',1993,'Diaz','spanish');
console.log(john);
console.log(jane);
*/



//////////////////////////////////////////////////////////////////////
// Lecture: Maps => new on ES6
/******
var question = new Map();
question.set('question', 'What is the official name of the major latest javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES2015');
question.set(3, 'ES6');
question.set(4, 'ES7');
question.set('answer', 2);
question.set(true, 'Correct answer!');
question.set(false, 'Wrong answer!');

console.log(question.get('question'));

if(question.has('answer')) {
	//console.log(question.get('answer'));
}

//question.delete(4);

//question.clear();

//question.forEach((value, index) => console.log(`This kay is ${index}, and it is set ${value}`));
const arr = [12, 15, 123, 215];
console.log(arr.entries());
console.log(arr);
for(let [key, val] of arr.entries()) {
	console.log(`${key} - ${val}`);
}

for(let [key, value] of question.entries()) {
	if(typeof(key) === 'number') {
		console.log(`Answer ${key}: ${value}`);
	}
}

var ans = parseInt(prompt('Please, enter your answer'));

console.log(question.get(question.get('answer') === ans));

******/




/////////////////////////////////////////////////////////////////////////
// Lecture: Classes
/****
//ES5
function Person5(name, year, job) {
	this.name = name;
	this.year = year;
	this.job = job;

	this.calcAge = function() {
		var age = new Date().getFullYear() - this.year;
		console.log(age);
	}
}

var john = new Person5('John', 1990, 'teacher');
john.calcAge();

//ES6
class Person6 {
	constructor(name, year, job) {
		this.year = year;
		this.name = name;
		this.job = job;
	}

	calcAge() {
		let age = new Date().getFullYear() - this.year;
		console.log(age);
	}

	static greeting() {
		console.log('Hey there!');
	}
}

const John = new Person6('John', 1990, 'teacher');
John.calcAge();

//John.greeting() ====> 'Error

Person6.greeting();
console.log(this);
****/



///////////////////////////////////////////////////////////////
// Lecture: Classes and subclasses
/****
//ES5
function Person5(name, year, job) {
	this.name = name;
	this.year = year;
	this.job = job;
}

Person5.prototype.calcAge = function() {
	var age = new Date().getFullYear() - this.year;
	console.log(age);
}

function Athlete5(name, year, job, olympGames, medals) {
	Person5.call(this, name, year, job);
	this.olympGames = olympGames;
	this.medals = medals;
}
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedalTest = function() {
	console.log(this.medals * 2);
}

Athlete5.prototype.wonMedal = function() {
	this.medals++;
	console.log(this.medals);
}

var komilAthlete = new Athlete5('Komil', 1999, 'web-developer', 7, 10);
console.log(komilAthlete);
komilAthlete.calcAge();
komilAthlete.wonMedal();
//komilAthlete.wonMedalTest();


//ES6
class Person6 {
	constructor(name, year, job) {
		this.year = year;
		this.name = name;
		this.job = job;
	}

	calcAge() {
		let age = new Date().getFullYear() - this.year;
		console.log(age);
	}

}

class Athlete6 extends Person6 {
	constructor(name, year, job, olympGames, medals) {
		super(name, year, job);
		this.olympGames = olympGames;
		this.medals = medals;
	}

	wonMedal() {
		this.medals++;
		console.log(this.medals);
	}
}

var johnAthlete = new Athlete6('John', 1990, 'teacher', 12, 10);
johnAthlete.wonMedal();
johnAthlete.calcAge();
****/




//////////////////////////////////////////////////////////////////////////
// Lecture: CODE CHALLENGE 8

class Place {
	constructor(name, year, area) {
		this.name = name;
		this.year = year;
		this.area = area;
	}
}

class Park extends Place {
	constructor(name, year, numberOfTrees, area) {
		super(name, year, area);
		this.numberOfTrees = numberOfTrees;
	}

	calcTreeDensity() {
		return this.numberOfTrees / this.area;
	}
}

class Street extends Place {
	constructor(name, year, area, streetLength) {
		super(name, year, area);
		this.streetLength = streetLength;
	}

	calcSize() {
		let size;
		switch(true) {
			case this.area < 5000:
				size = 'tiny';
				break;
			case this.area < 10000:
				size = 'small';
				break;
			case this.area < 100000:
				size = 'normal';
				break;
			case this.area <= 1000000:
				size = 'big';
				break;
			default:
				size = 'huge';	
		}

		return size;
	}
}

var parks = new Map();
parks.set(0, new Park('Green Park',1991, 1220075, 10000));
parks.set(1, new Park('National Park',1987, 2130075, 10400));
parks.set(2, new Park('Oak Parks',2003, 3120075, 210000));

var streets = new Map();
streets.set(0, new Street('Oceane Avenue', 1993, 211451, 1000000253000));
streets.set(1, new Street('Evergeen Street', 1897, 2452151, 1004200253000));
streets.set(2, new Street('4th Street', 1983, 312451, 1125000000000));
streets.set(3, new Street('Sunset Boulevard', 1942, 31542451, 104215253000));

const parkYears = getYears(parks);
const streetYears = getYears(streets);

const parksAverageAge = getAverageAge(getAges(parkYears));
const streetAverageAge = getAverageAge(getAges(streetYears));

const totalStreetLength = totalLength(streets);

function getAverageAge(ages) {
	let sum = 0;
	ages.forEach(el => sum+=el);
	return sum / ages.length;
}
console.log(getAges(parkYears));
function getAges(years) {
	let now = new Date();
	return years.map(el => now.getFullYear() - el);
}

function getYears(mapObj) {
	let arrYears = [];
	for(let [key, value] of mapObj.entries()) {
		arrYears.push(value.year);
	}
	return arrYears;
}

function getAverage(arrLength) {
	let sum = 0;
	arrLength.forEach(el => sum+=el);
	return sum / arrLength.length;
}

function totalLength(mapObj) {
	let sum = 0;
	mapObj.forEach((val, key, map) => sum+=val.streetLength);
	return sum;
}

console.log('======= PARKS REPORT ========');
console.log(`Our ${parks.size} parks have an average age of ${parksAverageAge} years.`);
for(let [key, value] of parks) {
	console.log(`${value.name} has a tree density of ${value.calcTreeDensity()} trees per square km`);
}
let nameOfPark = Array.from(parks).find(el => el[1].year >= 1000)[1].name;
console.log(`${nameOfPark} has more than 1000 trees`);


console.log('======= STREETS REPORT ========');
console.log(`Our ${streets.size} have a total length of ${totalStreetLength} km, with a average of ${getAverage(Array.from(streets).map(el => el[1].streetLength))}`)
for(let [key, value] of streets.entries()) {
	console.log(`${value.name}, build in ${value.year}, is a ${value.calcSize()} street`);
}