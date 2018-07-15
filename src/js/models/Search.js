import axios from 'axios';

class Search {
  constructor(query){
    this.query = query;
  }

  async getResult(query){
    const key = 'd3789abbeef3d248cdcc97cd023b7f1d'
    try{
      const res = await axios(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
      console.log(this.result);
    } catch(error){
      alert(error);
    }
  }
}

export {Search};