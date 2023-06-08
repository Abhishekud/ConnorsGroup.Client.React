import {createSelector} from 'reselect';
import makeChildStandardItemsSelector from './makeChildStandardItemsSelector';
import standardItemsValidationErrorsSelector from './standardItemsValidationErrorsSelector';

export default function () {
  const childStandardItemsSelector = makeChildStandardItemsSelector();
  return createSelector(
    childStandardItemsSelector,
    standardItemsValidationErrorsSelector,
    (childStandardItems, standardItemsValidationErrors) =>
      standardItemsValidationErrors.filter((_, id) => childStandardItems.has(id))
  );
}
