import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {ADJUSTED_PAID_TIME} from '../../../constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../../constants';

export default createSelector(
  allowanceSelector,
  allowance => (new AllowanceTimeModel({
    name: 'Adjusted Paid Time',
    type: ADJUSTED_PAID_TIME,
    definition: allowanceDefinitions.ADJUSTED_PAID_TIME,
    minutes: allowance.adjustedPaidTime,
    editable: false,
  }))
);
