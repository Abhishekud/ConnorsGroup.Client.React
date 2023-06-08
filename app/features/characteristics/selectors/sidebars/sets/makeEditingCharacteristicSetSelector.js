import {createSelector} from 'reselect';
import characteristicSetStatesSelector from './characteristicSetStatesSelector';
import characteristicSetIdSelector from './characteristicSetIdSelector';

export default () =>
  createSelector(
    characteristicSetStatesSelector,
    characteristicSetIdSelector,
    (ccStates, ccId) => ccStates.getIn([ccId, 'editing'])
  );
