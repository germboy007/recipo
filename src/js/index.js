import axios from 'axios';

async function getResult(query){
  const key = 'd3789abbeef3d248cdcc97cd023b7f1d'
  try{
    const res = await axios(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${key}&q=${query}`);
    console.log(res.data.recipes);
  } catch(error){
    alert(error);
  }
}
getResult('pizza');