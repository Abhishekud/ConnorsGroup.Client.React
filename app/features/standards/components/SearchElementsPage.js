import React, {Component} from 'react';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {handleApiError, toastr} from '../../shared/services';
import {CustomizableGrid} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {AutoSizer} from 'react-virtualized';
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
  addElements,
  loadStandardDetails,
  showSelectUnitOfMeasure,
} from '../actions';
import {
  loadingSelector,
  addLocationSelector,
} from '../selectors/pages/searchElements';
import {
  toggleElementsListFiltersSidebar,
  loadElementsList,
  selectElement,
  selectAllElements,
  sortElementsList,
  filterElementsList,
  toggleSelectElements,
} from '../../elements/actions';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {TimeFormatSelector} from '../../shared/components';
import {
  columnsConfigurationSelector,
  dataSelector,
  sortedElementsArraySelector,
  sortSelector,
  filterSelector,
  selectedElementsSelector,
} from '../../elements/selectors/pages/list';
import {
  appliedCountSelector as appliedFiltersCountSelector,
  showSelector as showFiltersSelector,
  modelSelector as filterValuesSelector,
} from '../../elements/selectors/sidebars/filters';
import {
  ElementsListFiltersSidebar,
} from '../../elements/components';
import {fromJS} from 'immutable';
import {
  departmentIdSelector,
} from '../selectors/sidebars/standardDetails';
import SelectUnitOfMeasureModal from '../components/SelectUnitOfMeasureModal';
import {selectedUnitOfMeasureSelector} from '../selectors/modals/select';

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

    loadElementsList(filterValues.set('excludeArchivedElements', true))
      .catch(() => router.push('/system-error'));
  }

  handleCloseSearch() {
    this.props.closeElementSearch();
  }

  handleSave() {
    const {selectedElements, addLocation, router, selectedUnitOfMeasure} = this.props;

    this.props.addElements(
      addLocation.get('standardId'),
      selectedElements.valueSeq().map(e => e.get('id')),
      addLocation.get('insertAtIndex'),
      addLocation.get('standardElementGroupId'),
      selectedUnitOfMeasure
    ).then(() => {
      this.props.closeElementSearch();
      this.props.loadStandardDetails(addLocation.get('standardId'));
    }).catch(error => {
      const {status} = error.response || {};
      if (status === 400) {
        if (error.response.data.elementIds) {
          for (const errors of error.response.data.elementIds) {
            toastr.error(errors, 'Error');
          }
        }
        if (error.response.data.unitOfMeasureId) {
          for (const errors of error.response.data.unitOfMeasureId) {
            toastr.error(errors, 'Error');
          }
        }
        return;
      }
      handleApiError(error, router, 'An error occurred while attempting to add the Element(s) to the Standard.');
    });
  }

  handleAddElements() {
    const {selectedElements, showSelectUnitOfMeasure} = this.props;

    if (selectedElements.size <= 0) {
      toastr.error('No elements selected');
      return;
    }

    showSelectUnitOfMeasure();
  }

  handleSelectAll() {
    const {data, selectedElements, selectAllElements} = this.props;
    selectAllElements(data.map(x => x.get('id')), Boolean(selectedElements.size === 0));
  }

  handleToggleSelect({dataItem}) {
    const {toggleSelectElements} = this.props;
    toggleSelectElements(dataItem.id);
  }

  handleSort({sort}) {
    this.props.sortElementsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterElementsList(filter);
  }

  render() {
    const {
      data,
      loading,
      sort,
      filter,
      columnsConfiguration,
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
              <Button bsStyle="primary" onClick={this.handleAddElements}>Add</Button>
            </div>
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
                    selectedField="selected"
                    onRowClick={this.handleToggleSelect}
                    onSelectedChange={this.handleToggleSelect}
                    onHeaderSelectedChange={this.handleSelectAll}
                    columns={columnsConfiguration} />
                </Tooltip>
              )}
            </AutoSizer>
          </MainContent>
          <ElementsListFiltersSidebar excludeArchivedElements />
          <SelectUnitOfMeasureModal onSaveUoM={this.handleSave} />
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: dataSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    elements: sortedElementsArraySelector(state),
    selectedElements: selectedElementsSelector(state),
    loading: loadingSelector(state),
    appliedFiltersCount: appliedFiltersCountSelector(state),
    showFilters: showFiltersSelector(state),
    filterValues: filterValuesSelector(state),
    addLocation: addLocationSelector(state),
    sort: sortSelector(state),
    timeFormat: timeFormatSelector(state),
    filter: filterSelector(state),
    departmentId: departmentIdSelector(state),
    selectedUnitOfMeasure: selectedUnitOfMeasureSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    closeElementSearch,
    loadElementsList,
    handleToggleFiltersSidebar: toggleElementsListFiltersSidebar,
    addElements,
    selectElement,
    selectAllElements,
    sortElementsList,
    filterElementsList,
    loadStandardDetails,
    toggleSelectElements,
    showSelectUnitOfMeasure,
  }
)(SearchElementsPage));
