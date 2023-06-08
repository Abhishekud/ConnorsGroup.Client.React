import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {RELIEF} from '../../../../allowances/constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../../../allowances/constants';

export default createSelector(
  allowanceSelector,
  allowance => (new AllowanceTimeModel({
    name: 'Relief Time',
    type: RELIEF,
    definition: allowanceDefinitions.RELIEF_TIME,
    minutes: allowance.reliefTimeMinutes,
  }))
);
