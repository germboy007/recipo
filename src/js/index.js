import {Search} from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global State of the App
const state = {};

// SEARCH CONTROLLER
const controlSearch = async() => {
  const query = searchView.getInput();
  if(query){
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    try{
      await state.search.getResult();
    clearLoader();
    searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something went wrong with the search!');
      clearLoader();
    }
  }
}

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline')
    if(btn){
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
    }
});

//RECIPE CONTROLLER

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');

  if(id){
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    if (state.search) searchView.highlightSelected(id);
    state.recipe = new Recipe(id);
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// LIST CONTROLLER
const controlList = () => {
  if (!state.list) state.list = new List();
  state.recipe.ingredients.forEach(el => {
   const item = state.list.additem(el.count, el.unit, el.ingredients);
   listView.renderItem(item);
  });
}


elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  }else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  }else if (e.target.matches('.recipe__btn--add, recipe__btn--add *')) {
    controlList();
  }
});

window.l = new List();