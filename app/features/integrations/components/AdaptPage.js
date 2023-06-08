import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleApiError} from '../../shared/services';
import {showCreateExportRequest} from '../../shared/actions';
import {CreateExportRequestModal} from '../../shared/components';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {Select} from '../../forms/components';
import {Dropdown, MenuItem} from 'react-bootstrap';
import {navigationGroups} from '../../shared/constants';
import {
  locationHierarchyListSelector,
  selectedOrgHierarchyLevelOptionSelector,
  exportRequestFilterSelector,
  selectedADAPTExportSelector,
  exportUriSelector,
  selectedADAPTExportFormatSelector,
  modalTitleSelector,
} from '../selectors/adapt';
import {loadAllOrgHierarchyLevelOptionsList} from '../../orgHierarchyLevelOptions/actions';
import {
  selectADAPTLocationFilter,
  selectADAPTExport,
  selectADAPTExportFormat,
} from '../actions';
import {TASKS, STORE_DRIVERS} from '../constants/adaptIntegrations';
import {CSV, XML} from '../../shared/constants/exportFormatTypes';

class AdaptPage extends Component {
  constructor(context, props) {
    super(context, props);

    autoBind(this);
  }

  componentDidMount() {
    const {
      loadAllOrgHierarchyLevelOptionsList,
      selectADAPTLocationFilter,
      router,
      handleApiError,
    } = this.props;

    loadAllOrgHierarchyLevelOptionsList()
      .then(() => {
        selectADAPTLocationFilter(this.props.options[0].value.toString());
      })
      .catch(error =>
        handleApiError(error, router, 'An error occurred while attempting to load the available Hierarchy Level Options.')
      );

  }

  handleOrgHierarchyFieldChange({target}) {
    this.props.selectADAPTLocationFilter(target.value);
  }

  handleFormatFieldChange({target}) {
    this.props.selectADAPTExportFormat(target.value);
  }

  handleTaskExport() {
    const {
      selectADAPTExport,
      showCreateExportRequest,
      exportRequestFilter,
    } = this.props;
    selectADAPTExport(TASKS)
      .then(() => showCreateExportRequest(exportRequestFilter));
  }

  handleStoreDriversExport() {
    const {
      selectADAPTExport,
      showCreateExportRequest,
      exportRequestFilter,
    } = this.props;
    selectADAPTExport(STORE_DRIVERS)
      .then(() => showCreateExportRequest(exportRequestFilter));
  }

  handleExportRequest(exportRequestId) {
    const {exportUri} = this.props;
    window.location.href = exportUri(exportRequestId);
  }

  render() {
    const {
      options,
      selectedOrgHierarchyLevelOption,
      selectedExportFormat,
      modalTitle,
    } = this.props;
    return (
      <Page pageClassName="adapt-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>ADAPT Output</PageTitle>
          <PageHeaderActions align="right">
            <Dropdown id="export" pullRight className="header-button">
              <Dropdown.Toggle noCaret><i className="fa fa-file-excel-o" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey="1" onClick={this.handleTaskExport}>Export Tasks</MenuItem>
                <MenuItem eventKey="2" onClick={this.handleStoreDriversExport}>Export Store Drivers</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.OUTPUTS} />
          <MainContent loading={false}>
            <form>
              <fieldset disabled={false}>
                <Select
                  id="locationHierarchy"
                  onChange={this.handleOrgHierarchyFieldChange}
                  options={options}
                  value={selectedOrgHierarchyLevelOption} />
                <Select
                  id="export-format-input"
                  onChange={this.handleFormatFieldChange}
                  options={[
                    {value: CSV, label: 'CSV'},
                    {value: XML, label: 'XML'},
                  ]}
                  value={selectedExportFormat} />
              </fieldset>
            </form>
          </MainContent>
          <CreateExportRequestModal title={modalTitle} onExportRequestCreated={this.handleExportRequest} />
        </PageBody>
      </Page>
    );
  }
}

AdaptPage.propTypes = {
  // state
  options: PropTypes.array.isRequired,
  selectedOrgHierarchyLevelOption: PropTypes.string.isRequired,
  exportRequestFilter: PropTypes.object,
  router: PropTypes.object.isRequired,
  exportUri: PropTypes.func.isRequired,
  selectedExportFormat: PropTypes.string.isRequired,

  // actions
  loadAllOrgHierarchyLevelOptionsList: PropTypes.func.isRequired,
  selectADAPTLocationFilter: PropTypes.func.isRequired,
  handleApiError: PropTypes.func.isRequired,
  showCreateExportRequest: PropTypes.func.isRequired,
  selectADAPTExport: PropTypes.func.isRequired,
  selectADAPTExportFormat: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    options: locationHierarchyListSelector(state),
    selectedOrgHierarchyLevelOption: selectedOrgHierarchyLevelOptionSelector(state),
    exportRequestFilter: exportRequestFilterSelector(state),
    selectedExport: selectedADAPTExportSelector(state),
    exportUri: exportUriSelector(state),
    selectedExportFormat: selectedADAPTExportFormatSelector(state),
    modalTitle: modalTitleSelector(state),
  };
}

export default withRouter(connect(mapStateToProps, {
  loadAllOrgHierarchyLevelOptionsList,
  handleApiError,
  selectADAPTLocationFilter,
  selectADAPTExport,
  showCreateExportRequest,
  selectADAPTExportFormat,
})(AdaptPage));
