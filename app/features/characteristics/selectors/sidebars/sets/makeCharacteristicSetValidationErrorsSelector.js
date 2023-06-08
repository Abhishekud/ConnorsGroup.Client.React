import {Map} from 'immutable';
import {createSelector} from 'reselect';
import characteristicSetsValidationErrorsSelector from './characteristicSetsValidationErrorsSelector';
import characteristicSetIdSelector from './characteristicSetIdSelector';

export default () =>
  createSelector(
    characteristicSetsValidationErrorsSelector,
    characteristicSetIdSelector,
    (ccValidationErrors, ccId) => ccValidationErrors.get(ccId) || Map()
  );
