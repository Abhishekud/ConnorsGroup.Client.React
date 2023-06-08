import {createSelector} from 'reselect';
import pageSelector from './pageSelector';
import {departmentNameSelector} from '../../shared/selectors/components/settings';
import {STANDARDS_LIST_OPTION_DEPARTMENTS, STANDARDS_LIST_OPTION_VOLUME_DRIVERS} from '../constants/listOptions';
import pluralize from 'pluralize';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';

export default createSelector(
  pageSelector,
  departmentNameSelector,
  makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS),
  (page, departmentName, hasBetaAccess) => {
    let standardFilingFields = page.get('standardFilingFields').setIn([STANDARDS_LIST_OPTION_DEPARTMENTS, 'name'], pluralize.plural(departmentName));

    if (hasBetaAccess) {
      standardFilingFields = standardFilingFields.delete(STANDARDS_LIST_OPTION_VOLUME_DRIVERS);
    }

    return standardFilingFields;
  }
);
