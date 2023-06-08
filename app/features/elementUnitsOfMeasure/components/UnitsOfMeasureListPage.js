import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
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
import {ELEMENTS_LIST_MANAGEMENT} from '../../authentication/constants/permissions';
import {Select} from '../../forms/components';
import {navigationGroups} from '../../shared/constants';
import {
  loadUnitsOfMeasureList,
  sortUnitsOfMeasureList,
  filterUnitsOfMeasureList,
  showCreateUnitOfMeasure,
  selectUnitOfMeasure,
  clearSelectedUnitOfMeasure,
} from '../actions';
import {
  loadingSelector,
  sortedUnitsOfMeasureArraySelector,
  sortSelector,
  filterSelector,
  selectedUnitOfMeasureIdSelector,
  columnsConfigurationSelector,
  dataSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import UnitsOfMeasureListEditSidebar from './UnitsOfMeasureListEditSidebar';
import CreateUnitOfMeasureModal from './CreateUnitOfMeasureModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {fromJS} from 'immutable';

class UnitsOfMeasureListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadUnitsOfMeasureList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Units of Measure list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortUnitsOfMeasureList(sort);
  }

  handleFilter({filter}) {
    this.props.filterUnitsOfMeasureList(filter);
  }

  handleRowClick({dataItem}) {
    const {data, selectedUnitOfMeasureId, selectUnitOfMeasure, clearSelectedUnitOfMeasure} = this.props;

    if (dataItem.id === selectedUnitOfMeasureId) clearSelectedUnitOfMeasure();
    else {
      const newSelection = fromJS(data).find(l => l.get('id') === dataItem.id);
      selectUnitOfMeasure(newSelection);
    }
  }

  render() {
    const {
      loading,
      sort,
      handleShowCreateUnitOfMeasure,
      columnsConfiguration,
      elementListOptions,
      selectedElementListOptionId,
      onListOptionSelected,
      filter,
      data,
      canManageElementsList,
    } = this.props;
    return (
      <Page pageClassName="units-of-measure-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Element List Management</PageTitle>
          <PageHeaderActions>
            {canManageElementsList && <Button onClick={handleShowCreateUnitOfMeasure}><i className="fa fa-plus" /></Button>}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.MEASUREMENTS} />
          <MainContent loading={loading}>
            <Select
              id="elementListOptionId"
              formGroupClassName="element-list-type-selector"
              onChange={onListOptionSelected}
              value={selectedElementListOptionId}
              options={elementListOptions} />
            <AutoSizer>
              {({width, height}) => (
                <CustomizableGrid
                  data={fromJS(data)}
                  style={{width, height: height - 50}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  selectedField="selected"
                  onRowClick={this.handleRowClick}
                  onSelectedChange={this.handleToggleSelect}
                  onHeaderSelectedChange={this.handleSelectAll}
                  columns={columnsConfiguration}
                  canManageElementsList={canManageElementsList} />
              )}
            </AutoSizer>
          </MainContent>
          <UnitsOfMeasureListEditSidebar />
        </PageBody>
        <CreateUnitOfMeasureModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageElementsListSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_LIST_MANAGEMENT);

  return {
    loading: loadingSelector(state),
    unitsOfMeasure: sortedUnitsOfMeasureArraySelector(state),
    data: dataSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    selectedUnitOfMeasureId: selectedUnitOfMeasureIdSelector(state),
    showSidebar: showSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    canManageElementsList: canManageElementsListSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadUnitsOfMeasureList,
    sortUnitsOfMeasureList,
    filterUnitsOfMeasureList,
    handleShowCreateUnitOfMeasure: showCreateUnitOfMeasure,
    selectUnitOfMeasure,
    clearSelectedUnitOfMeasure,
  }
)(UnitsOfMeasureListPage));
