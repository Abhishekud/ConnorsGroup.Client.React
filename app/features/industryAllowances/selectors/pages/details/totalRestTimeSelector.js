import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {REST} from '../../../../allowances/constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../../../allowances/constants';

export default createSelector(
  allowanceSelector,
  allowance => new AllowanceTimeModel({
    name: 'Total Rest Time',
    definition: allowanceDefinitions.TOTAL_REST_TIME,
    type: REST,
    minutes: allowance.totalRestTimeMinutes,
    percent: allowance.totalRestTimePercent,
  })
);
