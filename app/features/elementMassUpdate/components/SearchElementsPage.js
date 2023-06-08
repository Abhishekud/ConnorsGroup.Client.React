import React, {Component} from 'react';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {CustomizableGrid} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {AutoSizer} from 'react-virtualized';
import {fromJS} from 'immutable';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  closeElementSearch,
  setEditMassUpdateElementWorkingModelProperty,
} from '../actions';
import {
  columnsConfigurationSelector,
  loadingSelector,
  addLocationSelector,
} from '../selectors/pages/searchElements';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {TimeFormatSelector} from '../../shared/components';
import {
  toggleElementsListFiltersSidebar,
  loadElementsList,
  selectElement,
  selectAllElements,
  sortElementsList,
  filterElementsList,
  pageElementsList,
} from '../../elements/actions';
import {
  sortedElementsArraySelector,
  sortSelector,
  selectedElementsSelector,
  filterSelector,
  dataSelector,
  skipSelector,
  takeSelector,
  totalElementsSelector,
} from '../../elements/selectors/pages/list';
import {
  appliedCountSelector as appliedFiltersCountSelector,
  showSelector as showFiltersSelector,
  modelSelector as filterValuesSelector,
} from '../../elements/selectors/sidebars/filters';
import {
  ElementsListFiltersSidebar,
} from '../../elements/components';

class SearchElementsPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {
      router,
      loadElementsList,
      filterValues,
    } = this.props;

    loadElementsList(filterValues)
      .catch(() => router.push('/system-error'));
  }

  handleCloseSearch() {
    this.props.closeElementSearch();
  }

  handleSelectElement({dataItem}) {
    this.props.setEditMassUpdateElementWorkingModelProperty('newElementId', dataItem.id);
    this.props.closeElementSearch();
  }

  handleSelectAllElements() {
    const {selectAllElements, data, selectedElements} = this.props;
    selectAllElements(data.map(x => x.get('id')), Boolean(selectedElements.size <= 0));
  }

  handleSort({sort}) {
    this.props.sortElementsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterElementsList(filter);
  }

  handlePageChange(event) {
    this.props.pageElementsList(event.page.skip);
  }

  render() {
    const {
      data,
      columnsConfiguration,
      filter,
      loading,
      sort,
      totalElements,
      skip,
      take,
    } = this.props;
    return (
      <Page pageClassName="elements-search-page">
        <PageHeader>
          <PageHeaderActions>
            <div className="clickable" onClick={this.handleCloseSearch}><i className="fa fa-times" /> Close</div>
          </PageHeaderActions>
          <PageTitle>Element Search</PageTitle>
          <PageHeaderActions>
            <div className="flyout-button">
              <TimeFormatSelector />
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer>
              {({width, height}) => (
                <Tooltip openDelay={100} position="top" anchorElement="target">
                  <CustomizableGrid
                    data={fromJS(data)}
                    style={{width, height}}
                    sort={sort}
                    onSort={this.handleSort}
                    filter={filter}
                    onFilter={this.handleFilter}
                    onRowClick={this.handleSelectElement}
                    columns={columnsConfiguration}
                    onPageChange={this.handlePageChange}
                    total={totalElements}
                    skip={skip} take={take} />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <ElementsListFiltersSidebar />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    elements: sortedElementsArraySelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    filter: filterSelector(state),
    data: dataSelector(state),
    selectedElements: selectedElementsSelector(state),
    loading: loadingSelector(state),
    appliedFiltersCount: appliedFiltersCountSelector(state),
    showFilters: showFiltersSelector(state),
    filterValues: filterValuesSelector(state),
    addLocation: addLocationSelector(state),
    sort: sortSelector(state),
    timeFormat: timeFormatSelector(state),
    skip: skipSelector(state),
    take: takeSelector(state),
    totalElements: totalElementsSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    closeElementSearch,
    loadElementsList,
    pageElementsList,
    handleToggleFiltersSidebar: toggleElementsListFiltersSidebar,
    selectElement,
    selectAllElements,
    sortElementsList,
    filterElementsList,
    setEditMassUpdateElementWorkingModelProperty,
  }
)(SearchElementsPage));
