import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import {Select} from '../../forms/components';
import pluralize from 'pluralize';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  loadIndustryStandardsList,
  sortIndustryStandardsList,
  toggleIndustryStandardsList,
  selectIndustryStandard,
  selectAllIndustryStandards,
  addIndustryStandardsToClient,
  filterIndustryStandardsList,
} from '../actions';
import {loadStandardsList} from '../../standards/actions';
import {modelSelector as standardsListFiltersModelSelector} from '../../standards/selectors/sidebars/filters';
import {
  loadingSelector,
  sortedIndustryStandardsArraySelector,
  sortSelector,
  selectedIndustryStandardsSelector,
  selectedIndustrySourceIdSelector,
  existingUnchangedStandardsSelector,
  validationErrorsSelector,
  filterSelector,
  columnsSelector,
} from '../selectors/pages/list';
import IndustryStandardsList from './IndustryStandardsList';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import {selectListTypes} from '../../selectListOptions/constants';
import {loadSelectListsOptions, loadSelectListOptions} from '../../selectListOptions/actions';
import {loadAttributeSelectListOptions, loadIndustryAttributeSelectListOptions} from '../../attributes/actions';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {INDUSTRY_TYPICAL_SOURCES} from '../../selectListOptions/constants/selectListTypes';
import IndustryStandardsListAddSidebar from './IndustryStandardsListAddSidebar';
import {
  intoDepartmentIdSelector,
  forceUseOfStandardIdSelector,
} from '../selectors/sidebars/industryStandardsListAddSidebar';
import {STANDARDS_EDIT} from '../../authentication/constants/permissions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';

class IndustryStandardsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadSelectListOptions, location, industryStandards} = this.props;
    if (!location.query.return || industryStandards.isEmpty()) {
      loadSelectListOptions(INDUSTRY_TYPICAL_SOURCES)
        .then(result => {
          const sources = result.value.data.options;
          const industrySourceId = sources.length ? sources[0].value : 0;
          if (industrySourceId !== null) {
            this.loadData(industrySourceId);
          }
        })
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the available Industry Typical Source List.', 'Error'));
    }
  }

  loadData(industrySourceId) {
    const {
      router,
      loadIndustryStandardsList,
      loadIndustryAttributeSelectListOptions,
      intoDepartmentId,
    } = this.props;
    loadIndustryStandardsList(industrySourceId, intoDepartmentId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of industry standards.', 'Error'));
    loadIndustryAttributeSelectListOptions(industrySourceId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of industry attribute list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortIndustryStandardsList(sort);
  }
  handleFilter({filter}) {
    this.props.filterIndustryStandardsList(filter);
  }

  handleAddIndustryStandards() {
    const {
      selectedIndustryStandards,
      addIndustryStandardsToClient,
      loadStandardsList,
      standardListFilters,
      loadSelectListsOptions,
      loadAttributeSelectListOptions,
      selectedIndustrySourceId,
      intoDepartmentId,
      forceUseOfStandardId,
    } = this.props;

    if (selectedIndustryStandards.size <= 0) {
      toastr.error('No industry standards selected');
      return;
    }

    addIndustryStandardsToClient(
      selectedIndustryStandards.valueSeq().map(s => s.get('id')),
      selectedIndustrySourceId,
      intoDepartmentId,
      forceUseOfStandardId,
    )
      .then(response => {
        loadStandardsList(standardListFilters);
        loadSelectListsOptions(...selectListTypes.ALL);
        loadAttributeSelectListOptions();
        if (response.value.data.added > 0) toastr.success(`${response.value.data.added} Industry ${pluralize('Standard', response.value.data.added)} added.`);
        if (response.value.data.skipped > 0) toastr.warning(`${response.value.data.skipped} Industry ${pluralize('Standard', response.value.data.skipped)} skipped.`);
        if (response.value.data.drafted > 0) toastr.warning(`${response.value.data.drafted} existing ${pluralize('Standard', response.value.data.drafted)} reset to Draft status.`);
        if (response.value.data.backgrounded) toastr.warning('Import job created.  You will receive an email after it completes.');
      })
      .catch(error => {
        const {validationErrors, router} = this.props;
        if (validationErrors) {
          toastr.error(validationErrors.get('ids').join('\n'));
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to add industry standards', 'Error');
        if (!error.response.status) throw error;
      });
  }

  handleClosePage() {
    this.props.toggleIndustryStandardsList();
  }

  handleSelectIndustryStandard(industryStandard) {
    this.props.selectIndustryStandard(industryStandard.id, !industryStandard.selected);
  }

  handleRowClick(industryStandard) {
    const {router, selectedIndustrySourceId} = this.props;
    router.push(`/industry-standards/${selectedIndustrySourceId}?standardId=${industryStandard.id}`);
  }

  handleSelectAllIndustryStandards() {
    const {industryStandards, selectAllIndustryStandards, selectedIndustryStandards} = this.props;
    selectAllIndustryStandards(industryStandards.map(x => x.get('id')), Boolean(selectedIndustryStandards.size <= 0));
  }

  handleSelectIndustrySource(event) {
    const industrySourceId = event.target.value;
    if (industrySourceId) {
      this.loadData(industrySourceId);
    }
  }

  render() {
    const {
      loading,
      industryStandards,
      industrySources,
      selectedIndustrySourceId,
      sort,
      filter,
      columns,
      canStandardsEdit,
    } = this.props;
    return (
      <Page pageClassName="industry-standards-list-page">
        <PageHeader>
          <PageHeaderActions>
            <div className="clickable" onClick={this.handleClosePage}><i className="fa fa-times" /> Close</div>
          </PageHeaderActions>
          <PageTitle>Industry Standards</PageTitle>
          <PageHeaderActions>
            <Button bsSize="small" bsStyle="primary" onClick={this.handleAddIndustryStandards}>Add</Button>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <Select
              id="industrySourceId"
              className="industry-source-selector"
              onChange={this.handleSelectIndustrySource}
              value={selectedIndustrySourceId}
              options={industrySources} />
            <IndustryStandardsList
              industryStandards={industryStandards}
              selectedIndustrySourceId={selectedIndustrySourceId}
              onRowClick={this.handleRowClick}
              onSelectedClick={canStandardsEdit ? this.handleSelectIndustryStandard : null}
              onSelectAll={canStandardsEdit ? this.handleSelectAllIndustryStandards : null}
              sort={sort}
              filter={filter}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              columns={columns} />
          </MainContent>
          <IndustryStandardsListAddSidebar />
        </PageBody>
      </Page>
    );
  }
}

IndustryStandardsListPage.propTypes = {
  loadIndustryStandardsList: PropTypes.func,
  sortIndustryStandardsList: PropTypes.func,
  toggleIndustryStandardsList: PropTypes.func,
  selectIndustryStandard: PropTypes.func,
  selectAllIndustryStandards: PropTypes.func,
  addIndustryStandardsToClient: PropTypes.func,
  loadStandardsList: PropTypes.func,

  loading: PropTypes.bool,
  industryStandards: PropTypes.object,
  selectedIndustryStandards: PropTypes.object,
  sort: PropTypes.object,
  validationErrors: PropTypes.object,
  standardListFilters: PropTypes.object,
};

function mapStateToProps(state) {
  const industrySourcesSelector = makeSelectListOptionsArraySelector(INDUSTRY_TYPICAL_SOURCES);
  const canStandardsEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);
  return {
    loading: loadingSelector(state),
    industryStandards: sortedIndustryStandardsArraySelector(state),
    industrySources: industrySourcesSelector(state),
    selectedIndustryStandards: selectedIndustryStandardsSelector(state),
    selectedIndustrySourceId: selectedIndustrySourceIdSelector(state),
    sort: sortSelector(state),
    validationErrors: validationErrorsSelector(state),
    standardListFilters: standardsListFiltersModelSelector(state),
    existingUnchangedStandards: existingUnchangedStandardsSelector(state),
    intoDepartmentId: intoDepartmentIdSelector(state),
    forceUseOfStandardId: forceUseOfStandardIdSelector(state),
    filter: filterSelector(state),
    columns: columnsSelector(state),
    canStandardsEdit: canStandardsEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIndustryStandardsList,
    sortIndustryStandardsList,
    toggleIndustryStandardsList,
    selectIndustryStandard,
    selectAllIndustryStandards,
    loadIndustryAttributeSelectListOptions,
    addIndustryStandardsToClient,
    loadStandardsList,
    loadSelectListsOptions,
    loadSelectListOptions,
    loadAttributeSelectListOptions,
    filterIndustryStandardsList,
  }
)(IndustryStandardsListPage));
