import {createSelector} from 'reselect';
import volumeDriverMappingSetStatesSelector from './volumeDriverMappingSetStatesSelector';
import volumeDriverMappingSetIdSelector from './volumeDriverMappingSetIdSelector';

export default () =>
  createSelector(
    volumeDriverMappingSetStatesSelector,
    volumeDriverMappingSetIdSelector,
    (ccStates, ccId) => ccStates.getIn([ccId, 'saving'])
  );
