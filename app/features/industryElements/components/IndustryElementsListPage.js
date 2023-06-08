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
  loadIndustryElementsList,
  sortIndustryElementsList,
  toggleIndustryElementsList,
  selectIndustryElement,
  selectAllIndustryElements,
  addIndustryElementsToClient,
  filterIndustryElemetsList,
} from '../actions';
import {
  loadingSelector,
  sortedIndustryElementsArraySelector,
  sortSelector,
  selectedIndustryElementsSelector,
  selectedIndustrySourceIdSelector,
  validationErrorsSelector,
  existingUnchangedElementsSelector,
  filterSelector,
  columnsSelector,
} from '../selectors/pages/list';
import {loadElementsList} from '../../elements/actions';
import {TimeFormatSelector} from '../../shared/components';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {modelSelector as elementsListFilterModelSelector} from '../../elements/selectors/sidebars/filters';
import IndustryElementsList from './IndustryElementsList';
import {handleApiError, toastr} from '../../shared/services';
import {withRouter} from 'react-router';
import {selectListTypes} from '../../selectListOptions/constants';
import {loadSelectListsOptions, loadSelectListOptions} from '../../selectListOptions/actions';
import {INDUSTRY_TYPICAL_SOURCES} from '../../selectListOptions/constants/selectListTypes';
import {elementTypes} from '../../elements/constants';

class IndustryElementsListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadSelectListOptions, location, industryElements} = this.props;

    if (!location.query.return || industryElements.isEmpty()) {
      loadSelectListOptions(INDUSTRY_TYPICAL_SOURCES)
        .then(result => {
          const sources = result.value.data.options;
          const industrySourceId = sources.length ? sources[0].value : 0;

          this.loadData(industrySourceId);
        })
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the available Industry Typical Source List.', 'Error'));
    }
  }

  loadData(industrySourceId) {
    const {router, loadIndustryElementsList} = this.props;

    if (industrySourceId === null) return;

    loadIndustryElementsList(industrySourceId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of Industry Elements.', 'Error'));
  }


  handleSort({sort}) {
    this.props.sortIndustryElementsList(sort);
  }
  handleFilter({filter}) {
    this.props.filterIndustryElemetsList(filter);
  }

  handleClosePage() {
    this.props.toggleIndustryElementsList();
  }

  handleSelectIndustryElement(industryElement) {
    this.props.selectIndustryElement(industryElement.id, !industryElement.selected);
  }

  handleRowClick(industryElement) {
    const {router, selectedIndustrySourceId} = this.props;
    if (industryElement.elementType === elementTypes.MOST) {
      router.push(`/most-industry-elements/${selectedIndustrySourceId}?elementId=${industryElement.id}`);
    } else {
      router.push(`/non-most-industry-elements/${selectedIndustrySourceId}?elementId=${industryElement.id}`);
    }
  }

  handleSelectAllIndustryElements() {
    this.props.selectAllIndustryElements(Boolean(this.props.selectedIndustryElements.size <= 0));
  }

  handleAddIndustryElements() {
    const {
      selectedIndustryElements,
      addIndustryElementsToClient,
      loadElementsList,
      elementsListFilterModel,
      loadSelectListsOptions,
      selectedIndustrySourceId,
    } = this.props;

    if (selectedIndustryElements.size <= 0) {
      toastr.error('No Industry Elements selected');
      return;
    }

    addIndustryElementsToClient(selectedIndustryElements.valueSeq().map(e => e.get('id')), selectedIndustrySourceId)
      .then(response => {
        loadElementsList(elementsListFilterModel);
        loadSelectListsOptions(selectListTypes.ELEMENT_UNITS_OF_MEASURE);
        if (response.value.data.added > 0) toastr.success(`${response.value.data.added} Industry ${pluralize('Element', response.value.data.added)} added.`);
        if (response.value.data.skipped > 0) toastr.warning(`${response.value.data.skipped} Industry ${pluralize('Element', response.value.data.skipped)} skipped.`);
        if (response.value.data.drafted > 0) toastr.warning(`${response.value.data.drafted} existing ${pluralize('Element', response.value.data.drafted)} reset to Draft status.`);
        if (response.value.data.backgrounded) toastr.warning('Import job created.  You will receive an email after it completes.');
      })
      .catch(error => {
        const {validationErrors, router} = this.props;
        if (validationErrors) {
          toastr.error(validationErrors.get('ids').join('\n'));
          return;
        }

        handleApiError(error, router, 'An error occurred while attempting to add Industry Elements', 'Error');
        if (!error.response.status) throw error;
      });
  }

  handleSelectIndustrySource(event) {
    const industrySourceId = event.target.value;
    this.loadData(industrySourceId);
  }

  render() {
    const {
      loading,
      industryElements,
      industrySources,
      selectedIndustrySourceId,
      sort,
      filter,
      columns,
    } = this.props;

    return (
      <Page pageClassName="industry-elements-list-page">
        <PageHeader>
          <PageHeaderActions>
            <div className="clickable" onClick={this.handleClosePage}><i className="fa fa-times" /> Close</div>
          </PageHeaderActions>
          <PageTitle>Industry Elements</PageTitle>
          <PageHeaderActions align="right">
            <Button bsSize="small" bsStyle="primary" onClick={this.handleAddIndustryElements}>Add</Button>
            <div className="flyout-button">
              <TimeFormatSelector />
            </div>
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
            <IndustryElementsList
              industryElements={industryElements}
              selectedIndustrySourceId={selectedIndustrySourceId}
              onRowClick={this.handleRowClick}
              onSelectedClick={this.handleSelectIndustryElement}
              onSelectAll={this.handleSelectAllIndustryElements}
              sort={sort}
              filter={filter}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
              columns={columns} />
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const industrySourcesSelector = makeSelectListOptionsArraySelector(INDUSTRY_TYPICAL_SOURCES);
  return {
    loading: loadingSelector(state),
    industryElements: sortedIndustryElementsArraySelector(state),
    industrySources: industrySourcesSelector(state),
    selectedIndustryElements: selectedIndustryElementsSelector(state),
    selectedIndustrySourceId: selectedIndustrySourceIdSelector(state),
    sort: sortSelector(state),
    validationErrors: validationErrorsSelector(state),
    elementsListFilterModel: elementsListFilterModelSelector(state),
    existingUnchangedElements: existingUnchangedElementsSelector(state),
    filter: filterSelector(state),
    columns: columnsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadIndustryElementsList,
    sortIndustryElementsList,
    toggleIndustryElementsList,
    selectIndustryElement,
    selectAllIndustryElements,
    addIndustryElementsToClient,
    loadElementsList,
    loadSelectListsOptions,
    loadSelectListOptions,
    filterIndustryElemetsList,
  }
)(IndustryElementsListPage));
