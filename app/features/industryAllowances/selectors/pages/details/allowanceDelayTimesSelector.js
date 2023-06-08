import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {DELAY} from '../../../../allowances/constants/allowanceTimeTypes';
import {Seq} from 'immutable';
import {allowanceDefinitions} from '../../../../allowances/constants';

export default createSelector(
  allowanceSelector,
  allowance => Seq([
    new AllowanceTimeModel({
      id: -1,
      name: 'Minor Unavoidable Delay',
      type: DELAY,
      definition: '',
      percent: allowance.minorUnavoidableDelayPercent,
      minutes: allowance.minorUnavoidableDelayMinutes,
    }),
    new AllowanceTimeModel({
      id: -2,
      name: 'Additional Delay',
      type: DELAY,
      definition: allowanceDefinitions.ADDITIONAL_DELAY,
      percent: allowance.additionalDelayPercent,
      minutes: allowance.additionalDelayMinutes,
    }),
  ]).valueSeq().toArray()
);
