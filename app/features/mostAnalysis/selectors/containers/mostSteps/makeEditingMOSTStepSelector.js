import {createSelector} from 'reselect';
import mostStepStatesSelector from './mostStepStatesSelector';
import mostStepIdSelector from './mostStepIdSelector';

export default () =>
  createSelector(
    mostStepStatesSelector,
    mostStepIdSelector,
    (mostStepStates, mostStepId) => mostStepStates.getIn([mostStepId, 'editing'])
  );
