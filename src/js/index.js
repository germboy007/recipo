import {Search} from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global State of the App
const state = {};

const controlSearch = async() => {
  const query = searchView.getInput();
  if(query){
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    await state.search.getResult();
    clearLoader();
    searchView.renderResults(state.search.result);
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