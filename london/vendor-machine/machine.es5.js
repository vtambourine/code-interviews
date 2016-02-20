'use strict';

var fs = require('fs');
var readline = require('readline');

var Machine = {
  coinsStore: {},

  coinValues: {
    '1p': 1,
    '2p': 2,
    '5p': 5,
    '10p': 10,
    '20p': 20,
    '50p': 50,
    '1P': 100,
    '2P': 200
  },

  coinsByValue: ['2P', '1P', '50p', '20p', '10p', '5p', '2p', '1p'],

  productsStore: {},

  productValues: {}
};

var initalProducts = fs.readFileSync(__dirname + '/products.txt', {
  encoding: 'utf8'
});

initalProducts.trim().split('\n').forEach(function (line) {
  var productData = line.split(' ');
  var name = productData[0];
  var value = parseInt(productData[1]);
  var amount = parseInt(productData[2]);
  Machine.productValues[name] = value;
  Machine.productsStore[name] = amount;
});

var initalCoins = fs.readFileSync(__dirname + '/coins.txt', {
  encoding: 'utf8'
});

initalCoins.trim().split('\n').forEach(function (line) {
  var coinData = line.split(' ');
  var name = coinData[0];
  var amount = parseInt(coinData[1]);
  Machine.coinsStore[name] = amount;
});

var credit = 0;
var creditCoins = [];

var client = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Hey! I am your vending machine. Tell me what you want.\n');

prompt();

client.on('line', function (line) {
  var input = line.trim().match(/^([a-z]+)(.*)/);
  if (input) {
    var cmd = input[1];
    var params = input[2].trim().split(' ');

    switch (cmd) {
      case 'list':
        console.log('We have:');
        for (var key in Machine.productsStore) {
          console.log('%s by %s - %s left', key, pounds(Machine.productValues[key]), Machine.productsStore[key]);
        }

        break;

      case 'coins':
        console.log(Machine.coinsStore);
        break;

      case 'get':
        processGet(params);
        break;

      case 'load':
        processLoad(params);
        break;

      case 'insert':
        processInsert(params);
        break;

      case 'change':
        processChange();
        break;

      case 'close':
        client.close();
        break;

      default:
        console.log('Wrong input, try again.');
    }
  } else {
    console.log('Wrong input, try again.');
  }

  prompt();
});

client.on('close', function () {
  console.log('Bye!');
  process.exit();
});

function processGet(request) {
  try {
    if (request.length > 1) {
      throw 'Please, one product at time.';
    }

    var product = request[0];

    if (!Machine.productsStore[product]) throw 'Not one piece left.';

    var value = Machine.productValues[product];

    if (credit < value) throw 'Not enought credit. Insert more coins.';

    credit -= value;
    creditCoins = [];
    Machine.productsStore[product]--;
    console.log('Get your %s. Thank you for your purchase!', product);
  } catch (error) {
    console.log(error);
  }
}

function processLoad(loads) {
  var newProducts = {};

  try {
    if (loads.length % 2) throw 'Wrong loads, try again.';

    for (var i = 0; i < loads.length; i += 2) {
      var load = loads[i].trim();
      var amount = parseInt(loads[i + 1], 10);
      if (!Machine.productValues[load]) throw 'Wrong product, try again.';
      if (!Number.isInteger(amount)) throw 'Wrong product amount, try again.';
      newProducts[load] = amount;
    }

    for (var key in newProducts) {
      Machine.productsStore[key] = (Machine.productsStore[key] || 0) + newProducts[key];
    }
  } catch (error) {
    console.log(error);
  }
}

function processInsert(coins) {
  try {
    if (coins.length > 1) {
      throw 'Please, one coin at time.';
    }

    var coin = coins[0];

    var value = Machine.coinValues[coin];
    if (!value) throw 'Unacceptable coin, try again.';
    credit += value;
    creditCoins.push(coin);
    Machine.coinsStore[coin]++;
  } catch (error) {
    console.log(error);
  }
}

function processChange() {
  var newChange = [];

  if (creditCoins.length) {
    creditCoins.forEach(function (coin) {
      var value = Machine.coinValues[coin];
      credit -= value;
      Machine.coinsStore[coin]--;
      newChange.push(coin);
    });
    creditCoins = [];
  }

  Machine.coinsByValue.forEach(function (coin) {
    var value = Machine.coinValues[coin];
    while (credit >= value) {
      if (!Machine.coinsStore[coin]) return;
      credit -= value;
      Machine.coinsStore[coin]--;
      newChange.push(coin);
    }
  });

  if (newChange.length) {
    console.log('Take your change: %s', newChange.join(' '));
  }
  if (credit) {
    console.log('Sorry, we do not have enought coins...');
  }
}

function prompt() {
  client.setPrompt('\n🍞  ' + pounds(credit) + ' ~> ');
  client.prompt();
}

function pounds(value) {
  return '£' + (value / 100).toLocaleString('uk', {
    minimumFractionDigits: 2
  });
}
