import {createSelector} from 'reselect';
import featureFlagsSelector from './featureFlagsSelector';
import {KRONOS_INTEGRATION_VERSION} from '../../../constants/featureFlags';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../../../kronos/constants/KronosVersions';

export default createSelector(
  featureFlagsSelector,
  featureFlags => {
    switch (featureFlags.get(KRONOS_INTEGRATION_VERSION)) {
      case KRONOS_INTEGRATION_VERSION_ENUM_INDEX.DISABLED:
        return KRONOS_INTEGRATION_VERSION_ENUM_INDEX.DISABLED;
      case KRONOS_INTEGRATION_VERSION_ENUM_INDEX.EXPORT_DISABLED:
        return KRONOS_INTEGRATION_VERSION_ENUM_INDEX.EXPORT_DISABLED;
      case KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFC_V1:
        return KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFC_V1;
      case KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFC_V2:
        return KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFC_V2;
      case KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFD:
        return KRONOS_INTEGRATION_VERSION_ENUM_INDEX.WFD;
      case KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED:
        return KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED;
      default:
        return KRONOS_INTEGRATION_VERSION_ENUM_INDEX.DISABLED;
    }
  }
);
