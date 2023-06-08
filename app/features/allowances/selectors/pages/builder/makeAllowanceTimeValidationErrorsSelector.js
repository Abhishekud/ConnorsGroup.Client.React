import {Map} from 'immutable';
import {createSelector} from 'reselect';
import allowanceTimeSelector from './allowanceTimeSelector';
import allowanceTimesValidationErrorsSelector from './allowanceTimesValidationErrorsSelector';

export default function () {
  return createSelector(
    allowanceTimeSelector,
    allowanceTimesValidationErrorsSelector,
    (allowanceTime, allowanceTimesValidationErrors) => allowanceTimesValidationErrors.get(allowanceTime.id) || Map()
  );
}
