import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {currencyMap} from './js/currencyCodes.js';
import Currency from './js/currencyService.js';

function convert(res, amount, destCurrency, srcCurrency) {
  const currencyNames = currencyMap.reduce(function(result, currency) {
    result[currency.Code] = currency.Name;
    return result;
  }, {});
  // response.then(function(res) {
    if (res.result === 'success') {
      const receivedRate = res.conversion_rates[destCurrency];
      if (receivedRate != undefined) {
        const result = res.conversion_rates[destCurrency] * amount;
        const output = `<span class="source">${parseInt(amount).toFixed(2)} ${currencyNames[srcCurrency]}</span> <span> = </span> <span class="destination"> ${result.toFixed(2)} ${currencyNames[destCurrency]}</span>`;
        $('#output').html(output);
      } else {
        $('#output').text('Error : Invalid currency');
      }
    } else {
      $('#output').text(`Error : ${res}`);
    }
  // });
}

// async function makeApiCall(srcCurrency) {
//   let apiResponse = await Currency.currencyExchange(srcCurrency);
//   return apiResponse;
// }

function clearResult() {
  $('#output').text('');
}

async function callAPI() {

  let srcCurrency = $('#sourceCurrency').val();
  let destCurrency = $('#destinationCurrency').val();
  let amount = $('#amount').val();
  if (srcCurrency && destCurrency && amount) {
    let response = await Currency.currencyExchange(srcCurrency);
    convert(response, amount, destCurrency, srcCurrency);
  } else {
    clearResult();
  }
}

function setCurrencySymbol() {
  let srcCurrency = $('#sourceCurrency').val();
  $("#currencyCode").text(srcCurrency);
}

$(document).ready(function() {
  currencyMap.forEach(function(currency) {
    $('#sourceCurrency').append(`<option value="${currency.Code}">${currency.Code} - ${currency.Name}</option>`);
    $('#destinationCurrency').append(`<option value="${currency.Code}">${currency.Code} - ${currency.Name}</option>`);
  });
  setCurrencySymbol();
  $('#sourceCurrency').change(function() {
    setCurrencySymbol();
    callAPI();
  });
  $('#destinationCurrency').change(function() {
    callAPI();
  });
  $('#amount').change(function() {
    callAPI();
  });
});
