import {Map} from 'immutable';
import {createSelector} from 'reselect';
import roleValidationErrorsSelector from './roleValidationErrorsSelector';
import roleIdSelector from './roleIdSelector';

export default () =>
  createSelector(
    roleValidationErrorsSelector,
    roleIdSelector,
    (validationErrors, id) => validationErrors.get(id) || Map()
  );
