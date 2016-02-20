# Sandbox Javascript Templates

Simple Mustache-like javascript templates.

## Installation

```
npm install https://github.com/vtambourine/sandbox-javascript-templates/archive/v0.0.3.tar.gz
```

## Usage
```javascript
var render = require('./');
 
var template = '{{ title:upper }}\n{% verses %}All that you {{ . }}\n{% / %}';
var result = render(template, {title: 'eclipse', verses: ['touch', 'see', 'taste']});
```

The `result` will be:
```
ECLIPSE
All that you touch
All that you see
All that you taste
```

For more examples see [tests](https://github.com/vtambourine/sandbox-javascript-templates/blob/master/test/templater.test.js).

## Build and test
```
git clone https://github.com/vtambourine/sandbox-javascript-templates.git
cd sandbox-javascript-templates
npm install
make tests
make
```
