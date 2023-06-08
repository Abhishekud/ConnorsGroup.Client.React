import {Map} from 'immutable';
import {createSelector} from 'reselect';
import mostStepsParametersValidationErrorsSelector from './mostStepsParametersValidationErrorsSelector';
import mostStepIdSelector from './mostStepIdSelector';

export default () =>
  createSelector(
    mostStepsParametersValidationErrorsSelector,
    mostStepIdSelector,
    (mostStepsParametersValidationErrors, mostStepId) => mostStepsParametersValidationErrors.get(mostStepId) || Map()
  );
