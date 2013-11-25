define([], function() {
  function bool(id, txt, initial, ifso) {
    return { id: id, text: txt, type: 'bool', initial: initial, ifso: ifso };
  }

  function multi(id, txt, choices) {
    return { id: id, text: txt, type: 'multi', choices: choices };
  }

  var questions = [
    bool('have_n5', 'Do you already have a Nexus 5?', 'no'),
    bool('have_contract', 'Do you already have a cellular contract?', 'no', [
       multi('which_carrier', 'With which carrier?',
             ['Docomo', 'KDDI', 'Softbank', 'bmobile', 'emobile', 'Other'])
    ]),
    { type: 'num', id: 'softbank_mins', text: 'How many Softbank/emobile off-peak (1am-9pm) voice minutes do you use monthly?',
      initial: 100, suffix: 'minutes' },
    { type: 'num', id: 'other_mins', text: 'How many other voice minutes do you use monthly?',
      initial: 0, suffix: 'minutes' }
  ];

  var options = [
    {carrier: 'Softbank', monthlyData: { yen: 5460, limitGB: 7, throttleKbps: 128,
       url: 'http://www.softbank.jp/mobile/iphone/program/iphone-5s/' },
     ispFee: {yen: 310, url: 'http://www.softbank.jp/mobile/iphone/program/iphone-5s/'},
     requiredHandsetPurchase: { model: 'iPhone 5', initial: 0, monthly: 2835, months: 24,
       url: 'http://www.softbank.jp/mobile/iphone/program/iphone-5s/' },
     monthlyInNetworkVoice: { yen: 980, hours: 'off-peak', network: 'softbank',
       url: 'http://www.softbank.jp/mobile/iphone/program/iphone-5s/' },
     newContractMonthlyDiscount: {yen: 2835, months: 24,
       urls: ['http://www.softbank.jp/mobile/iphone/program/iphone-5s/'] },
     voicePerMinute: {yen: 42, url: 'http://www.softbank.jp/mobile/iphone/program/iphone-5s/'},
     familyNewContractDiscount: { yenForExistingMember: 1050, yenForNewMember: 0, months: 12,
       url: 'http://online-shop.mb.softbank.jp/ols/html/campaign/kazokuwari/index.html' },
     familyMNPDiscount: { yenForExistingMember: 980, yenForNewMember: 0, months: 12,
       url: 'http://online-shop.mb.softbank.jp/ols/html/campaign/sp_family_get_family_discount/index.html' }
     },
    {carrier: 'emobile', monthlyData: { yen: 3880, limitGB: 5, throttleKbps: 128,
       url: 'http://emobile.jp/sp/nexus5/?sc_pid=top_mainfl_1_67_main_yazawa#price' },
     ispFee: { yen: 310, url: 'http://emobile.jp/sp/nexus5/?sc_pid=top_mainfl_1_67_main_yazawa#price' },
     requiredHandsetPurchase: { model: 'Nexus 5', initial: 39800, monthly: 0, months: 0,
       url: 'http://emobile.jp/sp/nexus5/?sc_pid=top_mainfl_1_67_main_yazawa#price' },
     monthlyInNetworkVoice: { yen: 0, hours: 'off-peak', network: 'softbank',
       url: 'http://emobile.jp/sp/nexus5/?sc_pid=top_mainfl_1_67_main_yazawa#price' },
     voicePerMinute: { yen: 42, url: 'http://emobile.jp/sp/nexus5/?sc_pid=top_mainfl_1_67_main_yazawa#price' },
     newContractMonthlyDiscount: {yen: 1680, months: 24,
       urls: ['http://emobile.jp/sp/nexus5/?sc_pid=top_mainfl_1_67_main_yazawa#price',
              'http://s.emobile.jp/price_plan/getsugakuwaribiki-s/'] } },
    {carrier: 'bmobile', monthlyData: { yen: 1560, limitGB: 3, throttleKbps: 200,
       url: 'http://www.bmobile.ne.jp/special/sumaho_keitai.html' },
     ispFee: { yen: 1560, url: 'http://www.bmobile.ne.jp/special/sumaho_keitai.html' },
     voicePerMinute: { yen: 40, url: 'http://www.bmobile.ne.jp/special/sumaho_keitai.html' } }
  ];

  return { questions: questions, options: options };
});
