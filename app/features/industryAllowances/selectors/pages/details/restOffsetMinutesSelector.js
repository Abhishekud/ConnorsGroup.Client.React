import {createSelector} from 'reselect';
import allowanceSelector from './allowanceSelector';
import AllowanceTimeModel from '../../../models/AllowanceTimeModel';
import {allowanceDefinitions} from '../../../../allowances/constants';

export default createSelector(
  allowanceSelector,
  allowance => new AllowanceTimeModel({
    name: 'Rest Offset Minutes',
    definition: allowanceDefinitions.REST_OFFSET_MINUTES,
    minutes: allowance.restOffsetMinutes,
  })
);
