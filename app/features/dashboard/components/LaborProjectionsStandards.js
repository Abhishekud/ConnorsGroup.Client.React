import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {AutoSizer} from 'react-virtualized';
import {ClearFiltersButton, ClearSortsButton, CustomizableGrid} from '../../customizableGrid/components';
import {
  getDashboardLaborProjectionsStandards,
  sortDashboardLaborProjectionsStandardsList,
  filterDashboardLaborProjectionsStandardsList,
  clearStandardDashboardLaborProjectionsFilters,
  clearStandardDashboardLaborProjectionsSorts,
} from '../actions';
import {
  selectedTabSelector,
  activeBackgroundJobsSelector,
  isActiveBackgroundJobsUpdatedSelector,
} from '../selectors/pages/dashboard';
import {
  sortedListEntryModelsSelector,
  treemapEntryModelsSelector,
  sortSelector,
  columnConfigurationSelector,
  filterSelector,
  dataSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  isGridDataLoadingSelector,
} from '../selectors/pages/standards';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import GenericHeader from './GenericHeader';
import LaborProjectionsTreemap from './LaborProjectionsTreemap';
import LaborProjectionsNavigation from './LaborProjectionsNavigation';
import {TREEMAP, TABLE} from '../constants/tabs';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {isLaborHoursEnabledSelector} from '../../shared/selectors/components/settings';

class LaborProjectionsStandards extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {getDashboardLaborProjectionsStandards, selectedLocationId, selectedDepartmentId, router, activeBackgroundJobs, isActiveBackgroundJobsUpdated} = this.props;

    if (isActiveBackgroundJobsUpdated && !activeBackgroundJobs) {
      getDashboardLaborProjectionsStandards(selectedLocationId, selectedDepartmentId)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load standard labor hours.', 'Error'));
    }
  }

  handleSort({sort}) {
    this.props.sortDashboardLaborProjectionsStandardsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterDashboardLaborProjectionsStandardsList(filter);
  }

  handleClearFilters() {
    this.props.clearStandardDashboardLaborProjectionsFilters();
  }

  handleClearSorts() {
    this.props.clearStandardDashboardLaborProjectionsSorts();
  }

  handleRowClick({dataItem}) {
    const {router} = this.props;
    router.push(`/standards/${dataItem.id}?return=dashboard%3Freturn%3Dtrue`);
  }

  handleTreeClick(standardId) {
    const {router} = this.props;
    router.push(`/standards/${standardId}?return=dashboard%3Freturn%3Dtrue`);
  }

  render() {
    const {treemapEntryModels, sort, selectedTab, columns, filter, data, hideClearFiltersButton,
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
            onClick={this.handleTreeClick}
            laborHoursFormat="0,0.0000"
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

LaborProjectionsStandards.propTypes = {
  selectedLocationId: PropTypes.number.isRequired,
  selectedDepartmentId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    listEntryModels: sortedListEntryModelsSelector(state),
    treemapEntryModels: treemapEntryModelsSelector(state),
    data: dataSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    columns: columnConfigurationSelector(state),
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
    getDashboardLaborProjectionsStandards,
    sortDashboardLaborProjectionsStandardsList,
    filterDashboardLaborProjectionsStandardsList,
    clearStandardDashboardLaborProjectionsFilters,
    clearStandardDashboardLaborProjectionsSorts,
  }
)(LaborProjectionsStandards));
