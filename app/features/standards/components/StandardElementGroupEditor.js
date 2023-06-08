import autoBind from 'react-autobind';
import classNames from 'classnames';
import {StandardElementGroupModel} from '../models';
import {Button} from 'react-bootstrap';
import {Map} from 'immutable';
import {TextInput} from '../../forms/components';
import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {ABOVE} from '../constants/addStandardItemPositions';
import {STANDALONE} from '../constants/addStandardItemStyles';
import {STANDARD_ELEMENT_GROUP} from '../constants/standardItemTypes';
import StandardItemMoveControls from './StandardItemMoveControls';
import AddStandardItem from './AddStandardItem';
import {statusClass} from '../constants/standardStatuses';

export default class StandardElementGroupEditor extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleSave() {
    const {onSave, standardElementGroup} = this.props;
    onSave(standardElementGroup);
  }

  handleCancel() {
    const {onCancel, standardElementGroup} = this.props;
    onCancel(standardElementGroup);
  }

  handleFieldChange(event) {
    const {onFieldChange, standardElementGroup} = this.props;
    onFieldChange(standardElementGroup.id, event);
  }

  handleToggleAddStandardItemAbove() {
    const {onToggleAddStandardItem, standardElementGroup} = this.props;
    onToggleAddStandardItem(standardElementGroup.id, ABOVE);
  }

  render() {
    const {
      disabled, standardElementGroup, collapsed, addStandardItemAboveCollapsed, validationErrors, children,
      onToggleStandardElementGroup, onMove, onMoveToPosition, onDelete, canMove, addScrollNode, lowestElementStatus,
      onAddElementById, onAddElementsBySearch, onCreateStandardElement, onCreateStandardElementGroup,
      showPasteButton, onBulkPasteStandardItems, hasBetaAccess, provided, getElementForStandard,
    } = this.props;

    const collapserClassNames = classNames(
      'collapser', 'clickable', 'fa',
      {'fa-caret-right': collapsed, 'fa-caret-down': !collapsed});

    return (
      <div className="standard-element-group-editor-container">
        <AddStandardItem
          autoFocus
          insertAtIndex={standardElementGroup.index}
          style={STANDALONE}
          render
          collapsed={addStandardItemAboveCollapsed} disabled={disabled} closeable enableAddGroup
          onToggle={this.handleToggleAddStandardItemAbove}
          onAddElementById={onAddElementById}
          onAddElementsBySearch={onAddElementsBySearch}
          onCreateStandardElement={onCreateStandardElement}
          onCreateStandardElementGroup={onCreateStandardElementGroup}
          showPasteButton={showPasteButton}
          onBulkPasteStandardItems={onBulkPasteStandardItems}
          hasBetaAccess={hasBetaAccess}
          getElementForStandard={getElementForStandard} />

        <div id={`standard-item=${standardElementGroup.id}`} className="standard-element-group-editor" ref={addScrollNode}>
          <div className="content">
            <div className="drag-icon-holder-div" />
            <div className={`standard-item-index ${statusClass(lowestElementStatus)}`}>{standardElementGroup.index}</div>

            {children.size
              ? <div className="collapser-container">
                <i className={collapserClassNames} onClick={onToggleStandardElementGroup} />
              </div>
              : null}

            <div className="header">
              <TextInput
                id="name" formGroupClassName="name" maxLength={256} autoFocus
                disabled={disabled}
                value={standardElementGroup.name} onChange={this.handleFieldChange}
                formValidationErrors={validationErrors} />
              <div className="header-actions">
                <Button bsStyle="primary" disabled={disabled} onClick={this.handleSave}>Save</Button>
                <Button bsStyle="default" disabled={disabled} onClick={this.handleCancel}>Cancel</Button>
              </div>
            </div>

            <div className="normal-time" />

            <StandardItemMoveControls
              disabled={disabled}
              standardItemId={standardElementGroup.id}
              standardItemType={STANDARD_ELEMENT_GROUP}
              inStandardElementGroup={false}
              canMove={canMove}
              onMove={onMove}
              onMoveToPosition={onMoveToPosition}
              onDelete={onDelete}
              showMoveItemArrowController />
          </div>

          <div ref={provided.innerRef}>
            {collapsed ? null : children.valueSeq()}
            {provided.placeholder}
          </div>
        </div>
      </div>
    );
  }
}

StandardElementGroupEditor.propTypes = {
  disabled: PropTypes.bool.isRequired,
  standardElementGroup: PropTypes.instanceOf(StandardElementGroupModel).isRequired,
  collapsed: PropTypes.bool.isRequired,
  lowestElementStatus: PropTypes.string,
  addStandardItemAboveCollapsed: PropTypes.bool.isRequired,
  validationErrors: PropTypes.instanceOf(Map).isRequired,
  canMove: PropTypes.bool.isRequired,
  addScrollNode: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onToggleStandardElementGroup: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleAddStandardItem: PropTypes.func.isRequired,
  onAddElementById: PropTypes.func.isRequired,
  onAddElementsBySearch: PropTypes.func.isRequired,
  onCreateStandardElement: PropTypes.func.isRequired,
  onCreateStandardElementGroup: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Map),
  showPasteButton: PropTypes.bool.isRequired,
  onBulkPasteStandardItems: PropTypes.func.isRequired,
  getElementForStandard: PropTypes.func,
};
