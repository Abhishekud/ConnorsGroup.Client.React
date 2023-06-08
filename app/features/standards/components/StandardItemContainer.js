import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {handleApiError, scrollToNode} from '../../shared/services';
import {StandardElementModel, StandardElementGroupModel} from '../models';
import StandardItemEditor from './StandardItemEditor';
import StandardItem from './StandardItem';
import {departmentIdSelector} from '../selectors/sidebars/standardDetails';
import {makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector} from '../../unitsOfMeasure/selectors/selectListOptions';
import {STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';
import {MOST} from '../../elements/constants/elementTypes';
import {
  toggleStandardElementGroup,
  moveStandardItem,
  showSelectStandardElementGroupToMoveTo,
  removeStandardElementFromGroup,
  openStandardMOSTElementEdit,
  openStandardNonMOSTElementEdit,
  confirmDeleteStandardItem,
  showPromoteToListElement,
  editStandardElementGroup,
  cancelEditStandardElementGroup,
  updateStandardElementGroup,
  editStandardElement,
  cancelEditStandardElement,
  updateStandardElement,
  setStandardItemModelProperty,
  toggleStandardElementComment,
  createStandardElementComment,
  cancelCreateStandardElementComment,
  toggleAddStandardItem,
  showStandardElementFrequencyFormulaModal,
  addElements,
  openElementSearch,
  showSelectStandardElementTypeToCreate,
  createStandardElementGroup,
  showMoveStandardItemToPosition,
  loadStandardDetails,
  toggleSelectStandardElement,
  toggleSelectStandardElementsWithGroup,
  setStandardElementEditorProperty,
} from '../actions';
import {
  standardItemScrollNodeSelector,
  makeStandardItemCollapsedSelector,
  makeStandardItemCommentCollapsedSelector,
  makeStandardItemCommentEnteredSelector,
  makeAddStandardItemAboveCollapsedSelector,
  makeAddStandardItemBelowCollapsedSelector,
  makeStandardItemEditingSelector,
  makeStandardItemValidationErrorsSelector,
  makeChildStandardItemsSortedByIndexSelector,
  makeChildStandardItemsStatesSelector,
  makeChildStandardItemsCommentCollapsedSelector,
  makeChildStandardItemsCommentEnteredSelector,
  makeChildStandardItemsAddStandardItemBelowCollapsedSelector,
  makeChildStandardItemsValidationErrorsSelector,
  standardItemsSelectedSelector,
  statusSelector,
  standardElementEditorPropertySelector,
  selectedStandardElementGroupIdsSelector,
} from '../selectors/pages/standardProfile';
import {timeFormatSelector} from '../../shared/selectors/components/timeFormatSelector';
import {withRouter} from 'react-router';
import {showCreateUnitOfMeasure, setCreateUnitOfMeasureModelProperty} from '../../unitsOfMeasure/actions';
import {makeCurrentUserHasPermissionSelector} from '../../authentication/selectors/currentUser';
import {STANDARDS_LIST_MANAGEMENT} from '../../authentication/constants/permissions';

class StandardItemContainer extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  getStandardItem(standardItemId) {
    const {standardItem: topLevelStandardItem, childStandardItems} = this.props;
    return topLevelStandardItem.id === standardItemId
      ? topLevelStandardItem : childStandardItems.get(standardItemId);
  }

  handleToggleStandardElementGroup() {
    const {toggleStandardElementGroup, standardItem} = this.props;
    toggleStandardElementGroup(standardItem.id);
  }

  handleMoveStandardItem(standardItemId, actionType) {
    const {moveStandardItem, standardId, router} = this.props;

    moveStandardItem(standardId, standardItemId, {actionType})
      .then(() => {
        scrollToNode(this.props.scrollNode(standardItemId));
        this.props.loadStandardDetails(standardId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to move the Standard item.'));
  }

  handleMoveStandardItemToPosition(standardItemId) {
    const {showMoveStandardItemToPosition, standardId} = this.props;
    showMoveStandardItemToPosition(standardId, standardItemId);
  }

  handleMoveStandardElementToGroup(standardElementId) {
    const {showSelectStandardElementGroupToMoveTo, standardId} = this.props;
    showSelectStandardElementGroupToMoveTo(standardId, standardElementId);
  }

  handleRemoveStandardElementFromGroup(standardElementId) {
    const {removeStandardElementFromGroup, standardId, router} = this.props;

    removeStandardElementFromGroup(standardId, standardElementId)
      .then(() => {
        scrollToNode(this.props.scrollNode(standardElementId));
        this.props.loadStandardDetails(standardId);
      })
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to remove the Standard Element from it\'s group.'));
  }

  handleEditSteps(standardElementId, standardElementElementType) {
    const {openStandardMOSTElementEdit, openStandardNonMOSTElementEdit} = this.props;
    if (standardElementElementType === MOST) openStandardMOSTElementEdit(standardElementId);
    else openStandardNonMOSTElementEdit(standardElementId);
  }

  handleDeleteStandardItem(standardItemId) {
    const {confirmDeleteStandardItem, standardId} = this.props;
    confirmDeleteStandardItem(standardId, this.getStandardItem(standardItemId));
  }

  handlePromoteStandardElementToListElement(standardElementId) {
    const {showPromoteToListElement, standardId} = this.props;
    showPromoteToListElement(standardId, standardElementId);
  }

  handleEdit(standardItem) {
    const {editStandardElementGroup, editStandardElement} = this.props;
    if (standardItem.type === STANDARD_ELEMENT_GROUP) editStandardElementGroup(standardItem.id);
    else editStandardElement(standardItem.id);
  }

  handleCancelEdit(standardItem) {
    const {cancelEditStandardElementGroup, cancelEditStandardElement} = this.props;
    if (standardItem.type === STANDARD_ELEMENT_GROUP) cancelEditStandardElementGroup(standardItem.id);
    else cancelEditStandardElement(standardItem.id);
  }

  handleSave(standardItem) {
    const {updateStandardElementGroup, updateStandardElement, standardId, childStandardItems, timeFormat, router} = this.props;
    if (standardItem.type === STANDARD_ELEMENT_GROUP) {
      updateStandardElementGroup(standardId, childStandardItems, standardItem, timeFormat)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to update Standard Element Group and children.'));
    } else {
      updateStandardElement(standardId, standardItem, timeFormat)
        .catch(error => handleApiError(error, router, 'An error occurred while attempting to update the Standard Element.'));
    }
  }

  handleFieldChange(standardItemId, event) {
    const {name, value} = event.target;
    this.props.setStandardItemModelProperty(standardItemId, name, value);
  }

  handleFilterChange(event) {
    this.props.setStandardElementEditorProperty('standardElementUOMFilterValue', event.filter.value);
  }

  handleCreateComment(standardItemId, comment) {
    const {createStandardElementComment, standardId, router} = this.props;
    createStandardElementComment(standardId, standardItemId, comment)
      .catch(error => handleApiError(error, router, 'An error occurred while attempting to add the comment to a Standard Element.'));
  }

  handleAddElementById(elementId, insertAtIndex, standardElementGroupId) {
    const {addElements, standardId, loadStandardDetails} = this.props;
    return addElements(standardId, [elementId], insertAtIndex, standardElementGroupId)
      .then(() => loadStandardDetails(standardId));
  }

  handleAddElementsBySearch(insertAtIndex, standardElementGroupId) {
    const {openElementSearch, standardId} = this.props;
    return openElementSearch(standardId, insertAtIndex, standardElementGroupId);
  }

  handleCreateStandardElementGroup(groupName, insertAtIndex) {
    const {createStandardElementGroup, standardId, loadStandardDetails} = this.props;
    return createStandardElementGroup(standardId, groupName, insertAtIndex)
      .then(() => loadStandardDetails(standardId));
  }

  handleToggleSelectStandardElementsWithGroup(selected, standardElementGroupId) {
    const {toggleSelectStandardElementsWithGroup, childStandardItems} = this.props;
    const ids = childStandardItems.map(item => item.id).valueSeq().toArray();
    toggleSelectStandardElementsWithGroup(ids, selected, standardElementGroupId);
  }

  handleShowCreateUnitOfMeasure(standardElementId) {
    const {showCreateUnitOfMeasure, setStandardElementEditorProperty, departmentId, setCreateUnitOfMeasureModelProperty, standardElementEditorProperty} = this.props;
    showCreateUnitOfMeasure(departmentId);
    setStandardElementEditorProperty('standardElementId', standardElementId);
    setCreateUnitOfMeasureModelProperty('name', standardElementEditorProperty.get('standardElementUOMFilterValue'));
  }

  /*
  This method is getting called on toggle event of any standard element
  Toggled standard element can be a child element of any group, in this case we may need to update select status of group as well.
  */
  handleToggleSelectStandardElement(standardElementId) {
    const {handleToggleSelectStandardElement, childStandardItems, childStandardItemsStates} = this.props;
    const rowCount = childStandardItems.size;

    // if current toggled element is child of any group then rowCount will be > 0
    if (rowCount > 0) {
      const selectedCount = childStandardItemsStates.filter(x => x.get('selected')).size;
      const standardElementToggledSelectedStatus = !childStandardItemsStates.get(standardElementId).get('selected');
      const standardElementGroupId = childStandardItems.first().standardElementGroupId;
      let standardElementGroupSelectedFlag = null;

      /*
      Case1: If new state of toggled standard element is selected(true) and toggled element is last child of the group which is getting selected,
      then we need to add the group's id in the selected groups list.

      Case2: If new state of toggled standard element is deselected(false) and toggled element is first child of the group which is getting deselected,
      then we need to remove the group's id from the selected groups list.
      */
      if ((standardElementToggledSelectedStatus && selectedCount === (rowCount - 1)) ||
      (!standardElementToggledSelectedStatus && selectedCount === rowCount)) {
        standardElementGroupSelectedFlag = standardElementToggledSelectedStatus;
      }

      handleToggleSelectStandardElement(standardElementId, standardElementGroupId, standardElementGroupSelectedFlag);
    } else {
      // If a toggled standard element is not a child of any group, then pass only standardElementId. In this case standardElementGroupId and standardElementGroupSelectedFlag will have default values.
      handleToggleSelectStandardElement(standardElementId);
    }
  }

  render() {
    const {
      standardItem, standardItemsCount, standardElementGroupsCount,
      timeFormat, collapsed, commentCollapsed, commentEntered, addStandardItemAboveCollapsed, addStandardItemBelowCollapsed,
      disabled, editing, disabledBulkEdit,
      validationErrors, childStandardItemsStates, selectedStandardItems,
      childStandardItems, childStandardItemsCommentCollapsed, childStandardItemsCommentEntered,
      childStandardItemsAddStandardItemBelowCollapsed, childStandardItemsValidationErrors,
      unitsOfMeasure, handleEditFrequencyFormula, standardStatus,
      handleToggleStandardElementComment, handleCancelCreateComment, handleToggleAddStandardItem,
      handleCreateStandardElement, addScrollNode, canManageStandardList, onBulkPasteStandardItems, showPasteButton,
      standardId, hasBetaAccess, getElementForStandard, selectedStandardElementGroupIds,
    } = this.props;
    let standardItemComponent;

    if (editing) {
      standardItemComponent = (
        <StandardItemEditor
          standardItem={standardItem}
          standardId={standardId}
          standardItemsCount={standardItemsCount}
          standardElementGroupsCount={standardElementGroupsCount}
          timeFormat={timeFormat}
          collapsed={collapsed}
          commentCollapsed={commentCollapsed}
          commentEntered={commentEntered}
          addStandardItemAboveCollapsed={addStandardItemAboveCollapsed}
          disabled={disabled}
          childStandardItems={childStandardItems}
          childStandardItemsCommentCollapsed={childStandardItemsCommentCollapsed}
          childStandardItemsCommentEntered={childStandardItemsCommentEntered}
          childStandardItemsValidationErrors={childStandardItemsValidationErrors}
          validationErrors={validationErrors}
          onSave={this.handleSave}
          onCancel={this.handleCancelEdit}
          onFieldChange={this.handleFieldChange}
          onFilterChange={this.handleFilterChange}
          onToggleStandardElementGroup={this.handleToggleStandardElementGroup}
          onMove={this.handleMoveStandardItem}
          onMoveToGroup={this.handleMoveStandardElementToGroup}
          onRemoveFromGroup={this.handleRemoveStandardElementFromGroup}
          onMoveToPosition={this.handleMoveStandardItemToPosition}
          onDelete={this.handleDeleteStandardItem}
          onPromoteToListElement={this.handlePromoteStandardElementToListElement}
          onToggleComment={handleToggleStandardElementComment}
          onToggleAddStandardItem={handleToggleAddStandardItem}
          onEditFrequencyFormula={handleEditFrequencyFormula}
          onAddElementById={this.handleAddElementById}
          onAddElementsBySearch={this.handleAddElementsBySearch}
          onCreateStandardElement={handleCreateStandardElement}
          onCreateStandardElementGroup={this.handleCreateStandardElementGroup}
          unitsOfMeasure={unitsOfMeasure}
          addScrollNode={addScrollNode}
          onShowCreateUnitOfMeasure={this.handleShowCreateUnitOfMeasure}
          canManageStandardList={canManageStandardList}
          showPasteButton={showPasteButton}
          onBulkPasteStandardItems={onBulkPasteStandardItems}
          hasBetaAccess={hasBetaAccess}
          getElementForStandard={getElementForStandard} />
      );
    } else {
      standardItemComponent = (
        <StandardItem
          hasBetaAccess={hasBetaAccess}
          standardId={standardId}
          standardItem={standardItem}
          standardItemsCount={standardItemsCount}
          standardElementGroupsCount={standardElementGroupsCount}
          timeFormat={timeFormat}
          collapsed={collapsed}
          commentCollapsed={commentCollapsed}
          commentEntered={commentEntered}
          addStandardItemAboveCollapsed={addStandardItemAboveCollapsed}
          addStandardItemBelowCollapsed={addStandardItemBelowCollapsed}
          disabled={disabled}
          standardStatus={standardStatus}
          disabledBulkEdit={disabledBulkEdit}
          childStandardItems={childStandardItems}
          childStandardItemsCommentCollapsed={childStandardItemsCommentCollapsed}
          childStandardItemsCommentEntered={childStandardItemsCommentEntered}
          childStandardItemsAddStandardItemBelowCollapsed={childStandardItemsAddStandardItemBelowCollapsed}
          onEdit={this.handleEdit}
          onCommentChange={this.handleFieldChange}
          onToggleStandardElementGroup={this.handleToggleStandardElementGroup}
          onMove={this.handleMoveStandardItem}
          onMoveToGroup={this.handleMoveStandardElementToGroup}
          onRemoveFromGroup={this.handleRemoveStandardElementFromGroup}
          onMoveToPosition={this.handleMoveStandardItemToPosition}
          onEditSteps={this.handleEditSteps}
          onDelete={this.handleDeleteStandardItem}
          onPromoteToListElement={this.handlePromoteStandardElementToListElement}
          onToggleComment={handleToggleStandardElementComment}
          onCreateComment={this.handleCreateComment}
          onCancelCreateComment={handleCancelCreateComment}
          onToggleAddStandardItem={handleToggleAddStandardItem}
          onAddElementById={this.handleAddElementById}
          onAddElementsBySearch={this.handleAddElementsBySearch}
          onCreateStandardElement={handleCreateStandardElement}
          onCreateStandardElementGroup={this.handleCreateStandardElementGroup}
          childStandardItemsStates={childStandardItemsStates}
          selectedStandardItems={selectedStandardItems}
          onToggleSelectStandardElement={this.handleToggleSelectStandardElement}
          onToggleSelectStandardElementsWithGroup={this.handleToggleSelectStandardElementsWithGroup}
          addScrollNode={addScrollNode}
          showPasteButton={showPasteButton}
          onBulkPasteStandardItems={onBulkPasteStandardItems}
          getElementForStandard={getElementForStandard}
          selectedStandardElementGroupIds={selectedStandardElementGroupIds} />
      );
    }

    return (
      <div className="standard-item-container">
        {standardItemComponent}
      </div>
    );
  }
}

StandardItemContainer.propTypes = {
  disabled: PropTypes.bool.isRequired,
  disabledBulkEdit: PropTypes.bool.isRequired,
  standardId: PropTypes.number.isRequired,
  standardItem: PropTypes.oneOfType([
    PropTypes.instanceOf(StandardElementModel),
    PropTypes.instanceOf(StandardElementGroupModel),
  ]).isRequired,
  standardItemsCount: PropTypes.number.isRequired,
  standardElementGroupsCount: PropTypes.number.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  standardStatus: PropTypes.string,
  showPasteButton: PropTypes.bool.isRequired,
  onBulkPasteStandardItems: PropTypes.func.isRequired,
  getElementForStandard: PropTypes.func,
};

function makeMapStateToProps(state, ownProps) {
  const collapsedSelector = makeStandardItemCollapsedSelector();
  const commentCollapsedSelector = makeStandardItemCommentCollapsedSelector();
  const commentEnteredSelector = makeStandardItemCommentEnteredSelector();
  const addStandardItemAboveCollapsedSelector = makeAddStandardItemAboveCollapsedSelector();
  const addStandardItemBelowCollapsedSelector = makeAddStandardItemBelowCollapsedSelector();
  const editingSelector = makeStandardItemEditingSelector();
  const validationErrorsSelector = makeStandardItemValidationErrorsSelector();
  const childStandardItemsSelector = makeChildStandardItemsSortedByIndexSelector();
  const childStandardItemsStatesSelector = makeChildStandardItemsStatesSelector();
  const childStandardItemsCommentCollapsedSelector = makeChildStandardItemsCommentCollapsedSelector();
  const childStandardItemsCommentEnteredSelector = makeChildStandardItemsCommentEnteredSelector();
  const childStandardItemsAddStandardItemBelowCollapsedSelector = makeChildStandardItemsAddStandardItemBelowCollapsedSelector();
  const childStandardItemsValidationErrorsSelector = makeChildStandardItemsValidationErrorsSelector();
  const unitOfMeasureOptions = makeUnitOfMeasureSelectListOptionsForDepartmentArraySelector(state);
  const departmentId = departmentIdSelector(state);
  const canManageStandardListSelector = makeCurrentUserHasPermissionSelector(STANDARDS_LIST_MANAGEMENT);

  return ({
    timeFormat: timeFormatSelector(state),
    collapsed: collapsedSelector(state, ownProps),
    commentCollapsed: commentCollapsedSelector(state, ownProps),
    commentEntered: commentEnteredSelector(state, ownProps),
    addStandardItemAboveCollapsed: addStandardItemAboveCollapsedSelector(state, ownProps),
    addStandardItemBelowCollapsed: addStandardItemBelowCollapsedSelector(state, ownProps),
    editing: editingSelector(state, ownProps),
    validationErrors: validationErrorsSelector(state, ownProps),
    childStandardItems: childStandardItemsSelector(state, ownProps),
    childStandardItemsCommentCollapsed: childStandardItemsCommentCollapsedSelector(state, ownProps),
    childStandardItemsCommentEntered: childStandardItemsCommentEnteredSelector(state, ownProps),
    childStandardItemsAddStandardItemBelowCollapsed: childStandardItemsAddStandardItemBelowCollapsedSelector(state, ownProps),
    childStandardItemsStates: childStandardItemsStatesSelector(state, ownProps),
    childStandardItemsValidationErrors: childStandardItemsValidationErrorsSelector(state, ownProps),
    unitsOfMeasure: unitOfMeasureOptions(departmentId),
    scrollNode: standardItemScrollNodeSelector(state),
    selectedStandardItems: standardItemsSelectedSelector(state),
    standardStatus: statusSelector(state),
    standardElementEditorProperty: standardElementEditorPropertySelector(state),
    departmentId,
    canManageStandardList: canManageStandardListSelector(state),
    selectedStandardElementGroupIds: selectedStandardElementGroupIdsSelector(state),
  });
}

export default withRouter(connect(
  makeMapStateToProps,
  {
    toggleStandardElementGroup,
    moveStandardItem,
    showSelectStandardElementGroupToMoveTo,
    removeStandardElementFromGroup,
    openStandardMOSTElementEdit,
    openStandardNonMOSTElementEdit,
    confirmDeleteStandardItem,
    showPromoteToListElement,
    editStandardElementGroup,
    cancelEditStandardElementGroup,
    updateStandardElementGroup,
    editStandardElement,
    cancelEditStandardElement,
    updateStandardElement,
    setStandardItemModelProperty,
    handleToggleStandardElementComment: toggleStandardElementComment,
    createStandardElementComment,
    handleCancelCreateComment: cancelCreateStandardElementComment,
    handleToggleAddStandardItem: toggleAddStandardItem,
    handleEditFrequencyFormula: showStandardElementFrequencyFormulaModal,
    addElements,
    openElementSearch,
    handleCreateStandardElement: showSelectStandardElementTypeToCreate,
    createStandardElementGroup,
    showMoveStandardItemToPosition,
    loadStandardDetails,
    handleToggleSelectStandardElement: toggleSelectStandardElement,
    toggleSelectStandardElementsWithGroup,
    showCreateUnitOfMeasure,
    setStandardElementEditorProperty,
    setCreateUnitOfMeasureModelProperty,
  },
)(StandardItemContainer));
