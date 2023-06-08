import {createSelector} from 'reselect';
import characteristicSetsSelector from './characteristicSetsSelector';

export default createSelector(
  characteristicSetsSelector,
  characteristicSets => (characteristicSets.filter(c => c.get('visibleColumn')))
);
