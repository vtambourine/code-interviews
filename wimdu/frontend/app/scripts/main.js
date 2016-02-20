'use strict';

// Initialize show/hide button for each `paper` element on page.
(function () {
    var HIDDEN_CLASS = '_hidden';
    var papers = document.getElementsByClassName('paper');

    // For each `Show more` button bind click event to toggle
    // visibility of additonal content within one box.
    for (var i = 0; i < papers.length; i++) {
        var paper = papers[i];
        var additionalTextElement = paper.getElementsByClassName('js-paper-additional')[0];
        var moreButton = paper.getElementsByClassName('js-paper-more-button')[0];
        moreButton.addEventListener('click', function () {
            if (additionalTextElement.classList.contains(HIDDEN_CLASS)) {
                moreButton.innerText = 'Show less';
            } else {
                moreButton.innerText = 'Show more';
            }
            additionalTextElement.classList.toggle(HIDDEN_CLASS);
        });
    }
})();
