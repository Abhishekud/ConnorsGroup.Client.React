import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {INCLUDED_PAID_SCHEDULED} from '../../../../allowances/constants/allowanceTimeTypes';

export default createSelector(
  allowanceSelector,
  allowance => new AllowanceTimeModel({
    name: 'Included Paid Breaks',
    type: INCLUDED_PAID_SCHEDULED,
    minutes: allowance.includedPaidBreaksMinutes,
  })
);
