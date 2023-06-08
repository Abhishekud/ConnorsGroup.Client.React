import {Map} from 'immutable';
import {createSelector} from 'reselect';
import volumeDriverMappingSetsValidationErrorsSelector from './volumeDriverMappingSetsValidationErrorsSelector';
import volumeDriverMappingSetIdSelector from './volumeDriverMappingSetIdSelector';

export default () =>
  createSelector(
    volumeDriverMappingSetsValidationErrorsSelector,
    volumeDriverMappingSetIdSelector,
    (ccValidationErrors, ccId) => ccValidationErrors.get(ccId) || Map()
  );
