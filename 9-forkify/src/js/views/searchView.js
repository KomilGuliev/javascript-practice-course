import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearListResult = () => {
	elements.searchListResult.innerHTML = '';
	elements.searchResPages.innerHTML = '';
}

export const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if(title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if(acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0);
		return `${newTitle.join(' ')} ...`;
	}

	return title;
}

export const lightSelected = id => {
	const arrList = Array.from(document.querySelectorAll('.results__link'));
	arrList.forEach(el => {
		el.classList.remove('results__link--active');
	})

	document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

const renderRecipe = recipe => {
	const marup = `
		<li>
			<a class="results__link" href="#${recipe.recipe_id}">
				<figure class="results__fig">
					<img src="${recipe.image_url}" alt="Test">
				</figure>
				<div class="results__data">
					<h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
					<p class="results__author">${recipe.publisher}</p>
				</div>
			</a>
		</li>`;
	elements.searchListResult.insertAdjacentHTML('beforeend', marup);

};

const createButton = (page, type) => `
	<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page -1 : page + 1}">
		<span>Page ${type === 'prev' ? page -1 : page + 1}</span>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
		</svg>
	</button>
	`;

const renderPagination = (page, numberOfResults, resPerPage) => {
	const pages = Math.ceil(numberOfResults / resPerPage);
	let button;

	if(page === 1 && pages > 1) {
		//Only button next
		button = createButton(page, 'next');
	} else if(page < pages) {
		//Both of buttons
		button = `
			${createButton(page, 'prev')}
			${createButton(page, 'next')}
		`;
	} else if(page === pages && pages > 1) {
		//Only button prev
		button = createButton(page, 'prev');
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	// render recipes of current page
	const start = (page - 1) * resPerPage;
	const end  = page * resPerPage;

	recipes.slice(start, end).forEach(renderRecipe);

	//render pagination
	renderPagination(page, recipes.length, resPerPage);
};