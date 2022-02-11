export default class Currency{
  static currencyExchange(srcCurrency){
    console.log(process.env.API_KEY)
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${srcCurrency}`)
      .then(function(response){
        if(!response.ok){
          throw Error(response["error-type"]);
        }
        return response.json();
      })
      .catch(function(error){
        return error;
      });
  }
}