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
  loadStandardMOSTElement,
  loadStandardMOSTElementRevision,
  closeStandardMOSTElementEdit,
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
} from '../selectors/pages/mostStandardElementProfile';
import {AutoSizer} from 'react-virtualized';
import {
  mostStepsSortedByNumberSelector,
} from '../../mostAnalysis/selectors/containers/mostSteps';
import {
  MOSTStepsContainer,
} from '../../mostAnalysis/components';
import ElementProfileBulkEditSidebar from '../../elements/components/ElementProfileBulkEditSidebar';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {handleApiError, formatTMUs} from '../../shared/services';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_EDIT} from '../../authentication/constants/permissions';

class MOSTStandardElementProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    this.handleReload();
  }

  handleClose() {
    const {closeStandardMOSTElementEdit, refreshStandardTime, standardId, loadStandardDetails, isPreviousRevision, standardElementId, scrollToElement} = this.props;
    closeStandardMOSTElementEdit();
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
    const {standardId, standardElementId, loadStandardMOSTElement, loadStandardMOSTElementRevision, closeStandardMOSTElementEdit, revision, router, isPreviousRevision} = this.props;
    if (isPreviousRevision) {
      loadStandardMOSTElementRevision(standardId, revision, standardElementId)
        .catch(error => {
          closeStandardMOSTElementEdit();
          handleApiError(error, router, 'An error occurred while attempting to load the MOST Standard Element builder.', 'Error');
        });
    } else {
      loadStandardMOSTElement(standardId, standardElementId)
        .catch(error => {
          closeStandardMOSTElementEdit();
          handleApiError(error, router, 'An error occurred while attempting to load the MOST Standard Element builder.', 'Error');
        });
    }
  }

  render() {
    const {
      loading,
      disabledBulkEdit,
      bulkEditSidebarShown,
      mostSteps,
      readOnly,
      name,
      timeFormat,
      time,
      standardElementId,
      selectedStepIds,
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
                  <MOSTStepsContainer disabledBulkEdit={loading || disabledBulkEdit} readOnly={!canEdit || readOnly || selectedStepIds.size > 0} />
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <ElementProfileBulkEditSidebar id={Number(standardElementId)} steps={mostSteps} onReload={this.handleReload} isMOST />
        </PageBody>
      </Page>
    );
  }
}

MOSTStandardElementProfilePage.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  standardId: PropTypes.number.isRequired,
  revision: PropTypes.number.isRequired,
  isPreviousRevision: PropTypes.bool.isRequired,
  standardElementId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);
  return {
    loading: loadingSelector(state),
    name: nameSelector(state),
    timeFormat: timeFormatSelector(state),
    time: timeSelector(state),
    mostSteps: mostStepsSortedByNumberSelector(state),
    bulkEditSidebarShown: bulkEditOpenSelector(state),
    selectedStepIds: selectedStepIdsSelector(state),
    canEdit: canEditSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadStandardMOSTElement,
    loadStandardMOSTElementRevision,
    closeStandardMOSTElementEdit,
    refreshStandardTime,
    loadStandardDetails,
    toggleElementProfileBulkEditSidebar,
  }
)(MOSTStandardElementProfilePage));
