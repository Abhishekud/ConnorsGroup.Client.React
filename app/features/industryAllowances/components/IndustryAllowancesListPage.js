import React, {Component} from 'react';
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
  loadIndustryAllowancesList,
  sortIndustryAllowancesList,
  toggleIndustryAllowancesList,
  filterIndustryAllowancesList,
  selectAllIndustryAllowances,
  selectIndustryAllowance,
  addIndustryAllowancesToClient,
  getSelectedIndustrySourceId,
  showCopyRestPreference,
} from '../actions';
import {
  loadingSelector,
  sortedAndFilteredIndustryAllowancesArraySelector,
  sortSelector,
  selectedIndustrySourceIdSelector,
  selectedIndustryAllowancesSelector,
  filterSelector,
  columnsSelector,
  existingUnchangedElementsSelector,
} from '../selectors/pages/list';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import IndustryAllowancesList from './IndustryAllowancesList';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import {loadSelectListOptions} from '../../selectListOptions/actions';
import {INDUSTRY_TYPICAL_SOURCES, ALLOWANCE_RESTS} from '../../selectListOptions/constants/selectListTypes';
import CopyRestPreferenceModal from './CopyRestPreferenceModal';
import {loadAllowancesList} from '../../allowances/actions';
import {modelSelector} from '../selectors/modals/copyRestPreference';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';

class IndustryAllowancesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadSelectListOptions, location, industryAllowances, getSelectedIndustrySourceId} = this.props;

    if (!location.query.return || industryAllowances.isEmpty()) {
      loadSelectListOptions(INDUSTRY_TYPICAL_SOURCES)
        .then(result => {
          const sources = result.value.data.options;
          const industrySourceId = sources.length ? sources[0].value : 0;
          getSelectedIndustrySourceId(industrySourceId);
          this.loadData(industrySourceId);
        })
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the available Industry Typical Source List.', 'Error'));
    }
  }

  loadData(industrySourceId) {
    const {router, loadIndustryAllowancesList} = this.props;

    if (industrySourceId === null) return;
    loadIndustryAllowancesList(industrySourceId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of Industry Allowances.', 'Error'));
  }


  handleSort({sort}) {
    this.props.sortIndustryAllowancesList(sort);
  }
  handleFilter({filter}) {
    this.props.filterIndustryAllowancesList(filter);
  }

  handleClosePage() {
    this.props.toggleIndustryAllowancesList();
  }

  handleRowClick(dataItem) {
    const {router, selectedIndustrySourceId, hasBetaFeaturesAccess} = this.props;
    if (hasBetaFeaturesAccess) {
      router.push(`industry-allowance/${selectedIndustrySourceId}/details/${dataItem.id}`);
    }
  }

  handleSelectAllIndustryAllowances() {
    const {industryAllowances, selectAllIndustryAllowances} = this.props;
    selectAllIndustryAllowances(industryAllowances.map(x => x.get('id')), Boolean(this.props.selectedIndustryAllowances.size <= 0));
  }
  handleSelectIndustryAllowances(industryElement) {
    this.props.selectIndustryAllowance(industryElement.id, !industryElement.selected);
  }
  handleAddIndustryAllowances() {
    const {
      selectedIndustryAllowances,
      addIndustryAllowancesToClient,
      selectedIndustrySourceId,
      loadAllowancesList,
      model,
      loadSelectListOptions,
    } = this.props;

    if (selectedIndustryAllowances.size <= 0) {
      toastr.error('No industry allowance selected');
      return;
    }

    addIndustryAllowancesToClient(selectedIndustryAllowances.valueSeq().map(e => e.get('id')), selectedIndustrySourceId, model.get('createCopyRestOptions'))
      .then(response => {
        const responseData = response.value.data;

        if (responseData.needPreference) {
          this.props.handleShowCopyRestPreference();
        } else {
          loadAllowancesList();
          loadSelectListOptions(ALLOWANCE_RESTS);
          if (responseData.addedRecordCount) toastr.success(`${responseData.addedRecordCount} Industry ${pluralize('Allowance', responseData.addedRecordCount)} added.`);
          if (responseData.backgrounded) toastr.warning('Import job created.  You will receive an email after it completes.');
          if (responseData.skipped) toastr.warning(`${responseData.skipped} Industry ${pluralize('Allowance', responseData.skipped)} skipped.`);
        }
      })
      .catch(error => {
        const {router} = this.props;
        handleApiError(error, router, 'An error occurred while attempting to add Industry Allowances', 'Error');
      });
  }
  handleSelectIndustrySource(event) {
    const industrySourceId = event.target.value;
    this.props.getSelectedIndustrySourceId(industrySourceId);
    this.loadData(industrySourceId);
  }

  render() {
    const {
      loading,
      industryAllowances,
      industrySources,
      selectedIndustrySourceId,
      sort,
      filter,
      columns,
    } = this.props;

    return (
      <Page pageClassName="industry-allowance-list-page">
        <PageHeader>
          <PageHeaderActions>
            <div className="clickable" onClick={this.handleClosePage}><i className="fa fa-times" /> Close</div>
          </PageHeaderActions>
          <PageTitle>Industry Allowances</PageTitle>
          <PageHeaderActions align="right">
            <Button bsSize="small" bsStyle="primary" onClick={this.handleAddIndustryAllowances}>Add</Button>
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
            <IndustryAllowancesList
              industryAllowances={industryAllowances}
              selectedIndustrySourceId={selectedIndustrySourceId}
              sort={sort}
              filter={filter}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              onRowClick={this.handleRowClick}
              onSelectedClick={this.handleSelectIndustryAllowances}
              onSelectAll={this.handleSelectAllIndustryAllowances}
              columns={columns} />
          </MainContent>
        </PageBody>
        <CopyRestPreferenceModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const industrySourcesSelector = makeSelectListOptionsArraySelector(INDUSTRY_TYPICAL_SOURCES);
  const hasBetaFeaturesAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);
  return {
    loading: loadingSelector(state),
    industryAllowances: sortedAndFilteredIndustryAllowancesArraySelector(state),
    industrySources: industrySourcesSelector(state),
    selectedIndustryAllowances: selectedIndustryAllowancesSelector(state),
    selectedIndustrySourceId: selectedIndustrySourceIdSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    columns: columnsSelector(state),
    model: modelSelector(state),
    existingUnchangedElements: existingUnchangedElementsSelector(state),
    hasBetaFeaturesAccess: hasBetaFeaturesAccessSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIndustryAllowancesList,
    sortIndustryAllowancesList,
    toggleIndustryAllowancesList,
    selectAllIndustryAllowances,
    loadSelectListOptions,
    filterIndustryAllowancesList,
    selectIndustryAllowance,
    addIndustryAllowancesToClient,
    getSelectedIndustrySourceId,
    handleShowCopyRestPreference: showCopyRestPreference,
    loadAllowancesList,
  }
)(IndustryAllowancesListPage));
