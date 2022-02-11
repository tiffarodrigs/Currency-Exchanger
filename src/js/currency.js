export default class Currency{
  static async currencyExchange(srcCurrency){
     try{
      let response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${srcCurrency}`);
      //console.log(response) 
      //const data = await response.json()
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}



    
//     console.log(process.env.API_KEY)
//     return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${srcCurrency}`)
//     .then(function(response) {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       return response.json();
//     })
//     .catch(function(error) {
//       return error;
//     })
// }
// }