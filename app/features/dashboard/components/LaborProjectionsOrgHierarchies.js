import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import pluralize from 'pluralize';
import {AutoSizer} from 'react-virtualized';
import {CustomizableGrid} from '../../customizableGrid/components';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {
  getDashboardLaborProjectionsOrgHierarchiesTopLevel,
  getDashboardLaborProjectionsOrgHierarchiesSubLevel,
  sortDashboardLaborProjectionsOrgHierarchiesList,
  filterDashboardLaborProjectionsOrgHierarchiesList,
  selectDashboardLaborProjectionsLocation,
  selectDashboardLaborProjectionsLevelOptionId,
  selectNavigationBarItem,
} from '../actions';
import {
  selectedLocationIdSelector,
  selectedLevelOptionIdSelector,
  navbarSelectedValueSelector,
  isGridDataLoadingSelector,
  activeBackgroundJobsSelector,
  isActiveBackgroundJobsUpdatedSelector,
} from '../selectors/pages/dashboard';
import {
  sortedListEntryModelsSelector,
  columnConfigurationSelector,
  sortSelector,
  filterSelector,
  dataSelector,
  levelNameSelector,
  levelNumberSelector,
  levelOptionNameSelector,
} from '../selectors/pages/orgHierarchies';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {ORG_HIERARCHY_LEVELS} from '../../selectListOptions/constants/selectListTypes';
import {makeSelectListOptionsArraySelector} from '../../selectListOptions/selectors';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {MAX_VISIBLE_LEVELS} from '../constants/navbar';

class LaborProjectionsOrgHierarchies extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {getDashboardLaborProjectionsOrgHierarchiesTopLevel, router, navbarSelectedValue, activeBackgroundJobs, isActiveBackgroundJobsUpdated} = this.props;
    if (navbarSelectedValue === 0) return;

    if (isActiveBackgroundJobsUpdated && !activeBackgroundJobs) {
      getDashboardLaborProjectionsOrgHierarchiesTopLevel(navbarSelectedValue)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to load labor hours.', 'Error'));
    }
  }

  handleSort({sort}) {
    this.props.sortDashboardLaborProjectionsOrgHierarchiesList(sort);
  }

  handleFilter({filter}) {
    this.props.filterDashboardLaborProjectionsOrgHierarchiesList(filter);
  }

  handleRowClick({dataItem}) {

    const {getDashboardLaborProjectionsOrgHierarchiesSubLevel, selectNavigationBarItem,
      selectDashboardLaborProjectionsLevelOptionId, levelNumber} = this.props;

    const orgOptionId = dataItem.id;
    const maxLevel = Math.max(...this.props.orgHierarchyLevels.map(x => x.value));

    if (maxLevel === levelNumber) {
      selectNavigationBarItem(0);
      selectDashboardLaborProjectionsLevelOptionId(orgOptionId, Math.max(maxLevel + 1 - MAX_VISIBLE_LEVELS, 0));
      return;
    }
    getDashboardLaborProjectionsOrgHierarchiesSubLevel(orgOptionId);
  }

  render() {
    const {columns, data, sort, filter, levelOptionName, levelName, isGridDataLoading, activeBackgroundJobs} = this.props;

    return (
      <div className="labor-projections">
        <div className="header-info">
          <div className="title-block">
            <div className="title-prefix">{levelOptionName || levelName} :</div>
            <div className="title">All {pluralize(levelName)}</div>
          </div>
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

function mapStateToProps(state) {
  const orgHierarchyLevelsSelector = makeSelectListOptionsArraySelector(ORG_HIERARCHY_LEVELS);

  return {
    listEntryModels: sortedListEntryModelsSelector(state),
    columns: columnConfigurationSelector(state),
    sort: sortSelector(state),
    filter: filterSelector(state),
    data: dataSelector(state),
    departmentName: departmentNameSelector(state),
    locationName: locationNameSelector(state),
    selectedLocationId: selectedLocationIdSelector(state),
    navbarSelectedValue: navbarSelectedValueSelector(state),
    levelName: levelNameSelector(state),
    levelNumber: levelNumberSelector(state),
    orgHierarchyLevels: orgHierarchyLevelsSelector(state),
    selectedLevelNumber: selectedLevelOptionIdSelector(state),
    levelOptionName: levelOptionNameSelector(state),
    isGridDataLoading: isGridDataLoadingSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    isActiveBackgroundJobsUpdated: isActiveBackgroundJobsUpdatedSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    getDashboardLaborProjectionsOrgHierarchiesTopLevel,
    getDashboardLaborProjectionsOrgHierarchiesSubLevel,
    sortDashboardLaborProjectionsOrgHierarchiesList,
    filterDashboardLaborProjectionsOrgHierarchiesList,
    selectDashboardLaborProjectionsLocation,
    selectDashboardLaborProjectionsLevelOptionId,
    selectNavigationBarItem,
  }
)(LaborProjectionsOrgHierarchies));
