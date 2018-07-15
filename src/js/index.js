import {Search} from './models/Search';

// Global State of the App
const state = {};

const controlSearch = async() => {
  const query = 'pizza'; // ================================TODO===============================================(Generic)
  if(query){
    state.search = new Search(query);
    await state.search.getResult();
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

const testvar = new Search('pizza');
testvar.getResult();