import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

/**
 * Global state of app
 * --search object
 * --current recipe object
 * --shopping list object
 * --liked recipes
 */

 const state = {};

 //Controller Search
 const controllerSearch = async () => {
	// 1) Get query from input
	const query = searchView.getInput();
	console.log(query);

	if(query) {
		// 2) set state search object
		state.search = new Search(query);

		// 3) Prepare UI for the result
		searchView.clearInput();
		searchView.clearListResult();
		renderLoader(elements.searchRes);

		// 4) Search for the recipe
		await state.search.getResults();
		console.log(state.search);

		// 5) Update the UI
		clearLoader();
		searchView.renderResults(state.search.result);
	}
 }


 elements.searchForm.addEventListener('submit', e => {
	 e.preventDefault();
	 controllerSearch();
 })

 elements.searchResPages.addEventListener('click', e => {
	 const btn = e.target.closest('.btn-inline');

	 if(btn) {
		 const goToPage = parseInt(btn.dataset.goto, 10);

		 searchView.clearListResult();
		 searchView.renderResults(state.search.result, goToPage);
	 }
 })



 //Controller Recipe

 const controllerRecipe = async () => {
	const id = window.location.hash.replace('#', '');

	 if(id) {

		// 1) Prepare UI
		recipeView.clearRecipe();
		if(state.search) searchView.lightSelected(id);
		renderLoader(elements.recipe);

		// 2) set State recipe
		state.recipe = new Recipe(id);

		try {
			// 3) get recipe data
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// 4) calcTime and calcServing
			state.recipe.calcTime();
			state.recipe.calcServing();

			// 5)rendering in UI
			clearLoader();
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

		} catch(error) {
			console.log(error);
			alert('Something went wrong with getting recipe ...');
		}
	 }
 }


['hashchange', 'load'].forEach(event => window.addEventListener(event, controllerRecipe));


/**
 * LIST CONTROLLER
 */
 const controlList = () => {
	 if(!state.list) state.list = new List();

	 // Add each igredient to the List
	 state.recipe.ingredients.forEach(el => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	});


 }

 ;

 const controlLikes = () => {
	 if(!state.likes) state.likes = new Likes();
	const currentID = state.recipe.id;

	if(!state.likes.isLiked(currentID)) {
		// Add like to the state
		const newLike = state.likes.addLike(
			currentID,
			state.recipe.title,
			state.recipe.author,
			state.recipe.img
		);

		// Toggles the like button
		likeView.toggleLikeBtn(true);

		// Add like to th UI
		likeView.renderLike(newLike);
		//state.likes.likes.forEach(el => likeView.renderLike(el));

	} else {
		// Remove like from the state
		state.likes.deleteLike(currentID);

		// Toggle the like button
		likeView.toggleLikeBtn(false);

		//Remove like from UI list
		likeView.deleteLike(currentID);
		//state.likes.likes.forEach(el => likeView.renderLike(el));
	}

	likeView.toggleLikeMenu(state.likes.getNumLikes());
	 
 }


 // When load the page

window.addEventListener('load', () => {
	state.likes = new Likes();

	state.likes.readStorage();

	likeView.toggleLikeMenu(state.likes.getNumLikes());

	state.likes.likes.forEach(like => likeView.renderLike(like));
});


 // Handle delete and update list item
 elements.shoppingList.addEventListener('click', e => {
	const id = e.target.closest('.shopping__item').dataset.itemid;

	// handle the delete item
	if(e.target.matches('.shopping__delete, .shopping__delete *')) {
		// Delete from the state
		state.list.deleteItem(id);

		// Delte from Ui
		listView.deleteItem(id);
	} else if(e.target.matches('.shopping__count-value')) {
		const val = parseFloat(e.target.value);
		state.list.updateCount(id, val);
	}
 });



//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
	if(e.target.matches('.btn-decrease, .btn-decrease *')) {
		if(state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if(e.target.matches('.btn-increase, .btn-increase *')) {
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
		controlList();
	} else if(e.target.matches('.recipe__love, .recipe__love *')) {
		controlLikes();
	}
})