
/*********************************************
 * Variables and data types
 */

/*
console.log("Hello world!!!");	//Консольный вывод

var firstName = 'Kanda';
console.log(firstName);		//Kanda

var lastName = 'Smith';
var age = 30;

var fullAge = true;
console.log(fullAge);		//true

//We you camelCase style for declaring variables

var job;
console.log(job);		//undefined

job = 'Teacher';
console.log(job);		//Teacher


//var 3yaers = 'Something'		Unexpected token
//var &years = 'Something'		Unexpected token &
//Reserved words like 
//function, if, delete..
//we can't use it as variable name


 var _3years = 'some..';
 console.log(_3years);		//some.. 

*/




/*********************************************
 * Variable mutation and type coertion
 */
/*

 //Type coertion
 var firstName = 'John';
 var age = 28;
 var isMarried = false;

 console.log(firstName + ' ' + age + ' Is he married? ' + isMarried);

 //Variable mutation
 age = 'twenty eight';
 job = 'driver';

 alert(firstName + ' ' + age + ' Is he married? ' + isMarried);
 var lastName = prompt('What is his last Name?');
 console.log(lastName);
 */



 /**********************************************
  * Operator percedense
  */
/*
var now = 2019;
var yearKoma = 1999;
var fullAge = 18;

var isFullAge = now - yearKoma >= fullAge; // true
console.log(isFullAge);
//Every opertaors has his percedence and operator >= has a lower percedence than opertaor -
*/




/***********************************************
 * CODING CHALLENGE
 */
/*
 var massMark = 56;
 var heightMark = 1.72;

 var massJohn = 62;
 var heightJohn = 1.64;

 var BMIMark = massMark / (heightMark * heightMark);
 var BMIJohn = massJohn / (heightJohn * heightJohn);

 var johnHigherBMI = BMIJohn > BMIMark;
 console.log('Is John\'s BMI higher than Mark\'s? ' + johnHigherBMI);
 */



 /***************************************************
  * The Ternary Operator and Switch statements
  */
 /*
//Ternary operator
var firstName = 'John';
var age = 16;

age >= 18 ? console.log("It is OK") : console.log('He can\'t ');
var drink = age >= 18 ? 'bear' : 'juice';
console.log(drink);
 

//Switch statements
var job = 'teacher';
switch(job) {
  case 'teacher':
  case 'instructor':
      consele.log(firstName + ' teaches kids how to code');
      break;
  case 'driver':
      console.log(firstName + ' drive an uber in Lisbone.');
      break;
  case 'designer':
      console.log(firstName + 'designs beutiful websites');
      break;
  default:
      console.log(firstName + 'does something else');
}
*/

/**********************************************************
 * Truthy and Falsy values and equality operators
 */
//falsy values: undefined, null, 0, '', NaN
//truthy values: NOT falsy values
/*
var height;
height = '';
if(height) {
  console.log('Variable is defined');
} else {
  console.log('Variable has not been defined');
}

height = 65;

if(height == '65') {
  console.log('The == operator does type coercion!');
}

if(height === '65') {
  console.log('The operator === doesn\'t type coercion');
}      */



/***********************************************************
 * Functions
 */
/*
 function getAgeOfPerson(birthYear, firstName) {
    var age = 2019 - birthYear;
    return firstName + ' age is ' + age;
 }

 var John = getAgeOfPerson(1990,'John');
 console.log(John);

 //Function expression
 var whatDoYouDo = function(job, name) {
   return 'Something ...';
 }

 whatDoYouDo('teacher','John');     */


 /**********************************************************
  * Arrays
  */
 /*
//Initialize new array
  var names = ['John', 'Mark', 'Jane'];
  var years = new Array(1990, 1969, 1948);

  console.log(names[2]);
  console.log(names.length);

  //Mutate array datas
  names[1] = 'Nike';
  names[5] = 'Mike';
  console.log(names); // {"John", "Nike", "Jane", empty * 2 , "Mike"}

  //Different data types
  var john = ['John', 'Smith', 1990, 'teacher', false];

  john.push('blue');
  john.unshift('Mr.');
  console.log(john);

  john.pop();
  john.pop();
  john.shift();
  console.log(john);

  console.log(john.indexOf(23)); //-1

  var isDesigner = john.indexOf('designer') === -1 ?
  'John is NOT a designer' : 'John IS a designer';
  console.log(isDesigner);      */

/*********************************************************
 * CODE CHALLENGE 3
 */
/*
 function tipCalculator(bill) {
   var percentage;
   if(bill < 50) {
     percentage = .2;
   } else if(bill >= 50 && bill < 200) {
     percentage = .15;
   } else {
     percentage = .1;
   }
   return percentage * bill;
 }

 var bills = [124, 48, 268];
 var tips = [tipCalculator(bills[0]),
             tipCalculator(bills[1]),
             tipCalculator(bills[2])];
var finalVlaues = [bills[0] + tips[0],
                   bills[1] + tips[1],
                   bills[2] + tips[2]];

console.log(tips, finalVlaues);       */


/*********************************************************
 * Objects and properties
 */ 
/*
//Object literal
 var john = {
   firstName: 'John',
   lastName: 'Smith',
   birthYear: 1990,
   family: ['Jane', 'Mark','Bob'],
   job: 'teacher',
   isMarried: false
 };

 console.log(job.firstName);
 console.log(job['lastName']);

 var x = 'birthYear';
 console.log(job[x]);

 john.job = 'designer';
 jhon['isMarried'] = true;
 console.log(john);

 //new Object syntax
 var jane = new Object(); //Empty object

jane.firstName = 'Jane';
jane.lastName = 'Smith';
jane['birthYear'] = 1969;
console.log(jane);             */

/****************************************************
 * Object and methods
 */
/*
var john = {
  firstName: 'John',
  lastName: 'Smith',
  birthYear: 1990,
  family: ['Jane', 'Mark','Bob'],
  job: 'teacher',
  isMarried: false,
  calcAge: function() {
    this.age = 2019 - this.birthYear;
  }
};

john.calcAge();
console.log(john);


function createObject(firstName, mass, height) {
    var obj = {
      firstName: firstName,
      mass: mass,
      height: height,
      setBMI: function() {
        this.BMI = this.mass / (this.height * this.height);
      }
    };
    obj.setBMI();
    return obj;
}

var John = createObject('John', 65, 1.71);
var Mark = createObject('Mark', 71, 1.53);
var isHigherMark = Mark.BMI > John.BMI ? true : false ;
console.log(John, Mark);
console.log(isHigherMark);        */


/****************************************************************
 * Loops and iterations
 */
/*
var john = ['John', 'Smith', 1990, 'teacher', false];

//For loop
for(var i = 0; i < john.length; i++) {
  console.log(john[i]);
}

//While loop
var i = 0;
while (i < john.length) {
  console.log(john[i]);
  i++;
}


//continue and break
for(var i = 0; i < john.length; i++) {
  if(typeof john[i] !== 'string') continue;
  console.log(john[i]);
}

for(var i = 0; i < john.length; i++) {
  if(typeof john[i] !== 'string') break;
  console.log(john[i]);
}
***************************/
/************************************************************
 * CODE CHELLANGE 4
 */
/*
function createObject(fullName, bills) {
    var obj = {
      fullName: fullName,
      bills: bills,
      clacTips: function() {
        this.tips = [];
        this.finalValues = [];
        for(var i = 0; i < this.bills.length; i++) {
          var percentage;
          var bill = this.bills[i];
          switch(true) {
            case bill < 50:
              percentage = .2;
              break;
            case bill >= 50 && bill < 200:
              percentage = .15;
              break;
            default:
              percentage = .1;
          }
          this.tips[i] = bill * percentage;
          this.finalValues[i] = this.tips[i] + bill;
        }
      }
    }
    obj.clacTips();
    return obj;
}

function calcAverage(tips) {
  var sum = 0;
  for(var i = 0; i < tips.length; i++) {
    sum += tips[i];
  }
  return sum/tips.length;
}

var john = createObject('John Smith', [124,48,268,180,42]);
john.average = calcAverage(john.tips);
console.log(john);            *///

function P() {}
P.prototype.name = 'P';
function C(){}
C.prototype = new P();
C.prototype.name = 'C';

function G(){}
G.prototype = new C();
G.prototype.name = 'G';

var gc= new G();
var newgs = new gc.constructor();
alert(newgs.name);

alert(Object.create(null));