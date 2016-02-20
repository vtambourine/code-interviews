/* global describe, it, expect, loadFixtures */

'use strict';

(function () {
  describe('Paper element', function () {
    it('should toggle House rules on `Show more` button click', function () {
      loadFixtures('index.html');
      var houseRules = $('.js-paper-additional');
      expect(houseRules).toHaveClass('_hidden');
      $('.js-paper-more-button').click();
      expect(houseRules).not.toHaveClass('_hidden');
      $('.js-paper-more-button').click();
      expect(houseRules).toHaveClass('_hidden');
    });
  });
})();
