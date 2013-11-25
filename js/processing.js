define(['data'], function(D) {
  var options = D.options;

  var notApplicable = 'N/A';
  var nexus5CostFromGooglePlay = 39800;

  function formatYen(yen) { return '<nobr>' + yen + '円</nobr>'; }

  function link(url, text) { return '<a href="'+url+'">'+text+'</a>'; }

  function bool(str) { return str === 'yes'; }

  function maybe(cond, value) { return cond ? value : notApplicable;  }

  function formatMaybe(val) { return val || notApplicable; }

  function process(answers) {
    return options.map(function (opt) {
      var newContractDiscountAvailable =
        opt.newContractMonthlyDiscount && opt.newContractMonthlyDiscount.yen;

      var eligibleForNewContractDiscount =
        !bool(answers.have_contract) || answers.which_carrier !== opt.carrier;
      var newContractDiscount =
        (newContractDiscountAvailable && eligibleForNewContractDiscount) ?
          opt.newContractMonthlyDiscount.yen
        : 0;

      var monthlyInNetworkVoice = opt.monthlyInNetworkVoice;
      var monthlyInNetworkVoiceYen = monthlyInNetworkVoice ?
        opt.monthlyInNetworkVoice.yen
      : 0;

      var carrierSellsNexus5 = opt.requiredHandsetPurchase
        && opt.requiredHandsetPurchase.model === 'Nexus 5';

      var requiredHandsetPurchase = (eligibleForNewContractDiscount || carrierSellsNexus5)
        && opt.requiredHandsetPurchase;

      var handsetMonthly = requiredHandsetPurchase ?
        opt.requiredHandsetPurchase.monthly
      : 0;

      var voiceUsageCost =
        (parseInt(answers.softbank_mins, 10) || 0) * (
          monthlyInNetworkVoice && opt.monthlyInNetworkVoice.network === 'softbank' ?
            0
          : opt.voicePerMinute.yen)
        + (parseInt(answers.other_mins, 10) || 0) * opt.voicePerMinute.yen;

      var byoHandsetCost = carrierSellsNexus5 || bool(answers.have_n5) ?
        0
      : nexus5CostFromGooglePlay;

      var monthly = opt.ispFee.yen + monthlyInNetworkVoiceYen + opt.monthlyData.yen
        + handsetMonthly - newContractDiscount + voiceUsageCost;

      return {
        name: opt.carrier,
        monthly_isp_fee: formatYen(opt.ispFee.yen),

        monthly_in_network_offpeak_voice_fee:
          formatMaybe(monthlyInNetworkVoice
            && link(opt.monthlyInNetworkVoice.url, formatYen(opt.monthlyInNetworkVoice.yen))),
        voice_per_minute: formatYen(opt.voicePerMinute.yen),
        voice_usage_cost: formatYen(voiceUsageCost),

        monthly_data_fee: formatYen(opt.monthlyData.yen),
        monthly_data_limit: opt.monthlyData.limitGB + 'GB',
        monthly_data_throttle: opt.monthlyData.throttleKbps + 'Kbps',

        handset: formatMaybe(requiredHandsetPurchase && opt.requiredHandsetPurchase.model),
        initial_handset_cost: formatMaybe(requiredHandsetPurchase && formatYen(opt.requiredHandsetPurchase.initial)),
        monthly_handset_cost: formatMaybe(requiredHandsetPurchase && formatYen(handsetMonthly)),
        handset_months: formatMaybe(requiredHandsetPurchase && opt.requiredHandsetPurchase.months),

        byo_handset_cost: maybe(byoHandsetCost, formatYen(byoHandsetCost)),
 
        new_contract_discount: maybe(newContractDiscountAvailable, formatYen(newContractDiscount)),
        new_contract_discount_class:
          newContractDiscountAvailable && eligibleForNewContractDiscount ? 'text-success'
        : newContractDiscountAvailable ? 'text-warning'
        : '',
        new_contract_discount_months: formatMaybe(newContractDiscountAvailable && opt.newContractMonthlyDiscount.months),

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
