import {Map} from 'immutable';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import autoBind from 'react-autobind';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import {
  MOVE_NON_MOST_STEP_UP,
  MOVE_NON_MOST_STEP_DOWN,
  MOVE_NON_MOST_STEP_TOP,
  MOVE_NON_MOST_STEP_BOTTOM,
} from '../constants/moveNonMOSTStepActionTypes';

export default class NonMOSTStepMoveControls extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  handleMoveUp() {
    this.props.onMove(MOVE_NON_MOST_STEP_UP);
  }

  handleMoveDown() {
    this.props.onMove(MOVE_NON_MOST_STEP_DOWN);
  }

  handleMoveTop() {
    this.props.onMove(MOVE_NON_MOST_STEP_TOP);
  }

  handleMoveBottom() {
    this.props.onMove(MOVE_NON_MOST_STEP_BOTTOM);
  }

  handleMoveToPosition() {
    const {nonMOSTStep, onMoveToPosition} = this.props;
    onMoveToPosition(nonMOSTStep.get('id'));
  }

  render() {
    const {nonMOSTStep, disabled, canMove, onDelete} = this.props;

    return (
      <div className="move-controls">
        <div className="move-arrows">
          <i className={`fa fa-caret-up ${disabled ? 'disabled' : 'clickable'}`} onClick={disabled ? null : this.handleMoveUp} />
          <i className={`fa fa-caret-down ${disabled ? 'disabled' : 'clickable'}`} onClick={disabled ? null : this.handleMoveDown} />
        </div>
        <DropdownButton id={`context-menu-${nonMOSTStep.get('id')}`} bsStyle="link"
          disabled={disabled}
          title={<i className="fa fa-ellipsis-h" />}
          noCaret pullRight>
          <MenuItem eventKey="1" onSelect={this.handleMoveTop} disabled={!canMove}>Move To Top</MenuItem>
          <MenuItem eventKey="2" onSelect={this.handleMoveBottom} disabled={!canMove}>Move To Bottom</MenuItem>
          <MenuItem eventKey="3" onSelect={this.handleMoveToPosition} disabled={!canMove}>Move To Position</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4" onClick={onDelete}>Delete</MenuItem>
        </DropdownButton>
      </div>
    );
  }
}

NonMOSTStepMoveControls.propTypes = {
  nonMOSTStep: PropTypes.instanceOf(Map).isRequired,
  disabled: PropTypes.bool,
  canMove: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onMoveToPosition: PropTypes.func.isRequired,
};
