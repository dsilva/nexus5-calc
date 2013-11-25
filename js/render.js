define(['template'], function(T) {
  var subst = T.subst;

  function renderChoice(name, value, text) {
    return subst('template-choice', {name: name, value: value, text: text});
  }

  function renderIfSo(id, ifso, active) {
    return subst('template-ifso', {
      id: id, ifso: ifso.map(render).join(''),
      style: active ? '' : 'style="display:none"'
    });
  }

  var renderFor = {
    bool: function(q) {
      var initialYes = q.initial === 'yes';
      return subst('template-bool', {
        id: q.id, text: q.text,
        yes_active: initialYes ? 'active' : '',
        yes_checked: initialYes ? 'checked=""' : '',
        no_active: initialYes ? '' : 'active',
        no_checked: initialYes ? '' : 'checked=""',
        ifso: q.ifso && renderIfSo(q.id + '-ifso', q.ifso, initialYes) || ''
      });
    },

    multi: function(q) {
      return subst('template-multi', {
        text: q.text,
        choices: q.choices.map(function(c) { return renderChoice(q.id, c, c)}).join('')
      });
    },

    num: function(q) {
      return subst('template-num', {
        text: q.text, id: q.id, name: q.id,
        initial: q.initial,
        suffix: q.suffix
      });
    }
  };

  function render(q) {
    console.log('render',q);
    return renderFor[q.type](q);
  }

  return { render: render };
});
