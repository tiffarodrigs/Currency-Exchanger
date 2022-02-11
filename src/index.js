import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from "./js/currency.js";

function getElements(response, amount, destCurrency) {
  if (response.conversion_rates) {
    let output = response.conversion_rates[destCurrency] * amount;
    console.log(output);

    // $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

async function makeApiCall(srcCurrency) {
  let apires= await Currency.currencyExchange(srcCurrency);
  return apires;
}

$(document).ready(function() {
  $("#currBtn").click(function() {
    let srcCurrency = $("#sourceCurrency").val();
    console.log("srcCurrency" +srcCurrency)
    let destCurrency = $("#destinationCurrency").val();
    console.log("destCurrency" +destCurrency)
    let amount = $("#amount").val();
    console.log("amount" +amount)
    let response=makeApiCall(srcCurrency);
    // Currency.currencyExchange(srcCurrency)
    // .then(function(response) {
      getElements(response, amount, destCurrency);

    });


  });


