import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import pluralize from 'pluralize';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid, ClearFiltersButton, ClearSortsButton} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {
  getDashboardLaborProjectionsLocationsByOrgOptionId,
  sortDashboardLaborProjectionsLocationsList,
  selectDashboardLaborProjectionsLocation,
  filterDashboardLaborProjectionsLocationsList,
  clearLocationDashboardLaborProjectionsFilters,
  clearLocationDashboardLaborProjectionsSorts,
} from '../actions';
import {
  selectedLevelOptionIdSelector,
  activeBackgroundJobsSelector,
  isActiveBackgroundJobsUpdatedSelector,
} from '../selectors/pages/dashboard';
import {
  sortSelector,
  levelOptionNameSelector,
  columnConfigurationSelector,
  dataSelector,
  filterSelector,
  hideClearFiltersButtonSelector,
  hideClearSortsButtonSelector,
  isGridDataLoadingSelector,
} from '../selectors/pages/locations';
import {
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {fromJS} from 'immutable';

class LaborProjectionsLocations extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {getDashboardLaborProjectionsLocationsByOrgOptionId, router, selectedLevelOptionId, activeBackgroundJobs, isActiveBackgroundJobsUpdated} = this.props;

    if (isActiveBackgroundJobsUpdated && !activeBackgroundJobs) {
      getDashboardLaborProjectionsLocationsByOrgOptionId(selectedLevelOptionId)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load labor hours.', 'Error'));
    }
  }

  handleSort({sort}) {
    this.props.sortDashboardLaborProjectionsLocationsList(sort);
  }

  handleFilter({filter}) {
    this.props.filterDashboardLaborProjectionsLocationsList(filter);
  }

  handleClearFilters() {
    this.props.clearLocationDashboardLaborProjectionsFilters();
  }

  handleClearSorts() {
    this.props.clearLocationDashboardLaborProjectionsSorts();
  }

  handleRowClick({dataItem}) {
    const {selectDashboardLaborProjectionsLocation} = this.props;
    selectDashboardLaborProjectionsLocation(fromJS(dataItem));
  }

  render() {
    const {data, columns, sort, locationName, filter, levelOptionName, hideClearFiltersButton, hideClearSortsButton,
      isGridDataLoading, activeBackgroundJobs, selectedLevelOptionId} = this.props;

    return (
      <div className="labor-projections">
        <div className="header-info">
          <div className="title-block">
            <div className="title-prefix">{selectedLevelOptionId === 0 ? locationName : levelOptionName} :</div>
            <div className="title">All {pluralize(locationName)}</div>
          </div>
          <ClearFiltersButton className={'dashboard-reset-buttons'} hide={hideClearFiltersButton} onClear={this.handleClearFilters} />
          <ClearSortsButton className={'dashboard-reset-buttons'} hide={hideClearSortsButton} onClear={this.handleClearSorts} />
        </div>
        <AutoSizer>
          {({width, height}) => (
            <Tooltip openDelay={100} position="top" anchorElement="target">
              <CustomizableGrid
                data={data}
                style={{width, height: height - 90}}
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
      </div>
    );
  }
}

LaborProjectionsLocations.propTypes = {
  selectedLevelOptionId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    columns: columnConfigurationSelector(state),
    data: dataSelector(state),
    filter: filterSelector(state),
    sort: sortSelector(state),
    locationName: locationNameSelector(state),
    selectedLevelOptionId: selectedLevelOptionIdSelector(state),
    levelOptionName: levelOptionNameSelector(state),
    hideClearFiltersButton: hideClearFiltersButtonSelector(state),
    hideClearSortsButton: hideClearSortsButtonSelector(state),
    isGridDataLoading: isGridDataLoadingSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    isActiveBackgroundJobsUpdated: isActiveBackgroundJobsUpdatedSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    getDashboardLaborProjectionsLocationsByOrgOptionId,
    sortDashboardLaborProjectionsLocationsList,
    filterDashboardLaborProjectionsLocationsList,
    selectDashboardLaborProjectionsLocation,
    clearLocationDashboardLaborProjectionsFilters,
    clearLocationDashboardLaborProjectionsSorts,
  }
)(LaborProjectionsLocations));
