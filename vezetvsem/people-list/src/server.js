import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';

var server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname)));

function getRandomPerson() {
    var names = ['John Adams', 'Kevin Malcolm', 'James Madison', 'Andrew Jackson'];
    return {
        name: names[Math.floor(Math.random() * names.length)],
        rating: Math.floor(Math.random() * 100),
        ideas: Math.floor(Math.random() * 20),
        following: Math.floor(Math.random() * 200),
        followers: Math.floor(Math.random() * 500),
        isFollowed: Math.floor(Math.random() * 2)
    };
}

server.get('/api/peoples/:count([0-9]+)', function (request, response) {
    var data = [];
    while (request.params.count--) {
        data.push(getRandomPerson());
    }
    response
        .type('json')
        .send(data);
});

var App = React.createFactory(require('./components/App'));
var templateFile = path.join(__dirname, 'templates/index.html');
var template = fs.readFileSync(templateFile, 'utf8');

server.get('*', function (req, res) {
    var app = new App();
    var body = React.renderToString(app);
    var html = template.replace('{{ body }}', body);
    res.send(html);
});

server.listen(server.get('port'), function () {
    if (process.send) {
        process.send('online');
    } else {
        console.log('The server is running at http://localhost:' + server.get('port'));
    }
});
