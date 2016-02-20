import 'babel/polyfill';
import Tag from './Tag';
import Segment from './Segment';

/**
 * Parse string and return array of supported template segments.
 *
 * @param {Segment[]} string
 */
function parse(string) {
    var tokens = tokensGenerator(string)();
    var token;

    // Transforms set of tags into data tree. Encloses nested block one in another.
    // Returns array of template segmets.
    var template = (function nestedBlock(level) {
        var result = [];
        while (token = tokens.next().value) {
            if (token.type === Tag.types.BLOCK && token.value === Tag.symbols.END_OF_BLOCK) {
                return result;
            }

            if (level === 0 && token.value === Tag.symbols.BLOCK_ITEM) {
                throw new Error('Unexpected block item token');
            }

            switch (token.type) {
                case Tag.types.SUBSTITUTION:
                    result.push({
                        type: Segment.type.SUBSTITUTION,
                        name: token.value,
                        filters: token.filters
                    });
                    break;
                case Tag.types.BLOCK:
                    result.push({
                        type: Segment.type.BLOCK,
                        name: token.value,
                        value: nestedBlock(level + 1)
                    });
                    break;
                case Tag.types.COMMENT:
                    break;
                case Tag.types.TEXT:
                    result.push({
                        type: Segment.type.TEXT,
                        value: token.value
                    });
                    break;
                default:
                    throw new Error('Unexpected token');
            }
        }

        if (level !== 0) {
            throw new Error('Unexpected end of block');
        }

        return result;
    })(0);

    return template;
}

/**
 * Returns a simple generator that is used by the parser to find tags in template string.
 *
 * @param {string} string
 * @returns {Generator}
 */
function tokensGenerator(string) {
    var pos = 0;

    function onOpenSubstitutionTag() {
        return string[pos] === Tag.symbols.OPEN_TAG
            && string[pos + 1] === Tag.symbols.OPEN_SUBSTITUTION;
    }

    function onCloseSubstitutionTag() {
        return string[pos - 2] === Tag.symbols.CLOSE_SUBSTITUTION
            && string[pos - 1] === Tag.symbols.CLOSE_TAG;
    }

    function onOpenBlockTag() {
        return string[pos] === Tag.symbols.OPEN_TAG
            && string[pos + 1] === Tag.symbols.OPEN_BLOCK;
    }

    function onCloseBlockTag() {
        return string[pos - 2] === Tag.symbols.CLOSE_BLOCK
            && string[pos - 1] === Tag.symbols.CLOSE_TAG;
    }

    function onOpenCommentTag() {
        return string[pos] === Tag.symbols.OPEN_TAG
            && string[pos + 1] === Tag.symbols.OPEN_COMMENT;
    }

    function onCloseCommentTag() {
        return string[pos - 2] === Tag.symbols.CLOSE_COMMENT
            && string[pos - 1] === Tag.symbols.CLOSE_TAG;
    }

    function onOpenTag() {
        return onOpenSubstitutionTag() || onOpenBlockTag() || onOpenCommentTag();
    }

    return function *() {
        while (pos < string.length) {
            var value = '';

            if (onOpenSubstitutionTag()) {
                do {
                    value += string[pos++];
                } while (!onCloseSubstitutionTag());
                yield new Tag.Substitution(value);

            } else if (onOpenBlockTag()) {
                do {
                    value += string[pos++];
                } while (!onCloseBlockTag());
                yield new Tag.Block(value);

            } else if (onOpenCommentTag()) {
                do {
                    value += string[pos++];
                } while (!onCloseCommentTag());
                yield new Tag.Comment(value);

            } else {
                do {
                    value += string[pos++];
                } while (!onOpenTag() && pos < string.length);
                yield new Tag.Text(value);
            }
        }
    };
}

export default parse;
