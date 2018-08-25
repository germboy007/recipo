import {Search} from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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