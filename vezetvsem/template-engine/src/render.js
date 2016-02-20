import Segment from './Segment';
import parse from './parse';

/**
 * Render parsed template (as array of segments) to resulting string.
 * Supports recursive calls to render nested blocks.
 *
 * @param {Segment[]} template Parsed template.
 * @param {object} data Template parameters
 * @returns {string}
 */
function renderTemplate(template, data) {
    var result = '';
    for (let segment of template) {
        switch (segment.type) {
            case Segment.type.TEXT:
                result += segment.value;
                break;
            case Segment.type.SUBSTITUTION:
                var value = data[segment.name];
                if (segment.filters) {
                    value = segment.filters.reduce((res, filter) => {
                        var filterArguments = Array.prototype.concat(res, filter.arguments);
                        return Segment.filters[filter.name].apply(null, filterArguments);
                    }, value);
                }
                if (value) {
                    result += value;
                }
                break;
            case Segment.type.BLOCK:
                if (data.hasOwnProperty(segment.name)) {
                    let block = data[segment.name];
                    if (block instanceof Array) {
                        for (let value of block) {
                            result += renderTemplate(segment.value, {'.': value});
                        }
                    } else {
                        result += renderTemplate(segment.value, {'.': block});
                    }
                }
        }
    }
    return result;
}

/**
 * Render string with given parameters.
 *
 * @param {string} string Template string.
 * @param {object} data Template parameters.
 * @returns {string}
 */
function render(string, data) {
    return renderTemplate(parse(string), data);
}

export default render;
