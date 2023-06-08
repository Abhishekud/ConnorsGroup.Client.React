import React, {Component} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {BETA_FEATURES_ACCESS, STANDARDS_FILING_FIELDS_EDIT, STANDARDS_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {navigationGroups} from '../../shared/constants';
import {departmentNameSelector} from '../../shared/selectors/components/settings';
import {
  loadVolumeDriversList,
  sortVolumeDriversList,
  showCreateVolumeDriver,
  selectVolumeDriver,
  clearSelectedVolumeDriver,
  showImportVolumeDrivers,
  filterVolumeDriversList,
} from '../actions';
import {showCreateStandardFilingField} from '../../standardFilingFields/actions';
import {
  loadingSelector,
  sortedVolumeDriversArraySelector,
  sortSelector,
  selectedVolumeDriverIdSelector,
  filterSelector,
} from '../selectors/pages/list';
import VolumeDriversList from './VolumeDriversList';
import {
  appliedCountSelector as appliedFiltersCountSelector,
} from '../selectors/sidebars/filters';
import {
  showSelector as showEditSelector,
} from '../selectors/sidebars/edit';
import VolumeDriversListEditSidebar from './VolumeDriversListEditSidebar';
import CreateVolumeDriverModal from './CreateVolumeDriverModal';
import ImportVolumeDriversModal from './ImportVolumeDriversModal';
import ImportVolumeDriversValidationErrorsModal from './ImportVolumeDriversValidationErrorsModal';
import {handleApiError, exportDownloader} from '../../shared/services';
import {withRouter} from 'react-router';
import {StandardFilingFieldSelect} from '../../standardsListManagement/components';
import {CreateStandardFilingFieldModal} from '../../standardFilingFields/components';

class VolumeDriversListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, filterValues} = this.props;
    this.props.loadVolumeDriversList(filterValues)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Volume Drivers list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortVolumeDriversList(sort);
  }

  handleFilter({filter}) {
    this.props.filterVolumeDriversList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedVolumeDriverId, selectVolumeDriver, clearSelectedVolumeDriver} = this.props;

    if (dataItem.id === selectedVolumeDriverId) clearSelectedVolumeDriver();
    else selectVolumeDriver(Map(dataItem));
  }

  handleExportImportTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}volume-drivers/import/template`);
  }

  render() {
    const {
      loading,
      sort,
      filter,
      volumeDrivers,
      showEditor,
      departmentName,
      selectedVolumeDriverId,
      handleShowCreateVolumeDriver,
      handleShowImportVolumeDrivers,
      showCreateStandardFilingField,
      canManageStandardList,
      canEditFilingFields,
      hasBetaAccess,
    } = this.props;

    return (
      <Page pageClassName="volume-drivers-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Volume Drivers</PageTitle>
          <PageHeaderActions>
            {canManageStandardList && (
              <Dropdown id="export" className="header-button" pullRight>
                <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="1" onClick={this.handleExportImportTemplate}>
                    Download Volume Driver Import Template
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>)}
            {(canManageStandardList || canEditFilingFields) && (
              <Dropdown id="create-volume-drivers" className="header-button" pullRight>
                <Dropdown.Toggle noCaret><i className="fa fa-plus" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && <MenuItem eventKey="1" onClick={handleShowCreateVolumeDriver}>
                    New Volume Driver
                  </MenuItem>}
                  {canManageStandardList && <MenuItem eventKey="2" onClick={handleShowImportVolumeDrivers}>
                    Import Volume Drivers
                  </MenuItem>}
                  {canEditFilingFields && !hasBetaAccess && <MenuItem eventKey="3" onClick={showCreateStandardFilingField}>New Standard Filing Field</MenuItem>}
                </Dropdown.Menu>
              </Dropdown>)}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={hasBetaAccess ? navigationGroups.VOLUME_DRIVERS : navigationGroups.STANDARDS} selectedNavigationSubGroup={hasBetaAccess ? navigationGroups.VOLUME_DRIVERS_LIST_MANAGEMENT : navigationGroups.STANDARDS_LIST_MANAGEMENT} />
          <MainContent loading={loading}>
            {!hasBetaAccess && <StandardFilingFieldSelect />}
            <VolumeDriversList
              departmentName={departmentName}
              volumeDrivers={volumeDrivers}
              sort={sort}
              filter={filter}
              selectedVolumeDriverId={selectedVolumeDriverId}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              onRowClick={this.handleRowClick}
              sidebarShown={showEditor}
              hasBetaAccess={hasBetaAccess} />
          </MainContent>
          <VolumeDriversListEditSidebar canManageStandardList={canManageStandardList} />
        </PageBody>
        <CreateVolumeDriverModal />
        <ImportVolumeDriversModal />
        <ImportVolumeDriversValidationErrorsModal />
        <CreateStandardFilingFieldModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageStandardListSelector = makeCurrentUserHasPermissionSelector(STANDARDS_LIST_MANAGEMENT);
  const canEditFilingFields = makeCurrentUserHasPermissionSelector(STANDARDS_FILING_FIELDS_EDIT);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);

  return {
    loading: loadingSelector(state),
    volumeDrivers: sortedVolumeDriversArraySelector(state),
    sort: sortSelector(state),
    selectedVolumeDriverId: selectedVolumeDriverIdSelector(state),
    appliedFiltersCount: appliedFiltersCountSelector(state),
    showEditor: showEditSelector(state),
    departmentName: departmentNameSelector(state),
    filter: filterSelector(state),
    canManageStandardList: canManageStandardListSelector(state),
    canEditFilingFields: canEditFilingFields(state),
    hasBetaAccess: hasBetaAccessSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadVolumeDriversList,
    sortVolumeDriversList,
    handleShowCreateVolumeDriver: showCreateVolumeDriver,
    handleShowImportVolumeDrivers: showImportVolumeDrivers,
    selectVolumeDriver,
    clearSelectedVolumeDriver,
    showCreateStandardFilingField,
    filterVolumeDriversList,
  }
)(VolumeDriversListPage));
