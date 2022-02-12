import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { currencyMap } from './constants/currencyCodes';'../constants/currencyCode.js'
import Currency from './js/currency.js';

function getElements(response, amount, destCurrency,srcCurrency) {
  response.then(function (res) {
    if (res.result === 'success') {
      const receivedRate = res.conversion_rates[destCurrency];
      if (receivedRate != undefined) {
        const result = res.conversion_rates[destCurrency] * amount;
        const output = `<span class="source">${parseInt(amount).toFixed(2)} ${srcCurrency}</span> <span> = </span> <span class="destination"> ${result.toFixed(2)} ${destCurrency}</span>`;

        $('#output').html(output);
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

function clearResult() {
  $('#output').text('');
}

function callAPI() {
  let srcCurrency = $('#sourceCurrency').val();
  let destCurrency = $('#destinationCurrency').val();
  let amount = $('#amount').val();
  if (srcCurrency && destCurrency && amount != undefined) {
    let response = makeApiCall(srcCurrency);
    getElements(response, amount, destCurrency,srcCurrency);
  } else {
    clearResult();
  }
}

function setCurrencySymbol(){
  let srcCurrency = $('#sourceCurrency').val();
  $("#currencyCode").text(srcCurrency);
}

$(document).ready(function () {
  currencyMap.forEach(function(currency){
    $('#sourceCurrency').append(`<option value="${currency.Code}">${currency.Code} - ${currency.Name}</option>`)
    $('#destinationCurrency').append(`<option value="${currency.Code}">${currency.Code} - ${currency.Name}</option>`)
  })
  $('#sourceCurrency')
  setCurrencySymbol();
  $('#sourceCurrency').change(function () {
    setCurrencySymbol();
    callAPI();
  });
  $('#destinationCurrency').change(function () {
    callAPI();
  });
  $('#amount').change(function () {
    callAPI();
  });
});
