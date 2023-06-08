import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
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
import NonMOSTElementProfileSidebar from './NonMOSTElementProfileSidebar';
import StandardSelectionListPage from '../../elementMassUpdate/components/StandardSelectionListPage';
import {toggleShowMassUpdate} from '../../elementMassUpdate/actions';
import {showSelector as massUpdateShownSelector} from '../../elementMassUpdate/selectors/pages/selectStandards';
import {
  nonMOSTStepsSortedByNumberSelector,
} from '../../nonMOSTAnalysis/selectors/containers/nonMOSTSteps';
import {
  loadNonMOSTElement,
  toggleNonMOSTElementProfileSidebar,
  toggleElementProfileBulkEditSidebar,
} from '../actions';
import {
  loadingSelector,
  standardsCountSelector,
} from '../selectors/pages/nonMOSTElementProfile';
import {
  pristineModelSelector,
  showSelector,
} from '../selectors/sidebars/nonMOSTElementProfile';
import {
  openSelector as bulkEditOpenSelector,
  selectedStepIdsSelector,
} from '../selectors/sidebars/bulkEdit';
import {timeFormatSelector, timeFormatSelectorDisabledSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  NonMOSTStepsContainer,
} from '../../nonMOSTAnalysis/components';
import {AutoSizer} from 'react-virtualized';
import {layout} from '../../shared/constants';
import {titleText, ARCHIVE, PRODUCTION} from '../../standards/constants/standardStatuses';
import {handleApiError, formatTMUs, getDynamicRoute} from '../../shared/services';
import ElementProfileBulkEditSidebar from './ElementProfileBulkEditSidebar';
import {TIMED} from '../constants/elementTypes';
import {ELEMENTS_EDIT, STANDARDS_EDIT} from '../../authentication/constants/permissions';
import makeCurrentUserHasPermissionSelector from '../../authentication/selectors/currentUser/makeCurrentUserHasPermissionSelector';
import {resetTimeSelectorDropdown} from '../../shared/actions';

class MOSTElementProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {params, loadNonMOSTElement, router, massUpdateShown, location} = this.props;
    loadNonMOSTElement(params.id)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to load the Timed Element builder.', 'Error'));
    if (massUpdateShown === true || location.query.showMassUpdate) {
      this.props.toggleShowMassUpdate(TIMED);
    }
  }

  componentWillUnmount() {
    const {timeFormatSelectorDisabled, resetTimeSelectorDropdown} = this.props;
    if (timeFormatSelectorDisabled) {
      resetTimeSelectorDropdown();
    }
  }

  handleSidebarButton() {
    this.props.toggleNonMOSTElementProfileSidebar();
  }

  handleShowBulkEditPanel() {
    this.props.toggleElementProfileBulkEditSidebar();
  }

  widthStyle(width, sidebarShown, bulkEditSidebarShown) {
    const {selectedElementIds} = this.props;
    let sidebars = sidebarShown ? 1 : 0;
    sidebars += bulkEditSidebarShown && selectedElementIds.size > 0 ? 1 : 0;
    return {
      width: width + (sidebarShown || bulkEditSidebarShown ? 30 : 0) + sidebars * layout.SIDEBAR_WIDTH,
      paddingRight: sidebarShown || bulkEditSidebarShown ? '30px' : '0',
    };
  }

  handleShowMassUpdate() {
    this.props.toggleShowMassUpdate(TIMED);
  }

  handleReload() {
    const {loadNonMOSTElement, params} = this.props;
    loadNonMOSTElement(params.id);
  }

  render() {
    const {
      showSidebar,
      bulkEditSidebarShown,
      loading,
      model,
      nonMOSTSteps,
      params,
      timeFormat,
      massUpdateShown,
      selectedElementIds,
      standardsCount,
      canEdit,
      canEditStandards,
      location,
    } = this.props;
    const statusText = titleText(model.get('status'));
    if (massUpdateShown) return <StandardSelectionListPage elementId={params.id} elementName={model.get('name') || ''} />;
    return (
      <Page pageClassName="timed-element-builder-page">
        <PageHeader>
          <PageHeaderActions>
            <Link to={getDynamicRoute(location, '/elements')}><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle title={`${model.get('id') || ''} - ${model.get('name') || ''} ${statusText}`}>
            {`${model.get('id') || ''} - ${model.get('name') || ''}`} <span className="title-status">{statusText}</span>
          </PageTitle>
          <PageHeaderActions>
            <div className="element-time">{formatTMUs(model.get('measuredTimeMeasurementUnits'), timeFormat)}</div>
            {canEditStandards && standardsCount > 0
              ? <Button className="mass-update" onClick={this.handleShowMassUpdate}><i className="fa fa-exchange" /></Button>
              : null}

            {canEdit && <BulkEditButton isVisible={selectedElementIds.size > 0 && model.get('status') !== PRODUCTION && model.get('status') !== ARCHIVE} isOpen={bulkEditSidebarShown} onClick={this.handleShowBulkEditPanel} />}
            <TimeFormatSelector />
            <div className="flyout-button">
              <Button className={showSidebar ? 'btn-wheat' : 'btn-default'} onClick={this.handleSidebarButton}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div className="items-wrapper" style={this.widthStyle(width, showSidebar, bulkEditSidebarShown)}>
                  <NonMOSTStepsContainer readOnly={!canEdit || model.get('status') === PRODUCTION || model.get('status') === ARCHIVE || selectedElementIds.size > 0} disabledBulkEdit={!canEdit} />
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <NonMOSTElementProfileSidebar />
          {selectedElementIds.size === 0 || !canEdit || model.get('status') === PRODUCTION || model.get('status') === ARCHIVE
            ? null
            : <ElementProfileBulkEditSidebar id={Number(params.id)} steps={nonMOSTSteps} onReload={this.handleReload} />}
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(ELEMENTS_EDIT);
  const canEditStandardsSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);
  return {
    loading: loadingSelector(state),
    model: pristineModelSelector(state),
    nonMOSTSteps: nonMOSTStepsSortedByNumberSelector(state),
    showSidebar: showSelector(state),
    bulkEditSidebarShown: bulkEditOpenSelector(state),
    timeFormat: timeFormatSelector(state),
    massUpdateShown: massUpdateShownSelector(state),
    selectedElementIds: selectedStepIdsSelector(state),
    standardsCount: standardsCountSelector(state),
    canEdit: canEditSelector(state),
    canEditStandards: canEditStandardsSelector(state),
    timeFormatSelectorDisabled: timeFormatSelectorDisabledSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    toggleNonMOSTElementProfileSidebar,
    loadNonMOSTElement,
    toggleElementProfileBulkEditSidebar,
    toggleShowMassUpdate,
    resetTimeSelectorDropdown,
  }
)(MOSTElementProfilePage));
