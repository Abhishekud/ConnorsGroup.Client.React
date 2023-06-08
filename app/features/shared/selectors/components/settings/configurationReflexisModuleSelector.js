import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {REFLEXIS_MODULE} from '../../../constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(REFLEXIS_MODULE)
);
