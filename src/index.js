import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';

function getElements(response, amount, destCurrency) {
  response.then(function (res) {
    if (res.result === 'success') {
      const receivedRate = res.conversion_rates[destCurrency];
      if (receivedRate != undefined) {
        const output = res.conversion_rates[destCurrency] * amount;
        $('#output').text(output);
      } else {

        $('#output').text('Error : Invalid currency');
      }
    } else {
      $('#output').text(`Error : ${res}`);
    }
  });
}

async function makeApiCall(srcCurrency) {
  let apiResponse = await Currency.currencyExchange(srcCurrency);
  return apiResponse;
}

$(document).ready(function () {
  $('#currBtn').click(function () {
    let srcCurrency = $('#sourceCurrency').val();
    let destCurrency = $('#destinationCurrency').val();
    let amount = $('#amount').val();
    let response = makeApiCall(srcCurrency);
    getElements(response, amount, destCurrency);
  });
});
