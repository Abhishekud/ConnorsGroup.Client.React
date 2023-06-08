import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {
  MainContent,
  Page,
  PageBody,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../layout/components';
import {TimeFormatSelector} from '../../shared/components';
import {BulkEditButton} from '../../shared/components/buttons';
import {
  loadStandardNonMOSTElement,
  loadStandardNonMOSTElementRevision,
  closeStandardNonMOSTElementEdit,
  refreshStandardTime,
  loadStandardDetails,
} from '../actions';
import {layout} from '../../shared/constants';
import {
  toggleElementProfileBulkEditSidebar,
} from '../../elements/actions';
import {
  openSelector as bulkEditOpenSelector,
  selectedStepIdsSelector,
} from '../../elements/selectors/sidebars/bulkEdit';
import {
  loadingSelector,
  nameSelector,
  timeSelector,
} from '../selectors/pages/nonMOSTStandardElementProfile';
import {AutoSizer} from 'react-virtualized';
import {
  nonMOSTStepsSortedByNumberSelector,
} from '../../nonMOSTAnalysis/selectors/containers/nonMOSTSteps';
import {
  NonMOSTStepsContainer,
} from '../../nonMOSTAnalysis/components';
import ElementProfileBulkEditSidebar from '../../elements/components/ElementProfileBulkEditSidebar';
import {timeFormatSelector, timeFormatSelectorDisabledSelector} from '../../shared/selectors/components/timeFormatSelector';
import {handleApiError, formatTMUs} from '../../shared/services';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_EDIT} from '../../authentication/constants/permissions';
import {resetTimeSelectorDropdown} from '../../shared/actions';

class NonMOSTStandardElementProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.handleReload();
  }

  componentWillUnmount() {
    const {timeFormatSelectorDisabled, resetTimeSelectorDropdown} = this.props;
    if (timeFormatSelectorDisabled) {
      resetTimeSelectorDropdown();
    }
  }

  handleClose() {
    const {closeStandardNonMOSTElementEdit, refreshStandardTime, standardId, loadStandardDetails, isPreviousRevision, scrollToElement, standardElementId} = this.props;
    closeStandardNonMOSTElementEdit();
    if (isPreviousRevision) {
      scrollToElement(standardElementId);
    } else {
      refreshStandardTime(standardId);
      loadStandardDetails(standardId).then(() => {
        scrollToElement(standardElementId);
      });
    }
  }


  handleShowBulkEditPanel() {
    this.props.toggleElementProfileBulkEditSidebar();
  }

  widthStyle(width, bulkEditSidebarShown, selectedStepIds) {
    const sidebars = bulkEditSidebarShown && selectedStepIds.size > 0 ? 1 : 0;
    return {
      width: width + sidebars * layout.SIDEBAR_WIDTH,
      paddingRight: sidebars > 0 ? '30px' : '0',
    };
  }

  handleReload() {
    const {standardId, revision, standardElementId, loadStandardNonMOSTElement, loadStandardNonMOSTElementRevision, closeStandardNonMOSTElementEdit, router, isPreviousRevision} = this.props;
    if (isPreviousRevision) {
      loadStandardNonMOSTElementRevision(standardId, revision, standardElementId)
        .catch(error => {
          closeStandardNonMOSTElementEdit();
          handleApiError(error, router, 'An error occurred while attempting to load the Timed Standard Element builder.', 'Error');
        });
    } else {
      loadStandardNonMOSTElement(standardId, standardElementId)
        .catch(error => {
          closeStandardNonMOSTElementEdit();
          handleApiError(error, router, 'An error occurred while attempting to load the Timed Standard Element builder.', 'Error');
        });
    }
  }

  render() {
    const {
      loading,
      disabledBulkEdit,
      bulkEditSidebarShown,
      standardElementId,
      selectedStepIds,
      nonMOSTSteps,
      readOnly,
      name,
      timeFormat,
      time,
      canEdit,
    } = this.props;
    return (
      <Page>
        <PageHeader>
          <PageHeaderActions>
            <span onClick={this.handleClose} className="clickable"><i className="fa fa-close" /> Close</span>
          </PageHeaderActions>
          <PageTitle>{name}</PageTitle>
          <PageHeaderActions>
            <div className="element-time">{formatTMUs(time, timeFormat)}</div>
            <BulkEditButton isVisible={selectedStepIds.size > 0 && !readOnly} isOpen={bulkEditSidebarShown} onClick={this.handleShowBulkEditPanel} />
            <TimeFormatSelector />
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div className="items-wrapper" style={this.widthStyle(width, bulkEditSidebarShown, selectedStepIds)}>
                  <NonMOSTStepsContainer disabledBulkEdit={loading || disabledBulkEdit} readOnly={!canEdit || readOnly || selectedStepIds.size > 0} />
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <ElementProfileBulkEditSidebar id={Number(standardElementId)} steps={nonMOSTSteps} onReload={this.handleReload} />
        </PageBody>
      </Page>
    );
  }
}

NonMOSTStandardElementProfilePage.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  standardId: PropTypes.number.isRequired,
  standardElementId: PropTypes.number.isRequired,
  revision: PropTypes.number.isRequired,
  isPreviousRevision: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);
  return {
    loading: loadingSelector(state),
    name: nameSelector(state),
    timeFormat: timeFormatSelector(state),
    time: timeSelector(state),
    nonMOSTSteps: nonMOSTStepsSortedByNumberSelector(state),
    bulkEditSidebarShown: bulkEditOpenSelector(state),
    selectedStepIds: selectedStepIdsSelector(state),
    canEdit: canEditSelector(state),
    timeFormatSelectorDisabled: timeFormatSelectorDisabledSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadStandardNonMOSTElement,
    loadStandardNonMOSTElementRevision,
    closeStandardNonMOSTElementEdit,
    refreshStandardTime,
    loadStandardDetails,
    toggleElementProfileBulkEditSidebar,
    resetTimeSelectorDropdown,
  }
)(NonMOSTStandardElementProfilePage));
