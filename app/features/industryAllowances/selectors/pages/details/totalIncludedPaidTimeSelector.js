import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {TOTAL_INCLUDED_PAID} from '../../../../allowances/constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../../../allowances/constants';

export default createSelector(
  allowanceSelector,
  allowance => new AllowanceTimeModel({
    name: 'Total Included Paid Time',
    type: TOTAL_INCLUDED_PAID,
    definition: allowanceDefinitions.TOTAL_INCLUDED_PAID,
    minutes: allowance.totalIncludedPaidTimeMinutes,
    percent: allowance.totalIncludedPaidTimePercent,
  })
);
