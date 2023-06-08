import {createSelector} from 'reselect';
import characteristicStandardsSelector from './characteristicStandardsSelector';

export default createSelector(
  characteristicStandardsSelector,
  characteristicStandards => characteristicStandards.size
);
