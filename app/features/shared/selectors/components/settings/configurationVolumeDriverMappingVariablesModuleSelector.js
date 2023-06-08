import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {VOLUME_DRIVER_MAPPING_VARIABLES_MODULE} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(VOLUME_DRIVER_MAPPING_VARIABLES_MODULE),
);
