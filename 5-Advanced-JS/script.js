///////////////////////////////////////////////////////
//Function constructor
/*
var john = {
  name: 'John',
  yearOfBirth: 1990,
  job: 'developer'
}
//constructor
var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person.prototype.calculateAge = function() {
  console.log(2019 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1993, 'designer');
var mark = new Person('Mark', 1991, 'developer');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
****************************/

//Object.create
/****
var personProto = {
  calculateAge: function() {
    console.log(2019 - this.yearOfBirth);
  }
}

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';
console.log(john);

var jane = Object.create(personProto,
  {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1993 },
    job: { value: 'designer' }
  });

console.log(jane);
****/


//Primirives vs objects
/****
//primitives
var a = 30;
var b = a;
a = 60;
console.log(a,b); // 60 30

//objects
var obj1 = {
  name: 'Komil',
  age: 19
};
var obj2 = obj1;
obj2.age = 20;

console.log(obj1.age, obj2.age); // 20 20

//functions
var age = 20;
var obj = {
  name: 'Komil',
  job: 'developer'
};

function change(a,b) {
  a = 30;
  b.job = 'designer';
}

change(age,obj);
console.log(age,obj.job); // 20  designer
****/



//////////////////////////////////////////////////////////
//Passing a functions as arguments
/****
var years = [1990, 1985, 1967, 2003, 1999, 2000];

function calcArray(arr, callBack) {
  var arResult = [];
  for(var i = 0; i < arr.length; i++) {
    arResult.push(callBack(arr[i]));
  }
  return arResult;
}

function getAges(age) {
  return 2019 - age;
}

function isFullAge(age) {
  return age >= 18;
}

function maxHeartRates(age) {
  if(age >= 18 && age <= 80) {
    return Math.round(209.6 - 0.69 * age);
  } else {
    return -1;
  }

}

var ages = calcArray(years, getAges);
var fullAges = calcArray(ages, isFullAge);
var rates = calcArray(ages, maxHeartRates);

console.log(ages);
console.log(fullAges);
console.log(rates);
****/

/////////////////////////////////////////////
//Functions returning functions
/****
function interviewQuestion(job) {
  if(job === 'designer') {
    return function(name) { //return anonymous function
      console.log(name + ', can you please explain what UX design is?');
    };
  } else if(job === 'teacher') {
    return function(name) {
      console.log('What subject do you teach ' + name + '?');
    };
  } else {
    return function(name) {
      console.log('Hello ' + name + '! What do you do?');
    };
  }
}

var designerQuestion = interviewQuestion('designer');
designerQuestion('Komil');
var teacherQuestion = interviewQuestion('techer');
teacherQuestion('John');
designerQuestion('Jane');
designerQuestion('Mary');

interviewQuestion('teacher')('Mark');
****/


/////////////////////////////////////////////////////////////////
//IIFE
/****
function game() {
  var x = Math.floor(Math.random() * 10);
  console.log(x);
}

//game();

(function() {
  var x = Math.floor(Math.random() * 10);
  console.log(x);
})();

(function(name) {
  console.log('Hello ' + name);
})('Komil');

(function start() {
  console.log('START');
})();

start(); ///ReferenceError
****/


//////////////////////////////////////////////////////////////////
//Closures/Замыкание
/*
function retirement(retirementAge) {
  var a = ' years left until retirement.'
  return function(yearOfBirth) {
    var age = 2018 - yearOfBirth;
    console.log(retirementAge - age + a);
  }
}

var retirementUS = retirement(66);
var retirementGerman = retirement(67);
var retirementIsland = retirement(65);

retirementUS(1990);
retirementGerman(1990);
retirementIsland(1990);

*/
//Without using closures
/*function interviewQuestion(job) {
  if(job === 'designer') {
    return function(name) { //return anonymous function
      console.log(name + ', can you please explain what UX design is?');
    };
  } else if(job === 'teacher') {
    return function(name) {
      console.log('What subject do you teach ' + name + '?');
    };
  } else {
    return function(name) {
      console.log('Hello ' + name + '! What do you do?');
    };
  }
}*/
/*
function interviewQuestion(job) {
  return function(name) {
    if(job === 'designer') {
      console.log(name + ', can you please explain what UX design is?');
    } else if(job === 'teacher') {
      console.log('What subject do you teach ' + name + '?');
    } else {
      console.log('Hello ' + name + '! What do you do?');
    }
  }
}

var designerQuestion = interviewQuestion('designer');
var teacherQuestion = interviewQuestion('teacher');

designerQuestion('Jane');
teacherQuestion('John');
****/

///////////////////////////////////////////////////////////
//Bind, call and apply
/****
var john = {
  name: 'John',
  age: 25,
  job: 'teacher',
  presentation: function(style, dateTime) {
    if(style === 'formal') {
      console.log('Good ' + dateTime + ' Ladies and gentelmenes. I\'m ' + this.name + ' and I\'m a ' + this.job);
    } else if(style === 'friendly') {
      console.log('Hey! What\'s up? I am ' + this.name + '. Have a nice ' + dateTime);
    }
  }
}

john.presentation('formal','morning');

var jane = {
  name: 'Jane',
  age: 23,
  job: 'designer'
};

john.presentation.call(jane,'friendly','morning');
john.presentation.apply(jane,['friendly','morning']);
var janePresentation = john.presentation.bind(jane,'friendly');
janePresentation('evening');


//For different country different fullage

var years = [1990, 1985, 1967, 2003, 1999, 2000];

function calcArray(arr, callBack) {
  var arResult = [];
  for(var i = 0; i < arr.length; i++) {
    arResult.push(callBack(arr[i]));
  }
  return arResult;
}

function getAges(age) {
  return 2019 - age;
}

function isFullAge(limit, age) {
  return age >= limit;
}

var ages = calcArray(years,getAges);
var fullJapan = calcArray(ages, isFullAge.bind(this,20));
console.log(ages);
console.log(fullJapan);
****/



/////////////////////////////////////////////////////////////////////////
//CHALLENGE CODING 7
/****
var arQuestions = ['Is JavaScript the best language for creating web-aplications?',
                   'Inside which HTML element do we put the JavaScript?',
                   'How declare variable with value on JavaScript?',
                   'Choose the answers: type of true ?',
                   'What\'s the result of code? \n var a = 30; \n console.log(a + \'26\')'
                  ]
var arAnswers = [
          ['Yes','No'], 
          ['<script>','<js>','<scripting>'],
          ['int a', '$a', 'var a'],
          ['Number', 'String', 'Boolean'],
          ['3026', '56', '326']
]

var arTrueAnses = [0,0,2,2,1];

function Question(question, answers,trueAnswer) {
  this.question = question;
  this.answers = answers;
  this.trueAnswer = trueAnswer;
  this.checkAnswer = function (ans) {
    return ans == this.trueAnswer;
  }
  this.showOnConsole = function() {
    console.log(this.question);
    for(var i = 0; i < this.answers.length; i++)
      console.log(i + '. ' + this.answers[i]);
  }
}

//Question.prototype = Controller;

var Controller = {
  arQuestions: [],
  continue: true,
  ans: 0,
  score: 0,
  init: function() {
    for(var i = 0; i < arQuestions.length; i++) 
      this.arQuestions[i] = new Question(arQuestions[i], arAnswers[i], arTrueAnses[i]);
    this.questionsLength = this.arQuestions.length;
  },
  run: function() {
    while(this.continue) {
      this.nextQuestion();
    }
  },
  getRandom: function() {
    return Math.floor(Math.random() * this.questionsLength);
  },
  nextQuestion: function() {
    var index = this.getRandom();
    this.arQuestions[index].showOnConsole();
    this.showInput();

    if(this.ans !== 'exit') {
      if(this.arQuestions[index].checkAnswer(this.ans)) {
        this.score += 1;
      }
      this.ans = 0;
    } else {
      this.continue = false;
    }
    console.log('Your current score: ' + this.score);
    console.log('========================');
  },
  showInput: function() {
    while(!this.ans) {
      this.ans = prompt('Enter your answer');
      console.log(this.ans);
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  Controller.init();
  Controller.run();
});

****/


//пишем код методом препода

(function() {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }
  
  Question.prototype.displayQuestion = function() {
    console.log(this.question);
  
    for(var i = 0; i < this.answers.length; i++) {
      console.log(i + ': ' + this.answers[i]);
    }
  }
  
  Question.prototype.checkAnswer = function(ans) {
    var score;
    if(this.correct === ans) {
      console.log('Correct answer!');
      score = getScore(true);
    } else {
      console.log('Wrong answer!');
      score = getScore(false);
    }
    this.displayScore(score);
  }

  Question.prototype.displayScore = function(score) {
    console.log('Your current score is: ' + score);
    console.log('===============================');
  }
  
  function score() {
    var sc = 0;
    return function(ans) {
      if(ans) {
        sc++;
      }
      return sc;
    }
  }

  var getScore = score();


  var q1 = new Question(
    'Is JavaScript the best programming language in the world',
    ['Yes', 'No'],
    0
  );
  
  var q2 = new Question(
    'What\'s the name this course\'s teacher?',
    ['John', 'Michael', 'Jonas'],
    2
  );
  
  var q3 = new Question(
    'What does best descirbe coding?',
    ['Boring', 'Hard', 'Fun', 'Tediuos'],
    2
  );
  
  var questions = [q1,q2,q3];
  nextQuestion();
  function nextQuestion() {
    var n = Math.floor(Math.random() * questions.length);
  
    questions[n].displayQuestion();
    
    var answer = (prompt('Please select the correct answer'));
    
    questions[n].checkAnswer(parseInt(answer));

    if(answer !== 'exit') {
      nextQuestion();
    }
  }

})();