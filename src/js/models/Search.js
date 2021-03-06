import axios from 'axios';
import {key, proxy} from '../config';

class Search {
  constructor(query){
    this.query = query;
  }

  async getResult(query){
    try{
      const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
    } catch(error){
      alert(error);
    }
  }
}

export {Search};