requirejs.config({
  appDir: '.',
  baseUrl: 'js',
  paths: {
    /* Load jquery from google cdn. On fail, load local file. */
    'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min', 'libs/jquery-min'],
    /* Load bootstrap from cdn. On fail, load local file. */
    'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min', 'libs/bootstrap-min']
  },
  shim: {
    /* Set bootstrap dependencies (just jQuery) */
    'bootstrap' : ['jquery']
  }
});

require(['bootstrap', 'data', 'template', 'render', 'delegate', 'ui', 'forms', 'processing'],
        function(B, Data, T, R, Delegate, UI, Forms, P) {
  var subst = T.subst,
      render = R.render,
      parent = document.getElementById('questions');

  Data.questions.forEach(function (q) {
    var div = document.createElement('div');
    div.innerHTML = render(q);
    parent.appendChild(div);
  });

  Delegate.on(document, 'click', '.n5-toggle-yes', function() {
    UI.show(document.getElementById(this.id.replace('yes-label', 'ifso')));
  });
  Delegate.on(document, 'click', '.n5-toggle-no', function() {
    UI.hide(document.getElementById(this.id.replace('no-label', 'ifso')));
  });

  var form = document.getElementById('form');
  function update() {
    var results = P.process(Forms.serializeHash(form));
    document.getElementById('result-tbody').innerHTML =
      results.map(function (row) { return subst('template-carrier-row', row); }).join('');
  }

  Delegate.on(form, 'change', null, update);

  // TODO: make this a 'link here' button and parse the URL query parameters
  Forms.onSubmit(form, function(event) {
    event.preventDefault();
  });

  update();
});

