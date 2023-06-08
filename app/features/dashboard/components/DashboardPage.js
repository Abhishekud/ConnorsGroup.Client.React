import React, {Component} from 'react';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {
  clearSelectedDashboardLaborProjectionsData,
  getDashboardStats,
  getTotalLaborHours,
  resetIsActiveBackgroundJobsUpdated,
  selectNavigationBarItem,
  reloadDashboardDataByKey,
} from '../actions';
import {pollBackgroundJobs} from '../../shared/actions';
import {
  statsSelector,
  loadingSelector,
  selectedLevelOptionIdSelector,
  selectedLocationIdSelector,
  selectedDepartmentIdSelector,
  activeBackgroundJobsSelector,
  backgroundJobStartedSelector,
  showTotalLaborHoursStatsSelector,
  isTotalLaborHoursLoadingSelector,
  isActiveBackgroundJobsUpdatedSelector,
  dashboardReloadKeySelector,
} from '../selectors/pages/dashboard';
import {
  departmentNameSelector,
  locationNameSelector,
} from '../../shared/selectors/components/settings';
import {
  ORG_HIERARCHY_LEVELS,
  STANDARD_STATUSES,
} from '../../selectListOptions/constants/selectListTypes';
import {
  makeSelectListOptionsArraySelector,
} from '../../selectListOptions/selectors';
import DashboardStats from './DashboardStats';
import NavigationBar from './NavigationBar';
import LaborProjections from './LaborProjections';
import {handleApiError} from '../../shared/services';
import {withRouter} from 'react-router';
import {
  POLL_INTERVAL,
  LOCATIONS_STANDARDS,
  CALCULATE_LABOR,
} from '../../shared/constants/backgroundJobs';
import moment from 'moment';
import {loadSelectListOptions} from '../../selectListOptions/actions';

class DashboardPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {getDashboardStats, router, clearSelectedDashboardLaborProjectionsData,
      location, loadSelectListOptions, getTotalLaborHours} = this.props;

    if (!location.query.return) clearSelectedDashboardLaborProjectionsData(true);
    loadSelectListOptions(ORG_HIERARCHY_LEVELS);

    getDashboardStats()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the dashboard.', 'Error'));
    getTotalLaborHours()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the total labor hours.', 'Error'));

    this.checkBackgroundJobs();
    this.pollTimer = setInterval(this.checkBackgroundJobs, POLL_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    this.pollTimer = null;
    this.props.resetIsActiveBackgroundJobsUpdated();
  }

  checkBackgroundJobs() {
    const {
      pollBackgroundJobs,
      getTotalLaborHours,
      router,
      isActiveBackgroundJobsUpdated,
      activeBackgroundJobs,
    } = this.props;
    const oldIsActiveBackgroundJobsUpdated = isActiveBackgroundJobsUpdated;
    const oldActiveBackgroundJobs = activeBackgroundJobs;

    pollBackgroundJobs([LOCATIONS_STANDARDS, CALCULATE_LABOR])
      .then(() => {
        const {activeBackgroundJobs, backgroundJobStarted, isActiveBackgroundJobsUpdated,
          clearSelectedDashboardLaborProjectionsData, selectNavigationBarItem, reloadDashboardDataByKey} = this.props;

        // if background job is started, reset dashboard for calculation.
        if (!oldActiveBackgroundJobs && activeBackgroundJobs) {
          clearSelectedDashboardLaborProjectionsData(false);
          selectNavigationBarItem(0);
        }

        // if background job is completed, reload total labor hours and list.
        if (!activeBackgroundJobs && backgroundJobStarted) {
          getTotalLaborHours()
            .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the total labor hours.', 'Error'));
          reloadDashboardDataByKey();
        } else if (!oldIsActiveBackgroundJobsUpdated && isActiveBackgroundJobsUpdated) {
          // here refresh key is updated to re-render child components when isActiveBackgroundJobsUpdated is updated from false to true
          // on this page, this case will appear only once when first call of background job poll is completed.
          reloadDashboardDataByKey();
        }
      });
  }

  render() {
    const {
      stats,
      departmentName,
      locationName,
      loading,
      selectedLevelOptionId,
      selectedLocationId,
      selectedDepartmentId,
      selectedAttributeId,
      activeBackgroundJobs,
      showTotalLaborHoursStats,
      isTotalLaborHoursLoading,
      dashboardReloadKey,
    } = this.props;

    const laborProjectionsLastUpdated = stats.get('laborProjectionsLastUpdated');

    let recalcStatus = null;
    if (activeBackgroundJobs) {
      recalcStatus = <i className="fa fa-spinner fa-spin" title="Calculation in progress" />;
    } else if (laborProjectionsLastUpdated && !isTotalLaborHoursLoading) {
      recalcStatus = <div className="generated-timestamp">
        Last Updated: {moment(laborProjectionsLastUpdated).local().format('L LT')}
      </div>;
    }

    return (
      <Page pageClassName="dashboard-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Labor Projections Dashboard</PageTitle>
          <PageHeaderActions>
            {recalcStatus}
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <NavigationSidebar />
          <MainContent loading={loading}>
            <div className="dashboard">
              <DashboardStats
                model={stats}
                departmentName={departmentName}
                locationName={locationName}
                showTotalLaborHoursStats={showTotalLaborHoursStats}
                activeBackgroundJobs={activeBackgroundJobs}
                isTotalLaborHoursLoading={isTotalLaborHoursLoading} />
              <NavigationBar />
              <LaborProjections
                key={dashboardReloadKey}
                selectedLevelOptionId={selectedLevelOptionId}
                selectedLocationId={selectedLocationId}
                selectedDepartmentId={selectedDepartmentId}
                selectedAttributeId={selectedAttributeId} />
            </div>
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const standardStatusesSelector = makeSelectListOptionsArraySelector(STANDARD_STATUSES);

  return {
    loading: loadingSelector(state),
    stats: statsSelector(state),
    selectedLevelOptionId: selectedLevelOptionIdSelector(state),
    selectedLocationId: selectedLocationIdSelector(state),
    selectedDepartmentId: selectedDepartmentIdSelector(state),
    departmentName: departmentNameSelector(state),
    locationName: locationNameSelector(state),
    standardStatuses: standardStatusesSelector(state),
    activeBackgroundJobs: activeBackgroundJobsSelector(state),
    backgroundJobStarted: backgroundJobStartedSelector(state),
    showTotalLaborHoursStats: showTotalLaborHoursStatsSelector(state),
    isTotalLaborHoursLoading: isTotalLaborHoursLoadingSelector(state),
    isActiveBackgroundJobsUpdated: isActiveBackgroundJobsUpdatedSelector(state),
    dashboardReloadKey: dashboardReloadKeySelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    clearSelectedDashboardLaborProjectionsData,
    getDashboardStats,
    pollBackgroundJobs,
    loadSelectListOptions,
    getTotalLaborHours,
    resetIsActiveBackgroundJobsUpdated,
    selectNavigationBarItem,
    reloadDashboardDataByKey,
  }
)(DashboardPage));
