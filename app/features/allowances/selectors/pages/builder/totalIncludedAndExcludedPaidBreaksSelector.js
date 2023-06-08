import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';

export default createSelector(
  allowanceSelector,
  allowance => new AllowanceTimeModel({
    name: 'Total Included + Excluded Time',
    minutes: allowance.totalIncludedAndExcludedPaidBreaksMinutes,
    editable: false,
  })
);
