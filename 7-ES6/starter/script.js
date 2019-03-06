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
console.log(ages6_3);