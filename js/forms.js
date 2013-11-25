define(['jquery'], function($) {
  return {
    onSubmit: function onSubmit(element, callback) { $(element).submit(callback); },

    serializeHash: function serializeHash(form) {
      var out = {};
      $(form).serializeArray().forEach(function (field) {
        var name = field.name;
        if (out.hasOwnProperty(name)) {
          out[name] = [].concat(out[name], field.value);
        } else {
          out[name] = field.value;
        }
      });
      return out;
    }
  };
});

