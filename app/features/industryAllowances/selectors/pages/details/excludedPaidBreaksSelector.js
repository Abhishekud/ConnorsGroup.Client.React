import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {EXCLUDED_PAID} from '../../../../allowances/constants/allowanceTimeTypes';

export default createSelector(
  allowanceSelector,
  allowance => new AllowanceTimeModel({
    name: 'Excluded Paid Breaks',
    type: EXCLUDED_PAID,
    minutes: allowance.excludedPaidBreaksMinutes,
  })
);
