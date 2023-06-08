import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {ClearFiltersButton, ClearSortsButton, CustomizableGrid} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {
  getDashboardLaborProjectionsDepartments,
  sortDashboardLaborProjectionsDepartmentsList,
  filterDashboardLaborProjectionsDepartmentsList,
  selectDashboardLaborProjectionsDepartment,
  clearDepartmentDashboardLaborProjectionsFilters,
  clearDepartmentDashboardLaborProjectionsSorts,
} from '../actions';
import {
  selectedTabSelector,
  activeBackgroundJobsSelector,
  isActiveBackgroundJobsUpdatedSelector,
} from '../selectors/pages/dashboard';
import {
  columnConfigurationSelector,
  dataSelector,
  filterSelector,
  sortedListEntryModelsSelector,
  treemapEntryModelsSelector,
  sortSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  isGridDataLoadingSelector,
} from '../selectors/pages/departments';
import {
  departmentNameSelector,
  isLaborHoursEnabledSelector,
} from '../../shared/selectors/components/settings';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import GenericHeader from './GenericHeader';
import LaborProjectionsTreemap from './LaborProjectionsTreemap';
import LaborProjectionsNavigation from './LaborProjectionsNavigation';
import {TREEMAP, TABLE} from '../constants/tabs';
import {fromJS} from 'immutable';

class LaborProjectionsDepartments extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {getDashboardLaborProjectionsDepartments, selectedLocationId, router, departmentName, activeBackgroundJobs, isActiveBackgroundJobsUpdated} = this.props;

    if (isActiveBackgroundJobsUpdated && !activeBackgroundJobs) {
      getDashboardLaborProjectionsDepartments(selectedLocationId)
        .catch(error => handleApiError(error, router, `An error occurred while attempting to load ${departmentName} labor hours.`, 'Error'));
    }
  }

  handleSort({sort}) {
    this.props.sortDashboardLaborProjectionsDepartmentsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterDashboardLaborProjectionsDepartmentsList(filter);
  }

  handleClearFilters() {
    this.props.clearDepartmentDashboardLaborProjectionsFilters();
  }

  handleClearSorts() {
    this.props.clearDepartmentDashboardLaborProjectionsSorts();
  }

  handleRowClick({dataItem}) {
    const {selectDashboardLaborProjectionsDepartment} = this.props;
    selectDashboardLaborProjectionsDepartment(fromJS(dataItem));
  }

  handleTreemapClick(departmentId) {
    const {listEntryModels, selectDashboardLaborProjectionsDepartment} = this.props;
    selectDashboardLaborProjectionsDepartment(listEntryModels.find(m => m.get('id') === departmentId));
  }

  render() {
    const {columns, treemapEntryModels, filter, sort, data, selectedTab, hideClearFiltersButton,
      hideClearSortsButton, isLaborHoursEnabled, isGridDataLoading, activeBackgroundJobs} = this.props;

    return (
      <div className="labor-projections">
        <GenericHeader>
          <ClearFiltersButton className={'dashboard-reset-buttons'} hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
          <ClearSortsButton className={'dashboard-reset-buttons'} hide={hideClearSortsButton} onClear={this.handleClearSorts} />
        </GenericHeader>
        <LaborProjectionsNavigation />
        {selectedTab === TREEMAP
          ? <LaborProjectionsTreemap
            models={treemapEntryModels}
            laborHoursFormat="0,0.00"
            onClick={this.handleTreemapClick}
            isLaborHoursEnabled={isLaborHoursEnabled} />
          : null}
        {selectedTab === TABLE
          ? <AutoSizer>
            {({width, height}) => (
              <Tooltip openDelay={100} position="top" anchorElement="target">
                <CustomizableGrid
                  data={data}
                  style={{width, height: height - 135}}
                  sort={sort}
                  onSort={this.handleSort}
                  filter={filter}
                  onFilter={this.handleFilter}
                  selectedField="selected"
                  onRowClick={this.handleRowClick}
                  onSelectedChange={this.handleToggleSelect}
                  onHeaderSelectedChange={this.handleSelectAll}
                  columns={columns}
                  isGridDataLoading={activeBackgroundJobs || isGridDataLoading}
                  gridDataLoadingMessage={activeBackgroundJobs && 'Calculation in progress...'} />
              </Tooltip>
            )}
          </AutoSizer>
          : null}
      </div>
    );
  }
}

LaborProjectionsDepartments.propTypes = {
  selectedLocationId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    listEntryModels: sortedListEntryModelsSelector(state),
    data: dataSelector(state),
    columns: columnConfigurationSelector(state),
    treemapEntryModels: treemapEntryModelsSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    departmentName: departmentNameSelector(state),
    selectedTab: selectedTabSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    isLaborHoursEnabled: isLaborHoursEnabledSelector(state),
    isGridDataLoading: isGridDataLoadingSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    isActiveBackgroundJobsUpdated: isActiveBackgroundJobsUpdatedSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    getDashboardLaborProjectionsDepartments,
    sortDashboardLaborProjectionsDepartmentsList,
    filterDashboardLaborProjectionsDepartmentsList,
    selectDashboardLaborProjectionsDepartment,
    clearDepartmentDashboardLaborProjectionsFilters,
    clearDepartmentDashboardLaborProjectionsSorts,
  }
)(LaborProjectionsDepartments));
