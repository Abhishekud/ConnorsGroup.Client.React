import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Map} from 'immutable';
import {Select} from '../../forms/components';
import pluralize from 'pluralize';
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
import {STANDARDS_FILING_FIELDS_EDIT, STANDARDS_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {navigationGroups} from '../../shared/constants';
import {
  loadUnitsOfMeasureList,
  sortUnitsOfMeasureList,
  showCreateUnitOfMeasure,
  selectUnitOfMeasure,
  clearSelectedUnitOfMeasure,
  filterUnitsOfMeasureList,
  toggleImportUnitOfMeasures,
} from '../actions';
import {showCreateStandardFilingField} from '../../standardFilingFields/actions';
import {
  loadingSelector,
  sortedUnitsOfMeasureArraySelector,
  sortSelector,
  selectedUnitOfMeasureIdSelector,
  selectedDepartmentIdSelector,
  filterSelector,
} from '../selectors/pages/list';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {DEPARTMENTS} from '../../selectListOptions/constants/selectListTypes';
import {departmentNameSelector} from '../../shared/selectors/components/settings';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import UnitsOfMeasureListEditSidebar from './UnitsOfMeasureListEditSidebar';
import CreateUnitOfMeasureModal from './CreateUnitOfMeasureModal';
import {handleApiError, exportDownloader} from '../../shared/services';
import {withRouter} from 'react-router';
import {StandardFilingFieldSelect, StandardFilingFieldList} from '../../standardsListManagement/components';
import {CreateStandardFilingFieldModal} from '../../standardFilingFields/components';
import {ImportUnitOfMeasuresModal, ImportUnitOfMeasuresValidationErrorsModal} from './';

class UnitsOfMeasureListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadSelectListOptions, departmentName, loadUnitsOfMeasureList, location} = this.props;
    if (location.query.return) return;
    loadSelectListOptions(DEPARTMENTS)
      .then(() => {
        const {departments} = this.props;
        const departmentId = departments.length ? departments[0].value : 0;
        loadUnitsOfMeasureList(departmentId)
          .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Units of Measure list.', 'Error'));
      })
      .catch(error => handleApiError(error, router, `An error occurred while attempting to load the available ${pluralize(departmentName)}.`, 'Error'));
  }

  handleSort({sort}) {
    this.props.sortUnitsOfMeasureList(sort);
  }

  handleFilter({filter}) {
    this.props.filterUnitsOfMeasureList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectedUnitOfMeasureId, selectUnitOfMeasure, clearSelectedUnitOfMeasure} = this.props;

    if (dataItem.id === selectedUnitOfMeasureId) clearSelectedUnitOfMeasure();
    else selectUnitOfMeasure(Map(dataItem));
  }

  handleSelectDepartment(event) {
    const departmentId = event.target.value;
    const {loadUnitsOfMeasureList, locationName, router} = this.props;

    if (departmentId) {
      loadUnitsOfMeasureList(departmentId)
        .catch(error => handleApiError(error, router, `An error occurred while attempting to load the ${locationName} Characteristics list.`, 'Error'));
    }
  }

  handleShowCreateUnitOfMeasure() {
    const {showCreateUnitOfMeasure, selectedDepartmentId, departments} = this.props;
    if (departments.length === 0) return;

    showCreateUnitOfMeasure(selectedDepartmentId);
  }

  handleExportAllImportTemplate() {
    exportDownloader(`${process.env.API_BASE_URL}units-of-measure/import/template`);
  }

  render() {
    const {
      loading,
      sort,
      unitsOfMeasure,
      selectedUnitOfMeasureId,
      sidebarShown,
      selectedDepartmentId,
      showCreateStandardFilingField,
      departments,
      filter,
      canManageStandardList,
      canEditFilingFields,
      toggleImportUnitOfMeasures,
    } = this.props;

    return (
      <Page pageClassName="units-of-measure-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Units Of Measure</PageTitle>
          <PageHeaderActions>

            {(canManageStandardList) && (
              <Dropdown id="export" className="header-button" pullRight disabled={departments.length === 0}>
                <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && (
                    <MenuItem eventKey="1" onClick={this.handleExportAllImportTemplate}>
                      Download All Units of Measure Import Template (.xlsx)
                    </MenuItem>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            {(canManageStandardList || canEditFilingFields) && (
              <Dropdown id="add" className="header-button btn-default" pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="fa fa-plus" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {canManageStandardList && <MenuItem eventKey="1" onClick={this.handleShowCreateUnitOfMeasure} disabled={departments.length === 0}>New Unit of Measure</MenuItem>}
                  {canManageStandardList && <MenuItem eventKey="2" onClick={toggleImportUnitOfMeasures}>Import Units of Measure (.xlsx)</MenuItem>}
                  {canEditFilingFields && <MenuItem eventKey="3" onClick={showCreateStandardFilingField}>New Standard Filing Field</MenuItem>}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.STANDARDS} selectedNavigationSubGroup={navigationGroups.STANDARDS_LIST_MANAGEMENT} />
          <MainContent loading={loading}>
            <StandardFilingFieldSelect />
            <Select
              id="departmentId"
              formGroupClassName="departments-selector"
              onChange={this.handleSelectDepartment}
              value={selectedDepartmentId}
              options={departments} />
            <StandardFilingFieldList
              filingFields={unitsOfMeasure}
              sort={sort}
              filter={filter}
              includeStatus
              selectedUnitOfMeasureId={selectedUnitOfMeasureId}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              onRowClick={this.handleRowClick}
              sidebarShown={sidebarShown} />
          </MainContent>
          <UnitsOfMeasureListEditSidebar canManageStandardList={canManageStandardList} />
        </PageBody>
        <CreateUnitOfMeasureModal />
        <CreateStandardFilingFieldModal />
        <ImportUnitOfMeasuresModal />
        <ImportUnitOfMeasuresValidationErrorsModal />
      </Page>
    );
  }
}

UnitsOfMeasureListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  unitsOfMeasure: PropTypes.array.isRequired,
  sort: PropTypes.array.isRequired,
  filter: PropTypes.object,
  selectedUnitOfMeasureId: PropTypes.number,
  sidebarShown: PropTypes.bool.isRequired,
  departments: PropTypes.array.isRequired,
  selectedDepartmentId: PropTypes.number,
  departmentName: PropTypes.string.isRequired,

  // Actions
  loadUnitsOfMeasureList: PropTypes.func.isRequired,
  sortUnitsOfMeasureList: PropTypes.func.isRequired,
  showCreateUnitOfMeasure: PropTypes.func.isRequired,
  selectUnitOfMeasure: PropTypes.func.isRequired,
  clearSelectedUnitOfMeasure: PropTypes.func.isRequired,
  loadSelectListOptions: PropTypes.func.isRequired,
  showCreateStandardFilingField: PropTypes.func.isRequired,
  filterUnitsOfMeasureList: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const departmentsSelector = makeSelectListOptionsArraySelector(DEPARTMENTS);
  const canManageStandardListSelector = makeCurrentUserHasPermissionSelector(STANDARDS_LIST_MANAGEMENT);
  const canEditFilingFields = makeCurrentUserHasPermissionSelector(STANDARDS_FILING_FIELDS_EDIT);

  return {
    loading: loadingSelector(state),
    unitsOfMeasure: sortedUnitsOfMeasureArraySelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    selectedUnitOfMeasureId: selectedUnitOfMeasureIdSelector(state),
    sidebarShown: showSelector(state),
    departments: departmentsSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    departmentName: departmentNameSelector(state),
    canManageStandardList: canManageStandardListSelector(state),
    canEditFilingFields: canEditFilingFields(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadUnitsOfMeasureList,
    sortUnitsOfMeasureList,
    showCreateUnitOfMeasure,
    selectUnitOfMeasure,
    clearSelectedUnitOfMeasure,
    loadSelectListOptions,
    showCreateStandardFilingField,
    filterUnitsOfMeasureList,
    toggleImportUnitOfMeasures,
  }
)(UnitsOfMeasureListPage));
