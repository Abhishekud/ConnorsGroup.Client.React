import {createSelector} from 'reselect';
import pristineCharacteristicSetsSelector from './pristineCharacteristicSetsSelector';
import characteristicSetIdSelector from './characteristicSetIdSelector';

export default () =>
  createSelector(
    pristineCharacteristicSetsSelector,
    characteristicSetIdSelector,
    (pristineCCs, ccId) => pristineCCs.get(ccId)
  );
