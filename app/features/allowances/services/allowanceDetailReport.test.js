import {generate} from './allowanceDetailReport';
import {List, Map} from 'immutable';
import {styles, footer, header} from '../../standards/services/methodReport';
const {describe, test, expect} = global;

const allowance = List(Map({
  additionalDelayMinutes: 11,
  additionalDelayPercent: 5,
  adjustedPaidTime: 220,
  allowanceFactor: 255.9870550161812,
  allowancePercent: 71.9090909090909,
  allowanceRestId: 4,
  allowanceRestName: 'BITS Rest',
  excludedPaidBreaksMinutes: 30,
  id: 1,
  includedPaidBreaksMinutes: 10,
  machineAllowancePercent: 5,
  minorUnavoidableDelayMinutes: 11,
  minorUnavoidableDelayPercent: 5,
  name: 'Bits Calculation test',
  paidTimeMinutes: 250,
  reliefTimeMinutes: 10,
  restOffsetMinutes: 20,
  totalDelayTimeMinutes: 22,
  totalDelayTimePercent: 10,
  totalExcludedPaidTimeMinutes: 30,
  totalIncludedAndExcludedPaidBreaksMinutes: 40,
  totalIncludedPaidTimeMinutes: 0,
  totalIncludedPaidTimePercent: 0,
  totalRestMinutes: 136.2,
  totalRestTimeAllowedMinutes: 136.2,
  totalRestTimeAllowedPercent: 61.9090909090909,
  totalRestTimeMinutes: 156.2,
  totalRestTimePercent: 71,
  usedInProduction: true,
}));

const propsTemplate = {
  allowance,
  clientName: 'GAP Inc',
  allowanceTimes: List(),
};

const timestamp = '05/05/2022 04:57:31 PM';

describe('Allowance Detail Report', () => {
  test('should work without allowance time', () => {
    const props = Object.assign({}, propsTemplate);
    const report = generate(props, footer, header, styles, timestamp);
    expect(report).toMatchSnapshot();
  });
});
