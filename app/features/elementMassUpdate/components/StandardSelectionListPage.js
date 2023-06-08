import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CustomizableGrid} from '../../customizableGrid/components';
import {AutoSizer} from 'react-virtualized';
import {withRouter} from 'react-router';
import {Button} from 'react-bootstrap';
import {
  loadingSelector,
  sortedStandardsSelector,
  sortSelector,
  standardStatesSelector,
  columnsSelector,
  filterSelector,
} from '../selectors/pages/selectStandards';
import {
  loadElementWhereUsedStandardsList,
  sortList,
  toggleShowMassUpdate,
  selectStandard,
  selectAllStandards,
  filterElementMassUpdateList,
} from '../actions';
import {
  departmentNameSelector,
} from '../../shared/selectors/components/settings';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  searchElementsOpenSelector,
  workingModelSelector,
} from '../selectors/sidebars/standardListSelection';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import React, {Component} from 'react';
import {handleApiError} from '../../shared/services';
import StandardSelectionListSidebar from './StandardSelectionListSidebar';
import SearchElementsPage from './SearchElementsPage';

class StandardsListSelectionPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, elementId} = this.props;
    this.props.loadElementWhereUsedStandardsList(elementId)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the list of standards.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortList(sort);
  }

  handleFilter({filter}) {
    this.props.filterElementMassUpdateList(filter);
  }

  handleRowClick({dataItem}) {
    const {selectStandard} = this.props;
    selectStandard(dataItem.id);
  }

  handleSelectAll() {
    const {standards, workingModel, selectAllStandards} = this.props;
    selectAllStandards(standards.map(x => x.get('id')), Boolean(workingModel.get('standardIds').size <= 0));
  }

  handleClose() {
    this.props.toggleShowMassUpdate();
  }

  render() {
    const {
      loading,
      standards,
      sort,
      elementId,
      elementName,
      searchElementsOpen,
      columns,
      filter,
    } = this.props;
    if (searchElementsOpen) {
      return <SearchElementsPage />;
    }
    return (
      <Page pageClassName="standards-list-page">
        <PageHeader>
          <PageHeaderActions>
            <span onClick={this.handleClose} className="clickable"><i className="fa fa-close" /> Close</span>
          </PageHeaderActions>
          <PageTitle>Standards Containing {elementId} - {elementName}</PageTitle>
          <PageHeaderActions>
            <Button className="btn-wheat" onClick={this.handleClose}><i className="fa fa-exchange" /></Button>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={standards}
                  style={{width, height}}
                  onRowClick={this.handleRowClick}
                  selectedField="selected"
                  onSelectedChange={this.handleRowClick}
                  onHeaderSelectedChange={this.handleSelectAll}
                  filter={filter}
                  onFilter={this.handleFilter}
                  columns={columns}
                  sort={sort} onSort={this.handleSort}
                  onPageChange={this.handlePageChange} />
              )}
            </AutoSizer>
          </MainContent>
          <StandardSelectionListSidebar />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    standards: sortedStandardsSelector(state),
    sort: sortSelector(state),
    columns: columnsSelector(state),
    departmentName: departmentNameSelector(state),
    timeFormat: timeFormatSelector(state),
    searchElementsOpen: searchElementsOpenSelector(state),
    workingModel: workingModelSelector(state),
    standardStates: standardStatesSelector(state),
    filter: filterSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadElementWhereUsedStandardsList,
    sortList,
    toggleShowMassUpdate,
    selectStandard,
    selectAllStandards,
    filterElementMassUpdateList,
  }
)(StandardsListSelectionPage));
