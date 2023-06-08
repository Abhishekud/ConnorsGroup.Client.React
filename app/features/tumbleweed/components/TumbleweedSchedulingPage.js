import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import TumbleweedScheduleItem from './TumbleweedScheduleItem';
import ScheduleModal from './ScheduleModal';
import {handleApiError, toastr} from '../../shared/services';
import {KRONOS_INTEGRATION_VERSION_ENUM_INDEX} from '../../kronos/constants/KronosVersions';
import {
  MainContent,
  NavigationSidebar,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {navigationGroups} from '../../shared/constants';
import {
  loadTumbleweedSchedules,
  saveTumbleweedIntegration,
  showEditTumbleweedSchedule,
  showSkipTumbleweedExport,
  showConfirmResumeExport,
  showDeleteTumbleweedSchedule,
  loadTumbleweedIntegration,
} from '../actions';
import {configurationKronosVersion} from '../../shared/selectors/components/settings';
import {
  loadingSelector,
  tumbleweedSchedulesSelector,
} from '../selectors/pages/schedules';
import {tumbleweedEndpointSelector} from '../selectors/pages/endpoint';
import {showSelector as showEditSelector} from '../selectors/modals/edit';
import {showSelector as showSkipSelector} from '../selectors/modals/skip';
import {showSelector as showConfirmResumeSelector} from '../selectors/modals/confirmResume';
import {showSelector as showDeleteSelector} from '../selectors/modals/delete';
import SkipScheduleModal from './SkipScheduleModal';
import ConfirmResumeExportSchedule from './ConfirmResumeExportSchedule';
import ConfirmDeleteExportSchedule from './ConfirmDeleteExportSchedule';
import {UOMDraft, UOMProduction, WIM, WIM_KRONOS} from '../services/scheduleTypeToName';
import {DRAFT, PRODUCTION} from '../../locationsStandardsExport/constants/DataSources';
import {exportLocationsStandardsToTumbleweed} from '../../locationsStandardsExport/actions';
import {
  submitWimTumbleweedExportRequest,
  submitWimKronosTumbleweedExportRequest,
  submitWimKronosTumbleweedExportRequestWithHashes,
} from '../../kronos/laborStandard/actions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {
  TUMBLEWEED_SCHEDULE_EDIT,
  TUMBLEWEED_SCHEDULE_SKIP_RESUME,
  TUMBLEWEED_SCHEDULE_DELETE,
  TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_DRAFT_EXPORT,
  TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_PRODUCTION_EXPORT,
  TUMBLEWEED_KRONOS_WIM_EXPORT,
} from '../../authentication/constants/permissions';

import {DRAFT as DRAFT_STANDARDS, PRODUCTION as PRODUCTION_STANDARDS} from '../../standards/constants/standardStatuses';

class TumbleweedSchedulingPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {router, loadTumbleweedSchedules, loadTumbleweedIntegration, kronosVersion} = this.props;
    if (kronosVersion !== KRONOS_INTEGRATION_VERSION_ENUM_INDEX.TUMBLEWEED) {
      window.location.href = '/';
    }
    loadTumbleweedSchedules()
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the schedules.'));
    loadTumbleweedIntegration()
      .then(result => {
        if (!result.action.payload.data.enabled) window.location.href = '/';
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the integration.'));
  }

  handleManualExport(scheduleType) {
    const {
      exportLocationsStandardsToTumbleweed,
      submitWimTumbleweedExportRequest,
      submitWimKronosTumbleweedExportRequest,
      submitWimKronosTumbleweedExportRequestWithHashes,
      tumbleweedEndpoint,
    } = this.props;

    const hashKronosWimFeatureFlag = tumbleweedEndpoint.get('hashKronosWimExport');
    const message = 'The export request has been submitted.';
    const title = 'Request submitted';

    switch (scheduleType) {
      case UOMDraft:
        exportLocationsStandardsToTumbleweed(DRAFT, null)
          .then(() => toastr.success(message, title));
        break;
      case UOMProduction:
        exportLocationsStandardsToTumbleweed(PRODUCTION, null)
          .then(() => toastr.success(message, title));
        break;
      case WIM:
        submitWimTumbleweedExportRequest([], null, true)
          .then(() => toastr.success(message, title));
        break;
      case WIM_KRONOS:
        if (hashKronosWimFeatureFlag) {
          submitWimKronosTumbleweedExportRequestWithHashes([], null, true)
            .then(() => toastr.success(message, title));
        } else {
          submitWimKronosTumbleweedExportRequest([], null, true)
            .then(() => toastr.success(message, title));
        }
        break;
    }
  }

  render() {
    const {
      loading,
      schedules,
      scheduleModalVisible,
      skipModalVisible,
      showEditTumbleweedSchedule,
      showSkipTumbleweedExport,
      showConfirmResumeExport,
      showDeleteTumbleweedSchedule,
      deleteModalVisible,
      confirmModalVisible,
      tumbleweedEndpoint,
      canEdit,
      canSkipResume,
      canExportDraft,
      canExportProduction,
      canExportWIM,
      canDelete,
    } = this.props;
    const endpointEnabled = tumbleweedEndpoint && tumbleweedEndpoint.get('enabled');
    return (
      <Page pageClassName="tumbleweed-scheduling-page">
        <PageHeader>
          <PageHeaderActions />
          <PageTitle>Export Scheduling</PageTitle>
          <PageHeaderActions />
        </PageHeader>
        <PageBody>
          <NavigationSidebar selectedNavigationGroup={navigationGroups.TUMBLEWEED_MODULE} />
          <MainContent loading={loading}>
            {!loading &&
              <>
                <TumbleweedScheduleItem
                  title="Draft Output File"
                  description={<div>An export of all draft files produced in <Link to={`/locations-standards-export/${DRAFT_STANDARDS}`}>Standards and UOMs by Locations</Link></div>}
                  schedule={schedules.get('draftSchedule')}
                  canEdit={canEdit}
                  canSkipResume={canSkipResume}
                  canExport={canExportDraft}
                  canDelete={canDelete}
                  onEdit={showEditTumbleweedSchedule}
                  onSkip={showSkipTumbleweedExport}
                  onConfirmResume={showConfirmResumeExport}
                  onConfirmDelete={showDeleteTumbleweedSchedule}
                  onManualExport={endpointEnabled ? this.handleManualExport : null} />
                <hr />
                <TumbleweedScheduleItem
                  title="Production Output File"
                  description={<div>An export of all production files produced in <Link to={`/locations-standards-export/${PRODUCTION_STANDARDS}`}>Standards and UOMs by Locations</Link></div>}
                  schedule={schedules.get('productionSchedule')}
                  canEdit={canEdit}
                  canSkipResume={canSkipResume}
                  canExport={canExportProduction}
                  canDelete={canDelete}
                  onEdit={showEditTumbleweedSchedule}
                  onSkip={showSkipTumbleweedExport}
                  onConfirmResume={showConfirmResumeExport}
                  onConfirmDelete={showDeleteTumbleweedSchedule}
                  onManualExport={endpointEnabled ? this.handleManualExport : null} />
                <hr />
                <TumbleweedScheduleItem
                  title="WIM File"
                  schedule={schedules.get('wimSchedule')}
                  canEdit={canEdit}
                  canSkipResume={canSkipResume}
                  canExport={canExportWIM}
                  canDelete={canDelete}
                  onEdit={showEditTumbleweedSchedule}
                  onSkip={showSkipTumbleweedExport}
                  onConfirmResume={showConfirmResumeExport}
                  onConfirmDelete={showDeleteTumbleweedSchedule}
                  onManualExport={endpointEnabled ? this.handleManualExport : null} />
                <hr />
                <TumbleweedScheduleItem
                  title="WIM Kronos File"
                  schedule={schedules.get('wimKronosSchedule')}
                  canEdit={canEdit}
                  canSkipResume={canSkipResume}
                  canExport={canExportWIM}
                  canDelete={canDelete}
                  onEdit={showEditTumbleweedSchedule}
                  onSkip={showSkipTumbleweedExport}
                  onConfirmResume={showConfirmResumeExport}
                  onConfirmDelete={showDeleteTumbleweedSchedule}
                  onManualExport={endpointEnabled ? this.handleManualExport : null} />
              </>
            }
            <ScheduleModal show={scheduleModalVisible} />
            <SkipScheduleModal show={skipModalVisible} />
            <ConfirmResumeExportSchedule show={confirmModalVisible} />
            <ConfirmDeleteExportSchedule show={deleteModalVisible} />
          </MainContent>
        </PageBody>
      </Page>
    );
  }
}

TumbleweedSchedulingPage.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_SCHEDULE_EDIT);
  const canSkipResumeSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_SCHEDULE_SKIP_RESUME);
  const canExportDraftSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_DRAFT_EXPORT);
  const canExportProductionSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_STANDARDS_AND_UOM_BY_LOCATION_PRODUCTION_EXPORT);
  const canExportWIMSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_KRONOS_WIM_EXPORT);
  const canDeleteSelector = makeCurrentUserHasPermissionSelector(TUMBLEWEED_SCHEDULE_DELETE);
  return {
    loading: loadingSelector(state),
    kronosVersion: configurationKronosVersion(state),
    schedules: tumbleweedSchedulesSelector(state),
    scheduleModalVisible: showEditSelector(state),
    skipModalVisible: showSkipSelector(state),
    confirmModalVisible: showConfirmResumeSelector(state),
    deleteModalVisible: showDeleteSelector(state),
    tumbleweedEndpoint: tumbleweedEndpointSelector(state),
    canEdit: canEditSelector(state),
    canSkipResume: canSkipResumeSelector(state),
    canExportDraft: canExportDraftSelector(state),
    canExportProduction: canExportProductionSelector(state),
    canExportWIM: canExportWIMSelector(state),
    canDelete: canDeleteSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadTumbleweedSchedules,
    loadTumbleweedIntegration,
    saveTumbleweedIntegration,
    showEditTumbleweedSchedule,
    showSkipTumbleweedExport,
    showConfirmResumeExport,
    showDeleteTumbleweedSchedule,
    exportLocationsStandardsToTumbleweed,
    submitWimTumbleweedExportRequest,
    submitWimKronosTumbleweedExportRequest,
    submitWimKronosTumbleweedExportRequestWithHashes,
  }
)(TumbleweedSchedulingPage));
