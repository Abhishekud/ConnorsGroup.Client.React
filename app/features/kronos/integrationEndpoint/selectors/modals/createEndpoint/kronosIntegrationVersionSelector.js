import {createSelector} from 'reselect';
import featureFlagsSelector from '../../../../../shared/selectors/components/settings/featureFlagsSelector';
import {KRONOS_INTEGRATION_VERSION} from '../../../../../shared/constants/featureFlags';

export default createSelector(
  featureFlagsSelector,
  featureFlags => featureFlags.get(KRONOS_INTEGRATION_VERSION)
);
