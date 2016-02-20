/**
 * Representation of template tag or text node.
 */
class Tag {
    /**
     * @param {Tag.types} type
     * @param {string} value
     * @param {string[]} filters
     */
    constructor (type, value, filters) {
        this.type = type;
        this.value = value;
        this.filters = filters;
    }
}

/**
 * Substitutionsl tag.
 *
 * @param {string} string
 * @constructor
 */
Tag.Substitution = (string) => {
    var value = parseSubstitutionTag(string) || parseBlockItemTag(string);
    if (value) {
        var parsedValue = parseFilters(value);
        return new Tag(Tag.types.SUBSTITUTION, parsedValue.name, parsedValue.filters);
    } else {
        throw new Error(`Invalid substitution tag: ${string}`);
    }
};

/**
 * Block tag.
 *
 * @param {string} string
 * @constructor
 */
Tag.Block = (string) => {
    var value = parseBlockTag(string);
    if (value) {
        return new Tag(Tag.types.BLOCK, value);
    } else {
        throw new Error(`Invalid block tag: ${string}`);
    }
};

/**
 * Comment tag.
 *
 * @param {string} string
 * @constructor
 */
Tag.Comment = (string) => {
    var value = parseCommentTag(string);
    if (value) {
        return new Tag(Tag.types.COMMENT, value);
    } else {
        throw new Error(`Invalid comment tag: ${string}`);
    }
};

/**
 * Text node.
 *
 * @param {string} string
 * @constructor
 */
Tag.Text = (string) => {
    return new Tag(Tag.types.TEXT, string);
};

/**
 * @enum
 */
Tag.types = {
    TEXT: 'text',
    SUBSTITUTION: 'substitution',
    BLOCK: 'block',
    COMMENT: 'comment'
};

/**
 * @enum
 */
Tag.symbols = {
    OPEN_TAG: '{',
    CLOSE_TAG: '}',
    OPEN_SUBSTITUTION: '{',
    CLOSE_SUBSTITUTION: '}',
    OPEN_BLOCK: '%',
    CLOSE_BLOCK: '%',
    OPEN_COMMENT: '#',
    CLOSE_COMMENT: '#',
    END_OF_BLOCK: '/',
    BLOCK_ITEM: '.'
};

function parseSubstitutionTag(string) {
    var match = string.match(/{{\s*([a-z_][\w:()]*)\s*}}/);
    if (match) {
        return match[1];
    }
}

function parseBlockItemTag(string) {
    var match = string.match(/{{\s*(\.[\w:()]*)\s*}}/);
    if (match) {
        return match[1];
    }
}

function parseBlockTag(string) {
    var match = string.match(/{%\s*(\/|[a-z_.]\w*)\s*%}/);
    if (match) {
        return match[1];
    }
}

function parseCommentTag(string) {
    var match = string.match(/{#\s*(.*)\s*#}/);
    if (match) {
        return match[1];
    }
}

function parseFilters(string) {
    var match = string.match(/([\w.]*):?((?:\w+(\(.*\))?:?)*)/);
    if (match) {
        var result = {
            name: match[1]
        };
        if (match[2]) {
            result.filters = match[2].split(':').map(parseFilter);
        }
        return result;
    }
}

function parseFilter(string) {
    var match = string.match(/([a-zA-Z_]\w*)(?:\((.*)\))?/);
    if (match) {
        var result = {
            name: match[1]
        };
        if (match[2]) {
            result.arguments = match[2].split(',');
        }
        return result;
    }
}

export default Tag;
