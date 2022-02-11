import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

function getElements(response, amount, destCurrency) {
  response.then(function(res) {
    if (res.result==="success") {
      let output = res.conversion_rates[destCurrency] * amount;
      $('#outputAmount').text(output)
    } else {
      console.log(res)
      $('.showErrors').text(`There was an error: ${res}`);
    }
  })
  
}

async function makeApiCall(srcCurrency) {
  let apires= await Currency.currencyExchange(srcCurrency);
  return apires;
}

$(document).ready(function() {
  $("#currBtn").click(function() {
    let srcCurrency = $("#sourceCurrency").val();
    let destCurrency = $("#destinationCurrency").val();
    let amount = $("#amount").val();
    let response=makeApiCall(srcCurrency);
    getElements(response, amount, destCurrency);
    });
  });


