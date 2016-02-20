/**
 * Atomic template segment.
 *
 * @typedef {Object} Segment
 * @property {Segment.type} type Type of the segment. Correspond to the surrounding tag type.
 * @property {string} [name] Name of the segment. Substitution parameter of block name.
 * @property {string} [value] Value of the segment. Used in blocks.
 */

var Segment = {
    /**
     * @enum {string}
     */
    type: {
        TEXT: 'text',
        SUBSTITUTION: 'substitution',
        BLOCK: 'block',
        COMMENT: 'comment'
    },

    filters: {
        upper: string => string.toUpperCase(),
        lower: string => string.toLowerCase(),
        trim: string => string.trim(),
        escape: string => escapeHtml(string),
        default: (value, defaultValue) => value || defaultValue
    }
};

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

export default Segment;
