import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  authenticationMethodSelector,
  makeCurrentUserHasPermissionSelector,
} from '../../authentication/selectors/currentUser';
import {IndexLink, withRouter} from 'react-router';
import {navigationGroups} from '../constants';
import {Button} from 'react-bootstrap';
import {
  navigationGroupsSelector,
} from '../selectors/components/navigation';
import {
  collapseNavigationGroup,
  expandNavigationGroup,
  collapseNavigationTree,
} from '../actions';
import NavigationGroup from './NavigationGroup';
import NavigationSubGroup from './NavigationSubGroup';
import NavigationGroupLink from './NavigationGroupLink';
import NavigationGroupExternalLink from './NavigationGroupExternalLink';
import NavigationSubGroupLink from './NavigationSubGroupLink';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
  departmentNameSelector,
  locationNameSelector,
  partFamilyNameSelector,
  partNameSelector,
  enablePartsSelector,
  configurationAdaptSelector,
  configurationAdaptXmlSelector,
  configurationKronosIntegrationSelector,
  configurationReflexisModuleSelector,
  configurationKronosVersion,
  configurationVolumeDriverMappingVariablesModuleSelector,
} from '../../shared/selectors/components/settings';
import pluralize from 'pluralize';
import {
  JiraServiceDeskLink,
} from '.';
import {authenticationMethods} from '../../authentication/constants';
import {
  ADMIN_USERS,
  SUPER_ADMIN_MANAGE_PERMISSIONS,
  BETA_FEATURES_ACCESS,
  ADMIN_TOOLS_EDIT,
  KRONOS_INTEGRATION_ENDPOINTS_EDIT,
  PROFILING_LIST_MANAGEMENT,
  ADMIN_ACCEPT_TERMS,
  STANDARDS_PARTS_FIELDS_EDIT,
  OUTPUTS_ADAPT_EXPORT,
} from '../../authentication/constants/permissions';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../kronos/constants/KronosVersions';
import {handleApiError} from '../../shared/services';
import {loadTumbleweedIntegration} from '../../tumbleweed/actions';
import {pristineSelector as tumbleweedEndpointPristineSelector} from '../../tumbleweed/selectors/pages/endpoint';

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, kronos, loadTumbleweedIntegration} = this.props;
    if (!kronos) return;
    loadTumbleweedIntegration()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the integration.'));
  }

  handleGroupClick(group, isExpanded) {
    return () => {
      if (isExpanded) this.props.collapseNavigationGroup(group);
      else this.props.expandNavigationGroup(group);
    };
  }

  isExpanded(item) {
    const {groups} = this.props;
    const group = groups.get(item);
    return (group ? Boolean(group.get('expanded')) : false);
  }

  handleCollapseAll() {
    this.props.collapseNavigationTree();
  }

  render() {
    const {
      authenticationMethod,
      hasAdminUsers,
      hasSuperAdmin,
      hasBetaAccess,
      hasAdminToolsEdit,
      hasKronosEndpointsEdit,
      hasProfilingListManagement,
      hasAcceptTerms,
      hasStandardsPartsFields,
      hasAdaptExport,
      locationName,
      selectedNavigationGroup,
      selectedNavigationSubGroup,
      tumbleweedEndpoint,
      partFamilyName,
      partName,
      partsEnabled,
      adapt,
      adaptXml,
      kronos,
      kronosVersion,
      reflexis,
      isVolumeDriverMappingVariablesModuleEnabled,
    } = this.props;

    const allowancesIsExpanded = this.isExpanded(navigationGroups.ALLOWANCES);
    const adminIsExpanded = this.isExpanded(navigationGroups.ADMIN);
    const measurementsIsExpanded = this.isExpanded(navigationGroups.MEASUREMENTS);
    const myAccountIsExpanded = this.isExpanded(navigationGroups.MY_ACCOUNT);
    const standardsIsExpanded = this.isExpanded(navigationGroups.STANDARDS);
    const profilingIsExpanded = this.isExpanded(navigationGroups.PROFILING);
    const profilingListManagementIsExpanded = this.isExpanded(navigationGroups.PROFILING_LIST_MANAGEMENT);
    const partsIsExpanded = this.isExpanded(navigationGroups.PARTS);
    const outputIsExpanded = this.isExpanded(navigationGroups.OUTPUTS);
    const kronosIsExpanded = this.isExpanded(navigationGroups.KRONOS_INTEGRATION);
    const reflexisIsExpanded = this.isExpanded(navigationGroups.REFLEXIS_MODULE);
    const tumbleweedIsExpanded = this.isExpanded(navigationGroups.TUMBLEWEED_MODULE);
    const tumbleweedEnabled = tumbleweedEndpoint && tumbleweedEndpoint.get('enabled');
    const volumeDriversIsExpanded = this.isExpanded(navigationGroups.VOLUME_DRIVERS);
    const volumeDriversListManagementIsExpanded = this.isExpanded(navigationGroups.VOLUME_DRIVERS_LIST_MANAGEMENT);

    return (
      <ul className="navigation">
        <li className="link">
          <IndexLink to="/" activeClassName="active">
            <div className="content">
              <i className="fa fa-home icon" />
              <span className="text">Home</span>
              <Button onClick={this.handleCollapseAll} bsSize="small" title="Collapse All">-</Button>
            </div>
          </IndexLink>
        </li>

        {/*-- Profiling --*/}
        <NavigationGroup name={navigationGroups.PROFILING} expanded={profilingIsExpanded}
          icon="building-o" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />

        {/*-- Profiling / Mapping --*/}
        <NavigationGroupLink to="/location-departments" text={pluralize(locationName)} visible={profilingIsExpanded} />
        <NavigationGroupLink to="/location-mapping" text={`${locationName} Mapping`} visible={profilingIsExpanded} />
        <NavigationGroupLink to="/attributes" text="Attributes" visible={profilingIsExpanded} />
        {!hasBetaAccess && <>
          <NavigationGroupLink to="/volume-driver-mappings" text="Volume Driver Mapping" visible={profilingIsExpanded} />
          <NavigationGroupLink to="/volume-driver-values" text="Volume Driver Values" visible={profilingIsExpanded} />
        </>}

        {/*-- Profiling / List Management --*/}
        {hasProfilingListManagement && <NavigationSubGroup name={navigationGroups.PROFILING_LIST_MANAGEMENT} expanded={profilingListManagementIsExpanded} visible={profilingIsExpanded}
          selectedNavigationGroup={selectedNavigationSubGroup} onClick={this.handleGroupClick} />}
        {hasProfilingListManagement && <NavigationSubGroupLink to="/admin/org-hierarchy-levels" text="Hierarchy Levels" visible={profilingIsExpanded && profilingListManagementIsExpanded} />}
        {hasProfilingListManagement && <NavigationSubGroupLink to="/admin/org-hierarchy-level-options" text="Hierarchy Level Options" visible={profilingIsExpanded && profilingListManagementIsExpanded} />}

        {/*-- Volume Drivers --*/}
        {hasBetaAccess && <>
          <NavigationGroup name={navigationGroups.VOLUME_DRIVERS} expanded={volumeDriversIsExpanded}
            icon="cubes" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />

          <NavigationGroupLink to="/volume-driver-mappings" text="Volume Driver Mapping" visible={volumeDriversIsExpanded} />
          {isVolumeDriverMappingVariablesModuleEnabled && <NavigationGroupLink to="/volume-driver-mapping-variables" text="Volume Driver Mapping Variables" visible={volumeDriversIsExpanded} />}
          <NavigationGroupLink to="/volume-driver-value-sets" text="Volume Driver Value Sets" visible={volumeDriversIsExpanded} />
          <NavigationGroupLink to="/volume-driver-values" text="Volume Driver Values" visible={volumeDriversIsExpanded} />

          {/*-- Volume Drivers / List Management --*/}
          <NavigationSubGroup name={navigationGroups.VOLUME_DRIVERS_LIST_MANAGEMENT} expanded={volumeDriversListManagementIsExpanded} visible={volumeDriversIsExpanded}
            selectedNavigationGroup={selectedNavigationSubGroup} onClick={this.handleGroupClick} />
          <NavigationSubGroupLink to="/volume-drivers" text="Volume Drivers" visible={volumeDriversIsExpanded && volumeDriversListManagementIsExpanded} />
        </>}

        {/*-- Standards --*/}
        <NavigationGroup name={navigationGroups.STANDARDS} expanded={standardsIsExpanded}
          icon="file-text-o" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />

        <NavigationGroupLink to="/standards" text="Standards" visible={standardsIsExpanded} />

        {/*-- Standards / Allowances --*/}
        <NavigationSubGroup name={navigationGroups.ALLOWANCES} expanded={allowancesIsExpanded} visible={standardsIsExpanded}
          selectedNavigationGroup={selectedNavigationSubGroup} onClick={this.handleGroupClick} />
        <NavigationSubGroupLink to="/allowances" text="Calculator" visible={standardsIsExpanded && allowancesIsExpanded} />
        <NavigationSubGroupLink to="/allowance-rests" text="Rest" visible={standardsIsExpanded && allowancesIsExpanded} />

        <NavigationGroupLink to="/characteristics" text="Characteristics" visible={standardsIsExpanded} />

        {/*-- Standards / Parts --*/}
        {partsEnabled && <NavigationSubGroup name={navigationGroups.PARTS} expanded={partsIsExpanded} visible={standardsIsExpanded} alternateName={pluralize(partName)}
          selectedNavigationGroup={selectedNavigationSubGroup} onClick={this.handleGroupClick} />}
        {partsEnabled && <NavigationSubGroupLink to="/part-families" text={pluralize(partFamilyName)} visible={standardsIsExpanded && partsIsExpanded} />}
        {partsEnabled && <NavigationSubGroupLink to="/parts" text={pluralize(partName)} visible={standardsIsExpanded && partsIsExpanded} />}
        {partsEnabled && hasStandardsPartsFields && <NavigationSubGroupLink to="/admin/part-fields" text={`${partName} Fields`} visible={standardsIsExpanded && partsIsExpanded} />}

        {/*-- Standards / List Management --*/}
        <NavigationGroupLink to="/standards-list-management" text="List Management" visible={standardsIsExpanded} />

        {/*-- Elements --*/}
        <NavigationGroup name={navigationGroups.MEASUREMENTS} expanded={measurementsIsExpanded}
          icon="clock-o" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />

        <NavigationGroupLink to="/elements" text="Elements" visible={measurementsIsExpanded} />
        <NavigationGroupLink to="/element-list-management" text="List Management" visible={measurementsIsExpanded} />

        {/*-- Outputs --*/}
        <NavigationGroup name={navigationGroups.OUTPUTS} expanded={outputIsExpanded}
          icon="building-o" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />
        <NavigationGroupLink to="/locations-standards-export" text="Labor Standards Model Output" visible={outputIsExpanded} />
        {/* Adapt */}
        {adapt && hasAdaptExport && <NavigationGroupLink to="/integrations/adapt" text="ADAPT" visible={outputIsExpanded} />}

        {/* AdaptXml */}
        {adaptXml && hasAdaptExport && <NavigationGroupLink to="/adapt-export" text="ADAPT Export" visible={outputIsExpanded} />}
        {/*-- Kronos Integration --*/}
        {kronos && <NavigationGroup name={navigationGroups.KRONOS_INTEGRATION} expanded={kronosIsExpanded} icon="gears" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />}
        {kronos && <NavigationGroupLink to="/kronos/laborstandards" text="Labor Standards" visible={kronosIsExpanded} />}
        {kronos && <NavigationGroupLink to="/kronos/labordrivers" text="Labor Drivers" visible={kronosIsExpanded} />}
        {kronos && <NavigationGroupLink to="/kronos/laborperiods" text="Labor Periods" visible={kronosIsExpanded} />}
        {kronos && <NavigationGroupLink to="/kronos/taskgroups" text="Task Groups" visible={kronosIsExpanded} />}
        {kronos && <NavigationGroupLink to="/kronos/tasks" text="Tasks" visible={kronosIsExpanded} />}
        {kronos && hasKronosEndpointsEdit && kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED &&
          <NavigationGroupLink to="/kronos/endpoints" text="Integration Endpoints" visible={kronosIsExpanded} />}

        {/*-- Reflexis Module --*/}
        {reflexis && <NavigationGroup name={navigationGroups.REFLEXIS_MODULE} expanded={reflexisIsExpanded} icon="gears" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />}
        {reflexis && <NavigationGroupLink to="/reflexis/attributes" text="Attributes" visible={reflexisIsExpanded} />}
        {reflexis && hasBetaAccess && <NavigationGroupLink to="/reflexis/store-attributes" text="Store Attributes" visible={reflexisIsExpanded} />}
        {reflexis && <NavigationGroupLink to="/reflexis/labor-standards" text="Labor Standards" visible={reflexisIsExpanded} />}
        {reflexis && <NavigationGroupLink to="/reflexis/integration-endpoints" text="Integration Endpoints" visible={reflexisIsExpanded} />}

        {/*-- Tumbleweed Module --*/}
        {kronos && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED && <NavigationGroup name={navigationGroups.TUMBLEWEED_MODULE} expanded={tumbleweedIsExpanded} icon="gears" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />}
        {kronos && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED && <NavigationGroupLink to="/export-scheduler/endpoint" text="Integration Endpoint" visible={tumbleweedIsExpanded} />}
        {kronos && kronosVersion === KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED && tumbleweedEnabled && <NavigationGroupLink to="/export-scheduler/scheduling" text="Export Scheduling" visible={tumbleweedIsExpanded} />}

        {/*-- Admin --*/}
        {(hasAdminUsers || hasSuperAdmin || hasAdminToolsEdit) &&
          <NavigationGroup name={navigationGroups.ADMIN} expanded={adminIsExpanded}
            icon="gear" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />}
        {hasAdminUsers && <NavigationGroupLink to="/admin/users" text="Users" visible={adminIsExpanded} />}
        {hasSuperAdmin && <NavigationGroupLink to="/admin/roles" text="Role Permissions" visible={adminIsExpanded} />}
        {hasAdminToolsEdit && <NavigationGroupLink to="/admin/tools" text="Admin Tools" visible={adminIsExpanded} />}

        {/*-- Account --*/}
        <NavigationGroup name={navigationGroups.MY_ACCOUNT} expanded={myAccountIsExpanded}
          icon="user-o" selectedNavigationGroup={selectedNavigationGroup} onClick={this.handleGroupClick} />
        <NavigationGroupLink to="/downloads" text="Downloads" visible={myAccountIsExpanded} />
        {hasAcceptTerms && <NavigationGroupLink to="/review-terms" text="Terms & Conditions" visible={myAccountIsExpanded} />}
        <NavigationGroupExternalLink to="https://www.dropbox.com/s/hwagdmh0s9n3nv1/Release%20Notes.pdf?raw=1" text="Release Notes" visible={myAccountIsExpanded} />
        {authenticationMethod === authenticationMethods.PASSWORD && <NavigationGroupLink to="/change-password" text="Change Password" visible={myAccountIsExpanded} />}
        <NavigationGroupLink to="/log-out" text="Log Out" visible={myAccountIsExpanded} />

        {/*-- Feedback --*/}
        <JiraServiceDeskLink />
      </ul>
    );
  }
}

Navigation.propTypes = {
  collapseNavigationGroup: PropTypes.func,
  authenticationMethod: PropTypes.string,
  expandNavigationGroup: PropTypes.func,
  selectedNavigationGroup: PropTypes.string,
  selectedNavigationSubGroup: PropTypes.string,
  adapt: PropTypes.bool,
  adaptXml: PropTypes.bool,
  reflexis: PropTypes.bool,
};

function mapStateToProps(state) {
  const hasAdminUsersSelector = makeCurrentUserHasPermissionSelector(ADMIN_USERS);
  const hasSuperAdminSelector = makeCurrentUserHasPermissionSelector(SUPER_ADMIN_MANAGE_PERMISSIONS);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);
  const hasAdminToolsEditSelector = makeCurrentUserHasPermissionSelector(ADMIN_TOOLS_EDIT);
  const hasKronosEndpointsEditSelector = makeCurrentUserHasPermissionSelector(KRONOS_INTEGRATION_ENDPOINTS_EDIT);
  const hasProfilingListManagementSelector = makeCurrentUserHasPermissionSelector(PROFILING_LIST_MANAGEMENT);
  const hasAcceptTermsSelector = makeCurrentUserHasPermissionSelector(ADMIN_ACCEPT_TERMS);
  const hasStandardsPartsFieldsSelector = makeCurrentUserHasPermissionSelector(STANDARDS_PARTS_FIELDS_EDIT);
  const hasAdaptExportSelector = makeCurrentUserHasPermissionSelector(OUTPUTS_ADAPT_EXPORT);

  return {
    groups: navigationGroupsSelector(state),
    authenticationMethod: authenticationMethodSelector(state),

    /* Permissions */
    hasAdminUsers: hasAdminUsersSelector(state),
    hasSuperAdmin: hasSuperAdminSelector(state),
    hasBetaAccess: hasBetaAccessSelector(state),
    hasAdminToolsEdit: hasAdminToolsEditSelector(state),
    hasKronosEndpointsEdit: hasKronosEndpointsEditSelector(state),
    hasProfilingListManagement: hasProfilingListManagementSelector(state),
    hasAcceptTerms: hasAcceptTermsSelector(state),
    hasStandardsPartsFields: hasStandardsPartsFieldsSelector(state),
    hasAdaptExport: hasAdaptExportSelector(state),

    departmentName: departmentNameSelector(state),
    locationName: locationNameSelector(state),
    partFamilyName: partFamilyNameSelector(state),
    partName: partNameSelector(state),
    partsEnabled: enablePartsSelector(state),
    adapt: configurationAdaptSelector(state),
    adaptXml: configurationAdaptXmlSelector(state),
    kronos: configurationKronosIntegrationSelector(state),
    reflexis: configurationReflexisModuleSelector(state),
    kronosVersion: configurationKronosVersion(state),
    tumbleweedEndpoint: tumbleweedEndpointPristineSelector(state),
    isVolumeDriverMappingVariablesModuleEnabled: configurationVolumeDriverMappingVariablesModuleSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    collapseNavigationGroup,
    expandNavigationGroup,
    collapseNavigationTree,
    loadTumbleweedIntegration,
  }
)(Navigation));
