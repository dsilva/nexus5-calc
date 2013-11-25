define(['jquery'], function ($) {
  return {
    on: function on(element, events, selector, callback) {
      $(element).on(events, selector, callback);
    }
  };
});
