Vending Machine Exercise
========================

# Usage

To run this example simply run `machine.js` script via Node.js:

```
node machine.js
```

Alternatively, if you are using Node.js version 4 or less you can run transpiled script `machine.es5.js`.

# Usage

Interact with Vending Machine by entering commands into console.

### list

Show available products:

```
🍞 £0.00 ~> list
We have:
red by £1.89 - 30 left
green by £0.43 - 2 left
blue by £0.07 - 1 left
```

### insert

Insert coins into the Machine one by one. Use `P` for pounds and `p` for pences.

```
🍞 £0.00 ~> insert 1P
🍞 £1.00 ~> insert 1p
🍞 £1.01 ~> insert 50p
```

Available coins: `2P`, `1P`, `50p`, `20p`, `10p`, `5p`, `2p`, `1p`.

### get

Purchase the product.

```
🍞 £2.05 ~> get red
Get your red. Thank you for your purchase!
```

### change

Collect unused coins from the Machine.

```
🍞 £0.16 ~> change
Take your change: 10p 5p 1p
```

### load

Refill Machine with new products. Provide the name of the product followed by amount of products to load.

```
🍞 £0.93 ~> load blue 1
🍞 £0.93 ~> load red 4 green 5
```

### coins

Shows the remaining coins in the Machine.
