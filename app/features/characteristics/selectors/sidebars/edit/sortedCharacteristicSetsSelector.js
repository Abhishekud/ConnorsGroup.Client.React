import {createSelector} from 'reselect';
import characteristicSetsSelector from './characteristicSetsSelector';

export default createSelector(
  characteristicSetsSelector,
  characteristicSets => characteristicSets.sortBy(cc => cc.get('name'))
);
