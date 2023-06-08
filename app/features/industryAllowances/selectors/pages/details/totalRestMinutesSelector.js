import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {allowanceDefinitions} from '../../../../allowances/constants';

export default createSelector(
  allowanceSelector,
  allowance => new AllowanceTimeModel({
    name: 'Total Rest Minutes',
    definition: allowanceDefinitions.TOTAL_REST_MINUTES,
    minutes: allowance.totalRestMinutes,
  })
);
