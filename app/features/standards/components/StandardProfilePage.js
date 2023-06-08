import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {Button, Dropdown, MenuItem} from 'react-bootstrap';
import {
  loadStandard,
  toggleStandardDetailsSidebar,
  addElements,
  openElementSearch,
  showSelectStandardElementTypeToCreate,
  createStandardElementGroup,
  registerStandardItemScrollNode,
  loadStandardDetails,
  toggleStandardProfileBulkEditSidebar,
  toggleShowStandardRevisions,
  showConfirmSetStandardRevision,
  setStandardRevisionTest,
  setStandardItemModelProperty,
  toggleStandardElementItemFrequencyFormula,
  setFrequencyFormulaModalValue,
  bulkPasteStandardItems,
  toggleStandardElementGroupsCollapse,
  getElementDetails,
  setSelectStandardElementTypeToCreateModelProperty,
  showCreateStandardElement,
  toggleCreateStandardElement,
  cancelCreateStandardElement,
} from '../actions';
import {clipboardCopyItems, clipboardClearCopiedItems, resetTimeSelectorDropdown} from '../../shared/actions';
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
  currentInProcessRevisionSelector,
  editStandardMOSTElementIdSelector,
  editStandardNonMOSTElementIdSelector,
  hasRevisionsSelector,
  idSelector,
  isPreviousRevisionSelector,
  loadingSelector,
  maxRevisionSelector,
  maxStandardItemIndexSelector,
  movingSelector,
  nameSelector,
  revisionSelector,
  savingSelector,
  searchElementsSelector,
  standardElementGroupsCountSelector,
  standardItemsCountSelector,
  standardItemsSelectedSelector,
  topLevelStandardItemsSortedByIndexSelector,
  standardElementEditorPropertySelector,
  standardItemScrollNodeSelector,
  standardItemsSelector,
  selectedStandardElementGroupIdsSelector,
  totalRevisionsSelector,
  standardElementGroupsCollapseSelector,
} from '../selectors/pages/standardProfile';
import {timeFormatSelector, timeFormatSelectorDisabledSelector} from '../../shared/selectors/components/timeFormatSelector';
import {
  modelSelector,
  openSelector,
  departmentIdSelector,
} from '../selectors/sidebars/standardDetails';
import {
  openSelector as revisionsListOpenSelector,
} from '../selectors/pages/revisionsList';
import {
  openSelector as bulkEditOpenSelector,
} from '../selectors/sidebars/bulkEditElements';
import {AutoSizer} from 'react-virtualized';
import {layout} from '../../shared/constants';
import React, {Component} from 'react';
import {STANDALONE} from '../constants/addStandardItemStyles';
import SearchElementsPage from './SearchElementsPage';
import MOSTStandardElementProfilePage from './MOSTStandardElementProfilePage';
import NonMOSTStandardElementProfilePage from './NonMOSTStandardElementProfilePage';
import StandardItemContainer from './StandardItemContainer';
import ConfirmDeleteStandardItemModal from './ConfirmDeleteStandardItemModal';
import ConfirmBulkDeleteSelectedStandardItemsModal from './ConfirmBulkDeleteSelectedStandardItemsModal';
import PromoteToListElementModal from './PromoteToListElementModal';
import MoveStandardItemToPositionModal from './MoveStandardItemToPositionModal';
import SelectStandardElementGroupToMoveToModal from './SelectStandardElementGroupToMoveToModal';
import StandardProfileSidebar from './StandardProfileSidebar';
import SelectStandardElementTypeToCreateModal from './SelectStandardElementTypeToCreateModal';
import CreateStandardElementModal from './CreateStandardElementModal';
import AddStandardItem from './AddStandardItem';
import {handleApiError, makeClasses, scrollToNode, toastr, getDynamicRoute} from '../../shared/services';
import {ARCHIVE, PRODUCTION, titleText} from '../constants/standardStatuses';
import StandardElementFrequencyBuilderModal from './StandardElementFrequencyBuilderModal';
import StandardReportSelector from './reports/StandardReportSelector';
import {generatingSelector as generatingReportSelector} from '../../pdfGeneration/selectors/components/generatePdfButton';
import StandardProfileBulkEditSidebar from './StandardProfileBulkEditSidebar';
import StandardRevisionsListPage from './StandardRevisionsListPage';
import ConfirmSetStandardRevisionModal from './ConfirmSetStandardRevisionModal';
import revisionLogo from '../../layout/images/revisions.png';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_EDIT, STANDARDS_EXPORT, STANDARDS_MANAGE_PRODUCTION, BETA_FEATURES_ACCESS} from '../../authentication/constants/permissions';
import CreateUnitOfMeasureModal from '../../unitsOfMeasure/components/CreateUnitOfMeasureModal';
import {loadUnitOfMeasureSelectListOptions, showCreateUnitOfMeasure} from '../../unitsOfMeasure/actions';

import CreateCharacteristicModal from '../../characteristics/components/CreateCharacteristicModal';
import characteristicSetsSelector from '../../characteristics/selectors/pages/list/characteristicSetsSelector';
import {frequencyFormulaSelector} from '../selectors/modals/frequencyFormula';
import {POSITION_CENTER} from '../../shared/constants/moveToPositionBehaviors';

import {createCopiedStandardItemsModel, pasteCopiedStandardItemsModel} from '../services';
import {clipboardCopiedItemsSelector} from '../../shared/selectors/components/clipboard';
import {STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';
import {Tooltip} from '@progress/kendo-react-tooltip';
import {TOOLTIP_OPEN_DELAY} from '../../shared/constants/tooltipOpenDelay';
import {showSelector} from '../selectors/modals/createStandardElement';

class StandardProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentDidMount() {
    const {loadStandard, params, router, location, cancelCreateStandardElement} = this.props;
    cancelCreateStandardElement();
    loadStandard(params.id)
      .then(() => {
        if (typeof (location.query.scrollId) !== 'undefined') {
          scrollToNode(this.props.scrollNode(location.query.scrollId), POSITION_CENTER);
        }
      }).catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to load the Standard builder.', 'Error');
        router.push('/standards');
      });
  }

  componentWillUnmount() {
    const {timeFormatSelectorDisabled, resetTimeSelectorDropdown} = this.props;
    if (timeFormatSelectorDisabled) {
      resetTimeSelectorDropdown();
    }
  }

  handleStandardDetailsButton() {
    this.props.toggleStandardDetailsSidebar();
  }

  handleAddElementById(elementId, insertAtIndex) {
    const {addElements, id, loadStandardDetails} = this.props;
    return addElements(id, [elementId], insertAtIndex)
      .then(() => loadStandardDetails(id));
  }

  addElementById(elementId, model) {
    const {addElements, loadStandardDetails, id, router} = this.props;
    const {insertAtIndex, standardElementGroupId, unitOfMeasureId, name,
      measuredTimeMeasurementUnits, frequencyFormula, comment} = model.toJS();

    addElements(
      id,
      [elementId],
      insertAtIndex,
      standardElementGroupId,
      unitOfMeasureId, name, measuredTimeMeasurementUnits,
      frequencyFormula, comment,
    ).then(() => {
      loadStandardDetails(id);
    }).catch(error => {
      const {status} = error.response || {};
      const errorResponse = error.response.data;
      if (status === 400) {
        if (errorResponse.elementIds) {
          for (const errors of errorResponse.elementIds) {
            toastr.error(errors, 'Error');
          }
        }
        if (errorResponse.unitOfMeasureId) {
          for (const errors of errorResponse.unitOfMeasureId) {
            toastr.error(errors, 'Error');
          }
        }
        return;
      }
      handleApiError(error, router, 'An error occurred while attempting to add the Element(s) to the Standard.');
    });
  }

  getElementForStandard(elementId, insertAtIndex, elementGroupId) {
    const {getElementDetails, setSelectStandardElementTypeToCreateModelProperty, showCreateStandardElement, timeFormat} = this.props;

    return getElementDetails(elementId).then(res => {
      const response = res.value.data;
      setSelectStandardElementTypeToCreateModelProperty('standardElementType', response.elementType);
      showCreateStandardElement(
        response.elementType,
        insertAtIndex,
        elementGroupId,
        timeFormat, response);
    });
  }

  handleAddElementsBySearch(insertAtIndex) {
    const {openElementSearch, id} = this.props;
    return openElementSearch(id, insertAtIndex);
  }

  handleCreateStandardElementGroup(groupName, insertAtIndex) {
    const {createStandardElementGroup, id, loadStandardDetails} = this.props;
    return createStandardElementGroup(id, groupName, insertAtIndex)
      .then(() => loadStandardDetails(id));
  }

  handleShowBulkEditPanel() {
    this.props.toggleStandardProfileBulkEditSidebar();
  }

  widthStyle(width, sidebarShown, bulkEditSidebarShown) {
    const {selectedStandardItems} = this.props;
    let sidebars = sidebarShown ? 1 : 0;
    sidebars += bulkEditSidebarShown && selectedStandardItems.size > 0 ? 1 : 0;
    return {
      width: width + (sidebarShown || bulkEditSidebarShown ? 30 : 0) + (sidebars * layout.SIDEBAR_WIDTH),
      paddingRight: sidebarShown || bulkEditSidebarShown ? '30px' : '0',
    };
  }

  scrollToElement(scrollId) {
    scrollToNode(this.props.scrollNode(scrollId), POSITION_CENTER);
  }

  addScrollNode(node) {
    if (node) {
      this.props.registerStandardItemScrollNode(node.id, node);
    }
  }

  handleShowStandardRevisions() {
    const {toggleShowStandardRevisions, id} = this.props;
    toggleShowStandardRevisions(id);
  }

  handleReturnToCurrentRevision() {
    const {loadStandard, params, router} = this.props;

    loadStandard(params.id)
      .catch(error => {
        handleApiError(error, router, 'An error occurred while attempting to load the Standard builder.', 'Error');
        router.push('/standards');
      });
  }

  toggleCreateUnitOfMeasure(unitOfMeasure) {
    const {loadUnitOfMeasureSelectListOptions, standardElementEditorProperty, setStandardItemModelProperty, show} = this.props;
    if (show) {
      loadUnitOfMeasureSelectListOptions();
      return;
    }
    loadUnitOfMeasureSelectListOptions().then(() => {
      setStandardItemModelProperty(standardElementEditorProperty.get('standardElementId'), 'unitOfMeasureId', unitOfMeasure.id.toString());
    });
  }

  handleSetRevision() {
    const {id, revision, showConfirmSetStandardRevision, setStandardRevisionTest} = this.props;
    setStandardRevisionTest(id, revision)
      .then(result => {
        const {hasInactiveCharacteristics, hasInactiveUnitsOfMeasure} = result.value.data;
        showConfirmSetStandardRevision(id, revision, hasInactiveCharacteristics, hasInactiveUnitsOfMeasure);
      });
  }

  renderRevisionButtons() {
    const {hasRevisions, revision, maxRevision, isPreviousRevision, currentInProcessRevision, canManageProduction, totalRevisions} = this.props;

    if (hasRevisions && !isPreviousRevision) {
      return (
        <div className="flyout-button">
          <Button className="btn-default revisions" title="Revisions" onClick={this.handleShowStandardRevisions}>
            <img className="size-16x16" src={revisionLogo} /> - {revision} / {totalRevisions}
          </Button>
        </div>
      );
    }

    if (hasRevisions) {
      return (
        <Dropdown id="standardReports" bsStyle="default" key="Revisions" title="Revisions">
          <Dropdown.Toggle>
            <img className="size-16x16" src={revisionLogo} /> - {revision} / {totalRevisions}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem onClick={this.handleShowStandardRevisions}>Show Revisions</MenuItem>
            {(revision === maxRevision && currentInProcessRevision === revision) || !canManageProduction ? null : <MenuItem onClick={this.handleSetRevision}>Make Current Revision</MenuItem>}
            <MenuItem onClick={this.handleReturnToCurrentRevision}>Return to Current Revision</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return <div className="flyout-button">{revision} / {totalRevisions}</div>;
  }
  toggleCreateCharacteristic(characteristic) {
    const {toggleStandardElementItemFrequencyFormula, frequencyFormula, setFrequencyFormulaModalValue} = this.props;
    toggleStandardElementItemFrequencyFormula();
    const spaceBetweenFormulas = frequencyFormula ? '' : ' ';
    if (characteristic) setFrequencyFormulaModalValue('frequencyFormula', `${frequencyFormula}${spaceBetweenFormulas}${characteristic.get('name')}`);

  }

  handleBulkCopyStandardItems() {
    const {clipboardCopyItems, id, selectedStandardItems, allStandardItems, selectedStandardElementGroupIds} = this.props;
    clipboardCopyItems(createCopiedStandardItemsModel(id, selectedStandardItems, allStandardItems, selectedStandardElementGroupIds));
  }

  handleClipboardClearCopiedItems() {
    this.props.clipboardClearCopiedItems();
  }

  handleBulkPasteStandardItems(insertAtIndex, destinationElementGroupId = null) {
    const {bulkPasteStandardItems, copiedStandardItemsModelFromClipboard, id, allStandardItems, router, loadStandard, clipboardClearCopiedItems} = this.props;
    bulkPasteStandardItems(pasteCopiedStandardItemsModel(copiedStandardItemsModelFromClipboard, id, insertAtIndex, destinationElementGroupId, allStandardItems))
      .catch(error => {
        const {status} = error.response || {};
        if (status === 409) { // if any of the copied standard item is modified or destination standard item present at insertAtIndex position is changed.
          handleApiError(error, router, 'Copy is discarded because one or more items have been modified. Please try again.');
          loadStandard(copiedStandardItemsModelFromClipboard.sourceStandardId);
          router.push(`/standards/${copiedStandardItemsModelFromClipboard.sourceStandardId}`);
        } else {
          handleApiError(error, router, 'This copy action is discarded due to an error while pasting copied standard items at destination standard.');
        }
        clipboardClearCopiedItems();
      });
  }

  handleToggleStandardElementGroupsCollapse() {
    const {toggleStandardElementGroupsCollapse, allStandardItems} = this.props;
    const standardElementGroups = allStandardItems.filter(standardItem => standardItem.get('type') === STANDARD_ELEMENT_GROUP);
    const standardElementGroupIds = standardElementGroups.keySeq().toArray();
    toggleStandardElementGroupsCollapse(standardElementGroupIds);
  }

  onShowCreateUnitOfMeasureModal() {
    const {showCreateUnitOfMeasure, selectedDepartmentId} = this.props;
    showCreateUnitOfMeasure(selectedDepartmentId);
  }

  onShowChildModal() {
    const {standardElementEditorProperty, toggleCreateStandardElement} = this.props;
    if (!standardElementEditorProperty.get('standardElementId')) {
      toggleCreateStandardElement();
    }
  }

  render() {
    const {
      id,
      name,
      model,
      loading, moving, saving,
      standardItems,
      standardItemsCount,
      detailsOpen,
      maxStandardItemIndex,
      searchElements,
      editStandardMOSTElementId,
      editStandardNonMOSTElementId,
      handleCreateStandardElement,
      sidebarShown,
      bulkEditSidebarShown,
      selectedStandardItems,
      standardElementGroupsCount,
      generatingReport,
      revisionsListOpen,
      revision,
      isPreviousRevision,
      canEdit,
      canExport,
      canManageProduction,
      selectedDepartmentId,
      characteristicSets,
      copiedStandardItemsModelFromClipboard,
      standardElementGroupsCollapse,
      hasBetaAccess,
      location,
      maxRevision,
    } = this.props;

    const status = model.get('status');
    const classes = makeClasses({'standard-builder-page': true, 'standard-element-groups': standardElementGroupsCount > 0});

    if (searchElements) {
      return <SearchElementsPage minimumStatus={status} />;
    }

    if (editStandardMOSTElementId) {
      return (
        <MOSTStandardElementProfilePage
          readOnly={status === PRODUCTION || status === ARCHIVE || isPreviousRevision || selectedStandardItems.size > 0}
          disabledBulkEdit={!canEdit || status === PRODUCTION || status === ARCHIVE || isPreviousRevision}
          standardId={id}
          revision={revision}
          isPreviousRevision={isPreviousRevision}
          standardElementId={editStandardMOSTElementId}
          scrollToElement={this.scrollToElement} />
      );
    }

    if (editStandardNonMOSTElementId) {
      return (
        <NonMOSTStandardElementProfilePage
          readOnly={status === PRODUCTION || status === ARCHIVE || isPreviousRevision || selectedStandardItems.size > 0}
          disabledBulkEdit={!canEdit || status === PRODUCTION || status === ARCHIVE || isPreviousRevision}
          standardId={id}
          revision={revision}
          isPreviousRevision={isPreviousRevision}
          standardElementId={editStandardNonMOSTElementId}
          scrollToElement={this.scrollToElement} />
      );
    }

    if (revisionsListOpen) {
      return <StandardRevisionsListPage standardId={id} />;
    }
    // const characteristicSets = new List();
    const statusText = titleText(status);
    const disabledBulkEdit = !canEdit || ((status === PRODUCTION || status === ARCHIVE) && !canManageProduction) || loading || saving || moving || status === PRODUCTION || status === ARCHIVE || isPreviousRevision;
    const showPasteButton = (copiedStandardItemsModelFromClipboard !== null) && !disabledBulkEdit;
    const disabled = !canEdit || ((status === PRODUCTION || status === ARCHIVE) && !canManageProduction) || loading || saving || moving || status === PRODUCTION || status === ARCHIVE || isPreviousRevision || selectedStandardItems.size > 0;
    return (
      <Page pageClassName={classes}>
        <PageHeader>
          <PageHeaderActions>
            <Link to={getDynamicRoute(location, '/standards')}><i className="fa fa-caret-left" /> Previous</Link>
          </PageHeaderActions>
          <PageTitle title={`${id || ''} - ${name || ''} ${statusText}`}>{`${id || ''} - ${name || ''}`} <span className="title-status">{statusText}</span></PageTitle>
          <PageHeaderActions>
            {moving && <Tooltip openDelay={TOOLTIP_OPEN_DELAY} position="bottom" anchorElement="target"><i className="fa fa-spinner fa-spin" title="Reordering in progress" /></Tooltip>}
            {this.renderRevisionButtons()}
            {(copiedStandardItemsModelFromClipboard !== null) && <Button onClick={this.handleClipboardClearCopiedItems} title="Clear Copied Standard Items"><i className="fa fa-eraser" /></Button>}
            <BulkEditButton isVisible={selectedStandardItems.size > 0 && status !== PRODUCTION && status !== ARCHIVE} isOpen={bulkEditSidebarShown} onClick={this.handleShowBulkEditPanel} disabled={!canEdit} />
            {(!isPreviousRevision || revision === maxRevision) && <StandardReportSelector generating={generatingReport} canExport={canExport} />}
            <TimeFormatSelector />
            <div className="flyout-button">
              <Button className={detailsOpen ? 'btn-wheat' : 'btn-default'} onClick={this.handleStandardDetailsButton}>
                <i className="fa fa-list-ul" />
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageBody>
          <MainContent loading={loading}>
            <AutoSizer disableHeight>
              {({width}) => (
                <div className="standard-items-wrapper" style={this.widthStyle(width, sidebarShown, bulkEditSidebarShown)}>
                  <div className="standard-items-container">
                    {standardElementGroupsCount > 0 && <div className="standard-element-groups-collapse">
                      <Button onClick={this.handleToggleStandardElementGroupsCollapse}>
                        <i className={standardElementGroupsCollapse ? 'fa fa-chevron-down' : 'fa fa-chevron-up'} />
                        <span>{standardElementGroupsCollapse ? ' Expand All' : ' Collapse All'}</span>
                      </Button>
                    </div>}
                    {standardItems.valueSeq().map(standardItem => (
                      <StandardItemContainer
                        key={standardItem.get('id')}
                        disabled={disabled}
                        disabledBulkEdit={disabledBulkEdit}
                        standardId={Number(id)}
                        standardItem={standardItem}
                        standardItemsCount={standardItemsCount}
                        standardElementGroupsCount={standardElementGroupsCount}
                        addScrollNode={this.addScrollNode}
                        showPasteButton={showPasteButton}
                        onBulkPasteStandardItems={this.handleBulkPasteStandardItems}
                        hasBetaAccess={hasBetaAccess}
                        getElementForStandard={this.getElementForStandard} />
                    ))}
                  </div>
                  <AddStandardItem
                    autoFocus={false}
                    insertAtIndex={maxStandardItemIndex + 1}
                    style={STANDALONE}
                    render={status !== PRODUCTION && status !== ARCHIVE}
                    collapsed={false}
                    disabled={!canEdit || loading || saving || moving || selectedStandardItems.size > 0}
                    closeable={false}
                    enableAddGroup
                    onAddElementById={this.handleAddElementById}
                    onAddElementsBySearch={this.handleAddElementsBySearch}
                    onCreateStandardElement={handleCreateStandardElement}
                    onCreateStandardElementGroup={this.handleCreateStandardElementGroup}
                    showPasteButton={showPasteButton}
                    onBulkPasteStandardItems={this.handleBulkPasteStandardItems}
                    getElementForStandard={this.getElementForStandard} />
                </div>
              )}
            </AutoSizer>
          </MainContent>
          <StandardProfileSidebar />
          <StandardProfileBulkEditSidebar onBulkCopyStandardItems={this.handleBulkCopyStandardItems} />
        </PageBody>
        <SelectStandardElementTypeToCreateModal />
        <CreateStandardElementModal standardId={Number(id)}
          handleShowCreateUnitOfMeasure={this.onShowCreateUnitOfMeasureModal}
          addElementById={this.addElementById} />
        <SelectStandardElementGroupToMoveToModal />
        <ConfirmDeleteStandardItemModal />
        <ConfirmBulkDeleteSelectedStandardItemsModal />
        <PromoteToListElementModal />
        <MoveStandardItemToPositionModal />
        <StandardElementFrequencyBuilderModal />
        <ConfirmSetStandardRevisionModal />
        <CreateUnitOfMeasureModal handleToggleCreateUnitOfMeasure={this.toggleCreateUnitOfMeasure}
          disableActiveStatus showChildModal={this.onShowChildModal} />
        <CreateCharacteristicModal
          characteristicSets={characteristicSets}
          standardsSelectedDepartmentId={selectedDepartmentId}
          handleToggleCreateCharacteristic={this.toggleCreateCharacteristic}
          disableActiveStatus />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const canEditSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EDIT);
  const canExportSelector = makeCurrentUserHasPermissionSelector(STANDARDS_EXPORT);
  const canManageProductionSelector = makeCurrentUserHasPermissionSelector(STANDARDS_MANAGE_PRODUCTION);
  const hasBetaAccessSelector = makeCurrentUserHasPermissionSelector(BETA_FEATURES_ACCESS);
  return {
    detailsOpen: openSelector(state),
    loading: loadingSelector(state),
    moving: movingSelector(state),
    saving: savingSelector(state),
    id: idSelector(state),
    name: nameSelector(state),
    model: modelSelector(state),
    standardItems: topLevelStandardItemsSortedByIndexSelector(state),
    maxStandardItemIndex: maxStandardItemIndexSelector(state),
    searchElements: searchElementsSelector(state),
    editStandardMOSTElementId: editStandardMOSTElementIdSelector(state),
    editStandardNonMOSTElementId: editStandardNonMOSTElementIdSelector(state),
    standardItemsCount: standardItemsCountSelector(state),
    sidebarShown: openSelector(state),
    selectedStandardItems: standardItemsSelectedSelector(state),
    bulkEditSidebarShown: bulkEditOpenSelector(state),
    standardElementGroupsCount: standardElementGroupsCountSelector(state),
    timeFormat: timeFormatSelector(state),
    generatingReport: generatingReportSelector(state),
    revisionsListOpen: revisionsListOpenSelector(state),
    hasRevisions: hasRevisionsSelector(state),
    maxRevision: maxRevisionSelector(state),
    currentInProcessRevision: currentInProcessRevisionSelector(state),
    revision: revisionSelector(state),
    isPreviousRevision: isPreviousRevisionSelector(state),
    canEdit: canEditSelector(state),
    canExport: canExportSelector(state),
    canManageProduction: canManageProductionSelector(state),
    standardElementEditorProperty: standardElementEditorPropertySelector(state),
    selectedDepartmentId: departmentIdSelector(state),
    characteristicSets: characteristicSetsSelector(state),
    frequencyFormula: frequencyFormulaSelector(state),
    scrollNode: standardItemScrollNodeSelector(state),
    allStandardItems: standardItemsSelector(state),
    copiedStandardItemsModelFromClipboard: clipboardCopiedItemsSelector(state),
    selectedStandardElementGroupIds: selectedStandardElementGroupIdsSelector(state),
    totalRevisions: totalRevisionsSelector(state),
    standardElementGroupsCollapse: standardElementGroupsCollapseSelector(state),
    timeFormatSelectorDisabled: timeFormatSelectorDisabledSelector(state),
    hasBetaAccess: hasBetaAccessSelector(state),
    show: showSelector(state),
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    loadStandard,
    toggleStandardDetailsSidebar,
    addElements,
    openElementSearch,
    handleCreateStandardElement: showSelectStandardElementTypeToCreate,
    createStandardElementGroup,
    registerStandardItemScrollNode,
    loadStandardDetails,
    toggleStandardProfileBulkEditSidebar,
    toggleShowStandardRevisions,
    showConfirmSetStandardRevision,
    setStandardRevisionTest,
    loadUnitOfMeasureSelectListOptions,
    setStandardItemModelProperty,
    toggleStandardElementItemFrequencyFormula,
    setFrequencyFormulaModalValue,
    clipboardCopyItems,
    bulkPasteStandardItems,
    clipboardClearCopiedItems,
    toggleStandardElementGroupsCollapse,
    resetTimeSelectorDropdown,
    showCreateUnitOfMeasure,
    getElementDetails,
    setSelectStandardElementTypeToCreateModelProperty,
    showCreateStandardElement,
    toggleCreateStandardElement,
    cancelCreateStandardElement,
  }
)(StandardProfilePage));
