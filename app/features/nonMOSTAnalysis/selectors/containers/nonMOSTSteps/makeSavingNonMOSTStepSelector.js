import {createSelector} from 'reselect';
import nonMOSTStepStatesSelector from './nonMOSTStepStatesSelector';
import nonMOSTStepIdSelector from './nonMOSTStepIdSelector';

export default () =>
  createSelector(
    nonMOSTStepStatesSelector,
    nonMOSTStepIdSelector,
    (nonMOSTStepStates, nonMOSTStepId) => nonMOSTStepStates.getIn([nonMOSTStepId, 'saving'])
  );
