import {Search} from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

// Global State of the App
const state = {};

const controlSearch = async() => {
  const query = searchView.getInput();
  if(query){
    state.search = new Search(query);
    await state.search.getResult();
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

const testvar = new Search('pizza');
testvar.getResult();