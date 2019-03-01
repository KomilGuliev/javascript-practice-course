//Lecture: Hoisting

//function hoisting. Functions will be store on global object window
//and we can use if before or after declaring
calculateAge(1990); // 29

function calculateAge(year) {
	console.log(2019 - year);
}


//fuction expression

//retirement(1956);      // TypeError: retirement is not a function

var retirement = function(year) {
	console.log(65 - (2019 - year));
}


//variables
console.log(age)    //undefined  BECAUSE the variable declare in global object but ite has not a value
var age = 23; // It store at the Global Execution Context

function foo() {
	var age = 62; //It istore at the Execution context of function foo
	console.log(age);  //62
}
foo();
console.log(age) //23



///////////////////////////////////////////////////////////////////////
//Lecture: Scoping
// Example to show differences 
//between execution stacl and scope chain

var a = 'Hello!';
first();

function first() {
	var b = 'Hi!';
	second();

	function second() {
		var c = 'Hey!';
		third();
	}
}

function third() {
	var d = 'John';
	//console.log(c)  //ReferenceError: c is not defined
}


////////////////////////////////////////////////////////////////////////
//Lecture: The this keyword

//console.log(this);     //Window{..}

calcPrice();

function calcPrice() {
	console.log(this);  //Windwo{...}   BECAUSE the function clacPrice attached to the global object windwo
}

var john = {
	name: 'John',
	yearOfBearth: 1990,
	calcAge: function() {
		console.log(this);  //Object {name:'John',...}
		console.log(2019 - this.yearOfBearth);

		/*function innerFunction() {
			console.log(this);  //Window {...}
		}
		innerFunction(); */
	}
}

john.calcAge();

var mike = {
	name: 'Mike',
	yearOfBearth: 1999
}

mike.calcAge = john.calcAge;
mike.calcAge(); //Object {name: 'Mike', ..} ...