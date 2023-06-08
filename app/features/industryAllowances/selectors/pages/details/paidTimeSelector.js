import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {PAID} from '../../../../allowances/constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../../../allowances/constants';

export default createSelector(
  allowanceSelector,
  allowance => (new AllowanceTimeModel({
    name: 'Paid Time',
    type: PAID,
    definition: allowanceDefinitions.PAID_TIME,
    minutes: allowance.paidTimeMinutes,
  }))
);
