define(['data'], function(D) {
  var options = D.options;
  
  function formatYen(yen) { return '<nobr>' + yen + '円</nobr>'; }

  function link(url, text) { return '<a href="'+url+'">'+text+'</a>'; }

  var notApplicable = 'N/A';
  var nexus5CostFromGooglePlay = 39800;

  function process(answers) {
    return options.map(function (opt) {
      var newContractDiscountAvailable =
        opt.newContractMonthlyDiscount && opt.newContractMonthlyDiscount.yen;

      var eligibleForNewContractDiscount =
        !answers.have_contract || answers.which_carrier !== opt.carrier;

      var newContractDiscount =
        (newContractDiscountAvailable && eligibleForNewContractDiscount) ? opt.newContractMonthlyDiscount.yen : 0;

      var monthlyInNetworkVoice = opt.monthlyInNetworkVoice;
      var monthlyInNetworkVoiceYen = monthlyInNetworkVoice ? opt.monthlyInNetworkVoice.yen : 0;
      var requiredHandsetPurchase = opt.requiredHandsetPurchase;
      var handsetMonthly = requiredHandsetPurchase ? opt.requiredHandsetPurchase.monthly : 0;

      var voiceUsageCost =
        (parseInt(answers.softbank_mins, 10) || 0) * (
          monthlyInNetworkVoice && opt.monthlyInNetworkVoice.network === 'softbank' ?
            0 :
            opt.voicePerMinute.yen)
        + (parseInt(answers.other_mins, 10) || 0) * opt.voicePerMinute.yen;

      var byoHandsetCost = opt.requiredHandsetPurchase && opt.requiredHandsetPurchase.model === 'Nexus 5' ?
        0 : nexus5CostFromGooglePlay;

      var monthly = opt.ispFee.yen + monthlyInNetworkVoiceYen + opt.monthlyData.yen
        + handsetMonthly - newContractDiscount + voiceUsageCost;

      return {
        name: opt.carrier,
        monthly_isp_fee: formatYen(opt.ispFee.yen),
        monthly_in_network_offpeak_voice_fee:
          monthlyInNetworkVoice ?
            link(opt.monthlyInNetworkVoice.url, formatYen(opt.monthlyInNetworkVoice.yen))
            : notApplicable,
        voice_per_minute: formatYen(opt.voicePerMinute.yen),
        voice_usage_cost: formatYen(voiceUsageCost),
        monthly_data_fee: formatYen(opt.monthlyData.yen),
        monthly_data_limit: opt.monthlyData.limitGB + 'GB',
        monthly_data_throttle: opt.monthlyData.throttleKbps + 'Kbps',
        handset: requiredHandsetPurchase ? opt.requiredHandsetPurchase.model : notApplicable,
        initial_handset_cost: requiredHandsetPurchase ? formatYen(opt.requiredHandsetPurchase.initial) : notApplicable,
        monthly_handset_cost: requiredHandsetPurchase ? formatYen(handsetMonthly) : notApplicable,
        handset_months: requiredHandsetPurchase ? opt.requiredHandsetPurchase.months : notApplicable,

        byo_handset_cost: byoHandsetCost ? formatYen(byoHandsetCost) : notApplicable,
 
        new_contract_discount: newContractDiscountAvailable ? formatYen(newContractDiscount) : notApplicable,
        new_contract_discount_class:
          newContractDiscountAvailable && eligibleForNewContractDiscount ? 'text-success'
          : newContractDiscountAvailable ? 'text-warning'
          : '',
        new_contract_discount_months: newContractDiscountAvailable ? opt.newContractMonthlyDiscount.months : notApplicable,
        total_monthly_cost: formatYen(monthly),
        total_2year_cost: formatYen(
          monthly * 24
          + (requiredHandsetPurchase ? opt.requiredHandsetPurchase.initial : 0)
          + byoHandsetCost)
      };
    });
  }

  return { process: process };
});
