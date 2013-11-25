define([], function() {
  function substText(text, env) {
    return Object.keys(env).reduce(function (acc, key) {
      return acc.replace(new RegExp('{' + key + '}', 'g'), env[key]);
    }, text);
  }

  function substTemplate(templateID, env) {
    return substText(document.getElementById(templateID).textContent, env);
  }
  return { subst: substTemplate };
});

