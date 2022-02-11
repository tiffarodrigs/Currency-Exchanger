export default class Currency{
  static currencyExchange(){
  return fetch()
  .then(function(response){
    if(!response.ok){
      throw Error(response.statusText);
    }
    return response.json();
  })
  .catch(function(error){
    return error;
  })


  }
}