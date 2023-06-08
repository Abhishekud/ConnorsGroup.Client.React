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
import {layout, navigationGroups} from '../../shared/constants';
import {
  loadActivitiesList,
  sortActivitiesList,
  showCreateActivity,
  selectActivity,
  clearSelectedActivity,
  filterActivitiesList,
} from '../actions';
import {
  loadingSelector,
  sortSelector,
  selectedActivityIdSelector,
  columnsConfigurationSelector,
  filterSelector,
  dataSelector,
} from '../selectors/pages/list';
import {
  showSelector,
} from '../selectors/sidebars/edit';
import ActivitiesListEditSidebar from './ActivitiesListEditSidebar';
import CreateActivityModal from './CreateActivityModal';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {fromJS} from 'immutable';

class ActivitiesListPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router} = this.props;
    this.props.loadActivitiesList()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Activities list.', 'Error'));
  }

  handleSort({sort}) {
    this.props.sortActivitiesList(sort);
  }

  handleFilter({filter}) {
    this.props.filterActivitiesList(filter);
  }

  handleRowClick({dataItem}) {
    const {data, selectedActivityId, selectActivity, clearSelectedActivity} = this.props;
    if (dataItem.id === selectedActivityId) clearSelectedActivity();
    else {
      const newSelection = fromJS(data).find(l => l.get('id') === dataItem.id);
      selectActivity(newSelection);
    }
  }

  render() {
    const {
      loading,
      data,
      sort,
      handleShowCreateActivity,
      filter,
      columnsConfiguration,
      elementListOptions,
      selectedElementListOptionId,
      onListOptionSelected,
      showSidebar,
      canManageElementsList,
    } = this.props;
    const sidebarsShown = showSidebar ? 1 : 0;
    return (
      <Page pageClassName="units-of-measure-list-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Element List Management</PageTitle>
          <PageHeaderActions>
            {canManageElementsList && <Button onClick={handleShowCreateActivity}><i className="fa fa-plus" /></Button>}
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
                  style={{width: width + (sidebarsShown * layout.SIDEBAR_WIDTH), height: height - 50}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  selectedField="selected"
                  onRowClick={this.handleRowClick}
                  onSelectedChange={this.handleToggleSelect}
                  onHeaderSelectedChange={this.handleSelectAll}
                  columns={columnsConfiguration} />
              )}
            </AutoSizer>
          </MainContent>
          <ActivitiesListEditSidebar />
        </PageBody>
        <CreateActivityModal />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canManageElementsListSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_LIST_MANAGEMENT);

  return {
    loading: loadingSelector(state),
    data: dataSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    selectedActivityId: selectedActivityIdSelector(state),
    showSidebar: showSelector(state),
    columnsConfiguration: columnsConfigurationSelector(state),
    canManageElementsList: canManageElementsListSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    filterActivitiesList,
    loadActivitiesList,
    sortActivitiesList,
    handleShowCreateActivity: showCreateActivity,
    selectActivity,
    clearSelectedActivity,
  }
)(ActivitiesListPage));
