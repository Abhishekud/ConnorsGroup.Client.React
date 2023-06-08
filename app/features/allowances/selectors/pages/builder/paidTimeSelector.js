import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {PAID} from '../../../constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../../constants';

export default createSelector(
  allowanceSelector,
  allowance => (new AllowanceTimeModel({
    name: 'Paid Time',
    type: PAID,
    definition: allowanceDefinitions.PAID_TIME,
    minutes: allowance.paidTimeMinutes,
    editable: false,
  }))
);
