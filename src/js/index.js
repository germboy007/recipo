import {Search} from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

// Global State of the App
const state = {};

const controlSearch = async() => {
  const query = searchView.getInput();
  console.log(query);
  if(query){
    state.search = new Search(query);
    await state.search.getResult();
    console.log(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

const testvar = new Search('pizza');
testvar.getResult();