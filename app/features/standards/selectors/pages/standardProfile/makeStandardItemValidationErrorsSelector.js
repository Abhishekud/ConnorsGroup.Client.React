import {Map} from 'immutable';
import {createSelector} from 'reselect';
import standardItemsValidationErrors from './standardItemsValidationErrorsSelector';
import standardItemIdSelector from './standardItemIdSelector';

export default () =>
  createSelector(
    standardItemsValidationErrors,
    standardItemIdSelector,
    (standardItemsValidationErrors, standardItemId) =>
      standardItemsValidationErrors.get(standardItemId, Map())
  );
