// BUDGET CONTROLLER
var BudgetController = (function() {
	
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	Expense.prototype.calculatePercenteg = function(totalIncome) {
		if(totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	}

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	}

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		total: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	}

	var calculateTotatl = function(type) {
		var sum = 0;

		data.allItems[type].forEach(function(el) {
			sum += el.value;
		});

		data.total[type] = sum;
	}

	return {
		addItem: function(type, desc, val) {
			var newItem, ID;

			//Create new ID
			if(data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			//Creat a new item
			if(type === 'inc') {
				newItem = new Income(ID, desc, val);
			} else if(type === 'exp') {
				newItem = new Expense(ID, desc, val);
			}

			data.allItems[type].push(newItem);

			return newItem;
		},
		deleteItem: function(type, ID) {
			var ids, index;

			ids = data.allItems[type].map(function(curr) {
				return curr.id;
			});

			index = ids.indexOf(ID);

			if(index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},
		calculatePercentages: function() {

			data.allItems.exp.forEach(function(el) {
				el.calculatePercenteg(data.total.inc);
			});

		},
		getPercentage: function() {
			return data.allItems.exp.map(function(el) {
				return el.percentage;
			});
		},
		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.total.inc,
				totalExp: data.total.exp,
				percentage: data.percentage
			}
		},
		calculateBudget: function() {
			// 1. calculate totals
			calculateTotatl('exp');
			calculateTotatl('inc');

			// 2. claculate the budget
			data.budget = data.total['inc'] - data.total['exp'];

			// 3. calc the percentage
			if(data.total.inc > 0) {
				data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
			} else {
				data.percentage = -1;
			}

		},
		testing: function() {
			console.log(data);
		}
	}


})();


// UI CONTROLLER
var UIController = (function() {
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomContainer: '.income__list',
		expensesCotainer: '.expenses__list',
		budgetLabel: '.budget__value',
		totalIncLabel: '.budget__income--value',
		totalExpLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		itemPercLabel: '.item__percentage',
		monthLabel: '.budget__title--month'
	}

	var nodeList = function(fields, callback) {
		for(var i = 0; i < fields.length; i++) {
			callback(fields[i], i);
		}
	}

	var formatNumber = function(num, type) {
		var splitNum, dec, int;

		splitNum = num.toFixed(2).split('.');
		int = splitNum[0];
		dec = splitNum[1];

		
		if(int.length > 3) {
			int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
		}

		return (type === 'exp' ? '- ' : '+ ') + int + '.' + dec;
	}
	
	return {
		getinputs: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			}
		},
		updateBudget: function(obj) {
			var type = obj.budget > 0 ? 'inc' : 'exp';
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMstrings.totalIncLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.totalExpLabel).textContent = formatNumber(obj.totalExp, 'exp');
			
			if(obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		},
		deleteListItem: function(selectedID) {
			var el = document.getElementById(selectedID);
			el.parentNode.removeChild(el);
		},
		clearTheFields: function() {
			var fields, arrFields;
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

			arrFields = Array.prototype.slice.call(fields);

			arrFields.forEach(function(el, i, arr) {
				el.value = '';
			});

			arrFields[0].focus();
		},
		getDOMstrings: function() {
			return DOMstrings;
		},
		addListItem: function(obj, type) {
			var html, newHtml, element;
			if(type === 'inc') {
				element = DOMstrings.incomContainer;

				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if(type === 'exp'){
				element = DOMstrings.expensesCotainer;

				html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},
		displayPercItem: function(percents) {
			var fields = document.querySelectorAll(DOMstrings.itemPercLabel);

			nodeList(fields, function(current, index) {
				if(percents[index] > 0) {
					current.textContent = percents[index] + '%';
				} else {
					current.textContent = '---';
				}
			})
		},
		displayMonth: function() {
			var now, month, year;

			now = new Date();

			month = now.getMonth();
			year = now.getFullYear();

			monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];

			document.querySelector(DOMstrings.monthLabel).textContent = monthes[month] + ' ' + year;

		},
		typeChanged: function() {
			var fields = document.querySelectorAll(
				DOMstrings.inputType + ', ' +
				DOMstrings.inputDescription + ', ' + 
				DOMstrings.inputValue	
			);

			nodeList(fields, function(curr, i) {
				curr.classList.toggle('red-focus');
			});

			document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
		}
	}

})();



// GLOBAL APP CONTROLLER
var controller = (function(BudgetCtrl, UICtrl) {

	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', addItemController);

		document.addEventListener('keypress', function(event) {
			if(event.keyCode === 13 || event.which === 13) {
				addItemController();
			}
		});

		document.querySelector(DOM.container).addEventListener('click', deleteItemCtrl);

		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.typeChanged);
	}

	var updatePercenteges = function () {
		//Calculate percenteges
		BudgetCtrl.calculatePercentages();

		//Get percenteges
		var percentages = BudgetCtrl.getPercentage();

		//Show on the UI
		UICtrl.displayPercItem(percentages);
		
	}

	var updateBudget = function() {
		// 1. Calculate the budget
		BudgetCtrl.calculateBudget();

		// 2. Return the budget
		var budget = BudgetCtrl.getBudget();

		// 3. Display the bufget on the UI
		UICtrl.updateBudget(budget);
	}

	var deleteItemCtrl = function(event) {
		var el, splitID, ID, type;

		el = event.target.parentNode.parentNode.parentNode.parentNode.id;
		splitID = el.split('-');

		type = splitID[0];
		ID = parseInt(splitID[1]);

		//console.log(type, ID);
		BudgetCtrl.deleteItem(type, ID);

		//Delete item from the UI
		UICtrl.deleteListItem(el);

		//Re-calc budget
		updateBudget();

		// Update percenteges
		updatePercenteges();
	}

	var addItemController = function() {

		var inputVals, newItem;

		// 1. Get the field input data
		inputVals = UICtrl.getinputs();

		if(inputVals.description !== '' && !isNaN(inputVals.value) && inputVals.value > 0) {
			// 2. Add the item to the budget controller
			newItem = BudgetCtrl.addItem(inputVals.type, inputVals.description, inputVals.value);

			// 3. Add the item to the UI
			UICtrl.addListItem(newItem, inputVals.type);

			// 4. Clear the fields
			UICtrl.clearTheFields();

			//calculate and update budget
			updateBudget();

			// Update percenteges
			updatePercenteges();

		}

	}

	return {
		init: function() {
			console.log('Application started!');
			UICtrl.displayMonth();
			UICtrl.updateBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			})
			setupEventListeners();
		}
	}

})(BudgetController, UIController);

controller.init();