import render from '../src/render';
var should = require('chai').should();

var string;
var data;

describe('Mustache', () => {
    beforeEach(() => {
        string = '';
        data = {};
    });

    it('should return empty string unchanged', () => {
        render(string, data).should.equal('');
    });

    it('should return plain string unchanged', () => {
        string = 'Supercalifragilisticexpialidocious';
        render(string, data).should.equal('Supercalifragilisticexpialidocious');
    });

    describe('Substitution tag', () => {
        it('should render substitution tag', () => {
            string = 'Mary {{ attribute }} Poppins';
            data = {attribute: 'Lovely'};
            render(string, data).should.equal('Mary Lovely Poppins');
        });

        it('should not render substitution tag if no data provided', () => {
            string = 'Mary {{ attribute }} Poppins';
            data = {title: 'Lady'};
            render(string, data).should.equal('Mary  Poppins');
        });

        it('should throw an error if tag name is invalid', () => {
            string = 'Richard {{ 3rd }}';
            data = {'3rd': 'III'};
            (() => {
                render(string, data)
            }).should.throw('Invalid substitution tag');

            string = 'Pale Blue {{ . }}';
            data = {'.': 'Dot'};
            (() => {
                render(string, data)
            }).should.throw('Unexpected block item token');
        });
    });

    describe('Comment tag', () => {
        it('should strip all comments', () => {
            string = 'Legen{#wait for it#}dary';
            data = {};
            render(string, data).should.equal('Legendary');
        });
    });

    describe('Block tag', () => {
        it('should render block with non-list value', () => {
            string = 'Nearest star:{% star %} - {{ . }};{% / %}';
            data = {star: 'Sun'};
            render(string, data).should.equal('Nearest star: - Sun;');
        });

        it('should render block with list value', () => {
            string = 'Gas Giants:{% gas_giants %} - {{ . }};{% / %}';
            data = {gas_giants: ['Jupiter', 'Saturn', 'Uranus', 'Neptune']};
            render(string, data).should.equal('Gas Giants: - Jupiter; - Saturn; - Uranus; - Neptune;');
        });

        it('should not render block tag if no data provided', () => {
            string = 'Gas Dwarfs:{% gas_dwarfs %} - {{ . }};{% / %}';
            data = {};
            render(string, data).should.equal('Gas Dwarfs:');

            string = 'Ice Dwarfs:{% ice_dwarfs %} - {{ . }};{% / %}';
            data = {ice_dwarfs: []};
            render(string, data).should.equal('Ice Dwarfs:');
        });

        it('should throw an error of block is not closed', () => {
            string = 'Math is {% definition %}{{ . }}';
            data = {definition: 'magical'};
            (() => {
                render(string, data)
            }).should.throw('Unexpected end of block');
        });
    });

    describe('Nested block tag', () => {
        it('should render nested blocks', () => {
            string = '{% chorus %}{% . %}{{ . }} {% / %}{% / %}';
            data = {chorus: [['Um', 'diddle'], ['diddle', 'diddle'], ['um', 'diddle', 'ay']]};
            render(string, data).should.equal('Um diddle diddle diddle um diddle ay ');
        });
    });

    describe('Filters', () => {
        it('should apply upper filter', () => {
            string = 'It is {{ how:upper }}';
            data = {how: 'high'};
            render(string, data).should.equal('It is HIGH');
        });

        it('should apply lower filter', () => {
            string = 'It is {{ how:lower }}';
            data = {how: 'LOW'};
            render(string, data).should.equal('It is low');
        });

        it('should apply trim filter', () => {
            string = 'It is {{ how:trim }}';
            data = {how: ' w i d e '};
            render(string, data).should.equal('It is w i d e');
        });

        it('should apply escape filter', () => {
            string = 'It is {{ how:escape }}';
            data = {how: '<b>bold</b>'};
            render(string, data).should.equal('It is &lt;b&gt;bold&lt;&#x2F;b&gt;');
        });

        it('should apply multiple filters in order', () => {
            string = 'It is {{ how:trim:upper:escape }}';
            data = {how: '   <h1>awesome</h1>  '};
            render(string, data).should.equal('It is &lt;H1&gt;AWESOME&lt;&#x2F;H1&gt;');
        });

        it('should apply default filter', () => {
            string = 'It is {{ how:default(trap) }}';
            data = {how: 'ambush'};
            render(string, data).should.equal('It is ambush');

            string = 'It is {{ how:default(trap) }}';
            data = {};
            render(string, data).should.equal('It is trap');
        });

        it('should apply filters in nested blocks', () => {
            string = '{% verses %}All that you {{ .:upper }}{% / %}';
            data = {verses: ['touch']};
            render(string, data).should.equal('All that you TOUCH');
        });
    });

    describe('Control tests', () => {
        it('control test 1', () => {
            string =
                '<h1>Category: {{category}}</h1>\n' +
                '<ol>\n' +
                    '{# items must be non­empty for valid markup #}' +
                    '{% items %}' +
                    ' <li>{{ . }}</li>\n' +
                    '{% / %}' +
                '</ol>\n';
            data = {
                category: "Fruits",
                items: ["Mango", "Banana", "Orange" ]
            };
            render(string, data).should.equal(
                '<h1>Category: Fruits</h1>\n' +
                '<ol>\n' +
                    ' <li>Mango</li>\n' +
                    ' <li>Banana</li>\n' +
                    ' <li>Orange</li>\n' +
                '</ol>\n'
            );
        });

        it('control test 2', () => {
            string =
                '<table>\n' +
                    '{% table %}' +
                    ' <tr>\n' +
                    ' {% . %}' +
                        '<td>{{ . }}</td>' +
                    '{% / %}\n' +
                    ' </tr>\n' +
                    '{% / %}'+
                '</table>\n';
            data = {table : [[1,2,3], [4,5,6]]};
            render(string, data).should.equal(
                '<table>\n' +
                    ' <tr>\n ' +
                        '<td>1</td><td>2</td><td>3</td>\n' +
                    ' </tr>\n' +
                    ' <tr>\n ' +
                        '<td>4</td><td>5</td><td>6</td>\n' +
                    ' </tr>\n' +
                '</table>\n');
        });
    });
});
