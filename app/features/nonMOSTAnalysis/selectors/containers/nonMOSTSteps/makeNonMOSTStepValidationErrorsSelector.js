import {Map} from 'immutable';
import {createSelector} from 'reselect';
import nonMOSTStepsValidationErrorsSelector from './nonMOSTStepsValidationErrorsSelector';
import nonMOSTStepIdSelector from './nonMOSTStepIdSelector';

export default () =>
  createSelector(
    nonMOSTStepsValidationErrorsSelector,
    nonMOSTStepIdSelector,
    (nonMOSTStepsValidationErrors, nonMOSTStepId) => nonMOSTStepsValidationErrors.get(nonMOSTStepId) || Map()
  );
