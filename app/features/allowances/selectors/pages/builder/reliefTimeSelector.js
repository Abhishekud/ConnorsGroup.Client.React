import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {RELIEF} from '../../../constants/allowanceTimeTypes';
import {allowanceDefinitions} from '../../../constants';

export default createSelector(
  allowanceSelector,
  allowance => (new AllowanceTimeModel({
    name: 'Relief Time',
    type: RELIEF,
    definition: allowanceDefinitions.RELIEF_TIME,
    minutes: allowance.reliefTimeMinutes,
    editable: false,
  }))
);
