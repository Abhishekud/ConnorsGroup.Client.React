import {Record} from 'immutable';

export default Record({
  id: null,
  name: '',
  paidTimeMinutes: 0,
  excludedPaidBreaksMinutes: 0,
  totalExcludedPaidTimeMinutes: 0,
  adjustedPaidTime: 0,
  reliefTimeMinutes: 0,
  includedPaidBreaksMinutes: 0,
  totalIncludedPaidTimePercent: 0,
  totalIncludedPaidTimeMinutes: 0,
  allowanceRestId: null,
  allowanceRestName: '',
  totalRestTimePercent: 0,
  totalRestTimeMinutes: 0,
  totalRestTimeAllowedPercent: 0,
  totalRestTimeAllowedMinutes: 0,
  minorUnavoidableDelayPercent: 0,
  minorUnavoidableDelayMinutes: 0,
  additionalDelayPercent: 0,
  additionalDelayMinutes: 0,
  totalDelayTimePercent: 0,
  totalDelayTimeMinutes: 0,
  allowancePercent: 0,
  allowanceFactor: 0,
  machineAllowancePercent: 0,
  usedInProduction: false,
  totalIncludedAndExcludedPaidBreaksMinutes: 0,
  restOffsetMinutes: 0,
  totalRestMinutes: 0,
});
