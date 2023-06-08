import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {STANDARD_ELEMENT} from '../constants/standardItemTypes';
import {ESTIMATE} from '../../elements/constants/elementTypes';
import {
  MOVE_STANDARD_ITEM_UP,
  MOVE_STANDARD_ITEM_DOWN,
  MOVE_STANDARD_ITEM_TOP,
  MOVE_STANDARD_ITEM_BOTTOM,
} from '../constants/moveStandardItemActionTypes';
import StandardItemMoveControlsMenu from './StandardItemMoveControlsMenu';
import StandardItemMoveControlsArrows from './StandardItemMoveControlsArrows';

export default class StandardItemMoveControls extends PureComponent {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleMoveUp() {
    const {onMove, standardItemId} = this.props;
    onMove(standardItemId, MOVE_STANDARD_ITEM_UP);
  }

  handleMoveDown() {
    const {onMove, standardItemId} = this.props;
    onMove(standardItemId, MOVE_STANDARD_ITEM_DOWN);
  }

  handleMoveToTop() {
    const {onMove, standardItemId} = this.props;
    onMove(standardItemId, MOVE_STANDARD_ITEM_TOP);
  }

  handleMoveToBottom() {
    const {onMove, standardItemId} = this.props;
    onMove(standardItemId, MOVE_STANDARD_ITEM_BOTTOM);
  }

  handleMoveToPosition() {
    const {onMoveToPosition, standardItemId} = this.props;
    onMoveToPosition(standardItemId);
  }

  handleMoveToGroup() {
    const {onMoveToGroup, standardItemId} = this.props;
    onMoveToGroup(standardItemId);
  }

  handleRemoveFromGroup() {
    const {onRemoveFromGroup, standardItemId} = this.props;
    onRemoveFromGroup(standardItemId);
  }

  handleDelete() {
    const {onDelete, standardItemId} = this.props;
    onDelete(standardItemId);
  }

  handlePromoteToListElement() {
    const {onPromoteToListElement, standardItemId} = this.props;
    onPromoteToListElement(standardItemId);
  }

  render() {
    const {
      standardItemId, standardItemType, standardItemElementId, standardItemElementType,
      inStandardElementGroup, editing, disabled, canMove, standardElementGroupsCount, showMoveItemArrowController,
    } = this.props;

    const canMoveToGroup = !editing && standardItemType === STANDARD_ELEMENT && standardElementGroupsCount > 0;
    const canRemoveFromGroup = !editing && standardItemType === STANDARD_ELEMENT && inStandardElementGroup;

    const canPromoteToListElement = !editing &&
      standardItemType === STANDARD_ELEMENT &&
      standardItemElementId === null &&
      standardItemElementType !== ESTIMATE;

    return (
      <div className="move-controls">
        {showMoveItemArrowController && <StandardItemMoveControlsArrows
          disabled={disabled}
          onMoveUp={this.handleMoveUp}
          onMoveDown={this.handleMoveDown} />}
        <StandardItemMoveControlsMenu
          disabled={disabled}
          standardItemId={standardItemId}
          canMove={canMove}
          canMoveToGroup={canMoveToGroup}
          canRemoveFromGroup={canRemoveFromGroup}
          canPromoteToListElement={canPromoteToListElement}
          onMoveToTop={this.handleMoveToTop}
          onMoveToBottom={this.handleMoveToBottom}
          onMoveToGroup={this.handleMoveToGroup}
          onRemoveFromGroup={this.handleRemoveFromGroup}
          onMoveToPosition={this.handleMoveToPosition}
          onEditSteps={this.handleEditSteps}
          onDelete={this.handleDelete}
          onPromoteToListElement={this.handlePromoteToListElement} />
      </div>
    );
  }
}

StandardItemMoveControls.propTypes = {
  standardItemId: PropTypes.number.isRequired,
  standardItemType: PropTypes.string.isRequired,
  standardItemElementId: PropTypes.number,
  standardItemElementType: PropTypes.string,
  inStandardElementGroup: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  canMove: PropTypes.bool.isRequired,
  standardElementGroupsCount: PropTypes.number,
  onMove: PropTypes.func.isRequired,
  onMoveToGroup: PropTypes.func,
  onRemoveFromGroup: PropTypes.func,
  onMoveToPosition: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPromoteToListElement: PropTypes.func,
};
