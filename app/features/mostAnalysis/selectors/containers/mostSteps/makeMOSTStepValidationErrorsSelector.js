import {Map} from 'immutable';
import {createSelector} from 'reselect';
import mostStepsValidationErrorsSelector from './mostStepsValidationErrorsSelector';
import mostStepIdSelector from './mostStepIdSelector';

export default () =>
  createSelector(
    mostStepsValidationErrorsSelector,
    mostStepIdSelector,
    (mostStepsValidationErrors, mostStepId) => mostStepsValidationErrors.get(mostStepId) || Map()
  );
